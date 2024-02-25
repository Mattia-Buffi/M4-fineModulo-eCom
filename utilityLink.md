** Bootstrap **
CSS
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
JAVASCRIPT
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

** Fontawesome
<script src="https://kit.fontawesome.com/e5a2b2fa25.js" crossorigin="anonymous"></script>

** Palette colori
#05161A nero
#072e33  antracite
#0c7075  verde
#0f969c  verde chiaro
#6da5c0  colombo
#294d61  tortora scuro

API
https://striveschool-api.herokuapp.com/api/product/

API Key Fetch
fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2Q4MTljNDM3MDAwMTkzYzM1ODYiLCJpYXQiOjE3MDg0MjQ1NzcsImV4cCI6MTcwOTYzNDE3N30.3Ovtee8nLZHz2iFK_tBJopbaUK50bGYvyEk90P_oMak"
}
})

** Struttura dato endpoint **
{
    "_id" : "nnnnn"                 //GENERATO DAL SERVER
    "name": "nome prodotto"         //OBBLIGATORIO
    "description": "descrizione"    //OBBLIGATORIO
    "brand" : "marc"                //OBBLIGATORIO
    "imageUrl" : "htt link img"     //OBBLIGATORIO
    "price" : "prezzo"              //OBBLIGATORIO
    "userId" : "admin"              //GENERATO DAL SERVER
    "createAt" : "date "            //GENERATO DAL SERVER
    "updateAt" : "date"             //GENERATO DAL SERVER
    "__v": 0                        //GENERATO DAL SERVER
 }

 navbar
    info generali
    accesso utente
    carrello

 vetrina
    mostra articoli dall'api
    riordinare array oggeti per ordinare i prodotti
 
 paginaProdotto
    info dall'api del prodotto


 carrello
    elenco prodotti aggiunti 
    salvataggio memoria browser
 backOffice
    elenco prodotti 
    modifica ed inserimento nuovi elementi

 Attenzione da device
 fissare user e carrello all'interno dell hamburger menu
 array carrello da slavare in localStorage ed bagse sull'icona
 alert modifia o cancellazione
 pagina podotto con passaggio dati
 correzione immagini nella vetrina
 inserimento elemnti navbar
 footer 
 ordinamento degli elementi per prezzo o data inserimento o brand

    "name": "nome prodotto"        
    "description": "descrizione"   
    "brand" : "marc"               
    "imageUrl" : "htt link img"    
    "price" : "prezzo"             
    "userId" : "admin"  