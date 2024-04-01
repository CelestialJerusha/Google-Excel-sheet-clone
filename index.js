const tHeadRow = document.getElementById("table-heading");
const tBody = document.getElementById("table-body");
const currentCellHeading = document.getElementById('focused-cell');
const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underLineBtn = document.getElementById("underline-btn");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const centerBtn = document.getElementById("center-btn");
const fontStyleDropdown = document.getElementById("font-style");
const fontSizeDropdown = document.getElementById("font-size");
const bgColor = document.getElementById("bgColor");
const fontColor = document.getElementById("fontColor");
const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");
const uploadIp = document.getElementById("upload-input");
const sheetNo = document.getElementById("sheet-no");
const addSheetBtn = document.getElementById("add-sheet-btn");
const saveSheetBtn = document.getElementById("save-sheet-btn");
const btnContainer = document.getElementById("button-container");

const rows = 100;
const columns = 26;
let prevCellId;
let currentCell;
let cutCell;
let lastPressedBtn;
let matrix = new Array(rows);
let numSheets = 1;
let currentSheet = 1;
let prevSheet;
let arrMatrix = 'arrMatrix';

createMatrix();

if(localStorage.getItem(arrMatrix)){
    for(let i=1;i<JSON.parse(localStorage.getItem(arrMatrix)).length;i++){
        nextButtonFn(true);
    }
}


function createMatrix(){
    for(let row=0;row<rows;row++){
        matrix[row] = new Array(columns);
        for(let col=0;col<columns;col++){
            matrix[row][col] = {}; 
        }
    }
}

function colGen(typeOfCell,tableRow,isInnerText,rowNumber){
    for(let col=0;col<columns;col++){
        const cell = document.createElement(typeOfCell);
        if(isInnerText){
            cell.innerText = String.fromCharCode(col+65);
            cell.setAttribute('id', String.fromCharCode(col+65))
        }
        else{
            cell.setAttribute('id',`${String.fromCharCode(col+65)}${rowNumber}`)
            cell.setAttribute('contenteditable', 'true')
            cell.addEventListener('focus', event => onFocusFunction(event.target))
            cell.addEventListener('input',()=> updateObjInMatrix())
        }
            tableRow.append(cell);
    }   
}

function setCellColor(colId,rowId,color){
        const colHead = document.getElementById(colId);
        const rowHead = document.getElementById(rowId);
        colHead.style.backgroundColor = color;
        rowHead.style.backgroundColor = color;
}

function btnHighlight(currentCell,button,style,styleProperty){
    if(currentCell.style[styleProperty] === style){
        button.style.backgroundColor = '#ddddff'
    }
    else{
        button.style.backgroundColor = 'transparent'
    }

}

function onFocusFunction(cell){
    currentCell = cell;
    if(prevCellId){
        // const colHead = document.getElementById(prevCellId[0]);
        // const rowHead = document.getElementById(prevCellId.substring(1));
        // colHead.style.backgroundColor = 'transparent';
        // rowHead.style.backgroundColor = 'transparent';
        setCellColor(prevCellId[0],prevCellId.substring(1),'transparent');
    }

    // if(currentCell.style.fontWeight === 'bold'){
    //     boldBtn.style.backgroundColor = '#ddddff'
    // }
    // else{
    //     boldBtn.style.backgroundColor = 'transparent'
    // }
    btnHighlight(currentCell,boldBtn,'bold','fontWeight')

    // if(currentCell.style.fontStyle === 'italic'){
    //     italicsBtn.style.backgroundColor = '#ddddff'
    // }
    // else{
    //     italicsBtn.style.backgroundColor = 'transparent'
    // }
    btnHighlight(currentCell,italicsBtn,'italic','fontStyle')

    // if(currentCell.style.textDecoration === 'underline'){
    //     underLineBtn.style.backgroundColor = '#ddddff'
    // }
    // else{
    //     underLineBtn.style.backgroundColor = 'transparent'
    // }
    btnHighlight(currentCell,underLineBtn,'underline','textDecoration')
    
    currentCellHeading.innerText = cell.id;
    setCellColor(cell.id[0],cell.id.substring(1),'#ddddff');
    // const colHead = document.getElementById(cellId[0]);
    // const rowHead = document.getElementById(cellId.substring(1));
    // // console.log(rowHead)
    // colHead.style.backgroundColor = '#ddddff';
    // rowHead.style.backgroundColor = '#ddddff';

    prevCellId = cell.id;
    // console.log(prevCellId)
    // const Id = document.getElementById("focused-cell");
    // Id.innerText = cellId; 
    // updateObjInMatrix();
}

function updateObjInMatrix(){
    let id = currentCell.id;
    let tempObj ={
        id: id,
        text: currentCell.innerText,
        style: currentCell.style.cssText,
    }
    let col = id[0].charCodeAt(0)-65;
    let row = id.substring(1)-1;
    // console.log(row,col);
    matrix[row][col] = tempObj;
    // console.log(matrix)
}

colGen('th',tHeadRow,true)
tableBodyGen();

if(localStorage.getItem(arrMatrix)){
    matrix = JSON.parse(localStorage.getItem(arrMatrix))[0];
    renderMatrix();
}

// for(let col=0;col<columns;col++){
//     const th = document.createElement("th");
//     th.innerText = String.fromCharCode(col+65);
//     tHeadRow.append(th);
// }

function tableBodyGen(){
    tBody.innerHTML = '';
    for(let row=1;row<=rows;row++){
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.innerText = row;
        th.setAttribute('id', row);
        tr.append(th);
        // for(let i=0;i<columns;i++){
        //     const td = document.createElement("td");
        //     tr.append(td);
        // }
        //get rows from here for id
        colGen('td',tr,false,row)
        tBody.append(tr);
    }
}



