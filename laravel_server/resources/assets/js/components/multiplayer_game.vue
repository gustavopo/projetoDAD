<template>
    <div>
        <div>
            <h3 class="text-center">{{title}}</h3>
            <br>
            <h2>Seu nome atual: {{currentPlayer}}</h2>
            <hr>
            <h3 class="text-center">Lobby</h3>
            <p>
                <button class="btn btn-xs btn-success" v-on:click.prevent="showCreateGame">Criar Jogo
                </button>
            </p>
            <createGame v-if="createGameShow" @game-saved="gameSaved"></createGame>
            <hr>
            <h4>Jogos Pendentes (<a @click.prevent="loadLobby">Refresh</a>)
            </h4>
            <lobby :games="lobbyGames" @join-click="join"></lobby>
            <template v-for="game in activeGames">
                <game :socketParent="socketId" :game="game"></game>
            </template>
        </div>
    </div>
</template>

<script type="text/javascript">
import Lobby from './lobby.vue';
import Game from './game.vue';
import CreateGame from './createGame.vue';

export default {
    data: function () {
        return {
            title: 'Jogo da Memória Multiplayer',
            currentPlayer: '',
            lobbyGames: [],
            activeGames: [],
            socketId: "ola mundo",
            createGameShow: false,
            maxPlayers:[],
            authUser: null,
            name:'joao',
            numberGames:'',
            emptyPlayerName:true
        }
    },
    sockets: {
        connect() {
            console.log('socket connected');
            this.socketId = this.$socket.id;
        },
        discconnect() {
            console.log('socket disconnected');
            this.socketId = "";
        },
        lobby_changed() {
            this.loadLobby();
        },
        my_active_games_changed() {
            this.loadActiveGames();
        },
        my_active_games(games) {
            this.activeGames = games;
        },
        my_lobby_games(games) {
            this.lobbyGames = games;
        },
        invalid_play(errorObject) {
            if (errorObject.type == 'Invalid_Game') {
                alert("Error: Game does not exist on the server");
            } else if (errorObject.type == 'Invalid_Player') {
                alert("Error: Player not valid for this game");
            } else if (errorObject.type == 'Invalid_Play') {
                alert("Error: Move is not valid or it's not your turn");
            } else {
                alert("Error: " + errorObject.type);
            }
        },
        game_changed(game) {
            for (var lobbyGame of this.lobbyGames) {
                if (game.gameID == lobbyGame.gameID) {
                    Object.assign(lobbyGame, game);
                    break;
                }
            }
            for (var activeGame of this.activeGames) {
                if (game.gameID == activeGame.gameID) {
                    Object.assign(activeGame, game);
                    break;
                }
            }
        },
        timer_changed(game){  
           for (var lobbyGame of this.lobbyGames) {
            if (game.gameID == lobbyGame.gameID) {
                Object.assign(lobbyGame, game);
                break;
            }
        }
        for (var activeGame of this.activeGames) {
            if (game.gameID == activeGame.gameID) {
                //console.log(game.timer);
                Object.assign(activeGame, game);
                break;
            }
        }   
    }


},
methods: {

    getAuthUser() {
        let user = this.$auth.getAuthenticatedUser();
        this.authUser = user;
        this.currentPlayer = this.authUser.name;
    },

    gameSaved(name, maxPlayers,format) {
        console.log(name + maxPlayers);
        this.createGame(name, maxPlayers, format);
    },
    showCreateGame() {
        this.createGameShow = true;
    },
    loadLobby() {
        this.$socket.emit('get_my_lobby_games');
    },

    loadActiveGames() {
        this.$socket.emit('get_my_activegames');
    },
    createGame(name, maxPlayers,format) {

        console.log('no create: '+  this.currentPlayer);
        if (this.currentPlayer == "") {
            alert('Current Player is Empty - Cannot Create a Game');
            return;
        }
        else {
            if(maxPlayers == ""){
                maxPlayers = 2;
            }
            let self = this;
            this.getNumberGames();
            this.registerGame(maxPlayers);
            setTimeout(function () { self.$socket.emit('create_game', {gameID: self.numberGames, playerName: self.currentPlayer, name, maxPlayers, format});}, 2000);

            this.createGameShow = false;
        }
    },


    getNumberGames(){
        axios.get('api/gamescount')
        .then(response => {
            this.numberGames = response.data;
        });

    },

    registerGame(maxPlayers) {
        let newGame =
        {
            type:"multiplayer",
            total_players:maxPlayers,
            created_by:this.$auth.getAuthenticatedUserId(),
            status:"pending"
        }

        console.log(newGame);

        axios.post('/api/games', newGame)
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

                console.log("UTILIZADOR CRIADO COM SUCESSO");

                //TODO: ONClick register -> enviar email de confirmação
            },

            join(game) {
                console.log('game id: '+ game.gameID);
                console.log('no join: '+  this.currentPlayer);
                if (game.player1 == this.currentPlayer) {
                    alert('Cannot join a game because your name is the same as Player 1');
                    return;
                }

                this.players += 1;
                this.$socket.emit('join_game', {gameID: game.gameID, playerName: this.currentPlayer});
            },

            play(game, r1, c1) {
                this.$socket.emit('play', {gameID: game.gameID, r1: r1, c1: c1});
            },

            close(game) {
                this.$socket.emit('remove_game', {gameID: game.gameID});
            },

            updateStuff(){
                this.currentPlayer = this.$auth.getAuthenticatedNickname();
            }

    },
    components: {
        'lobby': Lobby,
        'game': Game,
        'createGame': CreateGame
    },
    mounted() {
        this.loadLobby();
        if(this.currentPlayer==null){

        setTimeout(this.updateStuff, 1200);
    }


},
beforeMount() {

    this.currentPlayer = this.$auth.getAuthenticatedNickname();

},


}
</script>

<style>

</style>