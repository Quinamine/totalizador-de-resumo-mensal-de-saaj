"use strict";

const validacao = {

    validarInput: () => {
        for (const cel of inputCels) {
            let numAlgarismos = cel.value.length;
            if(numAlgarismos > 6) {
                numAlgarismos > 6 && cel.classList.add("fundo-vermelho");
            } else {
                cel.classList.remove("fundo-vermelho");
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

// VARIÁVEIS GLOBAIS
let inputCels, alertaVermelho;
function inicializacao() {
    inputCels = document.querySelectorAll("div.input-container input");
    alertaVermelho = document.querySelector("div.razao-pelas-celulas-com-fundo-vermelho");
}

function eventos() {
    // VALIDAR INPUT NO EVENTO DE ENTRADA DE DADOS
    inputCels.forEach ( cel => {
        cel.addEventListener("input", function() {
            validacao.validarInput();

            const totalParcialAfim = document.querySelector(`.${cel.dataset.totalparcialoutput}`);

            // Mostrar alerta se a 'cel' ficar vermelha
            if(cel.matches(".fundo-vermelho")) {
                setTimeout(validacao.mostrarAlertaVermelho, 2500);
                return false;
            }

            // Mostrar alerta se as células dos totais ficarem vermelhas;
            for (const c of inputCels) {
                if( c.hasAttribute("readonly") && c.matches(".fundo-vermelho")) {
                    setTimeout(validacao.mostrarAlertaVermelho, 2500);
                }
            }
        });
    });

    // FECHAR ALERTA VERMELHO
    const btnFecharAlertaVermelho = document.querySelector("button.close-redcels-obs");
    btnFecharAlertaVermelho.addEventListener("click", () => {
        validacao.fecharAlertaVermelho();
        validacao.salvarPreferenciaNaoMostrarMais();
    });
}

window.addEventListener("load", () => {
    // VALIDAR INPUT - NO LOAD DO WINDOWS
    inicializacao();
    eventos();
    validacao.validarInput();
})