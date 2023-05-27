//Basic beginning values/variables

const defVal = 16;
let userColumns;
let userRows;
//Button captures
const resetBtn = document.querySelector(".reset-btn");
const darkenBtn = document.querySelector(".darken-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");
const colorInput = document.querySelector(".color-input")

let color = "#000000"

//Grid setup
const typeBox = document.querySelector(".type-box");
const grid = document.querySelector(".grid-container");
let gridItems;

const changeColor = () => {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    color = `rgb(${r}, ${g}, ${b})`
}
const darkenColor = (e) => {
    gridItems.forEach((item) => {
      item.removeEventListener("mouseover", changeColor);
      item.addEventListener("mouseover", function () {
        let currColor = this.style.backgroundColor;
        if (currColor) {
          if (currColor.startsWith("rgb")) {
            currColor = hexToRgb(currColor);
          } else {
            currColor = currColor.trim();
            currColor = hexToRgb(currColor);
          }
          let r = parseInt(currColor.substring(4, currColor.indexOf(","))) * 0.9;
          let g = parseInt(
            currColor.substring(currColor.indexOf(",") + 2, currColor.lastIndexOf(","))
          ) * 0.9;
          let b = parseInt(currColor.substring(currColor.lastIndexOf(",") + 2, currColor.length - 1)) * 0.9;
          this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
      });
    });
  };
  


const hexToRgb = (color) =>{
    if (color.startsWith('rgb')){
        return color;
    } else if (color[0] === '#'){
    const r = parseInt(color.substring(1,3), 16) 
    const g = parseInt(color.substring(3,5), 16)
    const b = parseInt(color.substring(5,7), 16)

    return `rgb(${r}, ${g}, ${b})`
}}

let createGridItems = (dimension = defVal) => {
    let childrenArray = Array.from(grid.children);

    if (childrenArray.length){
        childrenArray.forEach(child =>{
            child.remove()
        })
    }
    const numItems = dimension ** 2;
    const containerWidth = grid.clientWidth;
    const squareSize = containerWidth / dimension;

    grid.style.gridTemplateColumns = `repeat(${dimension}, ${squareSize}px)`
    grid.style.gridTemplateRows = `repeat(${dimension}, ${squareSize}px)`;

    for (let i = 0; i < numItems; i++){
        let newItem = document.createElement('div');
        newItem.classList.add('grid-item')
        grid.append(newItem);
    }

    gridItems = document.querySelectorAll(".grid-item");
}

createGridItems();

resetBtn.addEventListener('click', () =>{
    let newAmnt = prompt("How many new items do you want?")

    createGridItems(newAmnt || 16)
})

darkenBtn.addEventListener('click', () =>{
    gridItems.forEach(item => {
        item.removeEventListener('mouseover', changeColor)
        item.addEventListener('mouseover', darkenColor)
    })
})
rainbowBtn.addEventListener('click', () =>{
    gridItems.forEach(item =>{
        item.removeEventListener('mouseover', darkenColor)
        item.addEventListener('mouseover', changeColor);
    })
})
colorInput.addEventListener('change', e =>{
    gridItems.forEach(item => item.removeEventListener('mouseover', changeColor))
    color = e.target.value;
})
grid.addEventListener('mouseover', e => {
    if (e.target.classList.contains("grid-item")){
        e.target.style.backgroundColor = color;
    }
})
