<template>
    <div >
        <div >
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <h2>Current Player : {{ currentPlayer }}</h2>
            <p>Set current player name <input v-model.trim="currentPlayer"></p>
            <p><em>Player name replaces authentication! Use different names on different browsers, and don't change it frequently.</em></p>
            <hr>
            <h3 class="text-center">Lobby</h3>
            <p><button class="btn btn-xs btn-success" v-on:click.prevent="createGame">Create a New Game</button></p>
            <hr>
            <lobby :games="lobbyGames"></lobby>
            <h4>Pending games (<a @click.prevent="loadLobby">Refresh</a>)</h4>
        </div>
    </div>
</template>

<script type="text/javascript">

import Lobby from './lobby.vue';

export default {
    data: function(){
        return {
            title: 'Multiplayer TicTacToe',
            currentPlayer: 'Player X',
            lobbyGames: [],
            activeGames: [],
            socketId: "",
        }
    },
    sockets : {
        connect(){
            console.log('socket connected');
            this.socketId = this.$socket.id;
        },
        discconnect(){
            console.log('socket disconnected');
            this.socketId = "";
        },
        lobby_changed(){
            this.loadLobby();
        },
        my_active_games_changed(){
            this.loadActiveGames();
        },
        my_active_games(games){
            this.activeGames = games;
        },
        my_lobby_games(games){
            this.lobbyGames = games;
        },

    },
    methods: {
    loadLobby(){
        this.$socket.emit('get_my_lobby_games');
    },
    loadActiveGames(){
        this.$socket.emit('get_my_activegames');
    },
    createGame(){
        if (this.currentPlayer == "") {
            alert('Current Player is Empty - Cannot Create a Game');
            return;
        }
        else {
            this.$socket.emit('create_game', { playerName: this.currentPlayer });   
        }
    },

},

components: {
    'lobby': Lobby,
},

mounted() {
    console.log('Component multiplayer mounted.')
    this.loadLobby();
}
}
</script>
