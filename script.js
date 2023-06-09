const defSize = 16;

const resetBtn = document.querySelector('.reset-btn');
const gridContainer = document.querySelector('.grid-container')
const typeBox = document.querySelector('.type-box');
const timer = document.querySelector('.currentDate');

let currentState = 'default';

function handleMouseOver(e){
    const item = e.target;
    switch (currentState) {
        case 'darken':
            let bgc = item.style.backgroundColor;

            if (!bgc || bgc === 'null'){
                bgc = 'rgb(238, 238, 238)';
            }
            const rgb = bgc.match(/\d+/g);
            let [r, g, b] = rgb.map(Number);
            
            r *= 0.9;
            g *= 0.9;
            b *= 0.9;

            item.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break;
        case 'rainbow':
            const rV = Math.floor(Math.random() * 256);
            const gV = Math.floor(Math.random() * 256);
            const bV = Math.floor(Math.random() * 256);

            item.style.backgroundColor = `rgb(${rV}, ${gV}, ${bV})`;
            break;
        case 'color-pick':
            const color = document.querySelector(".color-input").value;
            item.style.backgroundColor = color;
            break;
        default:
            item.style.backgroundColor = "black";
            break;
    }
}

function createNewGrid(size = defSize){
    const totalItems = size**2

    while (gridContainer.firstChild){
        gridContainer.firstChild.remove()
    }

    gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, minmax(0, 1fr))`;

    for (let i = 0; i < totalItems; i++){
        const item = document.createElement('div')
        item.classList.add('grid-item');
        item.addEventListener('mouseover', handleMouseOver)
        gridContainer.appendChild(item);
    }

}


createNewGrid()

resetBtn.addEventListener('click', () =>{
    let newSize = parseInt(prompt('Enter new grid size: '));

    newSize = Math.min(newSize, 100);

    createNewGrid(newSize)
})
typeBox.addEventListener('click', function(e){
    const target = e.target;

    switch (true) {
        case target.classList.contains('darken-btn'):
            currentState = 'darken';
            break;
        case target.classList.contains('rainbow-btn'):
            currentState = 'rainbow';
            break;
        case target.classList.contains('color-input'):
            currentState = 'color-pick';
            break;
        default:
            break;
    }
})

// Set time:
function setTime(){
    let currentDate = new Date()

    let month = currentDate.toLocaleString('default', {month: 'short'})
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();

    let displayDate = `${month} ${day}, ${year}`;

    timer.textContent = displayDate;
}

setTime()
