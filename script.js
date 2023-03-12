
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
const url = 'https://api.jikan.moe/v4/manga' 
// -H 'Authorization: Bearer YOUR_TOKEN'


const emAltaMangas = document.querySelector('#em_alta')
const lancamentos = document.querySelector('#lancamentos')
const recomendados = document.querySelector('#recomendados')

async function GetAllMangas(){
    const data = await fetch(url, {method: 'GET'}).then(res=>res.json())
    console.log(data.data)
    data.data.forEach(()=>{

    })
    for (var i = 0; i < data.data.length; i++) {
        emAltaMangas.innerHTML += `
        <div class="manga" id="${i}">
            <img src="${data.data[i].images.jpg.image_url}" alt="">
        </div>
        `
        
     }
     for (var i = 0; i < data.data.length; i++) {
        lancamentos.innerHTML += `
        <div class="manga" id="${i}">
            <img src="${data.data[i].images.jpg.image_url}" alt="">
        </div>
        `
        
     }
     pagesManga()
     function pagesManga(){
       const mangaDesc = document.querySelector('.manga_descricao')
       const mangaImg = document.querySelector('.manga_bg')
       const mangaTitle = document.querySelector('.manga_title')
       const mangaAutor = document.querySelector('.manga_autor')
       const mangaCap = document.querySelector('.manga_cap')
        const mangaSino = document.querySelector('.manga_desc_botom')

       console.log(mangaDesc) 
       document.querySelectorAll('.manga').forEach((e)=>{
            e.addEventListener('click', ()=>{
                console.log(data.data[e.id])
                mangaImg.innerHTML =`
                <img src="${data.data[e.id].images.jpg.image_url}" alt="">
                `
                mangaTitle.innerHTML =`${data.data[e.id].title}`
                mangaAutor.innerHTML =`${data.data[e.id].authors[0].name}`
                mangaCap.innerHTML =`capitulos: ${data.data[e.id].chapters}`
                mangaSino.innerHTML =`Sinopse: ${data.data[e.id].synopsis
                }`
            
            })
        })
    }
}
GetAllMangas()



