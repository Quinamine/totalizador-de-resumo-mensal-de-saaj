
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

    salvarDestaqueDeTotais: () => {
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

// VARIÁVEIS GLOBAIS
let inputCels, readonlyCelsDarker;

window.addEventListener("load", () => {
    inputCels = document.querySelectorAll("div.input-container input");
    readonlyCelsDarker = document.querySelector("#readonlyinputs-darker");

    // INVOCAÇÃO DAS FUNÇÕES
    storage.salvarFicha();
    storage.salvarDadosAdicionais();
    storage.salvarDestaqueDeTotais();
    readonlyCelsDarker.addEventListener("change", () => storage.salvarDestaqueDeTotais());

    // TOTALIZAÇÃO
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
})