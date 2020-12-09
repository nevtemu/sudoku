const cells = []
let m, p=0;
for (let i = 0; i< 9; i++){//rowns
    for (let k = 0; k< 9; k++){//columns
        m = Math.floor(k/3)+(Math.floor(i/3)*3)+1; //нумерация квадратов
        cells.push(`${i}${k}${m}`)
    }  
}
let obj={}//convert array to object
for (const key of cells) {
    obj[`${key}_`] = 0;
}

//fill object with numbers
obj['001_'] = Math.floor(Math.random() * (9 - 1)) + 1;

for (let z=1; z<81; z++){
        let again = true;
    do{
        obj[`${cells[z]}_`]++ //increment value of the current cell
        if (obj[`${cells[z]}_`] === 10){ // if all values checked - no possible answer
                obj[`${cells[z]}_`] = 0   //reset current cell
                z-=2; //move to previous cell
                again = false;
                } 
        console.log(checkVariant(cells[z]))
        if (checkVariant(cells[z])){again = false}} // if OK - move next cell
    while(again)
}

function checkVariant (param){
    let a = param.split('')
    let checkRow = new RegExp("^"+a[0]+'[0-9]{2}[_]$');
    let checkColumn = new RegExp("^[0-9]"+a[1]+'[0-9][_]$');
    let checkBox = new RegExp("^[0-9]{2}"+a[2]+'[_]$');

    let unavailableNumbers =[]
    const filteredByValue = Object.fromEntries(Object.entries(obj).filter(([key, value]) => checkBox.test(key) && key!==`${param}_`))
 for (const [key, value] of Object.entries(filteredByValue)) {
     if (Number.isFinite(value)){
             unavailableNumbers.push(value)
     }
  }
  const filteredByValue1 = Object.fromEntries(Object.entries(obj).filter(([key, value]) => checkRow.test(key) && key!==`${param}_`))
for (const [key, value] of Object.entries(filteredByValue1)) {
   if (Number.isFinite(value)){
           unavailableNumbers.push(value)
   }
}
const filteredByValue2 = Object.fromEntries(Object.entries(obj).filter(([key, value]) => checkColumn.test(key) && key!==`${param}_`))
for (const [key, value] of Object.entries(filteredByValue2)) {
   if (Number.isFinite(value)){
           unavailableNumbers.push(value)
   }
}
if (unavailableNumbers.includes(obj[`${param}_`])){return false} 
else {return true}
}


//HTML generation of sudoku field
const place = document.getElementById('tablet')
for (element in obj){
    place.innerHTML+=`<div id="${element}">${obj[element]}</div>`
}

