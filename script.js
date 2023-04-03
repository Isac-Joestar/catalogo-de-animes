
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
        if(local.title.length > 30){
            mangaTitle.innerHTML =`${local.title.substr(0,30) + "..."}`
        }else{
            mangaTitle.innerHTML =`${local.title}`
        }
       
        
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
            mangaCap.innerHTML =`<span class="span_sep">Capítulos:</span> 
            <p id="cap">Desconhecido</p>` 
        }else{
            mangaCap.innerHTML =`<span class="span_sep">Volumes:</span> 
            <p id="cap">${local.volumes}</p>`
        }
        
    }else{
        mangaCap.innerHTML =`
        <span class="span_sep">Capítulos:</span> 
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
                        <span class="pre">Capítulos:</span> <p id="result_cap"></p>
                    </div>
                    <span class="pre">Gêneros:</span>
                    <ul class="result_generos" id="result_generos_${i}">
                    
                    </ul>
                </div>
            </div>
            `
            var resultGene = document.querySelector(`#result_generos_${i}`)
            verificarPesquisa(dataPesquisa.data[i], resultGene, 'generos')
           
            var resultCap = document.querySelector(`#content_result_cap_${i}`)
            verificarPesquisa(dataPesquisa.data[i], resultCap, 'cap')
        }
       
    }
    
    function verificarPesquisa(local, locHtml, param){
        // console.log(local)
        if(param == 'cap'){
            if(local.chapters == null || local.chapters.length == 0){
                if(local.volumes == null || local.volumes.length == 0){
                    locHtml.innerHTML =`  <span class="pre">Capitulos:</span><p id="result_cap">Desconhecido</p>` 
                }else{
                    locHtml.innerHTML =`span class="pre">Volumes:</span> <p id="result_cap">${local.volumes}</p>`
                }
                
            }else{
                locHtml.innerHTML =`
                <span class="pre">Capítulos:</span><p id="result_cap">${local.chapters}</p>`
            }
            
        }else if(param == 'generos'){
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
    
    }
    document.querySelectorAll('.resultado_manga')
    .forEach((e)=>{
        e.addEventListener('click', ()=>{
            // console.log(dataPesquisa.data[e.id])
           pagesManga(dataPesquisa.data[e.id]) 
        })
    })
}
   



document.querySelectorAll('#recomendados div')
.forEach((e)=>{
    e.addEventListener('click', ()=>{
        pageRec(e.id)
    })
})

