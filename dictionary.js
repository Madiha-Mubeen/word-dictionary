const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    const inpWord = document.getElementById("inp-word").value.trim();

    if  (!inpWord) {
        result.innerHTML =`<h3 class="error"> Please do enter the word to search</h3>`;
        return;
    }
    
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound()">
                <i class="fas fa-volume-up" style="color: #3f8a42; font-size: 1.9rem; cursor: pointer;"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;
        const audioSrc = data[0].phonetics[0]?.audio;
        if (audioSrc) {
            sound.setAttribute("src", audioSrc);
        } else {
            sound.removeAttribute("src");
        }
    })
     .catch(() => {
        result.innerHTML = `<h3 class="error">OOPs! could not find the word</h3>`;
     });
});
function playSound() {
   if (sound.src) {
    sound.play();
   }
}