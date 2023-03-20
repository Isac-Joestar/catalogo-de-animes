
// TEMA Light/Dark
var sun = document.querySelector('#light')
var moon = document.querySelector('#dark')
var temaIcon = document.querySelectorAll(".temaIcon")
temaIcon.forEach((t)=>{
    // console.log(t)
    t.addEventListener('click', ()=>{
       
        if(sun.style.display == 'flex'){
            sun.style.display = 'none'
            moon.style.display = 'flex'
            Tema('light')
           
        }else if(moon.style.display = 'flex'){
            sun.style.display = 'flex'
            moon.style.display = 'none'
            Tema('dark')
        }
    })
})

function Tema(a){
    
    if(a == 'light'){
        document.querySelector('body').classList.add('light-mode-bg')

        document.querySelector('header').classList.add('light-mode-bg')

        document.querySelectorAll('#mangas span')
        .forEach((t)=>{
            t.classList.add('light-mode-txt')
        })
        
        temaIcon
        .forEach((t)=>{
            t.classList.add('light-mode-txt')
        })

        document.querySelector('#pesquisa label span')
        .classList.add('light-mode-txt')

    }else if(a == 'dark'){
         document.querySelector('body').classList.remove('light-mode-bg')

        document.querySelector('header').classList.remove('light-mode-bg')

        document.querySelectorAll('#mangas span')
        .forEach((t)=>{
            t.classList.remove('light-mode-txt')
        })
        
        temaIcon
        .forEach((t)=>{
            t.classList.remove('light-mode-txt')
        })

        document.querySelector('#pesquisa label span')
        .classList.remove('light-mode-txt')
        
        
    }
}

// SlIDER

document.getElementById("radio1").checked = true;
let count = 1
setInterval(()=>{
    nextImage()
},5000)

function nextImage(){
    count ++;
    if(count > 4){
        count = 1
    }
    document.getElementById("radio"+ count).checked = true;
}

// Scroll mangas

const scrollManga = document.querySelectorAll('.mangas_content')
.forEach((e)=>{
    // console.log(e)
    let isDragStart = false, prevPageX, prevScrollLeft;

    const dragStart = (t)=>{
        isDragStart = true;
        prevPageX = t.pageX;
        prevScrollLeft = e.scrollLeft;
    }

    const dragging = (t)=>{
        if(!isDragStart) return;
        t.preventDefault();
        let positionDiff = t.pageX - prevPageX;
        e.scrollLeft = prevScrollLeft - positionDiff;
    }

    const dragStop = () =>{
        isDragStart = false;
    }

    e.addEventListener('mousedown', dragStart);
    e.addEventListener('mousemove', dragging);
    e.addEventListener('mouseup', dragStop);
    e.addEventListener('mouseleave', dragStop);
    // e.addEventListener('mouseout', dragStop);
})

// API mangas
const urlEmAlta = 'https://api.jikan.moe/v4/manga?page=1&order_by=popularity' 
// const urlEmAlta = 'https://api.jikan.moe/v4/manga/news' 
const urlLancamentos = 'https://api.jikan.moe/v4/manga?page=1&status=publishing' 
// -H 'Authorization: Bearer YOUR_TOKEN'




