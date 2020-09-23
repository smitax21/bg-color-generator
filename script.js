var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("body");
var nameGradient = document.getElementById("nameGradient");
var randomizerBtn = document.getElementById("randomizerBtn");
var slider = document.getElementById("myRange");
var currentSliderValue = document.getElementById("currentSliderValue");
var customAngle = document.getElementById("customAngle");
var saveGradient = document.getElementById("saveGradient");
var previewBtn = document.getElementsByClassName("previewBtn");
var cssCode = document.getElementsByClassName("cssCode");
var body = document.getElementById("main");
var previewContainer = document.getElementById("previewContainer");
var span = document.querySelector("span");

// SAVE GRADIENTS to Local Storage

var ul = document.getElementById("ul");
var itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

localStorage.setItem("items", JSON.stringify(itemsArray));
var data = JSON.parse(localStorage.getItem("items"));

var liMaker = (text) => {
    var li = document.createElement("li");
    // li.textContent = text;
    li.className = "li displayFav liCssEffect";
    li.style.background = text;

    var cssCode = document.createElement("p");
    cssCode.textContent = text;
    cssCode.className = "cssCode";
    li.appendChild(cssCode);

    var createA = document.createElement("a");
    createA.setAttribute("href", "#main");

    var previewBtn = document.createElement("button");
    var namePreviewBtn = document.createTextNode("Preview");
    previewBtn.appendChild(namePreviewBtn);
    previewBtn.className = "previewBtn btn btn-primary btn-sm";

    createA.appendChild(previewBtn);
    li.appendChild(createA);
    ul.appendChild(li);

    previewBtnFunction();
    clickToCopy();
};

function addGradientToList() {
    itemsArray.push(span.innerHTML);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    liMaker(span.innerHTML);
    alert("Added to Favourites!");
}

data.forEach((item) => {
    liMaker(item);
});

deleteAllBtn.addEventListener("click", function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    itemsArray = [];
});

// End of Save GRADIENTS to Local Storage

function colorInput() {
    body.style.background = "linear-gradient(" + slider.value + "deg, " + color1.value + ", " + color2.value + ")";

    nameGradientDisplay();
}

function nameGradientDisplay() {
    nameGradient.innerHTML = "linear-gradient(" + slider.value + "deg, " + color1.value + ", " + color2.value + ")";
}

nameGradientDisplay();

function randomizeColor() {
    var randomColor1 = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });
    var randomColor2 = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });

    body.style.background = "linear-gradient(" + slider.value + "deg, " + randomColor1 + ", " + randomColor2 + ")";

    color1.value = randomColor1;
    color2.value = randomColor2;

    nameGradientDisplay();
    clickToCopy();
}

function randomizeAngle() {
    // alert(slider.value);
    body.style.background = "linear-gradient(" + slider.value + "deg, " + color1.value + ", " + color2.value + ")";

    nameGradient.innerHTML = "linear-gradient(" + slider.value + "deg, " + color1.value + ", " + color2.value + ")";

    customAngle.value = slider.value;
}

function customAngleRot() {
    if (customAngle.value <= 360 && customAngle.value >= 0) {
        body.style.background = "linear-gradient(" + customAngle.value + "deg, " + color1.value + ", " + color2.value + ")";

        nameGradient.innerHTML = "linear-gradient(" + customAngle.value + "deg, " + color1.value + ", " + color2.value + ")";

        slider.value = customAngle.value;
    } else {
        alert("Please Input between 0 to 360");
    }
}

function previewBtnFunction() {
    for (var i = 0; i < previewBtn.length; i++) {
        previewBtn[i].onclick = function () {
            body.style.background = this.parentNode.parentNode.childNodes[0].innerHTML;
            nameGradient.innerHTML = this.parentNode.parentNode.childNodes[0].innerHTML;
        };
    }
}

// Start of Copy text

var copyToClipBoard = (str) => {
    var el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

function clickToCopy() {
    for (var i = 0; i < cssCode.length; i++) {
        cssCode[i].onclick = function () {
            var copyText = this.textContent;
            copyToClipBoard(copyText);
            alert("Copied: " + copyText);
        };
    }
}

function copySpanText() {
    copyToClipBoard(span.textContent);
    alert("Copied: " + span.textContent);
}

// End of Copy Text

color1.addEventListener("input", colorInput);
color2.addEventListener("input", colorInput);
randomizerBtn.addEventListener("click", randomizeColor);
slider.addEventListener("input", randomizeAngle);
customAngle.addEventListener("input", customAngleRot);
saveGradient.addEventListener("click", addGradientToList);
span.addEventListener("click", copySpanText);
