<template>
    <div>
        <div>
            <h2 class="text-center">JOGO {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="game.gameEnded" v-on:click.prevent="closeGame">Close Game</a></strong>
            </div>
            <div id="board" class="board">
                <div v-for="(c,c1) in 4">
                    <div class="board-row">
                        <div v-for="(r,r1) in 4">
                            <img v-bind:src="pieceImageURL(game.board[r1][c1])" v-on:click="clickPiece(r1,c1)">
                    </div>
                </div>
            </div>
        </div>  
            <table id="espaco">
            </table>

    </div>

    <hr>
     <br>
    <br>
</div>
</template>

<script type="text/javascript">
export default {
    props: ['game'],
    data: function () {
        return {}
    },
    computed: {
        ownPlayerNumber() {
            if (this.game.player1SocketID == this.$parent.socketId) {
                return 1;
            } else if (this.game.player2SocketID == this.$parent.socketId) {
                return 2;
            }
            return 0;
        },
        ownPlayerName() {
            var ownNumber = this.ownPlayerNumber;
            if (ownNumber == 1)
                return this.game.player1;
            if (ownNumber == 2)
                return this.game.player2;
            return "Unknown";
        },
        adversaryPlayerName() {
            var ownNumber = this.ownPlayerNumber;
            if (ownNumber == 1)
                return this.game.player2;
            if (ownNumber == 2)
                return this.game.player1;
            return "Unknown";
        },
        message() {
            if (!this.game.gameStarted) {
                return "Game has not started yet";
            } else if (this.game.gameEnded) {
                if (this.game.winner == this.ownPlayerNumber) {
                    return "Game has ended. You Win.";
                } else if (this.game.winner == 0) {
                    return "Game has ended. There was a tie.";
                }
                return "Game has ended and " + this.adversaryPlayerName + " has won. You lost.";
            } else {
                if (this.game.playerTurn == this.ownPlayerNumber) {
                    return "It's your turn";
                } else {
                    return "It's " + this.adversaryPlayerName + " turn";
                }
            }
            return "Game is inconsistent";
        },
        alerttype() {
            if (!this.game.gameStarted) {
                return "alert-warning";
            } else if (this.game.gameEnded) {
                if (this.game.winner == this.ownPlayerNumber) {
                    return "alert-success";
                } else if (this.game.winner == 0) {
                    return "alert-info";
                }
                return "alert-danger";
            }
            if (this.game.playerTurn == this.ownPlayerNumber) {
                return "alert-success";
            } else {
                return "alert-info";
            }
        }
    },
    methods: {
        pieceImageURL(piece) {
            var imgSrc = String(piece.image);
            console.log(imgSrc);
        if(!piece.tileFlipped){
            return 'img/hidden.png';
        }else{
            return 'img/' + imgSrc + '.png';
        }

        },
        closeGame() {
            this.$parent.close(this.game);
        },

        clickPiece(r1,c1) {
            if (!this.game.gameEnded) {
                if (this.game.playerTurn != this.ownPlayerNumber) {
                    alert("It's not your turn to play");
                } else {
                        //console.log(r1 +""+""+ c1)
                        this.$parent.play(this.game, r1, c1);
                        let self = this;
                        setTimeout(function () { self.$forceUpdate();}, 3000);
                        
                }
            }
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
}

td {
    width: 33.333%;
}

td:after {
    content: '';
    display: block;
    margin-top: 100%;
}
</style>