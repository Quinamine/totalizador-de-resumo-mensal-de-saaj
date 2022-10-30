"use strict";

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
        else if((numLinha < 1) || (numLinha > 63)) {
            const alerta = document.querySelector("div.caixa-de-alerta.query-out-of-range");
            alerta.querySelector("b.entered-num").textContent = numLinha;
            alerta.classList.add("on");
            srcInput.setAttribute("readonly", "");
            desfoqueDoFundo.on()
            this.resetarFundoDoNumeroDaLinha();
        }

        else {
            let rowIndex = numLinha - 1;
            
            if ((rowNumbers[rowIndex].getBoundingClientRect().bottom < 0) || rowNumbers[rowIndex].getBoundingClientRect().top > window.innerHeight) {
                if(rowIndex < 3) {
                    const body = document.querySelector("body");
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
                    desfoqueDoFundo.on()
                }
                else {
                    const alerta = document.querySelector("div.caixa-de-alerta.ficha-vazia");
                    alerta.classList.add("on");
                    desfoqueDoFundo.on()
                }
            },

            omitirCaixaDeConfirmacao: () => {
                confirmacao.classList.remove("on");
                desfoqueDoFundo.off()
            },

            limparDados: () => {   

                for (let i = 0; i < celulas.length; i++) {
                    celulas[i].value = "";
                    localStorage.removeItem(`trmsaaj-cel${i}`);
                    celulas[i].classList.remove("fundo-vermelho");
                };

                const limpadoresDeDadosAdicionais = document.querySelectorAll("ul.limpadores-de-dados-adicionais input");
                
                limpadoresDeDadosAdicionais.forEach ( limpador => {
                    if(limpador.checked) {
                        const IdDoDadoAdicional = limpador.dataset.for; 
                        const dadoAdicional = document.querySelector(`#${IdDoDadoAdicional}`);
                        dadoAdicional.value = "";
                        localStorage.removeItem(`trmsaaj-${IdDoDadoAdicional}`);
                    }
                }); 
                desfoqueDoFundo.off()  
            }
        }
    },

    // IMPRIMIR 
    imprimirFicha() {
        textArea.value === "" ?
            textArea.parentElement.classList.add("no-print") :
            textArea.parentElement.classList.remove("no-print");

        window.print();
    },

    abrirArtigoSobre() {
        document.querySelector("section#sobre").classList.add("on");
        desfoqueDoFundo.on();
    },

    abrirArtigoCookies() {
        document.querySelector("section#cookies").classList.add("on");
        desfoqueDoFundo.on();
        if(window.innerWidth < 1024) {
            document.querySelector("body").classList.add("overflow-hidden");
        }
    }
}

const desfoqueDoFundo = {
    on() {
        divDesfocante.classList.add("on");
    },

    off() {
        const janelasDesfocantes = document.querySelectorAll("div.caixa-de-confirmacao, div.caixa-de-alerta, div.hamburguer");  
        let janelasAbertas = 0;

        for (const janela of janelasDesfocantes) {
            if(janela.classList.contains("on")) janelasAbertas++;
        }
        if(janelasAbertas > 0) return false;
        divDesfocante.classList.remove("on");
    }
}

// DECLARAÇÃO E INICIALIZAÇÃO DAS VARIÁVEIS
let readonlyCelsDarker, readonlyCels,
srcContainer, srcInput, rowNumbers, 
textArea,
divDesfocante;
function init() {
    readonlyCelsDarker = document.querySelector("#readonlyinputs-darker");
    readonlyCels = document.querySelectorAll("input[readonly]");
    srcContainer = document.querySelector("div.caixa-de-pesquisa");
    srcInput = document.querySelector("div.caixa-de-pesquisa input.pesquisar-linha");
    rowNumbers = document.querySelectorAll("div.coluna-de-numeros-das-linhas span")
    textArea = document.querySelector("textarea#campo-de-nota");
    divDesfocante = document.querySelector("div.desfoque");
}