const recomendados = document.querySelector('#recomendados')
const mangaDesc = document.querySelector('.manga_desc')
async function GetAllMangas(){
  
   


    // mangas em alta
    const dataEmAlta = await fetch(urlEmAlta, { method: "GET" }).then(res => res.json())
    const emAlta = document.querySelector('#em_alta')
    for (var i = 0; i < dataEmAlta.data.length; i++) {

        // O formato dessa imagem tava enchendo o saco 
        if(dataEmAlta.data[i].images.jpg.image_url == 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'){
            i++
        }else{
            // Formatação para tirar indecencias 
            var cont = 0
            for(v = 0; v < dataEmAlta.data[i].genres.length; v++){
                
                if(dataEmAlta.data[i].genres[v].name == 'Ecchi' || 
                dataEmAlta.data[i].genres[v].name == 'Hentai' ||
                dataEmAlta.data[i].genres[v].name == 'Erotica'){
                   cont ++
                }
            }
            if(cont == 0){
                emAlta.innerHTML += `
                <div class="manga" id="${i}">
                    <img src="${dataEmAlta.data[i].images.jpg.image_url}" alt="">
                </div>
                `
                const emAltaMangas = document.querySelectorAll('#em_alta div')
                emAltaMangas.forEach((e)=>{
                        e.addEventListener('click', ()=>{
                            pagesManga(dataEmAlta, e.id)
                    })
                })
            }
         
       
        }

     }
     

     
      // mangas lançamentos
      const dataLancamentos = await fetch(urlLancamentos, {method: 'GET'}).then(res=>res.json())
      const lancamentos = document.querySelector('#lancamentos')
      for (var i = 0; i < dataLancamentos.data.length; i++) {

        // O formato dessa imagem tava enchendo o saco 
        if(dataLancamentos.data[i].images.jpg.image_url == 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'){
            i++
        }else{
            // Formatação para tirar indecencias 
            var cont = 0
            for(v = 0; v < dataLancamentos.data[i].genres.length; v++){
                
                if(dataLancamentos.data[i].genres[v].name == 'Ecchi' || 
                dataLancamentos.data[i].genres[v].name == 'Hentai' ||
                dataLancamentos.data[i].genres[v].name == 'Erotica'){
                   cont ++
                }
            }
            if(cont == 0){
                lancamentos.innerHTML += `
                <div class="manga" id="${i}">
                    <img src="${dataLancamentos.data[i].images.jpg.image_url}" alt="">
                </div>
                `
                const lancamentosMangas = document.querySelectorAll('#lancamentos div')
                lancamentosMangas.forEach((e)=>{
                        e.addEventListener('click', ()=>{
                            pagesManga(dataLancamentos, e.id)
                    })
                })
            }
         
       
        }

     }
 

     
     const mangaImg = document.querySelector('.content_img')
     const mangaTitle = document.querySelector('#title')
     const mangaAutor = document.querySelector('#autor')
     const mangaGene = document.querySelector('#generos')
     const mangaCap = document.querySelector('.content_cap')
     const mangaStatus = document.querySelector('#status')
     const mangaSino = document.querySelector('#sinopse')

     function pagesManga(local, item){
        // itens da descrição do mangá
        mangaDesc.style.display = 'flex'
        console.log(local.data[item])
        mangaImg.innerHTML =`
        <img id="img" src="${local.data[item].images.jpg.image_url}" alt="">
        `
        // Titulo
        if(local.data[item].title.length == 0 || local.data[item].title == null){
            mangaTitle.innerHTML =`Titulo: Desconhecido`
        }else{
            mangaTitle.innerHTML =`${local.data[item].title}`
        }
        
        // Autor
        if(local.data[item].authors.length == 0){
            mangaAutor.innerHTML =`Desconhecido`
        }else{
            // for 
            mangaAutor.innerHTML = ""
            for( v = 0; v < local.data[item].authors.length; v++){
               mangaAutor.innerHTML += `${local.data[item].authors[v].name} </br>`
            }
         
        }

        // Generos 
        if(local.data[item].genres.length == 0 || local.data[item].genres == null){
            if(local.data[item].demographics.length != 0){
                mangaGene.innerHTML = `<li class="tipo"> ${local.data[item].demographics[0].name} </li>`
            }else{
                mangaGene.innerHTML =`Desconhecido`
            }
        }else{
            mangaGene.innerHTML = ""
            if(local.data[item].demographics.length != 0){
                mangaGene.innerHTML += `<li class="tipo"> ${local.data[item].demographics[0].name} </li>`
            }
           
            for( v = 0; v < local.data[item].genres.length; v++){
               mangaGene.innerHTML += `<li> ${local.data[item].genres[v].name} </li>`
            }
         
          
         
        }

        // Capitulos
        if(local.data[item].chapters == null || local.data[item].chapters.length == 0){
            if(local.data[item].volumes == null || local.data[item].volumes.length == 0){
                mangaCap.innerHTML =`<span class="span_sep">capitulos:</span> 
                <p id="cap">Desconhecido</p>` 
            }else{
                mangaCap.innerHTML =`<span class="span_sep">Volumes:</span> 
                <p id="cap">${local.data[item].volumes}</p>`
            }
            
        }else{
            mangaCap.innerHTML =`
            <span class="span_sep">Capitulos:</span> 
                <p id="cap">${local.data[item].chapters}</p>`
        }
        
        // Status
        if(local.data[item].status == null || local.data[item].status.length == 0){
            mangaStatus.innerHTML =`Desconhecido`
        }else{
            mangaStatus.innerHTML =`${local.data[item].status}`
        }

        // Sinopse
        if(local.data[item].synopsis == null || local.data[item].synopsis.length == 0){
            mangaSino.innerHTML =`Desconhecido`
        }else{
            mangaSino.innerHTML =`${local.data[item].synopsis}`
        }
       
            
          
       
    }
}
GetAllMangas()


document.querySelector('#btn_fechar')
.addEventListener('click', ()=>{
    mangaDesc.style.display = 'none'
})

