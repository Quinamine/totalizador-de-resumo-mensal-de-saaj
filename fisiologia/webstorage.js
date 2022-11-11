const sessaoWeb = {
    verDisponibilidade: () => sessionStorage.getItem("user-consente-o-armazenamentoLocal") ? "defined" : "undefined",

    mostrarAviso: () => aviso.classList.add("on"),

    omitirAviso: () => aviso.classList.remove("on"),

    guardarConsentimento: () => sessionStorage.setItem("user-consente-o-armazenamentoLocal", true)
}

let aviso;
window.addEventListener("load", () => {

    aviso = document.querySelector("div.aviso-de-uso-de-cookies");
    const btnAceitar = document.querySelector("button.aceitar-cookies");

    if(sessaoWeb.verDisponibilidade() === "undefined") {
        setTimeout(sessaoWeb.mostrarAviso, 2000);

        btnAceitar.addEventListener("click", () => {
            sessaoWeb.guardarConsentimento();
            sessaoWeb.omitirAviso();
        })
    }
})