function eventfn(button,style,toggleStyle,styleProperty){
    if(currentCell.style[styleProperty] === style){
        currentCell.style[styleProperty]  = toggleStyle
        button.style.backgroundColor = 'transparent'
    }
    else{
        currentCell.style[styleProperty]  = style;
        button.style.backgroundColor = '#ddddff'
    }
    updateObjInMatrix();
}
boldBtn.addEventListener('click',()=>eventfn(boldBtn,'bold','normal','fontWeight'))
italicsBtn.addEventListener('click', ()=>eventfn(italicsBtn,'italic','normal','fontStyle'))
underLineBtn.addEventListener('click', ()=>eventfn(underLineBtn,'underline','none','textDecoration'))

// italicsBtn.addEventListener('click',()=>{
//     if(currentCell.style.fontStyle === 'italic'){
//         currentCell.style.fontStyle = 'normal'
//         italicsBtn.style.backgroundColor = 'transparent'
//     }
//     else{
//         currentCell.style.fontStyle = 'italic';
//         italicsBtn.style.backgroundColor = '#ddddff'
//     }

// }) 

// underLineBtn.addEventListener('click',()=>{
//     if(currentCell.style.textDecoration === 'underline'){
//         currentCell.style.textDecoration = 'none'
//         underLineBtn.style.backgroundColor = 'transparent'
//     }
//     else{
//         currentCell.style.textDecoration = 'underline'
//         underLineBtn.style.backgroundColor = '#ddddff'
//     }
// })

function btnEvent(style){
    currentCell.style.textAlign = style;
    updateObjInMatrix();
}

leftBtn.addEventListener('click', ()=>btnEvent('left'))
rightBtn.addEventListener('click', ()=>btnEvent('right'))
centerBtn.addEventListener('click', ()=>btnEvent('center'))

// leftBtn.addEventListener('click',()=>{
//     currentCell.style.textAlign = 'left';
// })
// rightBtn.addEventListener('click',()=>{
//     currentCell.style.textAlign = 'right';
// })
// centerBtn.addEventListener('click',()=>{
//     currentCell.style.textAlign = 'center';
// })
fontStyleDropdown.addEventListener('change',()=>{
    currentCell.style.fontFamily = fontStyleDropdown.value;
    updateObjInMatrix();
})
fontSizeDropdown.addEventListener('change',()=>{
    currentCell.style.fontSize = fontSizeDropdown.value;
    updateObjInMatrix();
})
bgColor.addEventListener('input',()=>{
    currentCell.style.backgroundColor = bgColor.value;
    updateObjInMatrix();
})
fontColor.addEventListener('input',()=>{
    currentCell.style.color = fontColor.value;
    updateObjInMatrix();
})

cutBtn.addEventListener('click', ()=>{
    lastPressedBtn = 'cut'
    cutCell = {
        text: currentCell.innerText,
        style: currentCell.style.cssText
    }
    currentCell.innerText = '';
    currentCell.style.cssText = '';
    updateObjInMatrix();
})

copyBtn.addEventListener('click', ()=>{
    lastPressedBtn = 'copy'
    cutCell = {
        text: currentCell.innerText,
        style: currentCell.style.cssText
    }
})

pasteBtn.addEventListener('click', ()=>{
    currentCell.innerText = cutCell.text;
    currentCell.style = cutCell.style
    if(lastPressedBtn === 'cut'){
        cutCell = undefined;
    }
    updateObjInMatrix();
})

uploadIp.addEventListener('input', uploadMatrix);

function renderMatrix(){
    matrix.forEach(row=>{
        row.forEach(cellObj=>{
            if(cellObj.id){
                let currentCell=document.getElementById(cellObj.id);
                currentCell.innerText = cellObj.text;
                currentCell.style = cellObj.style; 
            }
        })
    })

}


function viewSheet(event){
    // console.log(event.target.id);
    prevSheet = currentSheet;
    currentSheet = event.target.id.split('-')[1];
    let matrixArr = JSON.parse(localStorage.getItem(arrMatrix));
    matrixArr[prevSheet-1] = matrix;
    localStorage.setItem(arrMatrix,JSON.stringify(matrixArr));
    matrix = matrixArr[currentSheet-1];
    tableBodyGen();
    renderMatrix();
    sheetNo.innerText = `Sheet No - ${currentSheet}`;
}

function nextButtonFn(firstRender){

    const btn = document.createElement('button');
    numSheets++;
    if(!firstRender){
        prevSheet = currentSheet;
        currentSheet = numSheets;

    }
    btn.innerText = `Sheet ${numSheets}`;
    btn.setAttribute('id',`sheet-${numSheets}`);
    btn.setAttribute('onclick', 'viewSheet(event)');
    btnContainer.append(btn);
}

function saveMatrix(){
    if(localStorage.getItem(arrMatrix)){
        let tempMatrixArr = JSON.parse(localStorage.getItem(arrMatrix));
        tempMatrixArr.push(matrix);
        localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr));

    }
    else{
        let tempMatrixArr = [matrix];
        localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr));
    }
}

addSheetBtn.addEventListener('click', ()=>{
    nextButtonFn(false);
    sheetNo.innerText = `Sheet No - ${currentSheet}`;
    saveMatrix();
    createMatrix();
    tBody.innerHTML = '';
    tableBodyGen();
})

function downloadMatrix(){
    const matrixString = JSON.stringify(matrix);

    const blob = new Blob([matrixString], {type:'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download='table.json';
    link.click();
}

function uploadMatrix(event){
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event){
            const fileContent = JSON.parse(event.target.result);
            // console.log(fileContent);
            matrix = fileContent;
            renderMatrix();
        }

    }

}