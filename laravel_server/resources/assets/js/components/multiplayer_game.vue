<template>
    <div>
        <div>
            <h3 class="text-center">{{title}}</h3>
            <br>
                <h2>Seu nome atual: {{currentPlayer}}</h2>
                <p>Alterar nome atual <input v-model.trim="currentPlayer"></p>
                <p><em></em></p>
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
                    <game :game="game"></game>
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
                currentPlayer: 'Player X',
                lobbyGames: [],
                activeGames: [],
                socketId: "",
                createGameShow: false,
                maxPlayers:[]
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
        },
        methods: {
            gameSaved(name, maxPlayers) {
                console.log(name + maxPlayers);
                this.createGame(name, maxPlayers);
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
            createGame(name, maxPlayers) {
                if (this.currentPlayer == "") {
                    alert('Current Player is Empty - Cannot Create a Game');
                    return;
                }
                else {
                    this.$socket.emit('create_game', {playerName: this.currentPlayer, name, maxPlayers});
                    this.createGameShow = false;
                }
            },
            join(game) {
                if (game.player1 == this.currentPlayer) {
                    alert('Cannot join a game because your name is the same as Player 1');
                    return;
                }

                this.players += 1;
                this.$socket.emit('join_game', {gameID: game.gameID, playerName: this.currentPlayer});
            },

            play(game, index) {
                this.$socket.emit('play', {gameID: game.gameID, index: index});
            },

            close(game) {
                this.$socket.emit('remove_game', {gameID: game.gameID});
            }

        },
        components: {
            'lobby': Lobby,
            'game': Game,
            'createGame': CreateGame
        },
        mounted() {
            this.loadLobby();
        }

    }
</script>

<style>

</style>