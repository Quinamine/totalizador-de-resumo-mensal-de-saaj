"use strict"

const backup = {
    saveGridInputs() {
        const gridInputs = document.querySelectorAll("[data-totalgeral]");

        for (let i = 0; i < gridInputs.length; i++) {
            
            gridInputs[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, gridInputs[i].value);
            });
            gridInputs[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const extraInputs = document.querySelectorAll(".input-nao-celular");
        extraInputs.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        inputTarget.classList.add(`${inputTarget.dataset.totalparcial}`);
        inputTarget.classList.add(`${inputTarget.dataset.totalgeral}`);
    
        // Total parcial
        const totalParcial = document.querySelectorAll(`.${inputTarget.dataset.totalparcial}`);
        const totalParcialOutput = document.querySelector(`.${inputTarget.dataset.totalparcialoutput}`);
        totalParcialOutput.value = this.somar(totalParcial);
    
        // Total Geral 
        const totalGeral = document.querySelectorAll(`.${inputTarget.dataset.totalgeral}`);
        const totalGeralOutput = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
        totalGeralOutput.value = this.somar(totalGeral);

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
    const gridInputs = document.querySelectorAll("[data-totalgeral]");
    gridInputs.forEach( gi => {
        gi.addEventListener("input", () => totalizador.filtrarEtotalizarCelulas(gi));
        gi.value !== "" && totalizador.filtrarEtotalizarCelulas(gi);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