var berserk = {
    'images': './img/manga/Berserk.png',
    'titulo': 'Berserk',
    'autor': ['Kentarou ,Miura', 'Studio Gaga'],
    'demografia': 'Seinen',
    'generos': ['Adulto','Ação', 'Aventura', 'Demônios', 'Drama', 'Fantasia', 'Horror', 'Militar','Psicológico','Sobrenatural'],
    'cap': '371',
    'status': 'Em Lançamento',
    'sinopse': `Guts, um ex-mercenário agora conhecido 
    como o "Espadachim Negro", está em busca de vingança. 
    Depois de uma infância tumultuada, ele finalmente encontra 
    alguém que respeita e acredita que pode confiar, apenas para
    ver tudo desmoronar quando essa pessoa tira tudo o que é importante 
    para Guts com o objetivo de realizar seus próprios desejos. Agora marcado
    para a morte, Guts é condenado a um destino em que é implacavelmente perseguido
    por seres demoníacos. Partindo em uma missão terrível repleta de infortúnios, 
    Guts, armado com uma espada enorme e uma força monstruosa, não deixará nada detê-lo,
    nem mesmo a própria morte, até que finalmente seja capaz de cortar a cabeça 
    daquele que o despojou - e seu ente querido - de sua humanidade.`
}
var vagabond = {
    'images': './img/manga/Vagabond.png',
    'titulo': 'Vagabond',
    'autor': ['Inoue, Takehiko ', 'Yoshikawa, Eiji'],
    'demografia': 'Seinen',
    'generos': ['Ação', 'Aventura', 'Drama', 'Histórico', 'Samurai'],
    'cap': '327',
    'status': 'Finalizado',
    'sinopse': `Baseado no livro Musashi, de Eiji Yoshikawa, tem como protagonista é o lendário espadachim Miyamoto Musashi, conhecido no Japão como sendo o maior samurai de todos os tempos. O mangá é um retrato fictício da vida de Musashi, um ronin (samurai que não serve a nenhum mestre) que viajava pelo Japão na procura de grandes adversários para desafiar e, assim, aprimorar-se. A mescla de lutas espetaculares, com a milenar filisofia oriental, além de uma pitada de romance e comédia, torna o mangá simplesmente irresistível.`
}
var vinlando_saga = {
    'images': './img/manga/Vinland Saga.png',
    'titulo': 'Vinland Saga',
    'autor': ['Yukimura, Makoto'],
    'demografia': 'Seinen',
    'generos': ['Ação', 'Aventura', 'Drama', 'Histórico'],
    'cap': '200',
    'status': 'Em Lançamento',
    'sinopse': `Thorfinn é filho de Thors, um lendário guerreiro viking, mas que após anos no campo de batalha, descobre uma coisa mais maravilhosa que matar seus iguais. Viver sua própria vida, em paz. Mas os ventos lhe trazem uma notícia que atrapalhará seus dias de paz, e Thorfinn, seu filho, pouco sabe desta vida passada de guerra de seu pai. Após descobrir o passado de seu pai, Thorfinn se revolta contra ele, e sai para a guerra junto de seu pai, mas quando reconhece o verdadeiro valor dele, já é tarde demais. Agora Thorfinn deverá seguir sua própria vida, seguindo valores que seu pai lhe ensinou, mas sem perder sua coragem. Este é só o começo desta grande saga de Thorfinn que acompanha os Vikings no século XI!!!`
}
var solo_leveling = {
    'images': './img/manga/Solo Leveling.png',
    'titulo': 'Solo Leveling',
    'autor': ['Jang Sung-Lak'],
    'demografia': 'Shounen',
    'generos': ['Ação', 'Aventura'],
    'cap': '191',
    'status': 'Completo',
    'sinopse': `Dez anos atrás, depois do "Portal" que conecta o mundo real com um mundo de montros se abriu, algumas pessoas comuns receberam o poder de caçar os monstros do portal. Eles são conhecidos como caçadores. Porém, nem todos os caçadores são fortes. Meu nome é Sung Jin-Woo, um caçador de rank E. Eu sou alguém que tem que arriscar a própria vida nas dungeons mais fracas, "O mais fraco do mundo". Sem ter nenhuma habilidade à disposição, eu mal consigo dinheiro nas dungeons de baixo nível... Ao menos até eu encontrar uma dungeon escondida com a maior dificuldade dentro do Rank D! No fim, enquanto aceitava minha morte, eu ganhei um novo poder!`
}
var shuumatsu= {
    'images': './img/manga/Shuumatsu.png',
    'titulo': 'Shuumatsu no Valkyrie',
    'autor': ['Umemura, Shinya', 'Ajichika'],
    'demografia': 'Seinen',
    'generos': ['Ação', 'Drama', 'Sobrenatural','Super Poderes'],
    'cap': '76',
    'status': 'Em Lançamento',
    'sinopse': `A cada 1.000 anos, as divindades se reúnem sob o conselho de Valhalla para decidir sobre o direito da humanidade de continuar vivendo, ou por sua destruição, porém desta vez os deuses estão furiosos com o descaso humano para com o planeta, pendendo passim para aniquilar toda a raça humana, porém uma única valquíria os convencem de realizar o Ragnarok, uma batalha mortal entre humanos e deuses para decidir sob sua sobrevivência, 13 humanos enfrentarão 13 deuses. Serão este humanos capazes de colidir com as poderosas divindades?`
}
var one_punch_man = {
    'images': './img/manga/one_punch_man.jpg',
    'titulo': 'One Punch Man',
    'autor': ['ONE', 'Murata, Yusuke'],
    'demografia': 'Paródia ',
    'generos': ['Ação', 'Comédis','Sci-Fi', 'Sobrenatural', 'Super Poderes'],
    'cap': '217',
    'status': 'Em Lançamento',
    'sinopse': `Depois de treinar rigorosamente por três anos, o Saitama comum ganhou uma força imensa que lhe permite eliminar qualquer um e qualquer coisa com apenas um soco. Ele decide fazer bom uso de sua nova habilidade, tornando-se um herói. No entanto, ele rapidamente fica entediado com a facilidade de derrotar monstros e quer que alguém lhe dê um desafio para trazer de volta a centelha de ser um herói. Ao testemunhar o incrível poder de Saitama, Genos, um ciborgue, está determinado a se tornar o aprendiz de Saitama. Durante esse tempo, Saitama percebe que não está recebendo o reconhecimento que merece nem é conhecido pelo povo por não fazer parte da Associação de Heróis. Querendo aumentar sua reputação, Saitama decide registrar Genos com ele, em troca de aceitá-lo como aluno. Juntos, os dois começam a trabalhar para se tornarem verdadeiros heróis, na esperança de encontrar inimigos fortes e ganhar respeito no processo.`
}
var chainzaw_man = {
    'images': './img/manga/chainzaw_man.jpg',
    'titulo': 'Chainzaw Man',
    'autor': ['Fujimoto, Tatsuki'],
    'demografia': 'Shounen',
    'generos': ['Ação', 'Aventura', 'Demônios'],
    'cap': '124',
    'status': 'Em Lançamento',
    'sinopse': `Quando seu pai morreu, Denji ficou preso com uma dívida que era incapaz de pagar. Mas graças à ajuda de um cachorro demônio que ele salvou chamado Pochita, Denji é capaz de sobreviver como caçador de demônios de aluguel. Os poderes de serra elétrica do Pochita são bem poderosos contra estes demônios. E então, quando o Denji acaba sendo morto por um demônio, o Pochita desiste de sua vida para revivê-lo. Mas, agora o Denji renasceu como um hibrido de demônio com humano... Agora ele é o "Chainsaw Man"!!!`
}
var jujutsu_kaisen = {
    'images': './img/manga/jujutsu_kaisen.jpg',
    'titulo': 'Jujutsu Kaisen',
    'autor': ['Gege, Akutami'],
    'demografia': 'Shounen',
    'generos': ['Ação', 'Demônios', 'Escolar', 'Fantasia', 'Magia', 'Sobrenatural'],
    'cap': '218',
    'status': 'Em Lançamento',
    'sinopse': `Jujutsu Kaisen Yuji é um gênio do atletismo, mas não tem interesse algum em ficar correndo em círculos. Ele é feliz como membro no Clube de Estudo de Fenômenos Psíquicos. Apesar de estar no clube apenas por diversão, tudo fica sério quando um espírito de verdade aparece na escola! A vida está prestes a se tornar muito interessante na Escola Sugisawa...`
}
var the_begnning = {
    'images': './img/manga/the_beginning.jpg',
    'titulo': 'The Beginning After The End',
    'autor': ['TurtleMe'],
    'demografia': 'Webtoon',
    'generos': ['Ação', 'Artes Marciais', 'Aventura', 'Drama', 'Fantasia', 'Magia', 'Romance', 'Super Poderes'],
    'cap': '175',
    'status': 'Em Lançamento',
    'sinopse': `Rei Grey conquistou força, riquezas e prestígio sem iguais em um mundo governado pela habilidade marcial. Entretanto, a solidão acompanha de perto aqueles de grande poder. Por detrás da máscara de um glorioso e poderoso rei, reside a casca vazia de um homem destituído de propósito e vontade. Renascido em um novo mundo repleto de magia e monstros, o Rei Grey terá a chance de refazer sua vida. Corrigir os erros do passado não será seu único desafio, pois um perigo oculto cresce a cada instante, ameaçando destruir tudo que ele trabalhou para criar, o fazendo questionar a verdadeira razão de ter recebido uma nova vida...`
}
var baki_dou = {
    'images': './img/manga/baki.jpg',
    'titulo': 'Baki-dou',
    'autor': ['Itagaki, Keisuke'],
    'demografia': 'Shounen',
    'generos': ['Ação', 'Artes Marciais', 'comédia', 'Drama', 'Esportes'],
    'cap': '198',
    'status': 'Em Lançamento',
    'sinopse': `O Baki está entediado. Após a conclusão da batalha épica entre pai e filho, ele continua a lutar na arena subterrânea e treinar sem parar, mas ele sempre tem que suprimir seu bocejo causado pelo tédio prepotente. Nenhuma quantidade de estímulo ou perigo pode trazer excitação a ele neste momento. Agora, com a inclusão do Primeiro Ministro do Japão no sistema, um enorme projeto de clonagem está tentando clonar Miyamoto Musashi, um dos pais das artes marciais no Japão. Outra luta de proporções históricas espera Baki!`
}
var kengan_ashura = {
    'images': './img/manga/kengan_ashura.jpg',
    'titulo': 'Kengan Ashura',
    'autor': ['Sandrovich, Yabako','Daromeon'],
    'demografia': '',
    'generos': ['Ação', 'Artes Marciais'],
    'cap': '236',
    'status': 'Finalizado',
    'sinopse': `Desde o período Edo do Japão, existem arenas de gladiadores em certas áreas. Nestas arenas, donos de negócios ricos e comerciantes contratam gladiadores para lutar em combate desarmado, onde o vencedor leva tudo. Tokita Ouma, apelidado de "Ashura", se junta a essas arenas e destrói seus oponentes. Sua habilidade espetacular para esmagar seus inimigos chama a atenção dos grandes empresários, incluindo o presidente do Nogi Group, Nogi Hideki...`
}
var one_piece = {
    'images': './img/manga/one_piece.jpg',
    'titulo': 'One Piece',
    'autor': ['Oda, Eiichiro'],
    'demografia': 'Shounen',
    'generos': ['Ação', 'Aventura', 'comédia', 'Fantasia', 'Super Poderes'],
    'cap': '1079',
    'status': 'Em Lançamento',
    'sinopse': `One Piece começa quando Gol D. Roger, o Rei Dos Piratas que possuiu tudo nesse mundo, antes de ser executado, diz que escondeu o seu tesouro em algum lugar da Grand Line, um oceano extremamente perigoso. Desde então muitos piratas se aventuram pela Grand Line para tentar encontrar o tesouro chamado One Piece. Um deles é Monkey D. Luffy, o garoto que, acidentalmente, comeu uma das Akuma No Mi, a Gomu Gomu No Mi (Fruta da Borracha), e agora ele pode esticar seu corpo como se fosse uma borracha. A jornada dele começa atrás de companheiros e um barco, que ele vai conseguindo pouco a pouco, pois tem um objetivo: Ser o Rei Dos Piratas!!`
}
function pageRec(local){
    if(local == 'berserk'){
        var name = berserk
    }else if(local == 'vagabond'){
        name = vagabond
    }else if(local == 'vinland_saga'){
        name = vinlando_saga
    }else if(local == 'solo_leveling'){
        name = solo_leveling
    }else if(local == 'shuumatsu'){
        name = shuumatsu
    }else if(local == 'one_punch_man'){
        name = one_punch_man
    }else if(local == 'jujutsu_kaisen'){
        name = jujutsu_kaisen
    }else if(local == 'chainzaw_man'){
        name = chainzaw_man
    }else if(local == 'the_beginning'){
        name = the_begnning
    }else if (local == 'baki_dou'){
        name = baki_dou
    }else if(local == 'kengan_ashura'){
        name = kengan_ashura
    }else if(local = 'one_piece'){
        name = one_piece
    }
    console.log(name)

    // itens da descrição do mangá
    mangaDesc.style.display = 'flex'
    // console.log(local)
    mangaImg.innerHTML =`
    <img id="img" src="${name.images}" alt="">
    `
    // Titul
    if(name.titulo.length == 0 || name.titulo == null){
        mangaTitle.innerHTML =`Titulo: Desconhecido`
    }else{
        if(name.titulo.length > 25){
            mangaTitle.innerHTML =`${name.titulo.substr(0,30) + "..."}`
        }else{
            mangaTitle.innerHTML =`${name.titulo}`
        }
    }
    
    // Autor
    if(name.autor.length == 0){
        mangaAutor.innerHTML =`Desconhecido`
    }else{
        // for 
        mangaAutor.innerHTML = ""
        for( v = 0; v < name.autor.length; v++){
            mangaAutor.innerHTML += `${name.autor[v]} </br>`
        }
        
    }

    // Generos 
    // getComputedStyle >>> reconhecer style mesmo em @ media 
    // getComputedStyle(contentGeneroReponsivo).display == 'flex'
    if ( name.generos.length  > 5){
        contentMangaGene.style.display = 'none'
        contentGeneroReponsivo.style.display = 'flex'
        if(name.generos.length == 0 || name.generos == null){
            if(name.demografia.length != 0){
                generoResponsivo.innerHTML = `<li class="tipo"> ${name.demografia} </li>`
            }else{
                generoResponsivo.innerHTML =`Desconhecido`
            }
        }else{
            generoResponsivo.innerHTML = ""
            if(name.demografia.length != 0){
                generoResponsivo.innerHTML += `<li class="tipo"> ${name.demografia} </li>`
            }
            for( v = 0; v < name.generos.length; v++){
                generoResponsivo.innerHTML += `<li> ${name.generos[v]} </li>`
            }            
        }
    }else{
        contentMangaGene.style.display = 'flex'
        contentGeneroReponsivo.style.display = 'none'
        if(name.generos.length == 0 || name.generos == null){
            if(name.demografia.length != 0){
                mangaGene.innerHTML = `<li class="tipo"> ${name.demografia} </li>`
            }else{
                mangaGene.innerHTML =`Desconhecido`
            }
        }else{
            mangaGene.innerHTML = ""
            if(name.demografia.length != 0){
                mangaGene.innerHTML += `<li class="tipo"> ${name.demografia} </li>`
            }
            
            for( v = 0; v < name.generos.length; v++){
                mangaGene.innerHTML += `<li> ${name.generos[v]} </li>`
            }            
        }
    
    }

    // Capitulos
    if(name.cap == null || name.cap.length == 0){
        if(name.volumes == null || name.volumes.length == 0){
            mangaCap.innerHTML =`<span class="span_sep">capítulos:</span> 
            <p id="cap">Desconhecido</p>` 
        }else{
            mangaCap.innerHTML =`<span class="span_sep">Volumes:</span> 
            <p id="cap">${name.volumes}</p>`
        }
        
    }else{
        mangaCap.innerHTML =`
        <span class="span_sep">Capítulos:</span> 
            <p id="cap">${name.cap}</p>`
    }
    
    // Status
    if(name.status == null || name.status.length == 0){
        mangaStatus.innerHTML =`Desconhecido`
    }else{
        mangaStatus.innerHTML =`${name.status}`
    }

    // Sinopse
    if(name.sinopse == null || name.sinopse.length == 0){
        mangaSino.innerHTML =`Desconhecido`
    }else{
        mangaSino.innerHTML =`${name.sinopse}`
    }
    
        
        
    
}