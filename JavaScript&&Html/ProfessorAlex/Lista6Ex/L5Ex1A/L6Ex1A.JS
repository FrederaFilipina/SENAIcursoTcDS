function rodPro(){
    let idade = prompt(`Qual sua idade?`)
    let cnh = prompt(`Você já tem CNH?
sim/não`)
    if(18 <= idade && cnh == "sim"){
        alert(`Pode dirigir`);
    } else {
        alert(`Não pode dirigir`);
    }
    alert(`FIM!!! Obrigado ^^`)
}
