
const menu = {
    destacarFundoDeTotais() {
        const  readonlyCels = document.querySelectorAll("input[readonly]");
        for (const cel of readonlyCels) {
            readonlyCelsDarker.checked ? 
                cel.classList.add("bg-gray") : 
                cel.classList.remove("bg-gray");

        }
    },

    // IR PARA
    mostrarCaixaDePesquisa() {
        srcContainer.classList.add("on");
        srcInput.focus();
        srcInput.select();
    },

    omitirCaixaDePesquisa() {
        srcContainer.classList.remove("on");
        srcInput.value = "";
        this.resetarFundoDoNumeroDaLinha();
    },

    pesquisarLinha(numLinha) {

        if(numLinha === "") {
            this.resetarFundoDoNumeroDaLinha();
            return false;
        }
        else if((numLinha < 0) || (numLinha > 63)) {
            window.alert("O número a pesquisar deve ser maior que 0 e menor que 64, pois a ficha só tem 63 linhas a partir de 1.");
            this.resetarFundoDoNumeroDaLinha();
        }

        else {
            let rowIndex = numLinha - 1;
            
            if ((rowNumbers[rowIndex].getBoundingClientRect().bottom < 0) || rowNumbers[rowIndex].getBoundingClientRect().top > window.innerHeight) {
                if(rowIndex < 3) {
                    const body = document.querySelector("div.linha-do-cabecalho");
                    body.scrollIntoView();
                }
                else {
                    rowNumbers[rowIndex-3].scrollIntoView();
                }
            }
            this.resetarFundoDoNumeroDaLinha();
            rowNumbers[rowIndex].classList.add("fundo-laranja");
        }

       
    },

    resetarFundoDoNumeroDaLinha() {
        for (const row of rowNumbers) {
            row.classList.remove("fundo-laranja");
        }
    }
}


// Variáveis globais
let readonlyCelsDarker,
srcContainer, srcInput, rowNumbers;
window.addEventListener("load", () => {
    readonlyCelsDarker = document.querySelector("#readonlyinputs-darker");
    srcContainer = document.querySelector("div.caixa-de-pesquisa");
    srcInput = document.querySelector("div.caixa-de-pesquisa input.pesquisar-linha");
    rowNumbers = document.querySelectorAll("div.coluna-de-numeros-das-linhas span")
    const IrParaBtn = document.querySelector("button.ir-para");
    const fecharIrParaBtn = document.querySelector("div.caixa-de-pesquisa button.fechar");

    // INVOCAÇÃO DAS FUNÇÕES 
    readonlyCelsDarker.addEventListener("change", () => menu.destacarFundoDeTotais());
    IrParaBtn.addEventListener("click", () => menu.mostrarCaixaDePesquisa());
    fecharIrParaBtn.addEventListener("click", () => menu.omitirCaixaDePesquisa());
    srcInput.addEventListener("keyup", () => menu.pesquisarLinha(srcInput.value));

 
})


