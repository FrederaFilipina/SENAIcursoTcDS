
import { registerLoginLog } from "../controllers/log.js";

const attempts = new Map();

const waitTime = 3 * 60 * 1000; // 3 minutos
const maxFailures = 5;

export async function loginLimit(req, res, next) {
    const now = Date.now();

    // Remove tentativas cujo período de bloqueio expirou.
    for (const [ip, attempt] of attempts) {
        if (attempt.expires <= now) {
            attempts.delete(ip);
        }
    }

    const attempt = attempts.get(req.ip);

    // Verifica se o IP atingiu o limite de tentativas.
    if (attempt?.failures >= maxFailures) {
        const seconds = Math.ceil((attempt.expires - now) / 1000);
        const minutes = Math.ceil(seconds / 60);

        await registerLoginLog(req, "bloqueado");

        res.set("Retry-After", String(seconds));

        return res.status(429).json({
            message: `Limite de tentativas atingido. Aguarde ${minutes} minutos para tentar novamente.`
        });
    }

    // Disponibiliza a função para o controller de login.
    res.locals.recordLoginResult = (success) => {
        if (success) {
            attempts.delete(req.ip);
            return;
        }

        const current = attempts.get(req.ip) || {
            failures: 0,
            expires: 0
        };

        current.failures += 1;
        current.expires = Date.now() + waitTime;

        attempts.set(req.ip, current);
    };

    next();
}
