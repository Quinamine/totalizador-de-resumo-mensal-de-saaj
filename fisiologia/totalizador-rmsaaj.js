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
                let denegrirNota = () => dado.value !== "" ? dado.classList.add("bold") : dado.classList.remove("bold");
                dado.addEventListener("input", () => denegrirNota());
                denegrirNota(); // NO LOAD DO WINDOWS 
            }
        });
    },

    salvarDestaqueDeTotais() {
        readonlyCelsDarker.addEventListener("change", () => {
            readonlyCelsDarker.checked ?
            localStorage.setItem("trmsaaj-destaque", "on") : 
            localStorage.removeItem("trmsaaj-destaque");
        });

        // NO LOAD DO WINDOWS
        if(localStorage.getItem("trmsaaj-destaque")) {
            readonlyCelsDarker.setAttribute("checked", "");
            menu.destacarFundoDeTotais();
        }; 
    }
}

const totalizacao = {
    filtrarCelulas(cel) {
        if((cel.dataset.totalparcial) && (cel.dataset.totalgeral)) {
            cel.classList.add(`${cel.dataset.totalparcial}`);
            cel.classList.add(`${cel.dataset.totalgeral}`);
            
            let totalParcial = document.querySelectorAll(`.${cel.dataset.totalparcial}`),
            totalParcialOutput = document.querySelector(`.${cel.dataset.totalparcialoutput}`),
            totalGeral = document.querySelectorAll(`.${cel.dataset.totalgeral}`),
            totalGeralOutput = document.querySelector(`.${cel.dataset.totalgeraloutput}`);

            this.totalizarCelulas(totalParcial, totalParcialOutput);
            this.totalizarCelulas(totalGeral, totalGeralOutput);
        }

        if(cel.dataset.totalparcialnaoaplicaveloutput) {
            let totalParcialNaoAplicavelOutput = document.querySelector(`.${cel.dataset.totalparcialnaoaplicaveloutput}`);
            totalParcialNaoAplicavelOutput.value = 0;
        }
    },

    totalizarCelulas(celulasPorTotalizar, celulaDeSaida) {
        let total = 0;
        for (const cel of celulasPorTotalizar) {
            total+=Number(cel.value);
        }
        celulaDeSaida.value = total;
    }
}

function escutarEventos() {
    // TOTALIZACAO
    inputCels.forEach( cel => {
        cel.addEventListener("input", () => totalizacao.filtrarCelulas(cel)); // T
        cel.value != "" && totalizacao.filtrarCelulas(cel); // No Load do Windows
    });
}

window.addEventListener("load", () => {
    if(typeof(Storage) !== "undefined") {
        storage.salvarFicha();
        storage.salvarDadosAdicionais();
        storage.salvarDestaqueDeTotais();
    }
    escutarEventos();
});