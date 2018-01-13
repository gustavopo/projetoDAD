<template>
    <div style="text-align: center">
        <div v-if="authUser != null"  class="row">
            <div  class="card mb-3">

                <div>
                    <h3 class="text-center">Your Statistics</h3>
                    <br>
               
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                <th>Your Single Player Games</th>
                                <th>Your Multi Player Games</th>
                                <th>All Your  Games</th>
                                <th>Your Wins</th>
                            </tr>
                            </thead>
                            <tbody>
                                  
                             <tr>
                                <td>  </td> 
                                <td>  </td>
                                <td>  </td> 
                                <td>  </td> 
                               
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
                                <th>Single Player Games</th>
                                <th>Multi Player Games</th>
                                <th>All Games</th>
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

       <!-- <div class="row">
            <div class="card mb-3">

                <div>
                    <h1 class="text-center">Top 3</h1>
                </div>
                <div class="card-body">
                      <h2>{{ topthree }} </h2>
                </div>
            </div>
        </div>
    </div>-->



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
                authUser: null,
                singleplayergames: '',
                multiplayergames: '',
                totalgamesplayed: '',
                topthree: ''
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
            });
        },
        getTotalPlayedGames: function(){
            axios.get('api/totalgamesplayed').then(response => {
                this.totalgamesplayed = response.data;
            });
        },
       /* getTopThree: function(){
            axios.get('api/topthree').then(response => {
                
                console.log("entras aqui ze");
                this.topthree = response.data;
                console.log(response);
            });
        },*/
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
           // this.getTopThree();
            this.getMultiplayerGames();
            this.getTotalPlayedGames();
        },
      
    } 

</script>
