<template>
    <div style="text-align: center">
        <div>
            <h2 class="text-center">JOGO {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content" style="display: inline-block">
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="game.gameEnded" v-on:click.prevent="closeGame">Close Game</a></strong>
            </div>
            <div id="board" class="board">
                <div v-for="(c,c1) in game.columns" >
                    <div class="board-row">
                        <div v-for="(r,r1) in game.rows">
                            <img v-bind:src="pieceImageURL(game.board[r1][c1])" v-on:click="clickPiece(r1,c1)">
                            {{game.board[r1][c1].image}}
                        </div>
                    </div>
                </div>
            </div>
            <div id="timer">
                {{game.timer}}
            </div>  
            <table id="espaco">
            </table>

        </div>

        <hr>
    </div>
</template>

<script type="text/javascript">
export default {
    props: ['game','socketParent'],
    data: function () {
        return {
        }
    },
    computed: {
        ownPlayerNumber() {
       /*     console.log('game socket: ' +this.game.player1SocketID );
            console.log('parent socket: ' +this.$parent.socketId );
            console.log('socketProps: '+this.socketParent);*/
            if (this.game.player1SocketID == this.$parent.socketId) {
                return 1;
            } else if (this.game.player2SocketID == this.$parent.socketId) {
                return 2;
            } else if (this.game.player3SocketID == this.$parent.socketId) {
                return 3;
            }   else if (this.game.player4SocketID == this.$parent.socketId) {
                return 4;
            }
            return 0;
        },
        getWinner() {
            switch(this.ownPlayerNumber){
                case 1: return this.game.playersArray[0];
                break;
                case 2: return this.game.playersArray[1];
                break;
                case 3: return this.game.playersArray[2];
                break;
                case 4: return this.game.playersArray[3];
                break;
            }
        },

        ownPlayerName() {
            var ownNumber = this.ownPlayerNumber;
            if (ownNumber == 1)
                return this.game.playersArray[0].name;
            if (ownNumber == 2)
                return this.game.playersArray[1].name;
            return "Unknown";
        },
        adversaryPlayerName() {
            var ownNumber = this.ownPlayerNumber;
            console.log('player turno name: ' +this.game.playersArray[this.game.playerTurn-1].name)
            return this.game.playersArray[this.game.playerTurn-1].name;
            return "Unknown";
        },
        message() {
            if (!this.game.gameStarted) {
                return "Game has not started yet";
            } else if (this.game.gameEnded) {
                this.setWinner();
                if (this.game.winner == this.ownPlayerNumber) {
                    return "Game has ended. You Win with: " + this.getWinner.pairsCombined +" pairs";
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
            if(!piece.tileFlipped){
                return 'img/hidden.png';
            }else{
                return 'img/' + imgSrc + '.png';
            }

        },

        setWinner(){

            let gameObject;
            axios.get('api/games/'+this.game.gameID)
            .then(response => {
                gameObject = response.data;
            });

            console.log('gameObject '+ gameObject);



            axios.put('/api/games/'+this.game.gameID+'/endgame/'+this.game.winner, gameObject)
            .then((response) => {
                        //console.log(response);
                       // this.resetUser()
                       //let successMessage = response.data.message;
                       //alert('Sucess' + sucessMessage);
                   })
            .catch((error) => {
                        //Show errors
                        let data = error.response.data;
                        console.log(data);
                        for (let key in this.errors) {
                            this.errors[key] = []
                            let errorMessage = data[key];
                            //   console.log('key  ', key);
                            //   console.log('errorMessage: ', response.data.message);

                            if (errorMessage) {
                                this.error[key] = errorMessage;
                            }
                        }
                    });

                //this.sendRegisterEmail(newUser);

                console.log("winner mudado com SUCESSO");

                //TODO: ONClick register -> enviar email de confirmação
            },

            closeGame() {
                this.$parent.close(this.game);
            },

            clickPiece(r1,c1) {
              if (!this.game.gameEnded) {
                if (this.game.playerTurn != this.ownPlayerNumber) {
                    alert("It's not your turn to play");
                    alert("you are: " + this.ownPlayerNumber+ " and its this guy's turn: "+ this.game.playerTurn);
                } else {
                    this.$parent.play(this.game, r1, c1);
                }
            }
        }
    },

    mounted(){

    }
}
</script>

<style scoped>
table {
    width: 100%;
}

.noClicks{
  pointer-events: none;
}


</style>