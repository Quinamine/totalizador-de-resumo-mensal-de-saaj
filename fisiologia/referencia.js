"use strict"

const referencia = {
    retornarIndicador(inputTarget) {
        const inputTargetAndSiblings = inputTarget.parentElement.children;
        const indicadores = document.querySelectorAll(".ficha__indicador");
        const indicadorOutput = document.querySelector(".reference__output--indicador");
        let inputIndex;
        for (let i in inputTargetAndSiblings) {
            if(inputTarget === inputTargetAndSiblings[i]) inputIndex = i;
        }
        let indicador = indicadores[inputIndex].textContent;
        indicadorOutput.value = indicador;
        if(indicadores[inputIndex].dataset.prefixo) {
            let prefixo = indicadores[inputIndex].dataset.prefixo;
            indicadorOutput.value = `${prefixo}: ${indicador}`;
        }
    },
    retornarFaixaEtariaEsexo(inputTarget) {
        const faixaEtariaOutput = document.querySelector(".reference__output--idade");
        const sexoOutput = document.querySelector(".reference__output--sexo");
        let faixaEtaria = inputTarget.parentElement.dataset.faixaetaria;
        let sexo = inputTarget.parentElement.dataset.sexo;
        faixaEtariaOutput.value = faixaEtaria;
        sexoOutput.value = sexo;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll("[data-totalgeral]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            referencia.retornarIndicador(inputCelular);
            referencia.retornarFaixaEtariaEsexo(inputCelular);
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;