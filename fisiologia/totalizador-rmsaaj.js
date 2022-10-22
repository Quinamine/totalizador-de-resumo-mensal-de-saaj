"use strict";

const storage  = {
    salvarFicha() {
        for (let i = 0; i < inputCels.length; i++) {
            // Salvar
            inputCels[i].addEventListener("input", () => localStorage.setItem(`trmsaaj-cel${i}`, `${inputCels[i].value}`));
            // Restaurar
            inputCels[i].value = localStorage.getItem(`trmsaaj-cel${i}`);
        }
    },

    salvarDadosAdicionais() {
        const dadosAdicionais = document.querySelectorAll("div.container input[type=text], input[type=date]");

        dadosAdicionais.forEach ( dado => {
            dado.addEventListener("input", () => localStorage.setItem(`trmsaaj-${dado.id}`, `${dado.value}`));
            dado.value = localStorage.getItem(`trmsaaj-${dado.id}`);
        })
    },

    salvarDestaqueDeTotais() {
        readonlyCelsDarker.checked ?
            localStorage.setItem("trmsaaj-destaque", "on") : 
            localStorage.removeItem("trmsaaj-destaque");
    }, 

    salvarNota() {
        textArea.addEventListener("input", () => {
            localStorage.setItem(`trmsaaj-nota`, `${textArea.value}`);
            if(textArea.value === "") {
                localStorage.removeItem("trmsaaj-nota");
                textArea.classList.remove("bold");
            } else {
                textArea.classList.add("bold");
            }
        })
    }
}

function totalizar(celulasPorTotalizar, celulaDeSaida) {
    let total = 0;
    for (const cel of celulasPorTotalizar) {
        total+=Number(cel.value);
    }
    celulaDeSaida.value = total;
}

function escutarEventos() {
    // A variável 'readonlyCelsDarker' está declarada globalmente no arquivo 'menu.js'
    readonlyCelsDarker.addEventListener("change", () => storage.salvarDestaqueDeTotais());

    // TOTALIZAÇÃO
    // A variável 'inputCels' está declarada globalmente no arquivo 'inputValidation.js'
    inputCels.forEach( cel => {
        cel.addEventListener("input", () => {

            if((cel.dataset.totalparcial) && (cel.dataset.totalgeral)) {
                cel.classList.add(`${cel.dataset.totalparcial}`);
                cel.classList.add(`${cel.dataset.totalgeral}`);
                
                let totalParcial = document.querySelectorAll(`.${cel.dataset.totalparcial}`),
                totalParcialOutput = document.querySelector(`.${cel.dataset.totalparcialoutput}`),
                totalGeral = document.querySelectorAll(`.${cel.dataset.totalgeral}`),
                totalGeralOutput = document.querySelector(`.${cel.dataset.totalgeraloutput}`);
    
                totalizar(totalParcial, totalParcialOutput);
                totalizar(totalGeral, totalGeralOutput);
            }
        })

        // No Load do Windows
        if (cel.value != "") {
            if((cel.dataset.totalparcial) && (cel.dataset.totalgeral)) {
                cel.classList.add(`${cel.dataset.totalparcial}`);
                cel.classList.add(`${cel.dataset.totalgeral}`);
                
                let totalParcial = document.querySelectorAll(`.${cel.dataset.totalparcial}`),
                totalParcialOutput = document.querySelector(`.${cel.dataset.totalparcialoutput}`),
                totalGeral = document.querySelectorAll(`.${cel.dataset.totalgeral}`),
                totalGeralOutput = document.querySelector(`.${cel.dataset.totalgeraloutput}`);
    
                totalizar(totalParcial, totalParcialOutput);
                totalizar(totalGeral, totalGeralOutput);
            }
        }
    })
}

window.addEventListener("load", () => {
    // INVOCAÇÃO DAS FUNÇÕES
    storage.salvarFicha();
    storage.salvarDadosAdicionais();
    storage.salvarNota();
    escutarEventos();
    
    // RETORNAR NOTA NO LOAD DO WINDOWS
    textArea.value = localStorage.getItem("trmsaaj-nota");
    textArea.value !== "" && textArea.classList.add("bold");

    // DESTAQUE DE CÉLULAS NO LOAD DO WINDOWS
    if(localStorage.getItem("trmsaaj-destaque")) {
        readonlyCelsDarker.setAttribute("checked", "");
        menu.destacarFundoDeTotais();
    };
});