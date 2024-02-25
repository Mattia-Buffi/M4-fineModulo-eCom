//Endpoint
const prodAPI='https://striveschool-api.herokuapp.com/api/product/';
const idAPI='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2Q4MTljNDM3MDAwMTkzYzM1ODYiLCJpYXQiOjE3MDg0MjQ1NzcsImV4cCI6MTcwOTYzNDE3N30.3Ovtee8nLZHz2iFK_tBJopbaUK50bGYvyEk90P_oMak';

//loading spin
const loadSpin=document.getElementById('loadSpin');
//Row prodotti
const tableRow=document.getElementById('tableRow');

//Caricamento dati iniziale
window.onload= ()=>{
    //verifica pagina caricata
    getProduct();
}
//richiesta dati fetch per lista aggiornata
async function getProduct(){
    loadSpin.classList.toggle('d-none');
    tableRow.innerHTML='';
    try{
        let response= await fetch(prodAPI,{headers:{"Authorization":idAPI}});
        let json = await response.json();
        //nascondere loading
        loadSpin.classList.toggle('d-none'); 
        if(json.length!==0){ 
            json.forEach( prod=> {createRecord(prod)});  
        }else{
            alert('Ancora nessun articolo nel negozio')}
    }catch(error){
        console.log('Error fetch: ',error);
        loadSpin.classList.toggle('d-none');
    }
}
//creazione della riga in tabellla con pulsanti
function createRecord({_id,name,brand,description,imageUrl,price}){
    let trRecord=document.createElement('tr');
    let tdImg=document.createElement('td');
    let imgMini=document.createElement('img');
    imgMini.src=imageUrl;
    imgMini.classList.add('imgTable');
    let tdName=document.createElement('td');
    tdName.innerText=name;
    let tdBrand=document.createElement('td');
    tdBrand.innerText=brand;
    let tdDesc=document.createElement('td');
    tdDesc.innerText=description;
    let tdPrice=document.createElement('td');
    tdPrice.innerText=price;
    let tdEdit=document.createElement('td');
    let editBtn=document.createElement('button');
    editBtn.type='button';
    editBtn.classList.add('btn','btn-primary');
    editBtn.innerHTML=`<i class="fas fa-edit"></i>`;
    editBtn.addEventListener('click',()=>loadModal(name,brand,description,imageUrl,price,_id));
    editBtn.setAttribute('data-bs-toggle','modal');
    editBtn.setAttribute('data-bs-target','#staticBackdrop');
    let deleteBtn=document.createElement('a');
    deleteBtn.classList.add('btn','btn-danger');
    deleteBtn.addEventListener('click',()=>deleteRecord(_id));
    deleteBtn.innerHTML=`<i class="fas fa-trash-alt"></i>`;
    tdEdit.appendChild(editBtn);
    tdEdit.appendChild(deleteBtn);
    tdImg.appendChild(imgMini);
    trRecord.appendChild(tdImg);
    trRecord.appendChild(tdName);
    trRecord.appendChild(tdBrand);
    trRecord.appendChild(tdDesc);
    trRecord.appendChild(tdPrice);
    trRecord.appendChild(tdEdit);
    tableRow.appendChild(trRecord);
}

/* selector per i dati nella modale */
const modalTitle=document.getElementById('staticBackdropLabel');
const modalName=document.getElementById('inputName')
const modalBrand=document.getElementById('inputBrand')
const modalUrlImg=document.getElementById('inputUrlImg');
const modalDesc=document.getElementById('inputDesc');
const modalPrice=document.getElementById('inputPrice');
//box per bottone
const btnEvent=document.getElementById('btnEvent');

//apertura modale per nuovo prodotto
document.getElementById('btnNewProd').addEventListener('click',()=>{
    modalTitle.innerText='Nuovo Prodotto';
    modalName.value='';
    modalBrand.value='';
    modalDesc.value='';
    modalPrice.value='';
    modalUrlImg.value='';
    let saveBtn=document.createElement('button');
    saveBtn.classList.add('btn','btn-success');
    saveBtn.innerText='AGGIUNGI';
    saveBtn.setAttribute('data-bs-dismiss','modal');
    btnEvent.innerHTML='';
    btnEvent.appendChild(saveBtn);
    //funzione di POST
    saveBtn.addEventListener('click',()=>pushRecord('POST',false));

})

//carico i dati nella modale per la modifica
function loadModal(name,brand,description,imageUrl,price,id){
        modalTitle.innerText='Modifica Prodotto';
        modalName.value=name;
        modalBrand.value=brand;
        modalDesc.value=description;
        modalPrice.value=price;
        modalUrlImg.value=imageUrl;
        let modifierBtn=document.createElement('button');
        modifierBtn.classList.add('btn','btn-primary');
        modifierBtn.innerText='MODIFICA';
        modifierBtn.setAttribute('data-bs-dismiss','modal');
        btnEvent.innerHTML='';
        btnEvent.appendChild(modifierBtn);
        //funzione metodo PUT 
        modifierBtn.addEventListener('click',()=>pushRecord('PUT',id));
}
//funzione per modifica o inserimento nuovo prodotto da tasto modale
async function pushRecord(methodCall,id){
    let objRecord={'name':modalName.value,'brand':modalBrand.value,'description':modalDesc.value,'price':modalPrice.value,'imageUrl':modalUrlImg.value};
    try{
        if(id){
            const res= await fetch(prodAPI+id,{method:methodCall,body:JSON.stringify(objRecord),headers:{"Authorization":idAPI,"content-type":"application/JSON"}});
        }
        else{
            const res= await fetch(prodAPI,{method:methodCall,body:JSON.stringify(objRecord),headers:{"Authorization":idAPI,"content-type":"application/JSON"}});
        }
        getProduct();
    } catch(err){
        console.log('Find error:', err);
    }

}
//fetch DELETE del prodotto
async function deleteRecord(id){
    try{
        await fetch(prodAPI+id,{method:"DELETE",headers:{"Authorization":idAPI}});
        getProduct();
    } catch(err){
        console.log('Find error:', err);
    }
}