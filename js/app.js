//variables to reuse throughout game
const frog = document.createElement('img');
    frog.id='frog';
    frog.src="images/frogger.png";

const row = document.querySelectorAll(".row")

const playBtn = document.querySelector('#start');

playBtn.addEventListener("click", () => {
    game.start();
    game.cars();
    game.logs();

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
console.log
});

const game = {
    lives: 6, /*code here to show frog icons instead of the number?*/
    timer: 60, /*code to show timer status bar instead of numbers?*/
    score: 0,
    clock: null,
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
        this.timer = 60;
        document.querySelector('#timer').innerText = `Timer: ${this.timer}s`
        this.currentFPosition = [10,5]
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];
        this.gameboard[10][5] = 'gF'
        if (this.gameboard[y][x].includes("F")){
            row[y].children[x].appendChild(frog)
        }
        this.timerStart();
    },
    timerStart(key) {
        if (this.timer===60 && key==="ArrowUp") {
            this.timer--
            this.clock = setInterval(() => {
            let y = this.currentFPosition[0];
            let x = this.currentFPosition[1];
            this.timer -= 1;
            document.querySelector('#timer').innerText = `Timer: ${this.timer}s`
            }, 1000);
            this.checkMove()
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
        this.checkMove();
    },
    cars() { //create a car Class to loop through creation of cars?
    const car1 = document.createElement('img'); 
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

        //starting positions for each car
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
            }, 1000)
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
            }, 1000)
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
    logs() {
        const log2a1 = document.createElement('img'); //2 represents number of divs, A is img position, 1st copy
        log2a1.class='log';
        log2a1.src = "images/log2A1.png";
    const log2b1 = document.createElement('img');
        log2b1.class='log';
        log2b1.src = "images/log2B1.png";
    const log2a2 = document.createElement('img');
        log2a2.class='log';
        log2a2.src = "images/log2A2.png";
    const log2b2 = document.createElement('img');
        log2b2.class='log';
        log2b2.src = "images/log2B2.png";
    const log3a1 = document.createElement('img');
        log3a1.class='log';
        log3a1.src = "images/log3A1.png";
    const log3b1 = document.createElement('img');
        log3b1.class='log';
        log3b1.src = "images/log3B1.png";
    const log3c1 = document.createElement('img');
        log3c1.class='log';
        log3c1.src = "images/log3C1.png";
    const log3a2 = document.createElement('img');
        log3a2.class='log';
        log3a2.src = "images/log3A2.png";
    const log3b2 = document.createElement('img');
        log3b2.class='log';
        log3b2.src = "images/log3B2.png";
    const log3c2 = document.createElement('img');
        log3c2.class='log';
        log3c2.src = "images/log3C2.png";

    let current3A1Position = 0;
    let current3B1Position = 1;
    let current3C1Position = 2;
    this.gameboard[1][0] = 'wL'; //log3a in row 1 should move right, slowly
    this.gameboard[1][1] = 'wL'; //log3a in row 1 should move right, slowly
    this.gameboard[1][2] = 'wL'; //log3a in row 1 should move right, slowly
    let current2A1Position = 6; //log2a in row 2 should move left quickly
    let current2B1Position = 7; //log2b in row 2 should move left quickly
    this.gameboard[2][6] = 'wL'; 
    this.gameboard[2][7] = 'wL'; 
    let current3A2Position = 0;
    let current3B2Position = 1;
    let current3C2Position = 2;
    this.gameboard[3][0] = 'wL'; //log3b in row 3 should move left slowly
    this.gameboard[3][1] = 'wL'; //log3b in row 3 should move left slowly
    this.gameboard[3][2] = 'wL'; //log3b in row 3 should move left slowly
    let current2A2Position = 8;
    let current2B2Position = 9;
    this.gameboard[4][8] = 'wL'; //log2b in row 4 should move right quickly
    this.gameboard[4][9] = 'wL'; //log2b in row 4 should move right quickly

        setInterval(() => { 
            row[1].children[current3A1Position].appendChild(log3a1);
            row[1].children[current3B1Position].appendChild(log3b1);
            row[1].children[current3C1Position].appendChild(log3c1);
            if (current3A1Position === 0 && current3B1Position === 1 && current3C1Position ===2) {
                current3A1Position = 10;
                current3B1Position = 0;
                current3C1Position = 1;
                this.gameboard[1][2] = this.gameboard[1][2].slice(0,this.gameboard[1][2].length-1);
                // this.gameboard[1][current3C1Position] = this.gameboard[1][current3C1Position].slice(0,this.gameboard[1][current3C1Position].length-1);
                this.gameboard[1][10] += 'L';
                row[1].children[10].appendChild(log3a1);
                row[1].children[0].appendChild(log3b1);
                row[1].children[1].appendChild(log3c1);

            } else if (current3A1Position === 10 && current3B1Position===0 && current3C1Position===1) {
                current3B1Position = 0;
                current3C1Position = 1;
                if (current3B1Position === 0) {
                    this.gameboard[1][1] = this.gameboard[1][1].slice(0,this.gameboard[1][1].length-1);
                    this.gameboard[1][9] += 'L';
                    row[1].children[0].appendChild(log3c1);
                    row[1].children[9].appendChild(log3a1);
                    row[1].children[10].appendChild(log3b1);
                }
                    current3A1Position = 9;
                    current3B1Position = 10;
                    current3C1Position = 0;

            } else if (current3A1Position === 9 && current3B1Position===10 && current3C1Position===0) {
                current3C1Position = 0;
                if (current3C1Position === 0) {
                    this.gameboard[1][current3C1Position] = this.gameboard[1][current3C1Position].slice(0,this.gameboard[1][current3C1Position].length-1);
                    this.gameboard[1][8] += 'L';
                    row[1].children[8].appendChild(log3a1);
                    row[1].children[9].appendChild(log3b1);
                    row[1].children[10].appendChild(log3c1);
                }
                    current3A1Position = 8;
                    current3B1Position = 9;
                    current3C1Position = 10;

            }
            else {
                this.gameboard[1][current3A1Position] = this.gameboard[1][current3A1Position].slice(0,this.gameboard[1][current3B1Position].length-1);
                this.gameboard[1][current3A1Position-1] += 'L';
                current3A1Position -= 1;
                row[1].children[current3A1Position].appendChild(log3a1);
                this.gameboard[1][current3B1Position] = this.gameboard[1][current3B1Position].slice(0,this.gameboard[1][current3B1Position].length-1);
                this.gameboard[1][current3B1Position-1] += 'L';
                current3B1Position -= 1;
                row[1].children[current3B1Position].appendChild(log3b1);
                this.gameboard[1][current3C1Position] = this.gameboard[1][current3C1Position].slice(0,this.gameboard[1][current3C1Position].length-1);
                this.gameboard[1][current3C1Position-1] += 'L';
                current3C1Position -= 1;
                row[1].children[current3C1Position].appendChild(log3c1);
            } 
        }, 600)
        setInterval(() => { 
            row[2].children[current2A1Position].appendChild(log2a1);
            row[2].children[current2B1Position].appendChild(log2b1);
            if (current2A1Position === 0 && current2B1Position === 1) {
                current2A1Position = 10;
                current2B1Position = 0;
                this.gameboard[2][1] = this.gameboard[2][1].slice(0,this.gameboard[2][1].length-1);
                this.gameboard[2][current2B1Position] = this.gameboard[2][current2B1Position].slice(0,this.gameboard[2][current2B1Position].length-1);
                this.gameboard[2][10] += 'L';
                this.gameboard[2][0] += 'L';
                row[2].children[10].appendChild(log2a1);
                row[2].children[0].appendChild(log2b1);
            } else if (current2A1Position === 10 && current2B1Position===0) {
                current2B1Position = 0;
                if (current2B1Position === 0) {
                    this.gameboard[2][current2B1Position] = this.gameboard[2][current2B1Position].slice(0,this.gameboard[2][current2B1Position].length-1);
                    this.gameboard[2][9] += 'L';
                    row[2].children[9].appendChild(log2a1);
                    row[2].children[10].appendChild(log2b1);
                }
                    current2A1Position = 9;
                    current2B1Position = 10;
            }
            else {
                this.gameboard[2][current2A1Position] = this.gameboard[2][current2A1Position].slice(0,this.gameboard[2][current2A1Position].length-1);
                this.gameboard[2][current2A1Position-1] += 'L';
                current2A1Position -= 1;
                row[2].children[current2A1Position].appendChild(log2a1);
                this.gameboard[2][current2B1Position] = this.gameboard[2][current2B1Position].slice(0,this.gameboard[2][current2B1Position].length-1);
                this.gameboard[2][current2B1Position-1] += 'L';
                current2B1Position -= 1;
                row[2].children[current2B1Position].appendChild(log2b1);
            } 
        }, 600)
    setInterval(() => {
        row[3].children[current3A2Position].appendChild(log3a2);
        row[3].children[current3B2Position].appendChild(log3b2);
        row[3].children[current3C2Position].appendChild(log3c2);
        if (current3A2Position === 0 && current3B2Position === 1 && current3C2Position ===2) {
            current3A2Position = 10;
            current3B2Position = 0;
            current3C2Position = 1;
            this.gameboard[3][2] = this.gameboard[3][2].slice(0,this.gameboard[3][2].length-1);
            this.gameboard[3][10] += 'L';
            row[3].children[10].appendChild(log3a2);
            row[3].children[0].appendChild(log3b2);
            row[3].children[1].appendChild(log3c2);

        } else if (current3A2Position === 10 && current3B2Position===0 && current3C2Position===1) {
            current3B2Position = 0;
            current3C2Position = 1;
            if (current3B2Position === 0) {
                this.gameboard[3][1] = this.gameboard[3][1].slice(0,this.gameboard[3][1].length-1);
                this.gameboard[3][9] += 'L';
                row[3].children[0].appendChild(log3c2);
                row[3].children[9].appendChild(log3a2);
                row[3].children[10].appendChild(log3b2);
            }
                current3A2Position = 9;
                current3B2Position = 10;
                current3C2Position = 0;

        } else if (current3A2Position === 9 && current3B2Position===10 && current3C2Position===0) {
            current3C2Position = 0;
            if (current3C2Position === 0) {
                this.gameboard[3][current3C2Position] = this.gameboard[3][current3C2Position].slice(0,this.gameboard[3][current3C2Position].length-1);
                this.gameboard[3][8] += 'L';
                row[3].children[8].appendChild(log3a2);
                row[3].children[9].appendChild(log3b2);
                row[3].children[10].appendChild(log3c2);
            }
                current3A2Position = 8;
                current3B2Position = 9;
                current3C2Position = 10;

        }
        else {
            this.gameboard[3][current3A2Position] = this.gameboard[3][current3A2Position].slice(0,this.gameboard[3][current3B2Position].length-1);
            this.gameboard[3][current3A2Position-1] += 'L';
            current3A2Position -= 1;
            row[3].children[current3A2Position].appendChild(log3a2);
            this.gameboard[3][current3B2Position] = this.gameboard[3][current3B2Position].slice(0,this.gameboard[3][current3B2Position].length-1);
            this.gameboard[3][current3B2Position-1] += 'L';
            current3B2Position -= 1;
            row[3].children[current3B2Position].appendChild(log3b2);
            this.gameboard[3][current3C2Position] = this.gameboard[3][current3C2Position].slice(0,this.gameboard[3][current3C2Position].length-1);
            this.gameboard[3][current3C2Position-1] += 'L';
            current3C2Position -= 1;
            row[3].children[current3C2Position].appendChild(log3c2);
        } 
    }, 900)
        setInterval(() => { 
            row[4].children[current2A2Position].appendChild(log2a2);
            row[4].children[current2B2Position].appendChild(log2b2);
            if (current2A2Position === 0 && current2B2Position === 1) {
                current2A2Position = 10;
                current2B2Position = 0;
                this.gameboard[4][1] = this.gameboard[4][1].slice(0,this.gameboard[4][1].length-1);
                this.gameboard[4][current2B2Position] = this.gameboard[4][current2B2Position].slice(0,this.gameboard[4][current2B2Position].length-1);
                this.gameboard[4][10] += 'L';
                this.gameboard[4][0] += 'L';
                row[4].children[10].appendChild(log2a2);
                row[4].children[0].appendChild(log2b2);
            } else if (current2A2Position === 10 && current2B2Position===0) {
                current2B2Position = 0;
                if (current2B2Position === 0) {
                    this.gameboard[4][current2B2Position] = this.gameboard[4][current2B2Position].slice(0,this.gameboard[4][current2B2Position].length-1);
                    this.gameboard[4][9] += 'L';
                    row[4].children[9].appendChild(log2a2);
                    row[4].children[10].appendChild(log2b2);
                }
                    current2A2Position = 9;
                    current2B2Position = 10;
            }
            else {
                this.gameboard[4][current2A2Position] = this.gameboard[4][current2A2Position].slice(0,this.gameboard[4][current2A2Position].length-1);
                this.gameboard[4][current2A2Position-1] += 'L';
                current2A2Position -= 1;
                row[4].children[current2A2Position].appendChild(log2a2);
                this.gameboard[4][current2B2Position] = this.gameboard[4][current2B2Position].slice(0,this.gameboard[4][current2B2Position].length-1);
                this.gameboard[4][current2B2Position-1] += 'L';
                current2B2Position -= 1;
                row[4].children[current2B2Position].appendChild(log2b2);
            } 
        }, 800)
    },
    checkMove() {
        setInterval(() => {
        let y = this.currentFPosition[0];
        let x = this.currentFPosition[1];
        if (this.gameboard[y][x].includes('L') || this.gameboard[y][x] === 'bF' || this.gameboard[y][x].includes('C')) {
            clearInterval(this.clock)
            this.death();
        } else if (this.gameboard[y][x] === 'lF') {
            clearInterval(this.clock)
            console.log(this)
            this.winRound();
        } else if (this.timer === 0) {
            this.death();
            this.start();
        }
        }, 300);
    },
    death() {
            this.lives -= 1;
            if (this.lives===0) {
                clearInterval(this.clock)
                this.gameOver();
            } else {
                clearInterval(this.clock)
                document.querySelector('#lives').innerText = `Lives: ${this.lives}`
                this.timer = 60;
                document.querySelector('#timer').innerText = `Timer: ${this.timer}`
                this.currentFPosition= [10,5];
                this.gameboard[10][5] = 'gF'
                if (this.gameboard[10][5].includes("F")){
                    row[10].children[5].appendChild(frog)
            }
        }
    },
    winRound() {
        clearInterval(this.time);
        this.score += 1000;
        document.querySelector('#score').innerText = `Score: ${this.score}`
        this.start();



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

        //add bonus score based on how quickly round is finished
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
        this.start();
    }
}