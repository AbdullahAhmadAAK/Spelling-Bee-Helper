let model_width = 0
let model_height = 0
let widthtoheight_ratio = 0.0

const savePixels = () => {
    model_width = document.getElementById("model_width").value
    model_height = document.getElementById("model_height").value

   document.getElementById("resized_width").value = model_width
   document.getElementById("resized_height").value = model_height

   widthtoheight_ratio = model_width/model_height
   console.log(widthtoheight_ratio)
}

let widthInputElement = document.getElementById("resized_width");
let heightInputElement = document.getElementById("resized_height");

widthInputElement.addEventListener("input", function() {
    // Get the current value of the input
    var newWidth = widthInputElement.value;

    // change height accordingly
    heightInputElement.value = newWidth / widthtoheight_ratio
    
});

heightInputElement.addEventListener("input", function() {
    // Get the current value of the input
    var newHeight = heightInputElement.value;

    // change width accordingly
    widthInputElement.value = newHeight * widthtoheight_ratio
});