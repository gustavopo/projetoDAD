/*jshint esversion: 6 */

var Tile = require('./Tile.js');


class Game {
    constructor(ID, player1Name, name, maxPlayers) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.name=name;
        this.maxPlayers=maxPlayers;
        this.player1= player1Name;
        this.player2= '';
        this.playerTurn = 1;
        this.winner = 0;
        this.rows=4;
        this.columns=4;
        this.picks = 0;
        this.picksTurn=0;
        this.firstChoice;
        this.secondChoice;
        this.matches=0;
        this.matched=false;
        this.allTiles=new Array(40);
        this.imagesArray= new Array((this.rows*this.columns)/2);
        //this.board = this.createTable(16, 8);
        //this.board = [0,0,7,0,0,0,0,0,0];

        this.board = new Array(this.rows);
        for (let k = 0; k < this.rows; ++k) {
            this.board[k] = new Array(this.columns);
        }
       /* this.board[0][0] = new Tile(0,false);
        this.board[0][1] = new Tile(1,false);
        this.board[0][2] = new Tile(1,false);
        this.board[0][3] = new Tile(1,false);
        this.board[1][0] = new Tile(1,false);
        this.board[1][1] = new Tile(1,false);
        this.board[1][2] = new Tile(1,false);
        this.board[1][3] = new Tile(1,false);
        this.board[2][0] = new Tile(1,false);
        this.board[2][1] = new Tile(1,false);
        this.board[2][2] = new Tile(1,false);
        this.board[2][3] = new Tile(1,false);
        this.board[3][0] = new Tile(1,false);
        this.board[3][1] = new Tile(1,false);
        this.board[3][2] = new Tile(1,false);
        this.board[3][3] = new Tile(1,false);*/
        this.getAllTiles();
        this.fillBoard();
        //this.jogo2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    }

    createTable(index,imgLen) {
        var i, j;
        var array = [];
        var board = [];

        for(j = 1; j < imgLen+1; j++){
            //array.push(Game.pieceImageURL(j));
        }

        var randomImg = array[Math.floor(Math.random() * array.length)];

        for(i = 0 ; i < index; i++){
            board[i] = randomImg[i];
        }

        return board;
    }

    populate(value){
        var x, y;
        for(x = 0 ;x < 4; x++){
            for(y = 0; y<10; y++){
                this.jogo[x][y] == value;
            }
        }
    }

    join(player2Name){
        this.player2= player2Name;
        this.gameStarted = true;
    }

    hasRow(value){

        if(this.maxPlayers == 2){
            return
            ((this.jogo2[0]==value) && (this.jogo2[1]==value) && (this.jogo2[2]==value) && (this.jogo2[3]==value)) ||
            ((this.jogo2[4]==value) && (this.jogo2[5]==value) && (this.jogo2[6]==value) && (this.jogo2[7]==value)) ||
            ((this.jogo2[8]==value) && (this.jogo2[10]==value) && (this.jogo2[11]==value) && (this.jogo2[12]==value)) ||
            ((this.jogo2[13]==value) && (this.jogo2[14]==value) && (this.jogo2[15]==value) || (this.jogo2[16]==value));
        }



    }  

