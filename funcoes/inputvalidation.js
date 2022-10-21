
const validacao = {

    validarInput: () => {
        for (const cel of inputCels) {
            let numAlgarismos = cel.value.length;
            if(numAlgarismos > 6) {
                numAlgarismos > 6 && cel.classList.add("fundo-vermelho");
            };
        }
    },

    mostrarAlertaVermelho: () => {
        if(!sessionStorage.getItem("trmsaaj-alertaVermelho")) {
            alertaVermelho.classList.add("on");
            menu.desfocarFundo();
        }
    },

    fecharAlertaVermelho: () => {
        alertaVermelho.classList.remove("on");
        menu.focarFundo();
    },

    salvarPreferenciaNaoMostrarMais: () => {
        const checkboxPreference = document.querySelector("#nao-mostrar-mais");
        if(checkboxPreference.checked) {
            sessionStorage.setItem("trmsaaj-alertaVermelho", "nao-mostrar-mais");
        } else {
            sessionStorage.removeItem("trmsaaj-alertaVermelho");
        }
    }
}


let inputCels, alertaVermelho;
window.addEventListener("load", () => {
    inputCels = document.querySelectorAll("div.input-container input");
    alertaVermelho = document.querySelector("div.razao-pelas-celulas-com-fundo-vermelho");
    const btnFecharAlertaVermelho = document.querySelector("button.close-redcels-obs");

    // VALIDAR INPUT - NO LOAD DO WINDOWS
    validacao.validarInput();

    // VALIDAR INPUT NO EVENTO DE ENTRADA DE DADOS
    inputCels.forEach ( cel => {
        cel.addEventListener("input", function() {
            validacao.validarInput();

            const totalParcial = document.querySelector(`.${cel.dataset.totalparcial}`);
            if( (cel.matches(".fundo-vermelho")) || 
            (totalParcial.matches(".fundo-vermelho")) ) {
                setTimeout(validacao.mostrarAlertaVermelho, 2500);
            }
        });
    });

    // FECHAR ALERTA VERMELHO
    btnFecharAlertaVermelho.addEventListener("click", () => {
        validacao.fecharAlertaVermelho();
        validacao.salvarPreferenciaNaoMostrarMais();
    });

})