//variables to reuse throughout game
const log = document.createElement('img');
    log.id='log';
    log.src = "images/log.png";
const car1 = document.createElement('img'); //consider adding for loop to loop through cars?
    car1.id='car3';
    car1.src='images/car1.png';
    car1.className='car';
const car2 = document.createElement('img');
    car2.id='car2';
    car2.src='images/car2.png';
    car2.className='car';
const car3 = document.createElement('img');
    car3.id='car3';
    car3.src='images/car3.png';
    car3.className='car';
const car4 = document.createElement('img');
    car4.id='car4';
    car4.src='images/car4.png';
    car4.className='car';

const frog = document.createElement('img');
    frog.id='frog';
    frog.src="images/frogger.png";

const row = document.querySelectorAll(".row")

const playBtn = document.querySelector('#start');

playBtn.addEventListener("click", () => {
    game.start();
    game.cars();
})
const key = document.addEventListener('keydown', (e) => {
    e.preventDefault(); //stops the page from scrolling instead of the frog moving
    switch (e.key) {
        case "ArrowLeft":
            game.move(e.key);
            break; //what is this - it's in a lot of the code????
        case "ArrowRight":
            game.move(e.key);
            break;
        case "ArrowUp":
            game.move(e.key);
            break;
        case "ArrowDown":
            game.move(e.key);
            break;
}
});

const game = {
    lives: 6, /*code here to show 3 frog icons instead of the number 3*/
    timer: 60,
    currentFPosition: [10,5],
    gameboard: [
        ['b','l','b','l','b','l','b','l','b','l','b'],
        ['w','w','w','w','w','w','w','w','w','w','w'],
        ['w','w','w','w','w','w','w','w','w','w','w'],
        ['w','w','w','w','w','w','w','w','w','w','w'],
        ['w','w','w','w','w','w','w','w','w','w','w'],
        ['g','g','g','g','g','g','g','g','g','g','g'],
        ['r','r','r','r','r','r','r','r','r','r','r'],
        ['r','r','r','r','r','r','r','r','r','r','r'],
        ['r','r','r','r','r','r','r','r','r','r','r'],
        ['r','r','r','r','r','r','r','r','r','r','r'],
        ['g','g','g','g','g','g','g','g','g','g','g'],
    ],
    start() {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];
        this.gameboard[10][5] = 'gF'
        if (this.gameboard[y][x].includes("F")){
            row[y].children[x].appendChild(frog)
        }
        this.cars();
    },
    move(key) {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];

        if (key === "ArrowUp" && this.gameboard[y-1]) {
            this.gameboard[y][x]= this.gameboard[y][x].slice(0,this.gameboard[y][x].length-1);
            this.gameboard[y-1][x] += 'F';
            this.currentFPosition = [y-1, x];
            row[y-1].children[x].appendChild(frog);
        } else if (key === "ArrowLeft" && this.gameboard[y][x-1]) {
            this.gameboard[y][x]= this.gameboard[y][x].slice(0,this.gameboard[y][x].length-1);
            this.gameboard[y][x-1] += 'F';
            this.currentFPosition = [y, x-1];
            row[y].children[x-1].appendChild(frog);
        } else if (key === "ArrowDown" && this.gameboard[y+1]) {
            this.gameboard[y][x] = this.gameboard[y][x].slice(0,this.gameboard[y][x].length-1);
            this.gameboard[y+1][x]+='F';
            this.currentFPosition = [y+1, x];
            row[y+1].children[x].appendChild(frog);
        } else if (key === "ArrowRight" && this.gameboard[y][x+1]) {
            this.gameboard[y][x] = this.gameboard[y][x].slice(0,this.gameboard[y][x].length-1);
            this.gameboard[y][x+1]+='F';
            this.currentFPosition = [y, x+1];
            row[y].children[x+1].appendChild(frog);
        }
        console.log(this.gameboard);
        this.checkMove();
    },
    cars() {
        // let currentC3Position: [9,8];
        // let y = this.currentPosition[0];
        // let x = this.currentPosition[1];
        //logic here that moves cars across the screen at varying speends in alternating directions
        //use for loop to loop through array with interval timer
        this.gameboard[9][10] = 'rC'; //cars in row 9 should move left slowly
        this.gameboard[8][4] = 'rC'; //cars in row 8 should move right quickly
        this.gameboard[7][7] = 'rC'; //cars in row 7 should move left quickly
        this.gameboard[6][3] = 'rC'; //cars in row 6 should move right slowly
        setInterval(() => {  
            let currentC3Position = 10;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[9][i].includes('C')) {
                    currentC3Position = i;
                }
            }
                row[9].children[currentC3Position].appendChild(car3);
                if (currentC3Position === 0) {
                    this.gameboard[9][currentC3Position] = this.gameboard[9][currentC3Position].slice(0,this.gameboard[9][currentC3Position].length-1);
                    this.gameboard[9][10] += 'C';
                    row[9].children[10].appendChild(car3);
                } else{
                    this.gameboard[9][currentC3Position] = this.gameboard[9][currentC3Position].slice(0,this.gameboard[9][currentC3Position].length-1);
                    this.gameboard[9][currentC3Position-1] += 'C';
                    row[9].children[currentC3Position].appendChild(car3);
                }
                console.log(row[9].children[currentC3Position]);
                console.log(this.gameboard);
                this.checkMove()
            }, 1000)
    },
    checkMove() {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];
            if (this.gameboard[y][x] === 'wF' || this.gameboard[y][x] === 'bF' || this.gameboard[y][x].includes('C')) {
                console.log(`${this.gameboard[y][x]}: Your Frog is DEAD! :-X`);
                //code for frog dies
                //reset timer
                //reduce lives by 1, place new frog on board
            } else if (this.gameboard[y][x] === 'lf') {
                console.log(`${this.gameboard[y][x]}: Congrats your Frog made it to safety!`);
                //code for next frog placed on board
                //reset timer
                //add points?
            }
    },
    // log() {
    //  //logic here that moves logs across the screen at random speeds in alternating directions
    // //logs in row 1 should move right, slowly
    // //logs in row 2 should move left quickly
    // //logs in row 3 should move left slowly
    // //logs in row 4 should move right quickly
    // this.gameboard[2][2] = 'wL';
    // this.gameboard[2][3] = 'wL';
    // this.gameboard[2][4] = 'wL';
    // for (let i=0; i<this.gameboard.length; i++) {
    //     for (let j=0; j<this.gameboard[i].length; j++){
    //         if (this.gameboard[i][j].includes("wL")){
    //             row[i].children[j].appendChild(logImg);
    //         }
    //     }
    // }
}