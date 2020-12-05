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
    obj[`${key}_`] = key;
}
//create array 1..9 for number generation later
const etalon = [...Array(10).keys()]
etalon.shift()
//fill object with numbers
for (element in obj){
    let availableNumbers = [...etalon]
    let unavailableNumbers = [];
    let a = element.split('')
    // b = "("+a[0]+")";
    let checkRow = new RegExp("^"+a[0]+'[0-9]{2}[_]$',"g");
    let checkColumn = new RegExp("^[0-9]"+a[0]+'[0-9][_]$',"g");
    let checkBox = new RegExp("^[0-9]{2}"+a[0]+'[_]$',"g");
        for (one in obj){
        if (checkColumn.test(one)){
            if (Number.isFinite(obj[one])){
                unavailableNumbers.push(obj[one])
            }   
        }
    }
    for (one in obj){
        if (checkRow.test(one)){
            if (Number.isFinite(obj[one])){
                unavailableNumbers.push(obj[one])
            }   
        }
    }
    for (one in obj){
        if (checkBox.test(one)){
            if (Number.isFinite(obj[one])){
                unavailableNumbers.push(obj[one])
            }   
        }
    }


    console.log(unavailableNumbers)
    availableNumbers = availableNumbers.filter(val => !unavailableNumbers.includes(val));
    shuffle(availableNumbers)
    obj[element]=availableNumbers[0]
}
//HTML generation of sudoku field
const place = document.getElementById('tablet')
for (element in obj){
    place.innerHTML+=`<div id="${element}">${obj[element]}</div>`
}





function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
