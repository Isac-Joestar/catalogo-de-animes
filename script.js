
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
},10000)

function nextImage(){
    count ++;
    if(count > 4){
        count = 1
    }
    document.getElementById("radio"+ count).checked = true;
}

// Scroll mangas


if(document.querySelector("main").style.maxWidth != '600px'){
    document.querySelectorAll('.mangas_content')
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
}

       


// API mangas



const urlTeste = 'https://api.jikan.moe/v4/manga'
async function testeAPI (){
    const dataTeste = await fetch(urlTeste, {method: 'GET'}).then(res => res.json())
    // console.log(dataTeste)
    if(dataTeste.data == undefined){
        alert('Ops! Algo de errado não está certo, a API não está funcionando direito, volte mais tarde.')
    }else(
        GetAllMangas()
    )
}; 
testeAPI()



const urlEmAlta = 'https://api.jikan.moe/v4/manga?page=1&order_by=popularity' 
const urlLancamentos = 'https://api.jikan.moe/v4/manga?page=1&status=publishing&order_by=popularity' 
async function GetAllMangas(){
    const dataEmAlta = await fetch(urlEmAlta, {method: 'GET'}).then(res => res.json())
    const dataLancamentos = await fetch(urlLancamentos, {method: 'GET'}).then(res=>res.json())
    let dataContent = [dataEmAlta, dataLancamentos]
    // console.log(dataContent[0])
    for(var r = 0; r < dataContent.length; r++){
        console.log(r)
        for( i = 0; i < dataContent[r].data.length; i++){
        
            if(dataContent[r].data[i].images.jpg.image_url == 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'){
                i++
            }else{
                // Formatação para tirar indecencias
                var cont = 0
                for(v = 0; v < dataContent[r].data[i].genres.length; v++){
                    if(dataContent[r].data[i].genres[v].name == 'Ecchi' || 
                    dataContent[r].data[i].genres[v].name == 'Hentai' ||
                    dataContent[r].data[i].genres[v].name == 'Erotica'){
                    cont ++
                    }
                }
                    // Retirar mangás repitidos
                if(dataContent[r].data[i].mal_id == malID){
                    i++
                }else{
                    var malID = dataContent[r].data[i].mal_id
                }

                // mostrar mangás na tela
                const emAlta = document.querySelector('#em_alta')
                const lancamentos = document.querySelector('#lancamentos')
                if(cont == 0){
                    var mangaSection  = [emAlta, lancamentos]
                    if(r == 0){
                        mangaSection[0].innerHTML += `
                        <div class="manga" id="${i}">
                            <img src="${dataContent[0].data[i].images.jpg.image_url}" alt="">
                        </div>
                        `
                       
                    }else{
                      mangaSection[1].innerHTML += `
                        <div class="manga" id="${i}">
                            <img src="${dataContent[1].data[i].images.jpg.image_url}" alt="">
                        </div>
                        `
                      
                    }
                    
                }
          
            }
      
        }
        
    }
        //eventos de click, mangá desc 
        const emAltaMangas = document.querySelectorAll('#em_alta div')
        emAltaMangas.forEach((e)=>{
            e.addEventListener('click', ()=>{
                pagesManga(dataContent[0].data[e.id])
            })
        })
        const LancamentosMangas = document.querySelectorAll('#lancamentos div')
        LancamentosMangas.forEach((e)=>{
            e.addEventListener('click', ()=>{
                pagesManga(dataContent[1].data[e.id])
            })
        })
}

const mangaImg = document.querySelector('.content_img')
const mangaTitle = document.querySelector('#title')
const mangaAutor = document.querySelector('#autor')

const mangaCap = document.querySelector('.content_cap')
const mangaStatus = document.querySelector('#status')
const mangaSino = document.querySelector('#sinopse')

const mangaGene = document.querySelector('#generos')
const contentMangaGene =  document.querySelector('.content_generos')

