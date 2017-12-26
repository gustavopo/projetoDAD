<template>
    <div class="board">
        <div v-for="(c,c1) in columns">
            <div class="board-row">
                <div v-for="(r,r1) in rows">
                    <tile :r1="r1" :c1="c1" :img="board[r1][c1].image" :missed="board[r1][c1].missed" 
                    @click-tile="clickTile" >
                    <!--:img="board[r1][c1]"-->  <!--v-if="!board[r1][c1].matched"-->
                </tile>
            </div>
        </div>
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
            tileFlipped: false,
            currentValue: 1,
                firstchoice: null, //stores index of first card selected
                secondchoice: '', //stores index of second card selected
                picks: 0,  //counts how many picks have been made in each turn
                matches: 0, //counts number of matches made

                /*
                numAttempts = 0  //counts the number of attempts made
                backcard = "blank.png"  //shows the back of the card when turned over
                var faces = [] //an array to store the images for the front of the cards
                */

            }
        },

        methods: {


            chooseCard: function (posicaoLinha, posicaoColuna) {

                if (this.picks >= 2) {
                    console.log("ja foram selecionadas 2 cartas");
                    return;
                }


                if (this.picks === 0) {

                    //TODO: show image corresponding to first card clicked
                    this.firstchoice = this.board[posicaoLinha][posicaoColuna];
                    this.picks = 1;
                    console.log("First choice IMAGEM: " + this.board[posicaoLinha][posicaoColuna].image);
                    // console.log("picks: " + this.picks);

                }
                else {

                    //TODO: show image corresponding to second card clicked
                    this.secondchoice = this.board[posicaoLinha][posicaoColuna];

                                    // increment numAttempts by 1
                                    if(this.secondchoice.key===this.firstchoice.key){
                                        console.log("são a mesma peça!");
                                        return;
                                    }


                                    this.picks = 2;
                                    console.log("Second choice: " + this.board[posicaoLinha][posicaoColuna].image);
                    //console.log("picks: " + this.picks);
                }


            },

            checkCards: function () {

                if (this.secondchoice.image === this.firstchoice.image) {
                    console.log("As imagens são iguais!");
                    let self = this;

                    this.matches++;
                    this.picks = 0;

                    this.firstchoice.image = 'empty';
                    this.secondchoice.image = 'empty';


                    setInterval(function () { self.$forceUpdate();}, 1000)


                    //this.$forceUpdate();
                    /*
                    IF all matches found THEN
                        show alert declaring game over and how many attempts were taken
                        reload the game
                    ENDIF
                    */

                }

                else {
                    /*turn over first card to show back
                    turn over second card to show back*/
                    console.log("As imagens sao diferentes");
                    //TODO: Virar as cartas para baixo
                    let self = this;

                    //para o tile saber que falhou e virar
                    this.firstchoice.missed = true;
                    this.secondchoice.missed=true;

                    setInterval(function () { self.$forceUpdate();}, 2000)


                    //para poder voltar a carregar nelas
                    this.picks = 0;

                }

            },
            clickTile: function (posicaoLinha, posicaoColuna) {
                if (this.board[posicaoLinha][posicaoColuna].image==="empty") {
                    return;
                }

                //Escolha carta 1 e 2
                this.chooseCard(posicaoLinha, posicaoColuna);
                //compara cartas escolhidas

                if (this.picks === 2) {
                    this.checkCards();

                }

                console.log("linha: " + posicaoLinha + " -- Coluna: " + posicaoColuna);

                /* Figueiredo Code Object (TILE)

                   let tile = new Tile(17, false, `${posicaoLinha}${posicaoColuna}`)
                    //this.board[posicaoLinha][posicaoColuna] = tile;
                    Object.assign(this.board[posicaoLinha][posicaoColuna], tile);
                    this.$forceUpdate();
                    */

                    this.successMessage = this.currentPlayer + ' has Played';
                    this.showSuccess = true;


                // this.checkGameEnded();
            },

            fillBoard: function () {
                let pairingArray = new Array(this.rows);

                for (let k = 0; k < this.rows; ++k) {
                    this.board[k] = new Array(this.columns);
                    pairingArray[k] = new Array(this.columns);
                }

                if ((this.columns) % 2 === 0) {
                    //Quando Num colunas é PAR
                    for (let i = 0; i < this.rows; ++i) {
                        for (let j = 0; j < this.columns / 2; ++j) {

                            this.board[i][j] = new Tile(this.allTiles[Math.floor(Math.random() * this.allTiles.length)], false, `${i}${j}`);
                            pairingArray[i][j] = this.board[i][j];
                        }
                    }

                    for (let i = 0; i < this.rows; ++i) {
                        for (let j = this.columns / 2; j < this.columns; ++j) {
                            this.board[i][j] = new Tile(pairingArray[i][j - (this.columns / 2)].image, false,`${i}${j}`) ;
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

        sleep: function (miliseconds) {
            var currentTime = new Date().getTime();

            while (currentTime + miliseconds >= new Date().getTime()) {
            }
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