const container = document.querySelector('#container');
const slider = document.querySelector('#slider')
let oldSliderValue = slider.value; //used to detect changes in slider position.
const block = document.createElement('div');
block.className = 'block';
let root = document.documentElement;
// let blockWidth = 250 / slider.value;
// let containerWidth = slider.value * blockWidth;
let containerWidth = container.width
containerWidth = 800;
let oldContainerWidth = containerWidth;
let blockWidth = containerWidth / slider.value;
container.style.width = `${blockWidth * slider.value + 1}px`
let blockArray = []

root.style.setProperty('--blockWidth', blockWidth + 'px');
//root.style.setProperty('--containerWidth', containerWidth + 'px');
slider.addEventListener('mouseup', function () {
    if (oldSliderValue !== this.value) { //if slider position has changed, update blocks
        updateBlocks();
        oldSliderValue = this.value;
    }
});

function updateBlocks() {
    removeBlocks(); //remove old blocks from container div
    addBlocks(); //add new blocks
    resizeBlocks(); //scales blocks to fit within the container width in a 1:1 ratio grid
}

function addBlocks() {
    let blockClone;
    for (let i = 1; i <= slider.value ** 2; i++) { //add new blocks
        blockClone = block.cloneNode(true);
        container.appendChild(blockClone);
        //blockClone.textContent = i;
    }
    blockArray = Array.from(container.children)
    blockArray.forEach((el) => {
        // and for each one we add a 'click' listener
        el.addEventListener('mouseover', () => {
            el.style.backgroundColor = '#333333';
        });
    });
}
addBlocks(); //display blocks on page load.

function removeBlocks() {
    while (container.firstChild) { //while container has a child element
        container.removeChild(container.firstChild); //remove children elements
    }
}

function resizeBlocks() {
    blockWidth = containerWidth / slider.value;
    block.style.width = blockWidth;
    root.style.setProperty('--blockWidth', blockWidth + 'px');
}