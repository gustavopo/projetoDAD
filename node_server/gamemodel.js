/*jshint esversion: 6 */


var Tile = require('./Tile.js');
var Player = require('./Player.js');
const axios = require("axios");
var url = "http://projetodad.dad";


class Game {
    constructor(ID, player1Name, name, maxPlayers, format) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.name=name;
        this.maxPlayers=maxPlayers || 2;
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
        this.playersArray =  new Array(this.maxPlayers);
        this.playersArray[0] = new Player(0,1,player1Name);
        this.setFormat(format);
        this.currentNumberPlayers=1;
        this.playerWinner =  this.playersArray[0];
        this.winner = this.playerWinner.playerNumber;



        this.board = new Array(this.rows);
        for (let k = 0; k < this.rows; ++k) {
            this.board[k] = new Array(this.columns);
        }
        this.getAllTiles();
        this.fillBoard();

    }

    setFormat(format){
       switch(format){
        case '4x4':
        this.rows =4;
        this.columns =4;
        break;
        case '4x6':
        this.rows=4;
        this.columns=6;
        break;
        case '6x6':
        this.rows=6;
        this.columns=6;
        break;
        default:
        this.rows =4;
        this.columns =4;
    }
}

join(player2Name, gameID,game,io){
    if(this.currentNumberPlayers == this.maxPlayers){
        return;
    }
    this.playersArray[this.currentNumberPlayers] = new Player(0,this.currentNumberPlayers+1,player2Name);
    this.currentNumberPlayers++;
    if(this.currentNumberPlayers!=this.maxPlayers){
        return;
    }


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



    for(let i=1; i<this.playersArray.length; i++){
        if(this.playersArray[i].pairsCombined>this.playerWinner.pairsCombined){
            console.log('WInner number: ' + this.winner);

            this.playerWinner = this.playersArray[i];
            this.winner =  this.playersArray[i].playerNumber;

        }
    }

}

    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, r1, c1, gameID, game, io){
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }

        if (this.board[r1][c1].image == 'empty') {
            return false;
        }

        this.board[r1][c1].tileFlipped = true;

        this.chooseCard(r1,c1);
        if(this.picks===2){
            this.checkCards(io, gameID, game);
            setTimeout(function() {io.to(gameID).emit('game_changed',game);}, 1000);
        }

        if (!this.checkGameEnded()) {
            this.checkWinner();
            if(this.picksTurn==2 && !this.matched){
              this.changeTurn(io,gameID,game);
          }
      }else{
        console.log('ganhaste oh meu!!')
    }


    return true;

}

changeTurn(io, gameID, game){

    this.playerTurn = this.playerTurn == this.maxPlayers ? 1 : this.playerTurn+1;
    this.picksTurn = 0;

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

                }else {

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
               }
           }


        checkCards(io, gameID, game){

            if (this.secondChoice.image === this.firstChoice.image) {
                    //console.log("As imagens são iguais!");

                    let self = this;

                   // this.matches++;
                   setTimeout(function () {self.firstChoice.image='empty'}, 500);
                   setTimeout(function () {self.secondChoice.image='empty';}, 500);

                   
                   this.matched = true;
                   this.picks = 0;

                   this.contadorParesMatched+=2;
                   this.playersArray[this.playerTurn-1].pairsCombined++;


               }

               else {
                    /*turn over first card to show back
                    turn over second card to show back*/
                    let self = this;

                    setTimeout(function () {self.firstChoice.tileFlipped=false;}, 500);
                    setTimeout(function () {self.secondChoice.tileFlipped=false;}, 500);

                    this.firstChoice.timeOut=true;
                    this.secondChoice.timeOut=true;


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

                            this.board[i][j] = new Tile(this.randomImage, false,`${i}${j}`, false);
                            pairingArray[i][j] = this.board[i][j];

                            //meter imagens no array de imagens
                            this.imagesArray[contadorImagens] = this.randomImage;
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

        checkNonRepeated(randomImageMethod){

            var includes = require('array-includes');

            while(includes(this.imagesArray, this.randomImage)){
                this.randomImage = this.allTiles[Math.floor(Math.random() * this.allTiles.length)];
            }
        }


    }


    module.exports = Game;
