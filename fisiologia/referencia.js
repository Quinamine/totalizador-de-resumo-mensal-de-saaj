"use strict";const referencia={retornarNumDeLinha(e){let t=e.parentElement.children,r;for(let n=0;n<t.length;n++)t[n]===e&&(r=n);let o=document.querySelector("output.ref-de-linha");o.textContent=r+1},retornarSexoEIdade(e){let t=e.parentElement,r=t.parentElement,n=r.querySelectorAll("div.inputs-container"),o;for(let a=0;a<n.length;a++)n[a]===t&&(o=a);let l=["M","F"],i=document.querySelector("output.ref-de-sexo"),c=document.querySelector("output.ref-de-faixa-etaria");o<5?i.textContent=l[0]:i.textContent=l[1],c.innerHTML=["&le;10 A.","10-14 A.","15-19 A.","20-24 A.","&ge;25 A.","&le;10 A.","10-14 A.","15-19 A.","20-24 A.","&ge;25 A."][o]},resetarReferencia(){let e=document.querySelectorAll("div.coluna-de-referencia output");for(let t of e)t.textContent=""}};window.addEventListener("load",()=>{inputCels.forEach(e=>{e.matches("[readonly]")||(e.addEventListener("focusin",()=>{referencia.retornarNumDeLinha(e),referencia.retornarSexoEIdade(e)}),e.addEventListener("focusout",()=>{referencia.resetarReferencia()}))})}),window.addEventListener("scroll",()=>{let e=document.querySelector("div.linha-de-referencia"),t=document.querySelector(".bounding-reference");t.getBoundingClientRect().bottom<0?e.classList.add("off"):e.classList.remove("off")});