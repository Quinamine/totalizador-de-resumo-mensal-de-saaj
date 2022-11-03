
"use strict";

const referencia = {
    retornarNumDeLinha(celulaFocada) {
        let celulaFocada_e_celulasIrmas = celulaFocada.parentElement.children;
        let celulaFocadaIndex;
        for (let i = 0; i < celulaFocada_e_celulasIrmas.length; i++) {
            if(celulaFocada_e_celulasIrmas[i] === celulaFocada) {
                celulaFocadaIndex = i;
            }
        }
        const numLinhaOutput = document.querySelector("output.ref-de-linha");
        numLinhaOutput.textContent = celulaFocadaIndex+1;
    },

    retornarSexoEIdade(celulaFocada) {
        const celulaFocadaParent = celulaFocada.parentElement;
        const celulaFocadaGrandParent = celulaFocadaParent.parentElement;
        const celulaFocadaParent_n_siblings = celulaFocadaGrandParent.querySelectorAll("div.inputs-container");

        let celulaFocadaParentIndex;
        for (let i = 0; i < celulaFocadaParent_n_siblings.length; i++) {
            if(celulaFocadaParent_n_siblings[i] === celulaFocadaParent) {
                celulaFocadaParentIndex = i; 
            }
        }
        
        const sexos = ["M", "F"];
        const faixasEtarias = ["&le;10 A.", "10-14 A.", "15-19 A.", "20-24 A.", "&ge;25 A.", "&le;10 A.", "10-14 A.", "15-19 A.", "20-24 A.", "&ge;25 A."];

        const sexoOutput = document.querySelector("output.ref-de-sexo");
        const faixaEtariaOutput = document.querySelector("output.ref-de-faixa-etaria");

        if(celulaFocadaParentIndex < 5) {
            sexoOutput.textContent = sexos[0];
        } else {
            sexoOutput.textContent = sexos[1];
        }
        faixaEtariaOutput.innerHTML = faixasEtarias[celulaFocadaParentIndex];
    }, 

    resetarReferencia() {
        const referencias = document.querySelectorAll("div.coluna-de-referencia output");
        for (const ref of referencias) {
            ref.textContent = "";
        }
    }
}

window.addEventListener("load", () => {
    // INVOCAÇÃO DAS FUNÇÕES 
    inputCels.forEach ( cel => {
        if(!cel.matches("[readonly]")) {
            cel.addEventListener("focusin", () => {
                referencia.retornarNumDeLinha(cel);
                referencia.retornarSexoEIdade(cel);
            });

            cel.addEventListener("focusout", () => {
                referencia.resetarReferencia();
            });
        }
    });
});


// MOSTRAR OU OMITIR LINHA DE REFERENCIA
window.addEventListener("scroll", () => {
    const referencia = document.querySelector("div.linha-de-referencia");
    const boundingReference = document.querySelector(".bounding-reference");
    let PosicaoDaFicha = boundingReference.getBoundingClientRect().bottom;

    PosicaoDaFicha < 0 ?
        referencia.classList.add("off") : 
        referencia.classList.remove("off");
});