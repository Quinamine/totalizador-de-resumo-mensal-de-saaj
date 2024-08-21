"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-totalgeral]");
        for (let i = 0; i < inputsCelulares.length; i++) { 
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        inputsNaoCelulares.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
         // Total parcial
        let classNameDosOperandos = inputTarget.dataset.totalparcial;
        inputTarget.classList.add(`${classNameDosOperandos}`);
        let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalparcialoutput}`);
        celulaDeSaida.value = this.somar(operandos);
        // Total Geral 
        classNameDosOperandos = inputTarget.dataset.totalgeral;
        inputTarget.classList.add(`${classNameDosOperandos}`);
        operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
        celulaDeSaida.value = this.somar(operandos);
        if(inputTarget.dataset.totalparcialnaoaplicaveloutput) {
            const totalParcialNPouput = document.querySelector(`.${inputTarget.dataset.totalparcialnaoaplicaveloutput}`); 
            totalParcialNPouput.value = 0;
        }
    },
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    }
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-totalgeral]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => totalizador.filtrarEtotalizarCelulas(inputCelular));
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




