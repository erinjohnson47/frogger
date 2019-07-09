//variables to reuse throughout game
const log = document.createElement('div');
const logImg = document.createElement('img');
    logImg.id='log';
    logImg.src = "images/log.png";
    log.appendChild(logImg);
const car = document.createElement('div');
car.setAttribute('id','car');
const frog = document.createElement('div');
// frog.setAttribute('id', 'frog');
const frogImg = document.createElement('img');
    frogImg.id='frog';
    frogImg.src="images/frogger.png";
    frog.appendChild(frogImg);

const playBtn = document.querySelector('#start');

playBtn.addEventListener("click", () => {
    game.start();
    game.frog();
})

document.addEventListener('keydown', (e) => {
    e.preventDefault(); //stops the page from scrolling instead of the frog moving
    console.log(`Key ${e.key} was pressed.`)
    switch (e.key) {
        case "ArrowLeft":
            game.frog();
            break; //what is this - it's in a lot of the code????
        case "ArrowRight":
            game.frog();
            break;
        case "ArrowUp":
            game.frog();
            break;
        case "ArrowDown":
            game.frog();
            break;
}
});

//arrow keys in js
// left arrow	37
// up arrow	38
// right arrow	39
// down arrow	40

const game = {
    lives: 3, /*code here to show 3 frog icons instead of the number 3*/
    timer: 60,
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
        //this is the starting position for the frog
        this.gameboard[10][5] = 'gF'

    },
    frog() {
       //for each of the instances below - frog occupies that div
       //gF = frog on grass
       //rF = frog on road
       //wF = frog on water - DEAD - NOT SAFE
       //rCF = frog on road with CAR - DEAD - NOT SAFE
       //wLF = frog on Log on water
       //lF = frog on lilipad - COMPLETE - round WON
       //bF = frog in bush - DEAD - NOT SAFE
       const row = document.querySelectorAll(".row")
        for (let i=0; i<this.gameboard.length; i++) {
            for (let j=0; j<this.gameboard[i].length; j++){
                if (this.gameboard[i][j].includes("F")){
                    row[i].children[j].appendChild(frogImg)
                    // console.log(row[i].children[j])
                    // console.log(frog);
                }
            
            // if (this.gameboard[i][i] === 'gF' || this.gameboard[i][i] === 'rF' ||this.gameboard[i][i] === 'wF' || this.gameboard[i][i] === 'rCF' || this.gameboard[i][i] === 'wLF' || this.gameboard[i][i] === 'lF' || this.gameboard[i][i] === 'bF') {
            //need to add logic that when arrow key is pressed, F is moved to string in the direction of pressed key.  new string is created - div matching string is assigned.
            //https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple
            //     }
            }   
        }
    },
    car() {
        //logic here that moves cars across the screen at varying speends in alternating directions
        //cars in row 6 should move left slowly
        //cars in row 7 should move left quickly
        //cars in row 8 should move right quickly
        //cars in row 9 should move right slowly
        this.gameboard[9][9] = 'rC';
        this.gameboard[9][9] = 'rC';
    },
    log() {
        //logic here that moves logs across the screen at random speeds in alternating directions
        //logs in row 1 should move right, slowly
        //logs in row 2 should move left quickly
        //logs in row 3 should move left slowly
        //logs in row 4 should move right quickly
        this.gameboard[2][2] = 'wL';
        this.gameboard[2][3] = 'wL';
        this.gameboard[2][4] = 'wL';
    }
}