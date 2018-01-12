<template>
    <div class="pull-md-right">
        <div v-show="win" class="alert alert-success">GANHASTE JOGADOR</div>
        <div id="board" class="board">
            <div v-for="(c,c1) in columns">
                <div class="board-row">
                    <div v-for="(r,r1) in rows">
                        <tile :r1="r1" :c1="c1" :img="board[r1][c1].image" :missed="board[r1][c1].missed" :matched="board[r1][c1].matched" :tileFlipped="board[r1][c1].tileFlipped" @click-tile="clickTile" >
                            <!--:img="board[r1][c1]"-->  <!--v-if="!board[r1][c1].matched"-->
                        </tile>
                    </div>
                </div>
            </div>
        </div>


        <div id="reset">
            <h2><strong>&nbsp;&nbsp;&nbsp;&nbsp;<a v-show="win" v-on:click.prevent="restartGame" >Restart</a></strong></h2>
        </div>
    </div>
</template>


<script>

import TileComponent from './tile.vue';
import Tile from '../Classes/Tile.js';


export default {

    props: ['columns', 'rows'],
    data: function () {

        return {

            allTiles: new Array(40),
            board: new Array(this.rows),
            firstchoice: null, //stores index of first card selected
            secondchoice: null, //stores index of second card selected
            picks: 0,  //counts how many picks have been made in each turn
            matches: 0, //counts number of matches made
            imagesArray: new Array((this.rows*this.columns)/2),
            randomImage:null,
            contadorParesMatched:0,
            win:false,

                /*
                numAttempts = 0  //counts the number of attempts made
                backcard = "blank.png"  //shows the back of the card when turned over
                var faces = [] //an array to store the images for the front of the cards
                */

            }
        },

        methods: {

            clickTile: function (posicaoLinha, posicaoColuna) {
                if (this.board[posicaoLinha][posicaoColuna].image==="empty") {
                    return;
                }

                //para virar a tile e dar update na imagem
                this.board[posicaoLinha][posicaoColuna].tileFlipped = true;
                this.$forceUpdate();

                this.board[posicaoLinha][posicaoColuna].missed = false;
                //Escolha carta 1 e 2
                this.chooseCard(posicaoLinha, posicaoColuna);
                //compara cartas escolhidas

                if (this.picks === 2) {
                    this.checkCards();
                    let boardClass = document.getElementById("board").classList;
                    setTimeout(function () { boardClass.remove("noClicks");}, 1200);
                }

                console.log("linha: " + posicaoLinha + " -- Coluna: " + posicaoColuna);

                this.successMessage = this.currentPlayer + ' has Played';
                this.showSuccess = true;

                this.checkGameEnded();
            },


            chooseCard: function (posicaoLinha, posicaoColuna) {

                if (this.picks >= 2) {
                    console.log("ja foram selecionadas 2 cartas");
                    return;
                }



                if (this.picks === 0) {

                    //TODO: show image corresponding to first card clicked
                    this.firstchoice = this.board[posicaoLinha][posicaoColuna];
                    this.firstchoice.missed = false;
                    this.picks = 1;
                    console.log("First choice IMAGEM: " + this.board[posicaoLinha][posicaoColuna].image);
                    // console.log("picks: " + this.picks);

                }
                else {


                    //show image corresponding to second card clicked
                    this.secondchoice = this.board[posicaoLinha][posicaoColuna];
                    this.secondchoice.missed=false;
                    //check is 
                    if(this.secondchoice.key===this.firstchoice.key){
                        console.log("são a mesma peça!");
                        return;
                    }


                    this.picks = 2;

                    //para não se poder carregar
                    let boardClass = document.getElementById("board").classList;
                    boardClass.add("noClicks");

                    console.log("Second choice: " + this.board[posicaoLinha][posicaoColuna].image);
                    //console.log("picks: " + this.picks);
                }


            },

            checkCards: function () {

                if (this.secondchoice.image === this.firstchoice.image) {
                    //console.log("As imagens são iguais!");
                    let self = this;

                    this.matches++;
                    this.picks = 0;

                    setTimeout(function () { self.firstchoice.matched=true;}, 1000);
                    setTimeout(function () { self.secondchoice.matched=true;}, 1000);
                    self.$forceUpdate();
                    this.contadorParesMatched+=2;

                }

                else {
                    /*turn over first card to show back
                    turn over second card to show back*/
                    let self = this;
                    
                    setTimeout(function () { self.firstchoice.missed=true;}, 1000);
                    setTimeout(function () { self.secondchoice.missed=true;}, 1000);
                    self.$forceUpdate();

                    //para poder voltar a carregar nelas
                    this.picks = 0;
                    
                    setTimeout(function () {console.log("picks: " +this.picks);}, 2500);

                }

            },



            fillBoard: function () {
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

                            this.board[i][j] = new Tile(this.randomImage, false, `${i}${j}`, false, false);
                            pairingArray[i][j] = this.board[i][j];

                            //meter imagens no array de imagens
                            this.imagesArray[contadorImagens] = this.board[i][j].image;
                            console.log("imagem " + contadorImagens + ": " + this.imagesArray[contadorImagens]);
                            contadorImagens++;
                        }
                    }

                    for (let i = 0; i < this.rows; ++i) {
                        for (let j = this.columns / 2; j < this.columns; ++j) {
                            this.board[i][j] = new Tile(pairingArray[i][j - (this.columns / 2)].image, false,`${i}${j}`, false, false) ;
                        }
                    }
                } else {
                    //Quando Num colunas é IMPAR
                    for (let i = 0; i < this.rows / 2; ++i) {
                        for (let j = 0; j < this.columns; ++j) {
                            this.board[i][j] = new Tile(this.allTiles[Math.floor(Math.random() * this.allTiles.length)], false, `${i}${j}`);
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
            },

            getAllTiles: function () {
                for (let i = 0; i <= 40; i++) {
                    this.allTiles[i] = i;
                }
            },

            shuffle: function () {

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

        },

        checkNonRepeated: function(){
            while(this.imagesArray.includes(this.randomImage)){
                this.randomImage = this.allTiles[Math.floor(Math.random() * this.allTiles.length)];
            }
        },

        checkGameEnded: function(){

            console.log("contadorParesMatched: "+this.contadorParesMatched);

            if(this.contadorParesMatched===(this.columns*this.rows)){
                //setTimeout(function () {alert("GANHASTE CARALHO!!");}, 2100);
                this.win = true;
            }

        },

        restartGame: function(){
            this.firstchoice= null; //stores index of first card selected
            this.secondchoice= null; //stores index of second card selected
            this.picks= 0;  //counts how many picks have been made in each turn
            this.matches= 0; //counts number of matches made
            this.imagesArray= new Array((this.rows*this.columns)/2);
            this.randomImage=null;
            this.contadorParesMatched=0;
            this.win=false;
            this.fillBoard();
        }


    },

    computed: {
        numberOfTiles: function () {
            return this.rows * this.columns;
        }
    },
    beforeMount() {
        this.getAllTiles();
        this.fillBoard();
    },



    components: {
        'tile': TileComponent
    }
}

</script>


<style scoped>

.noClicks{
  pointer-events: none;
}

</style>