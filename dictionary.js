
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

const wordList = ["serendipity", "ephemeral", "mellifluous", "sonder", "effervescent", "ethereal", "luminescence", "halcyon", "petrichor"];

function getRandomWord() {
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem("wordOfTheDay"));

    if (savedData && savedData.date === today) {
        return savedData.word;
    }
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    localStorage.setItem("wordOfTheDay", JSON.stringify({ date: today, word: randomWord }));
    return randomWord;
}
function loadWordOfTheDay() {
    const word = getRandomWord();
    fetch(`${url}${word}`)
    .then(res => res.json())
    .then(data => {
        const wordData = data[0];
        const meanings = wordData.meanings[0];

        examples = meanings.definitions.map(def => def.example).filter(Boolean);

        let examplesHTML = "";
        if(examples.length > 0) {
            examplesHTML = `
            <h4>.e.g sentences:: </h4>
            <ul>
                ${examples.map(ex => `<li>${ex}</li>`).join("")}
            </ul>`;
        }
        result.innerHTML = `
        <h2> New Word Everyday: <em>${word}</em></h2>
        <div class="details">
            <p>${meanings.partOfSpeech}</p>
            <p>${wordData.phonetic || ''}/</p>
        </div>
        <p class="word-meaning">${meanings.definitions[0].definition}</p>
        <p class="word-example">${meanings.definitions[0].example || ''}</p>
        ${examplesHTML}`;
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">OOPs!!! Could not able to load <strong><i>Word Of Every Day</i></strong></h3>`;
    });
}
loadWordOfTheDay();




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

const petalImages = [
    "flower.png",
    "flower1.png",
    "flower2.png",
    "rose1.png",
    "star-anise.png"
];

let petalInterval;
let petalsAreFalling = true;

function createPetal() { 
    const petal = document.createElement("img");
    petal.classList.add("petal");

    const randomIndex = Math.floor(Math.random() * petalImages.length);
    petal.src = petalImages[randomIndex];

    petal.style.left = Math.random() * window.innerWidth + "px";
    const size = Math.random() * 30 + 20;
    petal.style.width = `${size}px`;

    const fallDuration = Math.random() * 4 + 6;
    petal.style.animationDuration = `${fallDuration}s, ${Math.random() * 2 + 3}s`;

    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.getElementById("falling-petals").appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, fallDuration * 1000);
}
function startPetals() {
    if (!petalInterval) {
        petalInterval = setInterval(createPetal, 200);
    }
}
function stopPetals() {
    clearInterval(petalInterval);
    petalInterval = null;
}

document.getElementById("toggle-petals").addEventListener("click", () => {
    if (petalsAreFalling) {
        stopPetals();
        document.getElementById("toggle-petals").textContent = "start flowers <3";
    } else {
        startPetals();
        document.getElementById("toggle-petals").textContent = "stop flowers :/";
    }
    petalsAreFalling = !petalsAreFalling;
});

document.getElementById("toggle-petals").classList.add("glow");


let examples = [];


