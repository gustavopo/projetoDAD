<template>
    <div class="board">
        <div v-for="(c,c1) in columns">
            <div class="board-row">
                <div v-for="(r,r1) in rows">
                    <tile :r1="r1" :c1="c1" :img="board[r1][c1]" @click-tile="clickTile">
                <!--:img="board[r1][c1]"-->
                    </tile>
                   <!-- <img v-bind:src="pieceImageURL(board[r1][c1])">-->
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Tile from './tile.vue';

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
            }

            console.log(posicaoLinha, posicaoColuna);


            this.board[posicaoLinha,posicaoColuna] = this.currentValue;
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
                        this.board[i][j] = "hidden";

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
    },

    components: {
        'tile': Tile
    }
}

</script>