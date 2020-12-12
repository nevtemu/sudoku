//In sudoku numbers must be uniques in each box, row and column

//Create array of cells ids. Id consist of 3 digits:
// first - row number (0 to 8) - starts with 0 to iterate easier later
// seconf - box number (1 to 9) - top to bottom, left to right 9 boxes of 3x3 numbers
// third - column number (0 to 8) - starts with 0 to iterate easier later
const cells = [];
let m;
for (let i = 0; i< 9; i++){//rowns
    for (let k = 0; k< 9; k++){//columns
        m = Math.floor(k/3)+(Math.floor(i/3)*3)+1; //boxes
        cells.push(`${i}${m}${k}`)
    }  
}
//Convert array into object and set values to 0 - this will be start of backtrack iteration later
let coordinates={}
for (const key of cells) {
    coordinates[`${key}_`] = 0;
}
// shuffleArray(cells);
// first cell (010) number will generate randomly to get unique set each time
coordinates[`${cells[0]}_`] = getRandom(1,9);
// fill the rest of numbers. Using backtracking if no solution
for (let z=1; z<81; z++){
        let again = true;
        do{
                coordinates[`${cells[z]}_`]++ //increment value of the current cell
                if (coordinates[`${cells[z]}_`] === 10){ // if all values checked - no possible answer
                        coordinates[`${cells[z]}_`] = 0   //reset current cell
                        z-=2; //move to previous cell
                        again = false;
                } 
                if (checkVariant(cells[z])){again = false}} // if OK - move next cell
        while(again)
}

function checkVariant (param){ //This function checks current cell value agains values of other cells in this row, column and box
    let a = param.split('')
    let checkRow = new RegExp("^"+a[0]+'[0-9]{2}[_]$');
    let checkBox = new RegExp("^[0-9]"+a[1]+'[0-9][_]$');
    let checkColumn = new RegExp("^[0-9]{2}"+a[2]+'[_]$');
    let unavailableNumbers =[]
    const filteredByValue = Object.fromEntries(Object.entries(coordinates).filter(([key, value]) => checkBox.test(key) && key!==`${param}_`))
        for (const [key, value] of Object.entries(filteredByValue)) {
                if (Number.isFinite(value)){unavailableNumbers.push(value)}
        }
    const filteredByValue1 = Object.fromEntries(Object.entries(coordinates).filter(([key, value]) => checkRow.test(key) && key!==`${param}_`))
        for (const [key, value] of Object.entries(filteredByValue1)) {
                if (Number.isFinite(value)){unavailableNumbers.push(value)}
        }
    const filteredByValue2 = Object.fromEntries(Object.entries(coordinates).filter(([key, value]) => checkColumn.test(key) && key!==`${param}_`))
        for (const [key, value] of Object.entries(filteredByValue2)) {
                if (Number.isFinite(value)){unavailableNumbers.push(value)}
        }
    if (unavailableNumbers.includes(coordinates[`${param}_`])){return false} 
    else {return true}
}

//HTML generation of sudoku field
const place = document.getElementById('tablet')
for (element in coordinates){
    place.innerHTML+=`<div class="cell" id="${element}"><p>${coordinates[element]}</p></div>`
}
//Remove some of the cells values to according to set game difficulty
const removeCells = (difficulty) => {
let arrShuffle = Object.keys(coordinates);
shuffleArray(arrShuffle);
let slicedArray = arrShuffle.slice(0, difficulty);
slicedArray.forEach((item)=> document.getElementById(item).innerHTML="");
}

function shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
                let j = getRandom(0, array.length);
                [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
}
function getRandom (min, max){return Math.floor(Math.random() * (max - min)) + min;}
removeCells(28)