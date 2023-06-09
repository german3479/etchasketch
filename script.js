const defSize = 16;

const resetBtn = document.querySelector('.reset-btn');
const gridContainer = document.querySelector('.grid-container')

let currentState = 'default';

function handleMouseOver(e){
    const item = e.target;
    switch (currentState) {
        case 'darken':
            //code
            break;
        case 'rainbow':
            //code
            break;
        case 'color-pick':
            //code;
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
