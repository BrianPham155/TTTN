const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const icon = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) =>{
    for (const country_code in countries) {
        // selecting Vietnamese by defaul as from and japanese as to
        let selected;
        if(id == 0 && country_code == "vn-VN"){
            selected = "selected";
        }
        else if(id == 1 && country_code == "ja-JP"){
            selected="selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // adding countries to option
    }
});

//changing between 2 language 
exchangeIcon.addEventListener("click", () =>{
    let temText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = temText;
    selectTag[1].value = tempLang;
})

//Translate after click translate button
translateBtn.addEventListener("click", () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting fromSelect tag value
    translateTo = selectTag[1].value; // getting toSelect tag value
    if(text.trim() === ""){
        toText.value = "please enter the text"
    }else{
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl).then(res => res.json()).then(data => {
            toText.value = data.responseData.translatedText;
    })
    }
});

icon.forEach(icon =>{
    icon.addEventListener("click", ({target}) => {
        // if click copy icon id from, copy the fromtextarea value else copy the totextarea value
        if(target.classList.contains("fa-copy")) {
            if (target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } 
        // if click speak icon id from, speak the fromtextarea value else speak the totextarea value
        if (target.classList.contains("fa-volume-high")){
            let utterance;
            
            if (target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
                console.log(selectTag[0].value);
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
                console.log(selectTag[1].value);
            }
            speechSynthesis.speak(utterance);
        }
    })
})