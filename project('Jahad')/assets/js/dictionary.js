
// ------------ SCROLL CHANGE ------------
let $ = document
let body = $.querySelector('body')
let head = $.getElementById('head')
let btnScroll = $.getElementById('btn')
let home = $.getElementById('home')
let sourcs = $.getElementById('sourcs')
let contact = $.getElementById('contact')
let aboutme = $.getElementById('aboutme')
let article = $.querySelector('article')

try {
    aboutme.addEventListener('click', () => {
        article.innerHTML = ''
        let pElmemnt = $.createElement('div')
        article.append(pElmemnt)
        pElmemnt.innerHTML = `<h1 class='topic' >About me</h1>
        <p class='details'>hi there my name is javad mousavi , im a junior front-end developer , addicted to coding and excited to make big moves in this world of <b>Incredibles</b> , wish me lock and enjoy the website. </p>
        `
    })
    contact.addEventListener('click', () => {
        article.innerHTML = ''
        let divElmemnt = $.createElement('div')
        article.append(divElmemnt)
        divElmemnt.innerHTML = `<h1 class='topic' >Contact</h1>
        <p class='details'>My gmail address : mousavi09371784715@gmail.com</p>
        `
    })
    sourcs.addEventListener('click', () => {
        article.innerHTML = ''
        let divElmemnt = $.createElement('div')
        article.append(divElmemnt)
        divElmemnt.innerHTML = `<h1 class='topic' >Source</h1>
        <p class='details'>"Free Dictionary API"<br><br><a class = 'link' href = 'https://dictionaryapi.dev/'>
        https://dictionaryapi.dev</a></p>
        `
    })
$.addEventListener('scroll' , () => {
    if ($.documentElement.scrollTop > 500) {
        head.classList.add('scrollheader-container')
        btnScroll.classList.add('btn-scroll')
    }else{
        head.classList.remove('scrollheader-container')
        btnScroll.classList.remove('btn-scroll')
    }
})
btnScroll.addEventListener('click', () => {
    scrollTo({
        top : 20,
        left : 5,
        behavior : "smooth",
    })})
home.addEventListener('click', () => {
    scrollTo({
        top : 20,
        left : 5,
        behavior : "smooth",
    })})
}catch (error) {
    console.log(error)
}finally {
    console.log('...')
}

// ------------ DICTIONARY PROGRAM ------------
let wordSearch = $.getElementById('input1')
let btnElmSearch = $.getElementById('input2')
let btnElmRelaod = $.getElementById('input3')
btnElmRelaod.addEventListener('click', () => {
    location.reload()
})
btnElmSearch.addEventListener('click', () => {
    dictionary(wordSearch.value)
    article.innerHTML = ''
    wordSearch.value = ''
})
async function dictionary(word) {
    try {
        let myApi = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        let wordSearch = await myApi.json()
        console.log(wordSearch)
        const element = $.createElement('div')
        article.append(element)
        element.innerHTML = `
            <h2 class='topic'>Word :</h2>
            <h3 class='details'>" ${wordSearch[0].word} "</h3>
            `

            let phonetics = $.createElement('div')
            article.append(phonetics)
            phonetics.innerHTML = `<h2 class='topic'>Phonetics :</h2>`
            for (let index = 0; index < wordSearch[0].phonetics.length; index++) {
                const div = $.createElement('div')
                article.append(div)
                div.innerHTML = `
                <p class='details'>${wordSearch[0].phonetics[index].text}</p>
                `
            }
            
            
            let sound = $.createElement('div')
            article.append(sound)
            sound.innerHTML = `<h2 class='topic'>How to spell ? </h2>`
            for (let index = 0; index < wordSearch[0].phonetics.length; index++) {
                const div = $.createElement('div')
                article.append(div)
                if (wordSearch[0].phonetics[index].audio == '') {
                    div.innerHTML = ''
                }else{
                div.innerHTML = `
                <audio controls>
                <source src="${await wordSearch[0].phonetics[index].audio}" type="audio/mp3">
                </audio>
                `
                }
            }
            

            let Synonyms = $.createElement('div')
            article.append(Synonyms)
            if (wordSearch[0].meanings[0].synonyms == '') {
                Synonyms.innerHTML = ''
            }else{
            Synonyms.innerHTML = `<h2 class='topic'>Synonyms :</h2>`}
            for (let l = 0; l < wordSearch.length; l++) {
                for (let s = 0; s < wordSearch[l].meanings.length; s++) {
                    for (let i = 0; i < wordSearch[l].meanings[s].synonyms.length; i++) {
                        const div = $.createElement('div')
                        article.append(div)
                        div.innerHTML = `
                        <ul> 
                        <li class='details'>${await wordSearch[l].meanings[s].synonyms[i]}</li>
                        </ul>
                        `
                    }
                }
            }


            let definitions = $.createElement('div')
            article.append(definitions)
            definitions.innerHTML = `<h2 class='topic'>Definitions :</h2>`
            for (let l = 0; l < wordSearch.length; l++) {
                for (let s = 0; s < wordSearch[l].meanings.length; s++) {
                    for (let i = 0; i < wordSearch[l].meanings[s].definitions.length; i++) {
                        const div = $.createElement('div')
                        article.append(div)
                        div.innerHTML = `
                        <ul> 
                        <li class='details'>${wordSearch[l].meanings[s].definitions[i].definition}</li><br><hr>
                        </ul>
                        `
                    }
                }
            }


            let example = $.createElement('div')
            article.append(example)
            example.innerHTML = `<h2 class='topic'Example :</h2>`
            for (let l = 0; l < wordSearch.length; l++) {
                for (let s = 0; s < wordSearch[l].meanings.length; s++) {
                    for (let i = 0; i < wordSearch[l].meanings[s].definitions.length; i++) {
                        const div = $.createElement('div')
                        article.append(div)
                        if (wordSearch[l].meanings[s].definitions[i].example == undefined) {
                            div.innerHTML = ''
                        }else{
                        div.innerHTML = `
                        <ul> 
                        <li class='details'>${wordSearch[l].meanings[s].definitions[i].example}</li><br><hr>
                        </ul>
                        `
                        }
                    }
                }
            }

    }catch(error) {
        console.log(error)
    }finally{
        console.log('Everything is fine ...')
    }
         
}
// ------------ THEME CHANGE ------------
let modeColor = $.getElementById('modeColor')
let isStatus = localStorage.getItem('status')

console.log(isStatus)

if (isStatus != null) {
    modeColor.classList.toggle('light')
    head.classList.toggle('header-container-darkMode')
    body.classList.toggle('body-darkMode')
    btnScroll.classList.toggle('btnDarkmode')
    modeColor.src = './assets/img/dark&light.png'
}

modeColor.addEventListener('click' , () => {
    let isStatus = localStorage.getItem('status')

    if (isStatus != null) {
        localStorage.removeItem('status')
    }else{
        localStorage.setItem('status', 'dark')
        }

        modeColor.classList.toggle('light')
        head.classList.toggle('header-container-darkMode')
        body.classList.toggle('body-darkMode')
        btnScroll.classList.toggle('btnDarkmode')
        modeColor.src = './assets/img/dark&light.png'
    })

console.log(isStatus)

