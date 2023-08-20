
let words_list = [];


const addWord = () => {
    const new_word = document.getElementById("new_word").value;
    words_list.push(new_word);
    renderList();
    clearInputs();
}
const addWordsList = () => {
    const input_words_list = document.getElementById("new_words_list").value;
    let words_array = input_words_list.split(",");
    words_list = words_array;
    renderList();
    clearInputs();
}
const clearInputs = () => {
    document.getElementById("new_word").value = "";
    document.getElementById("new_words_list").value = "";
}
async function reciteWord(url) {
    const response = await fetch(url);
    var data = await response.json();

    console.log(data[0].phonetics[0].audio); // this is string for mp3 file
    const mp3_src = data[0].phonetics[0].audio;

    const sound_box_element = document.getElementById("sounds-zone");

    const audio_element = document.createElement("audio");
    audio_element.setAttribute("autoplay", "");
    // audio_element.setAttribute("controls", "");

    const source_element = document.createElement("source");
    source_element.setAttribute("src", mp3_src);
    source_element.setAttribute("type", "audio/mp3");

    audio_element.appendChild(source_element);
    sound_box_element.appendChild(audio_element);
}
const saveList = () => {
    localStorage.setItem("wordsArray", JSON.stringify(words_list));
};
const restoreList = () => {
    words_list = JSON.parse(localStorage.getItem("wordsArray"));
    renderList();
};
const renderList = () => {
    var listitems_html = "";
    words_list.forEach(word => {
        listitems_html += "<li>"+word+"</li>";
    });
    document.getElementById("words_list").innerHTML = listitems_html;
}
const removeList = () => {
    words_list = [];
    localStorage.setItem("wordsArray", JSON.stringify(words_list));
    renderList();
}
const renderListHidden = () => {
    var listitems_hidden_html = "";
    words_list.forEach(word => {
        listitems_hidden_html += "<li>**********</li>";
    });
    document.getElementById("words_list").innerHTML = listitems_hidden_html;
}
const exportList = () => {
    words_output = words_list.join(",");
    tooltip_element = document.getElementById("tooltip");
    navigator.clipboard.writeText(words_output);
    tooltip_element.classList.add("active");

    setTimeout(() => {
        tooltip_element.classList.remove("active");
    }, 2000);
}
const listen_button = document.getElementById("play-audio");
listen_button.onclick = async function () {

    /* NEW LOGIC (different response format for each) */

    // if 1st api has phonetics, recite that
    // if not, then recite from 2nd api phonetics,
    // if not, then recite from 3rd api phonetics


    reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/"+words_list[0]);
    setTimeout( () => {
        reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/"+words_list[0]);
        words_list.shift();
        renderListHidden();
        }, 
        4000
    );


};

// not working
const listen_all_button = document.getElementById("play-all-audios");
listen_all_button.onclick = async function () {
    words_list.forEach(word => {

        setTimeout(() => {
        
        
        /* NEW LOGIC (different response format for each) */
        
        // if 1st api has phonetics, recite that
        // if not, then recite from 2nd api phonetics,
        // if not, then recite from 3rd api phonetics


        reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
        setTimeout( () => {
            reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
            words_list.shift();
            renderListHidden();
            }, 4000);


        }, 5000);
        
    });
}
