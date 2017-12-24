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
                matches:0, //counts number of matches made

                /*
                numAttempts = 0  //counts the number of attempts made
                backcard = "blank.png"  //shows the back of the card when turned over
                var faces = [] //an array to store the images for the front of the cards
                */

            }
        },

        methods: {

            pieceImageURL: function (img) {
                var imgSrc = String(img);
                console.log('na board');
                return 'img/' + imgSrc + '.png';
            },


            chooseCard: function (posicaoLinha, posicaoColuna) {

                if (this.picks >= 2) {
                    console.log("ja foram selecionadas 2 cartas");
                    return;
                }


                if (this.picks == 0) {
                    this.firstchoice = this.board[posicaoLinha, posicaoColuna];
                    console.log("firstchoice ok");

                    //TODO: show image corresponding to first card clicked
                    this.picks = 1;
                    console.log("First choice: " + this.board[posicaoLinha, posicaoColuna]);
                    console.log("picks: " + this.picks);

                }
                else {

                    this.second = this.board[posicaoLinha, posicaoColuna];
                    //TODO: show image corresponding to second card clicked
                    this.picks = 2;
                    console.log("Second choice: " + this.board[posicaoLinha, posicaoColuna]);
                    console.log("picks: " + this.picks);
                }


            },
            checkCards: function () {

                // increment numAttempts by 1

                //TODO: Os valores estão a dar UNDEFINED
                if(this.secondchoice.img == this.firstchoice.img)
                {
                    this.matches++;
                    this.picks=0;
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

                    this.picks=0;
                }

            },
            clickTile: function (posicaoLinha, posicaoColuna) {
                if (this.gameEnded) {
                    console.log('juca');
                    return;
                }

                //Escolha carta 1 e 2
                this.chooseCard(posicaoLinha, posicaoColuna);
                //compara cartas escolhidas
                this.checkCards();

                console.log("linha: " + posicaoLinha + " -- Coluna: " + posicaoColuna);

                /* Figueiredo Code Object (TILE)

                   let tile = new Tile(17, false, `${posicaoLinha}${posicaoColuna}`)
                    //this.board[posicaoLinha][posicaoColuna] = tile;
                    Object.assign(this.board[posicaoLinha][posicaoColuna], tile);
                    this.$forceUpdate();
                */

                console.log("this"+this.board[posicaoLinha][posicaoColuna].img);
                console.log("img2"+this.secondchoice);
                console.log("img1"+this.firstchoice);


                this.currentValue = (this.currentValue == 1) ? 2 : 1;


                this.tileFlipped = true;
                //this.board[index] = this.currentValue;
                this.successMessage = this.currentPlayer + ' has Played';
                this.showSuccess = true;
                //this.currentValue = (this.currentValue == 1)? 2 : 1;
                // this.checkGameEnded();
            },

            fillBoard: function () {

                for (let k = 0; k < this.rows; ++k) {
                    this.board[k] = new Array(this.columns);
                }

                for (let i = 0; i < this.rows; ++i) {
                    for (let j = 0; j < this.columns; ++j) {
                        /*this.board[0][0] = new Tile("5",false);
                        this.board[0][1] = new Tile("1",false);
                        this.board[0][2] = new Tile("2",false);
                        this.board[0][3] = new Tile("20",false);
                        this.board[1][0] = new Tile("3",false);
                        this.board[1][1] = new Tile("3",false);
                        this.board[1][2] = new Tile("3",false);
                        this.board[1][3] = new Tile("3",false);
                        this.board[2][0] = new Tile("3",false);
                        this.board[2][1] = new Tile("3",false);
                        this.board[2][2] = new Tile("3",false);
                        this.board[2][3] = new Tile("3",false);
                        this.board[3][0] = new Tile("3",false);
                        this.board[3][1] = new Tile("3",false);
                        this.board[3][2] = new Tile("3",false);
                        this.board[3][3] = new Tile("3",false);*/

                        this.board[i][j] = new Tile("hidden", false, `${i}${j}`);
                        console.log(this.board[i][j].key);

                        // console.log(this.board[i][j]);
                    }
                }

            },

            getAllTiles: function(){
                for (let i=0; i<=40; i++)
                {
                    this.allTiles[i] = i;


                }
            },

            getNTiles: function(){

                let numPares = (this.rows * this.columns)/2;
                numPares = Math.floor(numPares);

                //TODO Verificar que os elementos não se repetem ao fazer o random
                for(let i=0; i< numPares; i++)
                {
                   // this.board[this.rows,this.columns] = this.allTiles[Math.floor(Math.random()*this.allTiles.length)];


                }
            },


            shuffle: function()
            {

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
            this.getNTiles();
        },

        components: {
            'tile': TileComponent
        }
    }

</script>