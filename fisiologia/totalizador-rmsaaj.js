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
        const dadosAdicionais = document.querySelectorAll("div.container input[type=text], input[type=date], textarea#nota");

        dadosAdicionais.forEach ( dado => {
            dado.addEventListener("input", () => localStorage.setItem(`trmsaaj-${dado.id}`, `${dado.value}`));
            dado.value = localStorage.getItem(`trmsaaj-${dado.id}`);

            if(dado.matches("#nota")) {
                dado.addEventListener("focusout", () => {
                    dado.value !== "" ? 
                    dado.classList.add("bold") : 
                    dado.classList.remove("bold");
                });

                // NO LOAD DO WINDOWS 
                dado.value !== "" ? 
                dado.classList.add("bold") : 
                dado.classList.remove("bold");
            }
        });
    },

    salvarDestaqueDeTotais() {
        readonlyCelsDarker.checked ?
            localStorage.setItem("trmsaaj-destaque", "on") : 
            localStorage.removeItem("trmsaaj-destaque");
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

            if(cel.dataset.totalparcialnaoaplicaveloutput) {
                let totalParcialNaoAplicavelOutput = document.querySelector(`.${cel.dataset.totalparcialnaoaplicaveloutput}`);
                totalParcialNaoAplicavelOutput.value = 0;
            }
        });

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

            if(cel.dataset.totalparcialnaoaplicaveloutput) {
                let totalParcialNaoAplicavelOutput = document.querySelector(`.${cel.dataset.totalparcialnaoaplicaveloutput}`)
                totalParcialNaoAplicavelOutput.value = 0;
            }
        }
    });
}

window.addEventListener("load", () => {
    // INVOCAÇÃO DAS FUNÇÕES
    storage.salvarFicha();
    storage.salvarDadosAdicionais();
    escutarEventos();

    // DESTAQUE DE CÉLULAS NO LOAD DO WINDOWS
    if(localStorage.getItem("trmsaaj-destaque")) {
        readonlyCelsDarker.setAttribute("checked", "");
        menu.destacarFundoDeTotais();
    };
});