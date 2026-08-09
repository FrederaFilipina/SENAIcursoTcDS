export class ErroHttp extends Error {

    statusCode: number;

    constructor(mensagem: string, statusCode: number) {
        super(mensagem);

        this.name = "ErroHttp";
        this.statusCode = statusCode;

        Object.setPrototypeOf(
            this,
            ErroHttp.prototype
        );
    }
}