//variables to reuse throughout game
const log = document.createElement('div');
log.setAttribute('id', 'log');
const car = document.createElement('div');
car.setAttribute('id','car');
const frog = document.createElement('div');
frog.setAttribute('id', 'frog');

document.addEventListener('KeyboardEvent',)
const game = {
    lives: 3,
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
                    row[i].children[j].appendChild(frog)
                    console.log(row[i].children[j])
                    console.log(frog);
                }
            
            // if (this.gameboard[i][i] === 'gF' || this.gameboard[i][i] === 'rF' ||this.gameboard[i][i] === 'wF' || this.gameboard[i][i] === 'rCF' || this.gameboard[i][i] === 'wLF' || this.gameboard[i][i] === 'lF' || this.gameboard[i][i] === 'bF') {
                
            //     }
            }   
        }
    },
    car() {
        this.gameboard[9][9] = 'rC';
        this.gameboard[9][9] = 'rC';
    },
    log() {
        this.gameboard[2][2] = 'wL';
        this.gameboard[2][3] = 'wL';
        this.gameboard[2][4] = 'wL';
    }
}
game.frog();
console.log(game.gameboard[10][5])