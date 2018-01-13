<template>
    <div style="text-align: center">
        <div v-if="authUser != null"  class="row">
            <div  class="card mb-3">
                <div>
                    <h2 class="text-center">Your Statistics</h2>
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
                    <h2 class="text-center">Games Statistics</h2>
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

         <div class="row">
            <div class="card mb-3">

                <div>
                    <h1 class="text-center" >Top Three</h1>
                </div class="text-center">
                   
                        <h2>1st<p>{{ topthree[0].name }} AKA {{topthree[0].nickname}} with {{ topthree[0].wins }} wins!</p></h2>
                        <h3>2nd<p>{{ topthree[1].name }} AKA {{topthree[1].nickname}} with {{ topthree[1].wins }} wins!</p></h3>
                        <h4>3rd<p>{{ topthree[2].name }} AKA {{topthree[2].nickname}} with {{ topthree[2].wins }} wins!</p></h4> 
                
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
                authUser: null,
                singleplayergames: '',
                multiplayergames: '',
                totalgamesplayed: '',
                topthree: [],
            }
        },
        methods: {
        
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
        getTopThree: function(){
            axios.get('api/topthree').then(response => {
            this.topthree = response.data;

            });
        },
        getAuthUser() {
                let user = this.$auth.getAuthenticatedUser();
                console.log(user);
                this.authUser = user;
        },
    },
        beforeMount() {
            this.getSingleplayerGames();
            this.getTopThree();
            this.getMultiplayerGames();
            this.getTotalPlayedGames();       
        },

        mounted() {
            this.getAuthUser();
        },
      
    } 

</script>
