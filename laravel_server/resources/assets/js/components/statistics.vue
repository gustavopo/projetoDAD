<template>
    <div style="text-align: center">
        <div>
            <h3 class="text-center">Your Statistics</h3>
            
            <br>
        </div>

        <div class="row">
            <div class="col-xl-3 col-sm-6 mb-3">
                <div class="card text-white bg-primary o-hidden h-100">
                    <div class="card-body">
                        <div class="card-body-icon">
                            <i class="fa fa-fw fa-user"></i>
                        </div>
                        <div class="mr-5">Single Player</div>

                    </div>
                    <a class="card-footer text-white clearfix small z-1" href="#">
                        <span class="float-left">x Jogos</span>
                        <span class="float-right">
                  </span>
                    </a>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
                <div class="card text-white bg-warning o-hidden h-100">
                    <div class="card-body">
                        <div class="card-body-icon">
                            <i class="fa fa-fw fa-users"></i>
                        </div>
                        <div class="mr-5">Multi Player</div>
                    </div>
                    <a class="card-footer text-white clearfix small z-1" href="#">
                        <span class="float-left">x Jogos</span>
                        <span class="float-right">
                  </span>
                    </a>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-3">
                <div class="card text-white bg-success o-hidden h-100">
                    <div class="card-body">
                        <div class="card-body-icon">
                            <i class="fa fa-fw fa-gamepad"></i>
                        </div>
                        <div class="mr-5">Total Games Played</div>
                    </div>
                    <a class="card-footer text-white clearfix small z-1" href="#">
                        <span class="float-left">x Jogos</span>
                        <span class="float-right">
                  </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card mb-3">

                <div>
                    <h3 class="text-center">Games Statistics</h3>
                    <br>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                <th>Single Player</th>
                                <th>Multi Player</th>
                                <th>Total de Jogos</th>
                            </tr>
                            </thead>
                            <tbody>
                                  
                             <tr>
                                <td> {{ singleplayergames }} </td> 
                                <td> {{ multiplayergames }} </td> 
                                <td> {{ totalgamesplayed }} </td> 
                               
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="row">
            <div class="card mb-3">
                <div class="card-header">
                    <i class="fa fa-bar-chart-o fa-fw"></i> Histórico Total de Jogos (Gráfico)
                </div>
                <div class="card-body">


                </div>
            </div>
        </div>-->

    </div>


</template>


<script type="text/javascript">

    export default {
         //props: ['users'],
        data: function(){
            return {
                title: 'Statistics',
                showSuccess: false,
                successMessage: '',
                currentUser: null,
                users: [],
                games: [],
                authUser: '',
                singleplayergames: '',
                multiplayergames: '',
                totalgamesplayed: ''
            }
        },
        methods: {
        getUsers: function () {
                axios.get('api/users')
                    .then(response => {
                        this.users = response.data.data;
                    });
        },
        getGames: function () {
                axios.get('api/games')
                    .then(response => {
                        this.games = response.data.data;
                    });
        },
        getSingleplayerGames: function(){
            axios.get('api/singleplayergames').then(response => {
                this.singleplayergames = response.data;
            });
        },
        getMultiplayerGames: function(){
            axios.get('api/multiplayergames').then(response => {
                this.multiplayergames = response.data;
                //console.log("resposta multi" + response);
            });
        },
        getTotalPlayedGames: function(){
            axios.get('api/totalgamesplayed').then(response => {
                this.totalgamesplayed = response.data;
            });
        },
        /*getGameWinner: function () {
                axios.get('api/users/' + game.winner)
                    .then(response => {
                        this.games.winnerName = response.data.data;
                        console.log(response.data.data);
                    });
        },*/
        getAuthUser() {
                let user = this.$auth.getAuthenticatedUser();
                console.log(user);
                this.authUser = user;
            },
    },
        beforeMount() {
            this.getAuthUser();          
        },

        mounted() {
            this.getUsers();
            this.getGames();
            this.getSingleplayerGames();
            this.getMultiplayerGames();
            this.getTotalPlayedGames();
        },
      
    } 

</script>