const contentGeneroReponsivo = document.querySelector('.content_generos_mobile')
const generoResponsivo = document.querySelector('#generos_mobile')
function pagesManga(local){

    // itens da descrição do mangá
    mangaDesc.style.display = 'flex'
    // console.log(local)
    mangaImg.innerHTML =`
    <img id="img" src="${local.images.jpg.image_url}" alt="">
    `
    // Titulo
    if(local.title.length == 0 || local.title == null){
        mangaTitle.innerHTML =`Titulo: Desconhecido`
    }else{
        mangaTitle.innerHTML =`${local.title}`
    }
    
    // Autor
    if(local.authors.length == 0){
        mangaAutor.innerHTML =`Desconhecido`
    }else{
        // for 
        mangaAutor.innerHTML = ""
        for( v = 0; v < local.authors.length; v++){
            mangaAutor.innerHTML += `${local.authors[v].name} </br>`
        }
        
    }

    // Generos 
    // getComputedStyle >>> reconhecer style mesmo em @ media 
    // getComputedStyle(contentGeneroReponsivo).display == 'flex'
    if ( local.genres.length  > 5){
        contentMangaGene.style.display = 'none'
        contentGeneroReponsivo.style.display = 'flex'
        if(local.genres.length == 0 || local.genres == null){
            if(local.demographics.length != 0){
                generoResponsivo.innerHTML = `<li class="tipo"> ${local.demographics[0].name} </li>`
            }else{
                generoResponsivo.innerHTML =`Desconhecido`
            }
        }else{
            generoResponsivo.innerHTML = ""
            if(local.demographics.length != 0){
                generoResponsivo.innerHTML += `<li class="tipo"> ${local.demographics[0].name} </li>`
            }
            for( v = 0; v < local.genres.length; v++){
                generoResponsivo.innerHTML += `<li> ${local.genres[v].name} </li>`
            }            
        }
    }else{
        contentMangaGene.style.display = 'flex'
        contentGeneroReponsivo.style.display = 'none'
        if(local.genres.length == 0 || local.genres == null){
            if(local.demographics.length != 0){
                mangaGene.innerHTML = `<li class="tipo"> ${local.demographics[0].name} </li>`
            }else{
                mangaGene.innerHTML =`Desconhecido`
            }
        }else{
            mangaGene.innerHTML = ""
            if(local.demographics.length != 0){
                mangaGene.innerHTML += `<li class="tipo"> ${local.demographics[0].name} </li>`
            }
            
            for( v = 0; v < local.genres.length; v++){
                mangaGene.innerHTML += `<li> ${local.genres[v].name} </li>`
            }            
        }
    
    }

    // Capitulos
    if(local.chapters == null || local.chapters.length == 0){
        if(local.volumes == null || local.volumes.length == 0){
            mangaCap.innerHTML =`<span class="span_sep">capitulos:</span> 
            <p id="cap">Desconhecido</p>` 
        }else{
            mangaCap.innerHTML =`<span class="span_sep">Volumes:</span> 
            <p id="cap">${local.volumes}</p>`
        }
        
    }else{
        mangaCap.innerHTML =`
        <span class="span_sep">Capitulos:</span> 
            <p id="cap">${local.chapters}</p>`
    }
    
    // Status
    if(local.status == null || local.status.length == 0){
        mangaStatus.innerHTML =`Desconhecido`
    }else{
        mangaStatus.innerHTML =`${local.status}`
    }

    // Sinopse
    if(local.synopsis == null || local.synopsis.length == 0){
        mangaSino.innerHTML =`Desconhecido`
    }else{
        mangaSino.innerHTML =`${local.synopsis}`
    }
    
        
        
    
}


// fechar mangá descrição
const mangaDesc = document.querySelector('.manga_desc')
document.querySelector('#btn_fechar')
.addEventListener('click', ()=>{
    mangaDesc.style.display = 'none'
})



