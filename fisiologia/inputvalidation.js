"use strict";

const inputValidation = {

    contarAlgarismosPorCelula(){
        let numeroDeCelulasVermelhas = 0;
        for (const cel of inputCels) {
            this.adicionarOuRemoverFundoVermelho(cel, "-");
            let numAlgarismos = cel.value.length;

            if(!cel.matches("[readonly") && (numAlgarismos > 6) || 
            cel.matches("[readonly") && (numAlgarismos > 7)) {
                this.adicionarOuRemoverFundoVermelho(cel, "+");
                numeroDeCelulasVermelhas++;
            }
        }
        
        if(numeroDeCelulasVermelhas > 0) {
            setTimeout(() => this.mostrarMotivoPelasCelulasVermelhas(), 1500);
        }
    },

    adicionarOuRemoverFundoVermelho(cel, accao) {
        accao === "+" ? cel.classList.add("fundo-vermelho") : cel.classList.remove("fundo-vermelho");
    },
    
    mostrarMotivoPelasCelulasVermelhas() {
        if(!sessionStorage.getItem("trmsaaj-naoMostrarMaisMotivoDeRedCels")) {
            alertaVermelho.classList.add("on");
            desfoqueDoFundo.on();
        }
    },
    
    omitirMotivoPelasCelulasVermelhas() {
        alertaVermelho.classList.remove("on");
        desfoqueDoFundo.off();
    },

    salvarPreferenciaNaoMostrarMais: () => {
        const checkboxNaoMostrarMais = document.querySelector("#nao-mostrar-mais");
        if(checkboxNaoMostrarMais.checked) {
            sessionStorage.setItem("trmsaaj-naoMostrarMaisMotivoDeRedCels", "checked");
        } else {
            sessionStorage.removeItem("trmsaaj-naoMostrarMaisMotivoDeRedCels");
        }
    }
}

// VARIÁVEIS GLOBAIS
let inputCels, alertaVermelho;
window.addEventListener("load", () => {
    inputCels = document.querySelectorAll("div.inputs-container input");
    alertaVermelho = document.querySelector("div.razao-pelas-celulas-com-fundo-vermelho");

    inputCels.forEach( cel => {
        cel.addEventListener("input", () => {
            setTimeout(() => inputValidation.contarAlgarismosPorCelula(), 250);
        });
    });

    setTimeout(() => inputValidation.contarAlgarismosPorCelula(), 1000);

    const btnFecharAlerta = document.querySelector("button.close-redcels-obs");
    btnFecharAlerta.addEventListener("click", () => {
        inputValidation.omitirMotivoPelasCelulasVermelhas();
        inputValidation.salvarPreferenciaNaoMostrarMais();
    });
});