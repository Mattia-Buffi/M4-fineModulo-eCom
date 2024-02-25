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

//Caricamento dati iniziale
window.onload= ()=>{
    //verifica pagina caricata
    loadSpin.classList.toggle('d-none');
    //mostro il loading
    getProduct();
   
    //verifica dei parametri in storage carrello
    aggiornaCarrello();
}

//richiesta dati fetch
async function getProduct(){
    try{
        let response= await fetch(prodAPI,{headers:{"Authorization":idAPI}});
        let json = await response.json();
        //nascondere loading
        loadSpin.classList.toggle('d-none'); 
        if(json.length!==0){ 
            if(json.length>20){
                //limito il caricamneto
                //creo un btn show more alla fine
            }else{
                json.forEach( prod=> {createCard(prod)});
                createFilter(json);
            }
        }else{
            alert('Ancora nessun articolo nel negozio')}
    }catch(error){
        console.log('Error fetch: ',error);
        loadSpin.classList.toggle('d-none');
    }
}
//funzione per generare la card destrutturata
function createCard({_id,name,imageUrl,price}){
    //creazione di tutto il template con link pagina prodotto passando _id
    let linkProd=document.createElement('a');
    linkProd.target="_blank";
    linkProd.href=`singleProduct.html?pid=${_id}`;
    linkProd.classList.add('col-6','col-md-3');
    let cardProd=document.createElement('div');
    cardProd.classList.add('card','bg-drak','text-white');
    let imgProd=document.createElement('img');
    imgProd.classList.add('card-img','w-100');
    imgProd.alt='Image not found';
    imgProd.src=imageUrl;
    let infoProd=document.createElement('div');
    infoProd.classList.add('card-img-overlay','d-flex','flex-column','justify-content-end','align-items-center');
    let nameProd=document.createElement('h5');
    nameProd.classList.add('card-title');
    nameProd.innerText=name;
    let descProd=document.createElement('p');
    descProd.classList.add('card-text');
    descProd.innerText=price;
    // let btnAddCart=document.createElement('button');
    // btnAddCart.classList.add('btn','btn-primary','rounded-circle','text-center');
    // btnAddCart.innerHTML=`<i class="fas fa-cart-plus"></i>`;
    infoProd.appendChild(nameProd);
    infoProd.appendChild(descProd);
    // infoProd.appendChild(btnAddCart);
    cardProd.appendChild(imgProd);
    cardProd.appendChild(infoProd);
    linkProd.appendChild(cardProd);
    productRow.appendChild(linkProd);
}
//funzione ricerca brand per menu select di brand
function createFilter(objs){
    let brandList=[];
    objs.forEach((obj)=>{
        //lista brand senza riperizioni ATT controllo toLowerCase da fare
        if(!brandList.includes(obj.brand))
        brandList.push(obj.brand)});
    //mappo creando le voci del menu
    let menuBrand=brandList.map(brandS=>`<option value="${brandS}">${brandS}</option>`)
    document.getElementById("inputGroupSelect03").innerHTML=menuBrand.join('');
}

// CARRELLO

function aggiornaCarrello(){
    let cartRecord=localStorage.getItem('oggetto');
    bodyCart.innerHTML=cartRecord;
    reloadCart(); 
    let deleteBtn=document.querySelectorAll('button.btn-danger');
    for (const iterator of deleteBtn) {
        iterator.addEventListener('click',(event)=>{
            event.target.offsetParent.parentNode.remove();
            reloadCart();
    })}
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

//manca il tasto di cancellazione nel carrello