// função pesquisar
const inputPesquisa = document.querySelector("#pesquisa input")
var cont = 0
inputPesquisa.addEventListener('keyup',(e)=>{
    document.querySelector('body').style.position = 'fixed'
    document.getElementById('resultado').style.display = 'flex'
    var text = inputPesquisa.value
    
    function testePesquisa(){
        if(cont == 0 && text.replace(/\s/g,"").length > 0){
            cont += 1
            pesquisa(text)
            espera()
        }else{
            result.innerHTML += ''
        }

    } 
   
        // pesquisar ao clicar no start
        let keyCode = e.keyCode || e.which
        if (keyCode == 13) {
            testePesquisa()
        }

        // pesquisar ao apagar 
        // if(inputPesquisa.keydown){
        //     testePesquisa()
        // }

       // função para não espamar pesquisa
        function espera(){
            setTimeout(()=>{
                cont = 0
                console.log(cont)
            },1000)
        }

        // fechar divi resultado
   
})

document.querySelector('#btn_fechar_result')
.addEventListener('click', ()=>{
    document.querySelector('body').style.position = 'relative'
    document.getElementById('resultado').style.display = 'none';
   
})
document.addEventListener('mouseup', function(e) {
  
    // console.log(e.target)
    var fecharResult = document.querySelector('.fechar_result')
    var container = document.getElementById('content_resultados');
    if (!container.contains(e.target) && !fecharResult.contains(e.target) && !mangaDesc.contains(e.target)) {
        document.querySelector('body').style.position = 'relative'
        document.getElementById('resultado').style.display = 'none';
    }
}); 






// Adicionar os resultasdos da pesquisa 
var result = document.querySelector('#content_resultados')
async function pesquisa (param){
    var urlPesquisa = `https://api.jikan.moe/v4/manga?q=${param}&sfw&order_by=popularity`

    const dataPesquisa = await fetch(urlPesquisa, {method: 'GET'}).then(res=>res.json())
    // console.log(dataPesquisa.data)
    result.innerHTML = ``
        var cont = 0
    for(i = 0; i < dataPesquisa.data.length; i++){
        var cont = 0
        for(v = 0; v < dataPesquisa.data[i].genres.length; v++){
            if(dataPesquisa.data[i].genres[v].name == 'Ecchi' || 
            dataPesquisa.data[i].genres[v].name == 'Hentai' ||
            dataPesquisa.data[i].genres[v].name == 'Erotica'){
            cont ++
            }
        }

        if(cont == 0){
            
            // let img = document.querySelector('.result_img')
            // let title = document.querySelector('#result_title')
            // let cap = document.querySelector('#result_cap')
            let generos  = document.querySelector('.result_generos')
            let c = 0
            for(v = 0; v < dataPesquisa.data[i].genres.length; v++){
                c++
            }
            
            // var autores = document.querySelector('')
            result.innerHTML += `
            <div class="resultado_manga" id="${i}">
                    
                <div class="result_img">
                    <img src="${dataPesquisa.data[i].images.jpg.image_url}" alt="">
                </div>
                
                <div class="resultado_txt">
                    <span id="result_title">${dataPesquisa.data[i].title}</span>
                    <div class="content_result_cap" id="content_result_cap_${i}">
                        <span class="pre">Capitulos:</span> <p id="result_cap"></p>
                    </div>
                    <span class="pre">Generos:</span>
                    <ul class="result_generos" id="result_generos_${i}">
                    
                    </ul>
                </div>
            </div>
            `
            var resultGene = document.querySelector(`#result_generos_${i}`)
            generosPesquisa(dataPesquisa.data[i], resultGene)
           
         
           
        }
       
    }
    
    function generosPesquisa(local, locHtml){
        if(local.genres.length == 0 || local.genres == null){
            if(local.demographics.length != 0){
                locHtml.innerHTML = `<li class="tipo"> ${local.demographics[0].name} </li>`
            }else{
                locHtml.innerHTML =`Desconhecido`
            }
        }else{
            locHtml.innerHTML = ""
            if(local.demographics.length != 0){
                locHtml.innerHTML += `<li class="tipo"> ${local.demographics[0].name} </li>`
            }
            for( v = 0; v < local.genres.length; v++){
                locHtml.innerHTML += `<li class=""> ${local.genres[v].name} </li>`
            }            
        }
    }
    document.querySelectorAll('.resultado_manga')
    .forEach((e)=>{
        e.addEventListener('click', ()=>{
            // console.log(dataPesquisa.data[e.id])
           pagesManga(dataPesquisa.data[e.id]) 
        })
    })
}
   

