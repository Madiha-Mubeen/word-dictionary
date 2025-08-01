const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word");
    value;
    fetch('${url}${unpWord}').then((response) => response.json()).then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
            <h3>${inpWord}</h3>
            <button>
                <i class="fas fa-volumn-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${data}[0]</p>
            <p>/sample/</p>
        </div>
        <p class="word-meaning">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, corrupti?
        </p>
        <p class="word-example">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, odit!
        </p>
        `
     });
});