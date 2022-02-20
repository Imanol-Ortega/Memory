"use strict"
let lvl =4,countimg=0,ig=[],ign = [],timg = [],activar=false;
let imgr = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
const contains = (n, arr) => arr.includes(n);
const generator = (from, to, arr) => {
    const n = Math.floor(Math.random() * to) + from;
    return contains(n, arr)
           ? generator(from, to, arr)
           : n;
}
const crearCajas = (img)=>{
        let div = document.createElement("DIV");
        let div2 = document.createElement("DIV");
        div.classList.add("img");
        div2.classList.add("div2");
        div.appendChild(img);
        div.appendChild(div2);
        document.querySelector(".cajas-mem").appendChild(div);
}
const nivel = (nvl) =>{
    let imr = [], imr2 = [],rm,cn=0;
    let vnvl=nvl/2;
    for(let i=0;i<vnvl;i++){
        const n = generator(0,18,imr);       
        imr.push(n);
    }
    for(let i=0;i<vnvl;i++){
        const n = generator(0,imr.length,imr2);        
        imr2.push(n);
    }
    for(let i=0; i<nvl;i++){
        if(i%2!=0){
            rm =imgr[imr[cn]];
            cn++;
        }
        else{
            rm = imgr[imr[imr2[(i/2)]]];
        }
        let img = document.createElement("IMG");
        img.classList.add("imagen"); 
        img.setAttribute("src",`img/${rm}.png`);
        timg[i]=true;
        crearCajas(img);
    }
}
nivel(lvl);
document.querySelector(".l1").addEventListener("mousedown",()=>{
    lvl=4;
    reinicio();
    withHeight(206,206);
});
document.querySelector(".l2").addEventListener("mousedown",()=>{
    lvl=9;
    reinicio();
    withHeight(320,320);
});
document.querySelector(".l3").addEventListener("mousedown",()=>{
    lvl=16;
    reinicio();
    withHeight(450,450);
});
document.querySelector(".l4").addEventListener("mousedown",()=>{
    lvl=25;
    reinicio();
    withHeight(550,550);
});
document.querySelector(".l5").addEventListener("mousedown",()=>{
    lvl=36;
    reinicio();
    withHeight(650,650);
});
const withHeight = (w,h) =>{
    document.querySelector(".cajas-mem").style.width = `${w}px`;
    document.querySelector(".cajas-mem").style.height = `${h}px`;
}
document.querySelector(".cajas-mem").addEventListener("mouseover",()=>{
    const caj = document.querySelectorAll(".img");
    const im = document.querySelectorAll(".imagen");
    for(let i =0; i<lvl; i++){
        caj[i].addEventListener("mousedown",()=>{
            if(countimg<2){
                if(timg[i]==true){
                    activar=false;
                    caj[i].style = "-webkit-transform: rotateY(180deg);",
                                    "transform: rotateY(180deg);";
                    activarSonido("audio/volteo1.mp3");
                    im[i].style.visibility="visible";  
                    ign[countimg]=im[i].getAttribute("src");
                    ig[countimg]=i;
                    countimg++;
                    timg[i]=false;
                }
            }else{
                setTimeout(mostrarOcultar,900);
            }
        });
    }
});
document.querySelector(".reiniciar").addEventListener("click",()=>{
    reinicio();
});
const reinicio = () =>{
    countimg=0;
    let caja = document.querySelectorAll(".img");
    for( let i=0; i<caja.length;i++){
        caja[i].remove();
    }
    nivel(lvl);
    desactivarSonido();
}
const mostrarOcultar = () => {
    const cajar = document.querySelectorAll(".img");
    const imn = document.querySelectorAll(".imagen");
    if(ign[0]===ign[1]){
        imn[ig[0]].style.visibility = "visible";
        imn[ig[1]].style.visibility = "visible";
        desactivarSonido();
    }
    else{
        cajar[ig[0]].style = "-webkit-transform: rotateY(360deg);",
                             "transform: rotateY(360deg);";
        cajar[ig[1]].style = "-webkit-transform: rotateY(360deg);",
                             "transform: rotateY(360deg);";
        if(activar==false){
            activarSonido("audio/volteo2.mp3");
            activar=true;
        }
        imn[ig[0]].style.visibility = "hidden";
        imn[ig[1]].style.visibility = "hidden";
        timg[ig[0]]=true;
        timg[ig[1]]=true;
    }
    countimg=0;
}
const activarSonido = (audio)=>{
    let sonido = document.createElement("iframe");
    sonido.classList.add("iframe");
    sonido.setAttribute("src",audio);
    document.querySelector(".contenedor").appendChild(sonido);
}
const desactivarSonido = ()=>{
    const son = document.querySelectorAll("iframe");
    for(let i=0;i<son.length;i++){
        son[i].remove();
    }
}