    checkGameEnded(){
       /* if (this.hasRow(1)) {
            this.winner = 1;
            this.gameEnded = true;
            return true;
        } else if (this.hasRow(2)) {
            this.winner = 2;
            this.gameEnded = true;
            return true;
        } else if (this.isBoardComplete()) {
            this.winner = 0;
            this.gameEnded = true;
            return true;
        }*/
        return false;
    }

    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, r1, c1){
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }
       /* if (this.board[r1][c1] !== 0) {
            return false;
        }*/
        this.board[r1][c1].tileFlipped = true;

        this.chooseCard(r1,c1);
        console.log("Picks: "+this.picks);
        if(this.picks===2){
            this.checkCards();
        }

        if (!this.checkGameEnded()) {
            if(this.picksTurn==2 && !this.matched){
                this.playerTurn = this.playerTurn == 1 ? 2 : 1;
                this.picksTurn = 0;
            }
        }
                

        return true;
    }

    chooseCard(posicaoLinha,posicaoColuna){


                if (this.picks >= 2) {
                    console.log("ja foram selecionadas 2 cartas");
                    return;
                }



                if (this.picks === 0) {

                    //TODO: show image corresponding to first card clicked
                    this.firstChoice = this.board[posicaoLinha][posicaoColuna];
                    this.picks = 1;
                    console.log("First choice IMAGEM: " + this.board[posicaoLinha][posicaoColuna].image);

                }
                else {

                    //show image corresponding to second card clicked
                    this.secondChoice = this.board[posicaoLinha][posicaoColuna];
                    console.log("Second Choice: " + this.secondChoice.image);
                    //check is 
                   /* if(this.secondchoice.key===this.firstchoice.key){
                        console.log("são a mesma peça!");
                        return;
                    }*/


                    this.picks = 2;
                    this.picksTurn = 2;

                    //para não se poder carregar
                    // let boardClass = document.getElementById("board").classList;
                   // boardClass.add("noClicks");

                    console.log("Second choice: " + this.board[posicaoLinha][posicaoColuna].image);
                    //console.log("picks: " + this.picks);
                }
    }

    checkCards(){

                if (this.secondChoice.image === this.firstChoice.image) {
                    //console.log("As imagens são iguais!");
    

                   // this.matches++;
                   
                    this.firstChoice.image='empty';
                    this.secondChoice.image='empty';
                    this.matched = true;

                    this.picks = 0;

                    //self.$forceUpdate();
                    //this.contadorParesMatched+=2;

                }

                else {
                    /*turn over first card to show back
                    turn over second card to show back*/
                    let self = this;
                    
                    this.firstChoice.tileFlipped=false;
                    this.secondChoice.tileFlipped=false;
                    this.matched = false;

                    //para poder voltar a carregar nelas
                    this.picks = 0;
                    

                }
    }


 fillBoard () {
                let pairingArray = new Array(this.rows);
                let contadorImagens=0;

                for (let k = 0; k < this.rows; ++k) {
                    this.board[k] = new Array(this.columns);
                    pairingArray[k] = new Array(this.columns);
                }

                if ((this.columns) % 2 === 0) {
                    //Quando Num colunas é PAR


                    for (let i = 0; i < this.rows; ++i) {
                        for (let j = 0; j < this.columns / 2; ++j) {
                            this.randomImage = this.allTiles[Math.floor(Math.random() * this.allTiles.length)];
                            this.checkNonRepeated();

                            this.board[i][j] = new Tile(this.randomImage, false);
                            pairingArray[i][j] = this.board[i][j];

                            //meter imagens no array de imagens
                            this.imagesArray[contadorImagens] = this.board[i][j].image;
                            console.log("imagem " + contadorImagens + ": " + this.imagesArray[contadorImagens]);
                            contadorImagens++;
                        }
                    }

                    for (let i = 0; i < this.rows; ++i) {
                        for (let j = this.columns / 2; j < this.columns; ++j) {
                            this.board[i][j] = new Tile(pairingArray[i][j - (this.columns / 2)].image, false) ;
                        }
                    }
                } else {
                    //Quando Num colunas é IMPAR
                    for (let i = 0; i < this.rows / 2; ++i) {
                        for (let j = 0; j < this.columns; ++j) {
                            this.board[i][j] = new Tile(this.allTiles[Math.floor(Math.random() * this.allTiles.length)], false);
                            pairingArray[i][j] = this.board[i][j];
                        }
                    }

                    for (let i = this.rows / 2; i < this.rows; ++i) {
                        for (let j = 0; j < this.columns; ++j) {
                            this.board[i][j] = pairingArray[i - (this.rows / 2)][j];
                        }
                    }

                }
                this.shuffle();
            }

            getAllTiles() {
                for (let i = 0; i <= 40; i++) {
                    this.allTiles[i] = i;
                }
            }

            shuffle () {

                let temp;
                let swaps = 0;
                do {
                    let randomi = Math.floor(Math.random() * this.rows);
                    let randomj = Math.floor(Math.random() * this.columns);

                    let randomi2 = Math.floor(Math.random() * this.rows);
                    let randomj2 = Math.floor(Math.random() * this.columns);

                // console.log("randomi: " + randomi + "randomj: " + randomj + "randomi: " + randomi2 + "randomi2: " + randomj2);

                temp = this.board[randomi][randomj];
                this.board[randomi][randomj] = this.board[randomi2][randomj2];
                this.board[randomi2][randomj2] = temp;

                swaps++;
            } while (swaps !== 20);

        }

        checkNonRepeated(){
            while(this.checkIncludes(this.randomImage)){
                this.randomImage = this.allTiles[Math.floor(Math.random() * this.allTiles.length)];
            }
        }

        checkIncludes(randomImageMethod){
            for(let i=0; i<this.imagesArray.length; i++){
                return this.imagesArray[i]===randomImageMethod;
            }
        }        








}
class cell{
    constructor(index, img){
        this.index=index;
        this.img=img;
    }
}

class piece{
    constructor(urlImage, status){
        this.urlImage = urlImage;
        this.status = status;
    }
}

module.exports = Game;
