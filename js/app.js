//variables to reuse throughout game
const log3 = document.createElement('img');
    log3.class='log';
    log3.src = "images/log3.png";
const log2a = document.createElement('img');
    log2a.class='log';
    log2a.src = "images/log2-a.png";
const log3b = document.createElement('img');
    log3b.class='log';
    log3b.src = "images/log3b.png";
const log2b = document.createElement('img');
    log2b.class='log';
    log2b.src = "images/log2-b.png";
const car1 = document.createElement('img'); //consider adding for loop to loop through cars?
    car1.id='car1';
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

})
const key = document.addEventListener('keydown', (e) => {
    e.preventDefault(); 
    switch (e.key) {
        case "ArrowLeft":
            game.move(e.key);
            break; 
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
    lives: 6, /*code here to show frog icons instead of the number?*/
    timer: 61, /*code to show timer status bar instead of numbers?*/
    score: 0,
    time: null,
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
        this.timer = 60;
        this.gameboard[10][5] = 'gF'
        if (this.gameboard[y][x].includes("F")){
            row[y].children[x].appendChild(frog)
        }
        this.cars();
        this.logs();
        this.timerStart();
        this.checkDead();
    },
    timerStart(key) {
        if (this.timer===60 && key==="ArrowUp") {
            this.timer--
            this.time = setInterval(() => {
            let y = this.currentFPosition[0];
            let x = this.currentFPosition[1];
            this.checkMove()
            this.timer -= 1;
            document.querySelector('#timer').innerText = `Timer: ${this.timer}s`
            if (this.timer === 0) {
                clearInterval(this.time);
                this.currentFPosition= [10,5];
                this.start();
                document.querySelector('#timer').innerText = `Timer: ${this.timer}s`
            } else if (this.gameboard[y][x] === 'lF') {
                clearInterval(this.time);
                // switch (this.currentFPosition[y][x]) {
                //     case this.currentFPosition === [0,1]:
                //     row[0].removeChild('#lilypad1');
                //     case this.currentFPosition === [0,3]:
                //     row[0].removeChild('#lilypad2');
                //     case this.currentFPosition === [0,5]:
                //     row[0].removeChild('#lilypad3');
                //     case this.currentFPosition === [0,7]:
                //     row[0].removeChild('#lilypad4');
                //     case this.currentFPosition === [0,9]:
                //     row[0].removeChild('#lilypad5');
                // }
                this.currentFPosition= [10,5];
                this.start();
                document.querySelector('#timer').innerText = `Timer: ${this.timer}s`
            }
            this.checkMove()
            }, 1000);
        }
    },
    move(key) {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];

        if (key === "ArrowUp" && this.gameboard[y-1]) {
            this.gameboard[y][x]= this.gameboard[y][x].slice(0,this.gameboard[y][x].length-1);
            this.gameboard[y-1][x] += 'F';
            this.currentFPosition = [y-1, x];
            row[y-1].children[x].appendChild(frog);
            this.timerStart(key)
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
        this.gameboard[9][10] = 'rC'; //car1 in row 9 should move left slowly
        this.gameboard[8][0] = 'rC'; //car3 in row 8 should move right quickly
        this.gameboard[7][10] = 'rC'; //car2 in row 7 should move left quickly
        this.gameboard[6][0] = 'rC'; //car4 in row 6 should move right slowly
        setInterval(() => {  //row 9, car 1, left/slow
            let currentCPosition = 10;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[9][i].includes('C')) {
                    currentCPosition = i;
                }
            }
            row[9].children[currentCPosition].appendChild(car1);
            if (currentCPosition === 0) {
                this.gameboard[9][currentCPosition] = this.gameboard[9][currentCPosition].slice(0,this.gameboard[9][currentCPosition].length-1);
                this.gameboard[9][10] += 'C';
                row[9].children[10].appendChild(car1);
            } else{
                this.gameboard[9][currentCPosition] = this.gameboard[9][currentCPosition].slice(0,this.gameboard[9][currentCPosition].length-1);
                this.gameboard[9][currentCPosition-1] += 'C';
                row[9].children[currentCPosition].appendChild(car1);
            }
            }, 1000)
        setInterval(() => {  //row 8, car3, right, fast
            let currentCPosition = 0;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[8][i].includes('C')) {
                    currentCPosition = i;
                }
            }
            row[8].children[currentCPosition].appendChild(car3);
            if (currentCPosition === 10) {
                this.gameboard[8][currentCPosition] = this.gameboard[8][currentCPosition].slice(0,this.gameboard[8][currentCPosition].length-1);
                this.gameboard[8][0] += 'C';
                row[8].children[0].appendChild(car3);
            } else{
                this.gameboard[8][currentCPosition] = this.gameboard[8][currentCPosition].slice(0,this.gameboard[8][currentCPosition].length-1);
                this.gameboard[8][currentCPosition+1] += 'C';
                row[8].children[currentCPosition].appendChild(car3);
            }
            }, 600)
        setInterval(() => {  //row 7, car 2, left, fast
            let currentCPosition = 10;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[7][i].includes('C')) {
                    currentCPosition = i;
                }
            }
            row[7].children[currentCPosition].appendChild(car2);
            if (currentCPosition === 0) {
                this.gameboard[7][currentCPosition] = this.gameboard[7][currentCPosition].slice(0,this.gameboard[7][currentCPosition].length-1);
                this.gameboard[7][10] += 'C';
                row[7].children[10].appendChild(car2);
            } else{
                this.gameboard[7][currentCPosition] = this.gameboard[7][currentCPosition].slice(0,this.gameboard[7][currentCPosition].length-1);
                this.gameboard[7][currentCPosition-1] += 'C';
                row[7].children[currentCPosition].appendChild(car2);
            }           
            }, 450)
        setInterval(() => {  //row 6, car 4, right slow
            let currentCPosition = 0;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[6][i].includes('C')) {
                    currentCPosition = i;
                }
            }
            row[6].children[currentCPosition].appendChild(car4);
            if (currentCPosition === 10) {
                this.gameboard[6][currentCPosition] = this.gameboard[6][currentCPosition].slice(0,this.gameboard[6][currentCPosition].length-1);
                this.gameboard[6][0] += 'C';
                row[6].children[0].appendChild(car4);
            } else{
                this.gameboard[6][currentCPosition] = this.gameboard[6][currentCPosition].slice(0,this.gameboard[6][currentCPosition].length-1);
                this.gameboard[6][currentCPosition+1] += 'C';
                row[6].children[currentCPosition].appendChild(car4);
            }       
        }, 850)
    },
    checkMove() {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];
        if (this.gameboard[y][x] === 'wF' || this.gameboard[y][x] === 'bF' || this.gameboard[y][x].includes('C')) {
            this.death();
        } else if (this.gameboard[y][x] === 'lF') {
            console.log(`${this.gameboard[y][x]}: Congrats your Frog made it to safety!`);
            //code for next frog placed on board
            //reset timer
            //add points?
        }
    },
    logs() {
    let current2A1Position = 6;
    let current2B1Position = 7;
    this.gameboard[1][0] = 'wL'; //log3 in row 1 should move right, slowly
    this.gameboard[1][1] = 'wL'; //log3 in row 1 should move right, slowly
    this.gameboard[1][2] = 'wL'; //log3 in row 1 should move right, slowly
    this.gameboard[2][6] = 'wL'; //log2-b in row 2 should move left quickly
    this.gameboard[2][7] = 'wL'; //log2-a in row 2 should move left quickly
    this.gameboard[3][0] = 'wL'; //log3b in row 3 should move left slowly
    this.gameboard[4][10] = 'wL'; //log2b in row 4 should move right quickly
        setInterval(() => { 
            let currentLPosition = 0;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[1][i].includes('L')) {
                    currentLPosition = i;
                }
            }
            row[1].children[currentLPosition].appendChild(log3);
            if (currentLPosition === 10) {
                this.gameboard[1][currentLPosition] = this.gameboard[1][currentLPosition].slice(0,this.gameboard[1][currentLPosition].length-1);
                this.gameboard[1][0] += 'L';
                row[1].children[0].appendChild(log3);
            } else{
                this.gameboard[1][currentLPosition] = this.gameboard[1][currentLPosition].slice(0,this.gameboard[1][currentLPosition].length-1);
                this.gameboard[1][currentLPosition+1] += 'L';
                row[1].children[currentLPosition].appendChild(log3);
            }
        }, 900)
        setInterval(() => { 
            row[2].children[current2A1Position].appendChild(log2a);
            row[2].children[current2B1Position].appendChild(log2b);
            if (current2A1Position === 0 && current2B1Position === 1) {
                current2A1Position = 10;
                current2B1Position = 0;
                this.gameboard[2][1] = this.gameboard[2][1].slice(0,this.gameboard[2][1].length-1);
                this.gameboard[2][current2B1Position] = this.gameboard[2][current2B1Position].slice(0,this.gameboard[2][current2B1Position].length-1);
                this.gameboard[2][10] += 'L';
                this.gameboard[2][0] += 'L';
                row[2].children[10].appendChild(log2a);
                row[2].children[0].appendChild(log2b);
            } else if (current2A1Position === 10 && current2B1Position===0) {
                current2B1Position = 0;
                if (current2B1Position === 0) {
                    this.gameboard[2][current2B1Position] = this.gameboard[2][current2B1Position].slice(0,this.gameboard[2][current2B1Position].length-1);
                    this.gameboard[2][9] += 'L';
                    row[2].children[9].appendChild(log2a);
                    row[2].children[10].appendChild(log2b);}
                    current2A1Position = 9;
                    current2B1Position = 10;
            }
            else {
                this.gameboard[2][current2A1Position] = this.gameboard[2][current2A1Position].slice(0,this.gameboard[2][current2A1Position].length-1);
                this.gameboard[2][current2A1Position-1] += 'L';
                current2A1Position -= 1;
                row[2].children[current2A1Position].appendChild(log2a);
                this.gameboard[2][current2B1Position] = this.gameboard[2][current2B1Position].slice(0,this.gameboard[2][current2B1Position].length-1);
                this.gameboard[2][current2B1Position-1] += 'L';
                current2B1Position -= 1;
                row[2].children[current2B1Position].appendChild(log2b);
            } 
            console.log(this.gameboard);
        }, 1000)
        setInterval(() => { 
            let currentLPosition = 10;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[3][i].includes('L')) {
                    currentLPosition = i;
                }
            }
            row[3].children[currentLPosition].appendChild(log3b);
            if (currentLPosition === 0) {
                this.gameboard[3][currentLPosition] = this.gameboard[3][currentLPosition].slice(0,this.gameboard[3][currentLPosition].length-1);
                this.gameboard[3][10] += 'L';
                row[3].children[10].appendChild(log3b);
            } else{
                this.gameboard[3][currentLPosition] = this.gameboard[3][currentLPosition].slice(0,this.gameboard[3][currentLPosition].length-1);
                this.gameboard[3][currentLPosition-1] += 'L';
                row[3].children[currentLPosition].appendChild(log3b);
            }
        }, 900)
        setInterval(() => { 
            let currentLPosition = 0;
            for (let i = 0; i<=10; i++) {
                if (this.gameboard[4][i].includes('L')) {
                    currentLPosition = i;
                }
            }
            row[4].children[currentLPosition].appendChild(log2b);
            if (currentLPosition === 10) {
                this.gameboard[4][currentLPosition] = this.gameboard[4][currentLPosition].slice(0,this.gameboard[4][currentLPosition].length-1);
                this.gameboard[4][0] += 'L';
                row[4].children[0].appendChild(log2b);
            } else{
                this.gameboard[4][currentLPosition] = this.gameboard[4][currentLPosition].slice(0,this.gameboard[4][currentLPosition].length-1);
                this.gameboard[4][currentLPosition+1] += 'L';
                row[4].children[currentLPosition].appendChild(log2b);
            }
            for (let j = 0; j<=row[4].length-1; j++) {
                if (this.gameboard[4][j].includes('F')) {
                this.checkMove()
                }
            }        
        }, 900)
    },
    death() {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];
        // if (this.gameboard[y][x] === 'wF' || this.gameboard[y][x] === 'bF' || this.gameboard[y][x] === 'rCF' || this.gameboard[y][x]==='rFC') {
        //     console.log(`${this.gameboard[y][x]}: Your Frog is DEAD! :-X`);
            this.lives -= 1
            if (this.lives===0) {
                this.gameOver();
            }
            document.querySelector('#lives').innerText = `Lives: ${this.lives}`
            clearInterval(this.time)
            this.timer = 60;
            document.querySelector('#timer').innerText = `Timer: ${this.timer}`
            this.currentFPosition= [10,5];
            this.gameboard[10][5] = 'gF'
            if (this.gameboard[10][5].includes("F")){
                row[10].children[5].appendChild(frog)
            }
    },
    checkDead() {
        setInterval(() => {
            this.checkMove();
        }, 500)
    },
    gameOver() {
        const modal = document.getElementById("modal");
        const span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
          }
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        game.start();
    }
}