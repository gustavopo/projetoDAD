<template>
    <div style="text-align: center">
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <!-- <h2>Current Player : {{ currentPlayer }}</h2> -->
            <br>
        </div>


        <div class="game-zone-content" style="display: inline-block">
            <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded" v-on:click.prevent="restartGame">Restart</a></strong>
            </div>

            <board :columns="4" :rows="4">
            </board>

            <!--
            <div class="board">
                <div v-for="(piece, key) of board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(index)">
                </div>
            </div>
            -->

            <hr>
        </div>

    </div>
</template>

<script>

    import Board from './board.vue';

    export default {
        data: function(){
            return {
                title: 'Memory Game - Single Player',
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentValue: 1,
                player1User: undefined,
                player2User: undefined,
                gameEnded:false,


            }
        },

        methods:{
            restartGame: function(){
                console.log('restartGame');
               // this.board= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
            'board': Board
        },

    }
</script>
