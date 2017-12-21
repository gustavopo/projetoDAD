<template>
    <div >
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <!-- <h2>Current Player : {{ currentPlayer }}</h2> -->
            <br>
        </div>


        <div class="game-zone-content">
            <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded" v-on:click.prevent="restartGame">Restart</a></strong>
            </div>

            <div class="board">
                <div v-for="(piece, key) of board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(index)">
                </div>
            </div>
            <hr>
        </div>

    </div>
</template>

<script>

    import Tile from './tile.vue';

    export default {
        data: function(){
            return {
                title: 'Memory Game - Single Player',
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentValue: 1,
                tileFlipped: false,
                gameEnded:false,
                player1User: undefined,
                player2User: undefined,
                board: [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]

            }
        },

        methods:{

            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                if(this.tileFlipped){
                    return 'img/' + imgSrc + '.png';
                }else{
                    return 'img/0.png';
                }
            },

            clickPiece: function(index) {
                if(this.gameEnded){
                    console.log('juca');
                    return;
                }

                this.tileFlipped=true;
                //this.board[index] = this.currentValue;
                this.successMessage = this.currentPlayer+' has Played';
                this.showSuccess = true;
                //this.currentValue = (this.currentValue == 1)? 2 : 1;
                // this.checkGameEnded();
            },

            restartGame: function(){
                console.log('restartGame');
                this.board= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                this.showSuccess= false;
                this.showFailure= false;
                this.successMessage= '';
                this.failMessage= '';
                this.currentValue= 1;
                this.gameEnded= false;
            },

            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - START
            // ----------------------------------------------------------------------------------------
            //
            //TODO
            //
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - END
            // ----------------------------------------------------------------------------------------


        },

        components: {
            'tile': Tile
        },

    }
</script>
