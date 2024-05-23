const $ = document
const resultElem = $.getElementById('result')
const btn = $.getElementById('search-btn')
const input = $.getElementById('inp-word')
const audio = $.getElementById('sound')

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/<word>'

btn.addEventListener('click', () => {
   let inputWord = input.value
   fetch(`${url}${inputWord}`) 
    .then(res => res.json())
      .then(data => {
        let datas = data[0]
        resultElem.innerHTML =`
        <div class="word">
        <h3>${datas.word}</h3>
        <button onclick="playSound">
          <i class="fas fa-volume-up"></i>
        </button>
        </div>
        <div class="details">
          <p>${datas.meanings[0].partOfSpeech}</p>
          <p>${datas.phonetic}</p>
        </div>
        <p class="word-meaning">
          ${datas.meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
          ${datas.meanings[0].definition[0].example || ""}
        </p>`

        audio.setAttribute('src', datas.phonetics.audio)
      })
      .catch(() => {
        resultElem.innerHTML = `<h3>Counld't find the word</h3>`
      })
})

function playSound() {
  audio.play()
}