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

</div>
</template>


<script>

import TileComponent from './tile.vue';
import Tile from '../Classes/Tile.js'


export default {

    props: ['columns', 'rows'],
    data: function () {

        return {

            board: new Array(this.rows),
            tileFlipped:false,
            currentValue: 1,

        }
    },

    methods: {

        pieceImageURL: function (img) {
            var imgSrc = String(img);
            console.log('na board');
            return 'img/' + imgSrc + '.png';
        },


        clickTile: function (posicaoLinha, posicaoColuna) {
            if (this.gameEnded) {
                console.log('juca');
                return;
            };

            console.log(posicaoLinha, posicaoColuna);
            console.log(this.board[posicaoLinha][posicaoColuna]);


            let tile = new Tile(17,false,`${posicaoLinha}${posicaoColuna}`)

            //this.board[posicaoLinha][posicaoColuna] = tile;
            Object.assign(this.board[posicaoLinha][posicaoColuna],tile);
            
            this.$forceUpdate();


            console.log(this.board[posicaoLinha][posicaoColuna]);


            this.currentValue = (this.currentValue == 1)? 2 : 1;


            this.tileFlipped = true;
                //this.board[index] = this.currentValue;
                this.successMessage = this.currentPlayer + ' has Played';
                this.showSuccess = true;
                //this.currentValue = (this.currentValue == 1)? 2 : 1;
                // this.checkGameEnded();
            },

            fillBoard: function () {

                for (let k =0; k < this.rows; ++k)
                {
                    this.board[k] = new Array(this.columns);
                }

                for (let i = 0; i < this.rows; ++i)
                {
                    for(let j=0; j<this.columns; ++j)
                    {
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

                        this.board[i][j] = new Tile("3",false,`${i}${j}`);
                        console.log(this.board[i][j].key);

                       // console.log(this.board[i][j]);
                   }
               }

           },
       },

       computed: {
        numberOfTiles: function () {
            return this.rows * this.columns;
        }
    },
    beforeMount() {
        this.fillBoard();
        //this.fillBoard1();
    },

    components: {
        'tile': TileComponent
    }
}

</script>