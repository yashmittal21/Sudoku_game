

function usedInRow(arr, row, value, N){
    for(let col = 0; col < N; col++){
        if(arr[row][col] === value){
            //console.log(row,col,value)
            return true;
        } 
    }
    return false;
}

function usedInColumn(arr, col, value, N){
    for(let row = 0; row < N; row++){
        if(arr[row][col] === value){
            return true;
        } 
    }
    return false;
}

function usedInBox(arr,row, col, value, N){
    let row_low = Math.floor(row/3)*3;
    let row_high = row_low + 2;

    let col_low = Math.floor(col/3)*3;
    let col_high = col_low + 2;

    for(let i = row_low; i <= row_high; i++){
        for(let j = col_low; j <= col_high; j++){
            if(arr[i][j] === value){
                return true;
            }

        }
    }
    return false;
}

function isValid(arr, row, col, value, N){
    //console.log("Row")
    if(usedInRow(arr, row, value, N))
    return false;

    //console.log("Col")
    if(usedInColumn(arr, col, value, N))
    return false;

    //console.log("Box")
    if(usedInBox(arr, row, col, value, N))
    return false;

    return true;
}



const sudokuSolver = (arr) =>{
    // let si = arr.lenght;
    //console.log(arr)

    //let arr = getArray(grid);

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(arr[i][j] === 0){
                for(let num = 1; num <= 9; num++){
                    if(isValid(arr, i, j, num, 9)){
                        //console.log(i,j,num);
                        arr[i][j] = num;
                        if(sudokuSolver(arr))
                        return true;
                        arr[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }

    return true;

}


const solve = (parameter) =>{
    var arr = parameter.map((row)=>row.map((item)=>item));
    console.log("Solver",arr);

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(arr[i][j] !== 0){
                let value = arr[i][j];
                arr[i][j] = 0;
                if(!isValid(arr, i, j, value, 9)){
                    //console.log("Invalid sudoku", arr[i][j],i,j)

                    return {
                        message: "notSolved",
                        arr: arr
                    }
                }
                arr[i][j] = value;
            }
        }
    }
    if(sudokuSolver(arr)){
        return {
            message: "Solved",
            arr: arr
        }
    }
    return {
        message: "notSolved",
        arr: arr
    }
}

export default solve;