// EVENTOS
function eventListeners() {
    // DESTACAR O FUNDO DOS TOTAIS
    readonlyCelsDarker.addEventListener("change", () => menu.destacarFundoDeTotais());

    // IR PARA LINHA...
    const BtnIrPara = document.querySelector("button.ir-para");
    const BtnFecharCaixaDePesquisa = document.querySelector("div.caixa-de-pesquisa button.fechar");
    BtnIrPara.addEventListener("click", () => menu.mostrarCaixaDePesquisa());
    BtnFecharCaixaDePesquisa.addEventListener("click", () => menu.omitirCaixaDePesquisa());
    srcInput.addEventListener("keyup", () => menu.pesquisarLinha(srcInput.value));

    // FECHAR CAIXA DE ALERTA
    const btnsFecharAlerta = document.querySelectorAll("div.caixa-de-alerta button");
    for (const btn of btnsFecharAlerta) {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.remove("on");
            srcInput.removeAttribute("readonly"); // Para alerta de 'IR PARA LINHA...'
            desfoqueDoFundo.off()
        })
    }

    // PROTEGER ACESSO À READONLY CELS
    readonlyCels.forEach ( cel => {
        cel.addEventListener("click", () => {
            if(cel.matches(".nao-aplicavel")) {
            const alerta = document.querySelector("div.caixa-de-alerta.indicador-nao-aplicavel");
            const sexoAQueNaoSeAplica = alerta.querySelector("span.sexo-output");

            alerta.classList.add("on");
            cel.parentElement.matches(".sexo-m") ?
                sexoAQueNaoSeAplica.textContent = "masculino" : 
                sexoAQueNaoSeAplica.textContent = "feminino";
            } else {
            document.querySelector("div.caixa-de-alerta.restricao-de-acesso-celular").classList.add("on");
            }           
            desfoqueDoFundo.on()
        })
    });

    // ESVAZIAR FICHA 
    const btnEsvaziar = document.querySelector("button.esvaziar-ficha");
    btnEsvaziar.addEventListener("click", () => menu.esvaziamento().mostrarCaixaDeConfirmacao());

    const btnCancelar = document.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", () =>  menu.esvaziamento().omitirCaixaDeConfirmacao());

    const btnConfirmar = document.querySelector("button.confirmar");
    btnConfirmar.addEventListener("click", () => {
        menu.esvaziamento().limparDados();
        menu.esvaziamento().omitirCaixaDeConfirmacao();
    });

    // IMPRIMIR 
    const btnImprimir = document.querySelector("button.imprimir-ficha");
    btnImprimir.addEventListener("click", () => menu.imprimirFicha());

    // ABRIR CONTEÚDO SOBRE
    const btnSobre = document.querySelector("button.abrir-artigo-sobre");
    btnSobre.addEventListener("click", () => menu.abrirArtigoSobre());

    // ABRIR CONTEÚDO SOBRE NO LOAD DO WINDOWS
    if(location.hash === "#sobre") {
    menu.abrirArtigoSobre();
    }

    // ABRIR CONTEÚDO DE COOKIES
    const btnSaibaMaisSobreCookies = document.querySelector("button.abrir-artigo-cookies");
    btnSaibaMaisSobreCookies.addEventListener("click", () => menu.abrirArtigoCookies());

    // FECHAR CONTEÚDO SOBRE E COOKIES
    const btnsFecharArtigo = document.querySelectorAll("button.fechar-artigo");
    btnsFecharArtigo.forEach ( btn => {
    btn.addEventListener("click", () => {
        btn.parentElement.classList.remove("on");
        desfoqueDoFundo.off();
        document.querySelector("body").classList.remove("overflow-hidden");
    })
    });

    // PARTILHAR
    let conteudo = {
        title: "Totalizador de Resumo Mensal de SAAJ",
        text: "Totaliza automaticamente o respectivo resumo com base nos dados preenchidos pelo usuário (Profissional de Saúde).",
        url: "https://www.quinamine.github.io/totalizador-de-resumo-mensal-de-saaj/index.html"
    }

    const btnPartilhar = document.querySelector("button.partilhar");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(conteudo)
            .then(() => {
                console.log("Endereço do totalizador partilhado com sucesso.");
            })
            .catch((erro) => {
                console.log(`Não foi possível partilhar devido ao erro: ${erro}.`);
            })
        } catch (erro) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.");
        }
    });
}

// FECHAR CAIXA DE ALERTA PELO ENTER
window.addEventListener("keyup", event => {
    let key = event.key;
    
    if(key.toLowerCase() === "enter") {
        const caixasDeAlerta = document.querySelectorAll("div.caixa-de-alerta");
        caixasDeAlerta.forEach ( caixa => caixa.classList.remove("on"));
        srcInput.removeAttribute("readonly"); // Para alerta de 'IR PARA LINHA...'
        desfoqueDoFundo.off()
    }
});

window.addEventListener("load", () => {
    init();
    eventListeners();
});


