
window.addEventListener("load", () => {
    let conteudo = encodeURIComponent("Totalizador de Resumo Mensal de SAAJ - Auxilia na totalização do relatório de SAAJ de forma automática, bastando o Profissional inserir os dados. Disponível em: https://www.quinamine.github.io/totalizador-de-resumo-mensal-de-saaj/index.html");

    let linkPartilhar = document.querySelector("a.partilhar");
    linkPartilhar.href = `https://api.whatsapp.com/send?text=${conteudo}`;
})