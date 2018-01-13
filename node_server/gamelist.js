/*jshint esversion: 6 */

var Game = require('./gamemodel.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(playerName, socketID, name, maxPlayers, format) {
    	this.contadorID = this.contadorID+1;
    	var game = new Game(this.contadorID, playerName, name, maxPlayers, format);
    	game.player1SocketID = socketID;
    	this.games.set(game.gameID, game);
    	return game;
    }

    joinGame(gameID, io, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	game.join(playerName,gameID, game, io);
        console.log(playerName);
    	

        switch(game.currentNumberPlayers){
            case 2: game.player2SocketID = socketID;
            break;
            case 3: game.player3SocketID = socketID;
            break;
            case 4: game.player4SocketID = socketID;
            break;
        }

        //console.log("socketID: "+socketID)
    	return game;
    }

    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	if (game.player1SocketID == socketID) {
    		game.player1SocketID = "";
    	} else if (game.player2SocketID == socketID) {
    		game.player2SocketID = "";
    	} 
    	if ((game.player1SocketID === "") && (game.player2SocketID === "")) {
    		this.games.delete(gameID);
    	}
    	return game;
    }

    getConnectedGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((value.player1SocketID == socketID) || (value.player2SocketID == socketID) || (value.player3SocketID == socketID) || (value.player4SocketID == socketID)) {
    			games.push(value);
    		}
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((!value.gameStarted) && (!value.gameEnded))  {
    			if ((value.player1SocketID != socketID) && (value.player2SocketID != socketID) && (value.player3SocketID != socketID) && (value.player4SocketID != socketID)) {
    				games.push(value);
    			}
    		}
		}
		return games;
    }
}

module.exports = GameList;
