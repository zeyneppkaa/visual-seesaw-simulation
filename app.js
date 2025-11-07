const clickableArea = document.querySelector(".clickable-area")
const seesawContainer = document.querySelector(".seesaw-container");
const plank = document.querySelector(".plank");
const nextWeightDisplay = document.getElementById("nextWeight");

let nextWeight = createRandomWeight();
nextWeightDisplay.textContent = nextWeight + " kg";

const colors = ["red", "blue", "yellow", "green", "orange", "purple", "pink", "gray"]

// generate random weight 
function createRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

clickableArea.addEventListener("click", function (event) {

    const seesawRect = seesawContainer.getBoundingClientRect();

    const localX = event.clientX - seesawRect.left;
    createWeightObject(localX);

    nextWeight = createRandomWeight();
    nextWeightDisplay.textContent = nextWeight + " kg";
});


// create weight object
function createWeightObject(x) {

    const obj = document.createElement("div");
    obj.classList.add("weight-object");
    obj.textContent = nextWeight + "kg";

    const size = 28 + nextWeight * 3;
    obj.style.width = size + "px";
    obj.style.height = size + "px";
    obj.style.lineHeight = size + "px";

    obj.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    obj.style.left = (x + (size / 2)) + "px";
    obj.style.top = "50%"; 

    seesawContainer.appendChild(obj);
}
