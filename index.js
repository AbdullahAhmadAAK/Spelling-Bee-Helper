
let words_list = [];
let time_delay = 4000; // 4s
let number_repeats = 1; 


const addWord = () => {
    const new_word = document.getElementById("new_word").value;
    var add_word_input_element = document.getElementById("new_word");
    if(phoneticsExist("https://api.dictionaryapi.dev/api/v2/entries/en/"+new_word))
    {
        words_list.push(new_word);
        renderList();
        clearInputs();
    } else {
        let error_msg = "Error: Audio not found for this word!";
        add_word_input_element.style.backgroundColor = "#FF7276";
        add_word_input_element.value = "";
        add_word_input_element.setAttribute("placeholder", error_msg);
    }

    
}
async function phoneticsExist (url) {
    const response = await fetch(url);
    var data = await response.json();
    if(data[0].phonetics == null || data[0].phonetics == "")
        return false;
    else
        return true;
}
const addWordsList = () => {
    const input_words_list = document.getElementById("new_words_list").value;
    let words_array = [];
    if(input_words_list.includes(",")){
        words_array = input_words_list.split(",");
    }
    else if(input_words_list.includes(" ")){
        words_array = input_words_list.split(" ");
    }
    else{
        words_array = [input_words_list];
    }
    words_list = words_array;
    renderList();
    clearInputs();
}
const clearInputs = () => {
    document.getElementById("new_word").value = "";
    document.getElementById("new_words_list").value = "";
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
    words_list.forEach((word, idx) => {
        listitems_html += "<li class='list-group-item bg-info d-flex align-items-center'><div class='col text-start' id='listword"+idx+"'>"+word+"</div><div class='col text-end'><button class='btn btn-sm btn-warning mx-1' id='edit-update-btn-"+idx+"' onclick='toggleEditWord("+idx+")'>Edit</button><button class='btn btn-sm btn-danger mx-1' onclick='deleteWord("+idx+")'>Delete</button></div></li>";
    });
    document.getElementById("words_list").innerHTML = listitems_html;
    document.getElementById("number-words").innerHTML = "("+words_list.length+")";
}
const removeList = () => {
    words_list = [];
    localStorage.setItem("wordsArray", JSON.stringify(words_list));
    renderList();
}
const renderListHidden = () => {
    var listitems_hidden_html = "";
    words_list.forEach(word => {
        listitems_hidden_html += "<li class='list-group-item bg-info'>********</li>";
    });
    document.getElementById("words_list").innerHTML = listitems_hidden_html;
    document.getElementById("number-words").innerHTML = "("+words_list.length+")";
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
const toggleEditWord = (search_idx) => {
    var editBtn = document.getElementById("edit-update-btn-"+search_idx);
    editBtn.outerHTML = "<button class='btn btn-sm btn-warning mx-1' id='edit-update-btn-"+search_idx+"' onclick='editWord("+search_idx+")'>Update</button>";
    
    var inputField = document.getElementById("listword"+search_idx);
    inputField.outerHTML = "<input type='text' id='listword"+search_idx+"'>";
}
const editWord = (search_idx) => {
    let updated_word = document.getElementById("listword"+search_idx).value;
    words_list[search_idx] = updated_word;
    renderList();
}
const deleteWord = (search_idx) => {
    words_list.splice(search_idx, 1);
    renderList();
}
const listen_button = document.getElementById("play-audio");
listen_button.onclick = async function () {

    /* NEW LOGIC (different response format for each) */

    // if 1st api has phonetics, recite that
    // if not, then recite from 2nd api phonetics,
    // if not, then recite from 3rd api phonetics

    // generate a random index
    const randomIndex = Math.floor(Math.random() * words_list.length);

    reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/"+words_list[randomIndex]);
    setTimeout( () => {
            reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/"+words_list[randomIndex]);
            words_list.splice(randomIndex, 1);
            renderListHidden();
        }, 
        4000
    );


};

// not working
const listen_all_button = document.getElementById("play-all-audios");
listen_all_button.onclick = async function () {

    for( const word of words_list){
        for (let i = 0; i <= number_repeats; i++) {
            await reciteWord("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
            if (i < number_repeats) {
                await sleep(time_delay); // Gap of 4 seconds between repetitions
            }
        }
        words_list.splice(words_list.indexOf(word), 1);
        renderList();
        await sleep(time_delay);
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, time_delay));
}

async function reciteWord(url) {

    const response = await fetch(url);
    const data = await response.json();

    const mp3Src = data[0].phonetics[0].audio;
    
    const audioElement = new Audio(mp3Src);
    
    audioElement.addEventListener("ended", () => {
        audioElement.remove(); // Remove the audio element after playback ends
    });
    
    audioElement.play();
}

const saveConfig = () => {

    // input validation

    // if no error
    number_repeats = document.getElementById("number-repeats").value;
    time_delay = document.getElementById("seconds-delay").value * 1000;
    
    setTimeout(() => {
        $('#exampleModal').modal('hide');
    }, 2000);

    
    // const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    // modal.hide(); // Close the modal
}