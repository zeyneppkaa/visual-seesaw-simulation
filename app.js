const clickableArea = document.querySelector(".clickable-area")
const seesawContainer = document.querySelector(".seesaw-container");
const plank = document.querySelector(".plank");
const nextWeightDisplay = document.getElementById("nextWeight");

let nextWeight = createRandomWeight();
nextWeightDisplay.textContent = nextWeight + " kg";

const colors = ["red", "blue", "yellow", "green", "orange", "purple", "pink", "gray"]
let weights = [];

// generate random weight 
function createRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

clickableArea.addEventListener("click", function (event) {
    const seesawRect = seesawContainer.getBoundingClientRect();
    const plankRect = plank.getBoundingClientRect();

    const clickedX = event.clientX - seesawRect.left;

    const plankX = plankRect.left - seesawRect.left;
    const plankStart = plankX;
    const plankEnd = plankX + plankRect.width;

    const clampedX = Math.max(plankStart, Math.min(clickedX, plankEnd));

    createWeightObject(clampedX);
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
    weights.push({ x: x, weight: nextWeight, element: obj });
    updateSeesaw();
}

function updateSeesaw(){
    const seesawRect = seesawContainer.getBoundingClientRect();
    const plankRect = plank.getBoundingClientRect();
    const pivotX = plankRect.left - seesawRect.left + (plankRect.width / 2);

    let totalMoment = 0;
    let leftSum = 0;
    let rightSum = 0;

    weights.forEach(obj => {
        const dist = obj.x - pivotX;
        totalMoment += obj.weight * dist;

        if (obj.x < pivotX) leftSum += obj.weight;
        else rightSum += obj.weight;
    });

    const angle = Math.max(-30, Math.min(30, totalMoment / 10));

    plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    document.getElementById("tiltAngle").textContent = angle.toFixed(1) + "°";
    document.getElementById("leftWeight").textContent = leftSum + " kg";
    document.getElementById("rightWeight").textContent = rightSum + " kg";

    const rad = angle * Math.PI / 180;
    const plankCenterY = plankRect.top - seesawRect.top + plankRect.height / 2;

    weights.forEach(obj => {
        const dx = obj.x - pivotX;
        const dy = Math.tan(rad) * dx;
        obj.element.style.top = (plankCenterY + dy) + "px";
    });
}