
const menu = {
    destacarFundoDeTotais() {
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
            const alerta = document.querySelector("div.caixa-de-alerta.query-out-of-range");
            alerta.classList.add("on");
            this.desfocarFundo();
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
    },

    // ESVAZIAMENTO
    esvaziamento() {
        const confirmacao = document.querySelector("div.caixa-de-confirmacao");
        const celulas = document.querySelectorAll("div.input-container input");
        return {
            mostrarCaixaDeConfirmacao: () => {
                let celulasPreenchidas = 0;
                for (const cel of celulas) {
                    cel.value != "" && celulasPreenchidas++;
                }

                if(celulasPreenchidas > 0) {
                    confirmacao.classList.add("on");
                    this.desfocarFundo();
                }
                else {
                    const alerta = document.querySelector("div.caixa-de-alerta.ficha-vazia");
                    alerta.classList.add("on");
                    this.desfocarFundo();
                }
            },

            omitirCaixaDeConfirmacao: () => {
                confirmacao.classList.remove("on");
                this.focarFundo();
            },

            limparDados: () => {   
                const limpadoresDeDadosAdicionais = document.querySelectorAll("ul.limpadores-de-dados-adicionais input");

                for (let i = 0; i < celulas.length; i++) {
                    celulas[i].value = "";
                    localStorage.removeItem(`trmsaaj-cel${i}`);
                    celulas[i].classList.remove("bg-red");
                };

                limpadoresDeDadosAdicionais.forEach ( limpador => {
                    if(limpador.checked) {
                        const IdDoDadoAdicional = limpador.dataset.for; 
                        const dadoAdicional = document.querySelector(`#${IdDoDadoAdicional}`);
                        dadoAdicional.value = "";
                        localStorage.removeItem(`trmsaaj-${IdDoDadoAdicional}`);
                    }
                }); 
                this.focarFundo();  
            }
        }
    },

    // DESFOQUE DO FUNDO 
    desfocarFundo() {
        divDesfocante.classList.add("on");
    },

    focarFundo() {
        const janelasDesfocantes = document.querySelectorAll("div.caixa-de-confirmacao, div.caixa-de-alerta, div.hamburguer");  
        let janelasAbertas = 0;

        for (const janela of janelasDesfocantes) {
            if(janela.classList.contains("on")) janelasAbertas++;
        }
        if(janelasAbertas > 0) return false;
        divDesfocante.classList.remove("on");
    }
}

// Variáveis globais
let readonlyCelsDarker, readonlyCels,
srcContainer, srcInput, rowNumbers,
divDesfocante;
window.addEventListener("load", () => {
    readonlyCelsDarker = document.querySelector("#readonlyinputs-darker");
    readonlyCels = document.querySelectorAll("input[readonly]");
    srcContainer = document.querySelector("div.caixa-de-pesquisa");
    srcInput = document.querySelector("div.caixa-de-pesquisa input.pesquisar-linha");
    rowNumbers = document.querySelectorAll("div.coluna-de-numeros-das-linhas span")
    const IrParaBtn = document.querySelector("button.ir-para");
    const fecharIrParaBtn = document.querySelector("div.caixa-de-pesquisa button.fechar");
    divDesfocante = document.querySelector("div.desfoque");

    // INVOCAÇÃO DAS FUNÇÕES 
    readonlyCelsDarker.addEventListener("change", () => menu.destacarFundoDeTotais());
    IrParaBtn.addEventListener("click", () => menu.mostrarCaixaDePesquisa());
    fecharIrParaBtn.addEventListener("click", () => menu.omitirCaixaDePesquisa());
    srcInput.addEventListener("keyup", () => menu.pesquisarLinha(srcInput.value));

    // FECHAR CAIXA DE ALERTA
    const botoesFecharAlerta = document.querySelectorAll("div.caixa-de-alerta button");
    for (const btn of botoesFecharAlerta) {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.remove("on");
            menu.focarFundo();
        })
    }

    // PROTEGER ACESSO À READONLY CELS
    readonlyCels.forEach ( cel => {
        cel.addEventListener("click", () => {
            const alerta = document.querySelector("div.caixa-de-alerta.restricao-de-acesso-celular");
            alerta.classList.add("on");
            menu.desfocarFundo();
        })
    })

    // ESVAZIAR FICHA 
    const botaoEsvaziar = document.querySelector(".esvaziar-ficha");
    botaoEsvaziar.addEventListener("click", () => menu.esvaziamento().mostrarCaixaDeConfirmacao());

    const botaoCancelar = document.querySelector(".cancelar");
    botaoCancelar.addEventListener("click", () =>  menu.esvaziamento().omitirCaixaDeConfirmacao());

    const botaoConfirmar = document.querySelector(".confirmar");
    botaoConfirmar.addEventListener("click", () => {
        menu.esvaziamento().limparDados();
        menu.esvaziamento().omitirCaixaDeConfirmacao();
    });

    
    
 
})


