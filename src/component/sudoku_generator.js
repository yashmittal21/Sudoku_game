
const randomNumberGenerator = (minimum, maximum) => {
    const randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomNumber
}


class Sudoku {

    constructor(N, K){
        let grid = new Array(9);
        for(let i =0; i < N; i++){
            grid[i] = new Array(9);
            for(let j =0 ; j < N; j++){
                grid[i][j] = 0;
            }
            //grid.push(row);
        }
        // console.log("In the constructor");
        //console.log(grid)

        this.grid = grid;
        this.N = N;
        this.K = K;
    }

    usedInRow(row, value, N){
        for(let col = 0; col < N; col++){
            if(this.grid[row][col] === value){
                return true;
            } 
        }
        return false;
    }

    usedInColumn(col, value, N){
        for(let row = 0; row < N; row++){
            if(this.grid[row][col] === value){
                return true;
            } 
        }
        return false;
    }

    usedInBox(row, col, value, N){
        let row_low = Math.floor(row/3)*3;
        let row_high = row_low + 2;

        let col_low = Math.floor(col/3)*3;
        let col_high = col_low + 2;

        // console.log("row low ",row_low)
        // console.log("row high ",row_high)
        // console.log("col low ",col_low)
        // console.log("col high ",col_high)

        for(let i = row_low; i <= row_high; i++){
            for(let j = col_low; j <= col_high; j++){
                // console.log("row low ",row_low)
                // console.log("row high ",row_high)
                // console.log("col low ",col_low)
                // console.log("col high ",col_high)
                // console.log("Row ",row);
                // console.log("Col ",col);
                // console.log("I value ", i)
                // console.log("J value ", j)
                if(this.grid[i][j] === value){
                    return true;
                }

            }
        }
        return false;
    }

    is_valid(row, col, value, N){
        if(this.usedInRow(row, value, N))
        return false;

        if(this.usedInColumn(col, value, N))
        return false;

        if(this.usedInBox(row, col, value, N))
        return false;

        return true;
    }

    // generateValidSudoku(row, col, N){
    //     if(col === N){
    //         return this.generateValidSudoku(row+1, col, N);
    //     }
    //     else if (row === N){
    //         return true;
    //     }

    //     const mySet = new Set()

    //    while(1){
    //     let number = randomNumberGenerator(1, N);
    //     if(mySet.has(number)){
    //         continue;
    //     }
    //     mySet.add(number);
    //     if(mySet.size === 9){
    //         break;
    //     }
    //     let valid = this.is_valid(row, col, number, N);
    //     if(valid){
    //         this.grid[row][col] = number;
    //         if(this.generateValidSudoku(row, col+1, N)){
    //             return true;
    //         }
    //         this.grid[row][col] = 0;
    //     }
    //    }

    //    return false;
    // }

    // fillBox(row, col){

    //     for(let i = 0 ; i < 3; i++){
    //         for(let j = 0; j < 3; j++){
    //             let number;
    //             do{
    //                 number = randomNumberGenerator(1,9);
    //             }while(this.usedInBox(row+i, col+j, number, 9))
                
    //             this.grid[row+i][col+j] = number;
    //         }
    //     }
    // }


    // fillDiagonal(){

    //     for( let i = 0; i < 3; i++){
    //         fillBox(i*3,i*3);
    //     }

    // }

    // fillRemanings(row, col){

    //     if(col == 9){
    //         // row = row + 1;
    //         // col = 0;

    //         return this.fillRemanings(row+1, 0);
    //     }
        
    //     else if(row == N){
    //         return true;
    //     }

    //     else if (row < 3 && col < 3){
    //         return this.fillRemanings(row, 3);
    //     }
    //     else if( row < 6 && )


    //     for(let number = 1; number <= 9; number++){ 
    //         if(this.is_valid(row, col, number, 9)){
    //             this.grid[row][col] = number;
    //             if(this.fillRemanings(row, col+1)){
    //                 return true;
    //             }
    //         }    
    //     }
    //     return false;

        
    // }


    // fillValues(){

    //     fillDiagonal();

    //     fillRemanings();
    // }

    generateValidSudoku(){
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
              if (this.grid[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {
                  let num = Math.floor(Math.random() * 9) + 1;
                  if (this.is_valid(i, j, num, 9)) {
                    this.grid[i][j] = num;
                    if (this.generateValidSudoku()) return true;
                    this.grid[i][j] = 0;
                  }
                }
                return false;
              }
            }
          }
          return true;
    }

    // generate(){
    //     console.log(this.grid);
    //     var f = this.generateValidSudoku(0, 0, this.N);
    //     for(let i = 0; i < 9; i++){
    //         for(let j = 0; j < 9; j++){
    //             console.log(this.grid[i][j]);
    //         }
    //     }

    //     fillValues();
    // }


    shuffle(array){
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    generate(){
        this.generateValidSudoku();
        // let grid = this.grid
        // console.log(grid)
        let arr = [];
        for(let i = 0; i < 81; i++){
            arr.push(i);
        }
        this.shuffle(arr);
        //console.log(arr);
        for(let i = 0; i < this.K; i++){
            let row = Math.floor(arr[i]/9);
            let col = arr[i]%9;

            this.grid[row][col] = 0;
        }
        return this.grid;
    }






};

const sudokuGenerator = (N,type) => {
    // console.log(N);
    console.log("Type", type);

    let K;



    if (type === "Easy"){
        let Minimum = 20;
        let Maximum = 40;
        K = randomNumberGenerator(Minimum, Maximum);
    }
    else if(type === "Medium"){
        let Minimum = 30;
        let Maximum = 45;
        K = randomNumberGenerator(Minimum, Maximum);
    }
    else if(type === "Hard"){
        let Minimum = 40;
        let Maximum = 60;
        K = randomNumberGenerator(Minimum, Maximum);
    }

    // K = 40;
    //5 2 5

    let sudoku = new Sudoku(9,K);
    let grid = sudoku.generate();
    //console.log(grid);
    return grid;
}


export default sudokuGenerator;