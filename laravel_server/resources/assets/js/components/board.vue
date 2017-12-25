<template>
    <div class="board">
        <div v-for="(c,c1) in columns">
            <div class="board-row">
                <div v-for="(r,r1) in rows">
                    <tile :r1="r1" :c1="c1" :img="board[r1][c1].image" @click-tile="clickTile">
                        <!--:img="board[r1][c1]"-->
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
                firstchoice: '', //stores index of first card selected
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

            pieceImageURL: function (img) {
                let imgSrc = String(img);
                console.log('na board');
                return 'img/' + imgSrc + '.png';
            },


            chooseCard: function (posicaoLinha, posicaoColuna) {

                if (this.picks >= 2) {
                    console.log("ja foram selecionadas 2 cartas");
                    return;
                }


                if (this.picks === 0) {

                    //TODO: show image corresponding to first card clicked
                    this.firstchoice = this.board[posicaoLinha][posicaoColuna].image;
                    this.picks = 1;
                    console.log("First choice IMAGEM: " + this.board[posicaoLinha][posicaoColuna].image);
                    console.log("picks: " + this.picks);

                }
                else {
                    //TODO: show image corresponding to second card clicked
                    this.secondchoice = this.board[posicaoLinha][posicaoColuna].image;
                    this.picks = 2;
                    console.log("Second choice: " + this.board[posicaoLinha][posicaoColuna].image);
                    console.log("picks: " + this.picks);
                }


            },

            checkCards: function () {

                // increment numAttempts by 1

                //TODO: Os valores estão a dar UNDEFINED
                if (this.secondchoice === this.firstchoice) {
                    console.log("As imagens são iguais!");

                    this.matches++;
                    this.picks = 0;
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
                    this.picks = 0;
                }

            },
            clickTile: function (posicaoLinha, posicaoColuna) {
                if (this.gameEnded) {
                    return;
                }

                //Escolha carta 1 e 2
                this.chooseCard(posicaoLinha, posicaoColuna);
                //compara cartas escolhidas

                if (this.picks === 2) {
                    this.checkCards(posicaoLinha, posicaoColuna);
                }

                console.log("linha: " + posicaoLinha + " -- Coluna: " + posicaoColuna);

                /* Figueiredo Code Object (TILE)

                   let tile = new Tile(17, false, `${posicaoLinha}${posicaoColuna}`)
                    //this.board[posicaoLinha][posicaoColuna] = tile;
                    Object.assign(this.board[posicaoLinha][posicaoColuna], tile);
                    this.$forceUpdate();
                */

                console.log("this board -> " + this.board[posicaoLinha][posicaoColuna].image);


                this.tileFlipped = true;
                //this.board[index] = this.currentValue;
                this.successMessage = this.currentPlayer + ' has Played';
                this.showSuccess = true;
                //this.currentValue = (this.currentValue == 1)? 2 : 1;
                // this.checkGameEnded();
            },

            fillBoard: function () {
                let pairingArray= new Array(this.rows);

                for (let k = 0; k < this.rows; ++k) {
                    this.board[k] = new Array(this.columns);
                    pairingArray[k] = new Array(this.columns);
                }

                for (let i = 0; i < this.rows; ++i) {
                    for (let j = 0; j < this.columns / 2; ++j) {

                        this.board[i][j] = new Tile(this.allTiles[Math.floor(Math.random() * this.allTiles.length)], false, `${i}${j}`);
                        //this.board[i][j] = new Tile("3", false, `${i}${j}`);
                       // console.log("Primeira metade" + this.board[i][j].key);
                        pairingArray[i][j]= this.board[i][j];
                        console.log("1-pairing array:" + pairingArray[i][j].key);
                    }
                }


                for (let i = 0; i < this.rows; ++i) {
                    for (let j = this.columns/2; j < this.columns; ++j) {
                        this.board[i][j] = pairingArray[i][Math.ceil(j/2-1)];
                        //this.board[i][j] = new Tile(this.allTiles[Math.floor(Math.random() * this.allTiles.length)], false, `${i}${j}`);
                        //this.board[i][j] = new Tile("3", false, `${i}${j}`);
                        //console.log("Segunda metade" + this.board[i][j].key);
                        //console.log("2-pairing array:" + pairingArray[i][j].image);
                    }
                }

            },

            getAllTiles: function () {
                for (let i = 0; i <= 40; i++) {
                    this.allTiles[i] = i;
                }
            },

            getNTiles: function () {

                let numPares = (this.rows * this.columns) / 2;
                numPares = Math.floor(numPares);

                //TODO Verificar que os elementos não se repetem ao fazer o random
                /*     for (let i = 0; i < numPares; i++) {
                         for (let k = 0; k < numPares; k++) {
                          //   this.board[i][k] = this.allTiles[Math.floor(Math.random() * this.allTiles.length)];
                             console.log("--> GETNTILES-> " + this.board[i][k].image);
                         }
                     }
                 */

                for (let i = 0; i < this.rows; ++i) {
                    for (let j = 0; j < this.columns; ++j) {
                        this.board[i][j] = new Tile(this.allTiles[Math.floor(Math.random() * this.allTiles.length)], false, `${i}${j}`);
                        console.log("AQUI -" + this.board[i][j])
                    }
                }
            },


            shuffle: function () {

                /* Algoritmo:

                temp //temp variable used for swapping
                swaps  //counter for number of swaps made
                i      //random number
                j      //random number

                FOR swaps = 1 to 10
                i = choose random index from array
                j = choose random index from array
                Move card[i] to temp
                Move card[j] to card[i]
                Move temp to card[j]
                END
                END
                 */

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
            //this.getNTiles();
        },

        components: {
            'tile': TileComponent
        }
    }

</script>