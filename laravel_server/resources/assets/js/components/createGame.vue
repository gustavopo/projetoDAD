<template>
    <div class="jumbotron">
        <h2>Criar jogo</h2>
        <div class="form-group">
            <label for="inputName">Nome da sala:</label>
            <input
            type="text" class="form-control" v-model="name"
            name="name" id="inputName"
            placeholder="Fullname"/>
        </div>
        <div class="form-group">
            <label for="inputName">Numero de jogadores:</label>
            <select v-model="maxPlayers">
                <!--<option disabled value="">jogadores</option>-->
                <option disabled value="">1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>
        <div class="form-group">
            <a class="btn btn-danger" v-on:click.prevent="createGame()">Criar</a>
            <a class="btn btn-danger" v-on:click.prevent="cancelCreate()">Cancelar</a>
        </div>
    </div>
</template>

<script type="text/javascript">
module.exports={
    data:function() {
        return{
            maxPlayers:'',
            name:''
        }
    },
    methods: {
        createGame: function(){
            this.$emit('game-saved', this.name, this.maxPlayers);

        },
        cancelCreate: function(){
            this.$emit('game-canceled', this.game);
        }
    }
}
</script>

<style scoped>

</style>