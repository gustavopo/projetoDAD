<template>
    <div class="board">
        <div v-for="c in this.columns">
            <div class="board-row">
                <div v-for="r in this.rows">

                    <tile @click-tile="clickTile" :img="4" >

                    </tile>
                </div>
                <!-- <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(index)"> -->
            </div>
        </div>
    </div>
</template>


<script>

    import Tile from './tile.vue';

    export default {

        props: ['columns', 'rows', 'tileFlipped'],
        data: function () {

            return {

                board: new Array(this.rows)

            }
        },

        methods: {
     /*       pieceImageURL: function (piece) {

                var imgSrc = String(piece);
                console.log(this.columns);
                return 'img/' + imgSrc + '.png';


            },
*/
            clickTile: function (tile) {
                if (this.gameEnded) {
                    console.log('juca');
                    return;
                }
                console.log(this.numberOfTiles());

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
                        this.board[i][j] = 2;

                        console.log(this.board[i][j]);
                    }
                }

            }
        },

        computed: {
            numberOfTiles: function () {
                return this.rows * this.columns;
            }
        },
        beforeMount() {
            console.log(this.board+ "1");
            this.fillBoard();
           console.log(this.board);
        },

        components: {
            'tile': Tile
        }
    }

</script>