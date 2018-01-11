/*jshint esversion: 6 */

var Tile = require('./Tile.js');
var Player = require('./Player.js');


class Game {
    constructor(ID, player1Name, name, maxPlayers) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.name=name;
        this.maxPlayers=maxPlayers;
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
        this.contadorParesMatched=0;
        this.playerOne = new Player(0,1,player1Name);
        this.playerTwo = new Player(0,1,'');



        this.board = new Array(this.rows);
        for (let k = 0; k < this.rows; ++k) {
            this.board[k] = new Array(this.columns);
        }
        this.getAllTiles();
        this.fillBoard();

    }

    join(player2Name){
        this.playerTwo.name= player2Name;
        this.gameStarted = true;
    }

    checkGameEnded(){

        if(this.contadorParesMatched===(this.columns*this.rows)){
            this.checkWinner();
            this.gameEnded=true;
            return true;
        }


    }

    checkWinner(){
        if(this.playerOne.pairsCombined > this.playerTwo.pairsCombined){
            this.winner = 1;
        }else if(this.playerTwo.pairsCombined > this.playerOne.pairsCombined ) {
            this.winner = 2;
        }
    }

    /*checkGameEnded(){
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
        }
        return false;
    }
    */
    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, r1, c1, gameID, game){
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
        }else{
            console.log('ganhaste oh meu!!')
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
                   // console.log("First choice IMAGEM: " + this.board[posicaoLinha][posicaoColuna].image);

                }
                else {

                    //show image corresponding to second card clicked
                    this.secondChoice = this.board[posicaoLinha][posicaoColuna];
                    //console.log("Second Choice: " + this.secondChoice.image);
                    //check is 
                    if(this.secondChoice.key===this.firstChoice.key){
                       // console.log("são a mesma peça!");
                        return ;
                    }


                    this.picks = 2;
                    this.picksTurn = 2;

                    //para não se poder carregar
                    // let boardClass = document.getElementById("board").classList;
                   // boardClass.add("noClicks");

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
                   this.contadorParesMatched+=2;
                   switch(this.playerTurn){
                    case 1: this.playerOne.pairsCombined++;
                    console.log('player 1 pares: '+this.playerOne.pairsCombined );
                    break;
                    case 2: this.playerTwo.pairsCombined++;
                    console.log('player 2 pares: '+this.playerTwo.pairsCombined );
                    break;
                }

            }

            else {
                    /*turn over first card to show back
                    turn over second card to show back*/
                    let self = this;

                    setTimeout(function () {self.firstChoice.tileFlipped=false;}, 500);
                    setTimeout(function () {self.secondChoice.tileFlipped=false;}, 500);

                   // self.firstChoice.tileFlipped=false;
                  //  self.secondChoice.tileFlipped=false;

                  this.firstChoice.timeOut=true;
                  this.secondChoice.timeOut=true;

                    //setTimeout(function () {self.firstChoice.timeOut=false;}, 1000);
                    //setTimeout(function () {self.secondChoice.timeOut=false;}, 500);

                    //const child_process = require("child_process");
                    // Sleep for 5 seconds
                    //child_process.execSync("sleep 1");


                    this.matched = false;

                    //para poder voltar a carregar nelas
                    this.picks = 0;
                    

                }
            }

            sleep(time, callback) {
                var stop = new Date().getTime();
                while(new Date().getTime() < stop + time) {
                    ;
                }
                callback();
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

                            this.board[i][j] = new Tile(this.randomImage, false,`${i}${j}`, false);
                            pairingArray[i][j] = this.board[i][j];

                            //meter imagens no array de imagens
                            this.imagesArray[contadorImagens] = this.board[i][j].image;
                            contadorImagens++;
                        }
                    }

                    for (let i = 0; i < this.rows; ++i) {
                        for (let j = this.columns / 2; j < this.columns; ++j) {
                            this.board[i][j] = new Tile(pairingArray[i][j - (this.columns / 2)].image, false, `${i}${j}`,false) ;
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
