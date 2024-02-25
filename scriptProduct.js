//verifica dati in url
//estrazione dei dato
//fetch all'endpoint
//scaricamento dati da localStore per il carrello ed implementazione
//creazione della lista carrello

//Endpoint
const prodAPI='https://striveschool-api.herokuapp.com/api/product/';
const idAPI='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2Q4MTljNDM3MDAwMTkzYzM1ODYiLCJpYXQiOjE3MDg0MjQ1NzcsImV4cCI6MTcwOTYzNDE3N30.3Ovtee8nLZHz2iFK_tBJopbaUK50bGYvyEk90P_oMak';
//carrello
const badgeCart=document.getElementById('cartInObj');
const bodyCart=document.getElementById('cartTabBody');
const priceCart=document.getElementById('cartPrice');

//loading spin
const loadSpin=document.getElementById('loadSpin');
//Row prodotti
const productRow=document.getElementById('mainRow');

let objTemp;

//Caricamento dati iniziale
window.onload= ()=>{
    //verifica pagina caricata
    loadSpin.classList.toggle('d-none');
    //mostro il loading
    // passare parametro id
    let activeParam=new URLSearchParams(window.location.search);
    let pid=activeParam.get('pid');
    getSingleProd(pid);
    //verifica dei parametri in storage carrello
    let cartRecord=localStorage.getItem('oggetto');
    bodyCart.innerHTML=cartRecord;
    reloadCart();
}
//traccio elementi pagina
let imgBox=document.getElementById("imgBox");
let nameBox=document.getElementById("nameBox");
let brandBox=document.getElementById("brandBox");
let priceBox=document.getElementById("priceBox");
let descBox=document.getElementById("descBox");

async function getSingleProd(pid){
 try {
    let response= await fetch(prodAPI+pid,{headers:{"Authorization":idAPI}});
    let json = await response.json();
     //nascondere loading
    loadSpin.classList.toggle('d-none');
    loadRecord(json);
    //salvo informazioni oggetto
    objTemp=json;
 } catch (error) {
   console.log('Error: ',error) ;
 }
}
function loadRecord({name,brand,price,description,imageUrl}){
    imgBox.innerHTML=`<img src=${imageUrl} alt='Immagine prodotto' class='imgSingleProd'/>`;
    nameBox.innerText=name;
    brandBox.innerText=brand;
    priceBox.innerText=price;
    descBox.innerText=description;
    // bottone per carrello
    document.getElementById('cartBtn').addEventListener('click',()=>{
        objInCart(objTemp);
    })
}
function objInCart({imageUrl,name,price}){
    let rowCart=document.createElement('tr');
    let imgCart=document.createElement('td');
    imgCart.innerHTML=`<img src=${imageUrl} class="imgCart" alt="product image" />`;
    let nameCart=document.createElement('td');
    nameCart.innerText=name;
    let priceCart=document.createElement('td');
    priceCart.innerText=price;
    let btnRemoveCart=document.createElement('td');
    rowCart.appendChild(imgCart);
    rowCart.appendChild(nameCart);
    rowCart.appendChild(priceCart);
    rowCart.appendChild(btnRemoveCart);
    btnRemoveCart.innerHTML=`<button type="button" class="btn btn-danger">X</button>`;
    btnRemoveCart.addEventListener('click',(event)=>{
        event.target.offsetParent.parentNode.remove();
        reloadCart();
    })
    bodyCart.appendChild(rowCart);
    
    //up sul badge del carrello
    //somma carrello
    reloadCart();
}
function reloadCart(){
    //traccio tutti i prezzi
    let listPrice=document.querySelectorAll('tbody#cartTabBody tr td:nth-child(3)');
    if([...listPrice]==0){
        priceCart.innerText='$ 00,00';
        badgeCart.innerText='';
    }else{
    let totalPrice=[...listPrice].map(td=>+td.innerHTML);
    let totalCart=totalPrice.reduce((accumulator, currentValue) =>accumulator+currentValue);
    priceCart.innerText=`$ ${totalCart}`;
    //utilizzo la variabile precendente per contare quanti sono i prodotti nel carrello
    badgeCart.innerText=totalPrice.length;
    }
    localStorage.setItem("oggetto",bodyCart.innerHTML);
}
document.getElementById('btnCartDelet').addEventListener('click',()=>{
    bodyCart.innerHTML='';
    reloadCart();
})
