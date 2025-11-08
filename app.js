const clickableArea = document.querySelector(".clickable-area");
const seesawContainer = document.querySelector(".seesaw-container");
const plank = document.querySelector(".plank");
const nextWeightDisplay = document.getElementById("nextWeight");
const seesawRect = seesawContainer.getBoundingClientRect();
const plankRect = plank.getBoundingClientRect();

let nextWeight = createRandomWeight();
nextWeightDisplay.textContent = nextWeight + " kg";

const colors = ["red", "blue", "yellow", "green", "orange", "purple", "pink", "gray"];
let weights = [];
let currentAngle = 0;
let targetAngle = 0;

// generate random weight
function createRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

clickableArea.addEventListener("click", function (event) {
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

    obj.style.left = (x + size / 2) + "px";
    obj.style.top = "50%";

    seesawContainer.appendChild(obj);
    weights.push({ x: x, weight: nextWeight, element: obj, currentTop: seesawContainer.clientHeight / 2 });
    updateSeesaw();
}

// calculate physics
function updateSeesaw() {
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

    targetAngle = Math.max(-30, Math.min(30, totalMoment / 10));

    document.getElementById("tiltAngle").textContent = targetAngle.toFixed(1) + "°";
    document.getElementById("leftWeight").textContent = leftSum + " kg";
    document.getElementById("rightWeight").textContent = rightSum + " kg";
}

// smooth animation
function animate() {
    currentAngle += (targetAngle - currentAngle) * 0.1;
    plank.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;

    const pivotX = plankRect.left - seesawRect.left + plankRect.width / 2;
    const centerY = plankRect.top - seesawRect.top + plankRect.height / 2;
    const rad = currentAngle * Math.PI / 180;

    weights.forEach(obj => {
        const dx = obj.x - pivotX;
        const targetTop = centerY + Math.tan(rad) * dx;
        obj.currentTop += (targetTop - obj.currentTop) * 0.8;
        obj.element.style.top = obj.currentTop + "px";
    });

    requestAnimationFrame(animate);
}

animate();
