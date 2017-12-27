<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-body">
                    <!--Email-->
                    <div class="form-group">
                        <input v-model="email" class="form-control" type="email" placeholder="Email"/>
                    </div>

                    <!--Password-->
                    <div class="form-group">
                        <input v-model="password" class="form-control" type="password" placeholder="Password"/>
                    </div>

                    <!-- Button-->
                    <button @click="loginClick" class="btn btn-success pull-right">
                        Login
                    </button>


                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
       data () {
           return {
               email:'',
               password:''
           }
       },

       methods:{
           loginClick (){

               let data=
                   {
                       client_id:2,
                       client_secret: 'Qe0mbwcLZprCg28nIEOWM5w7Fn5o3nmAtYpU8A5A',
                       grant_type: 'password',
                       username: this.email,
                       password: this.password
                   }
               //http://localhost:8000/oauth/token
               this.$http.post("http://projetodad.dad/oauth/token", data)
                   .then(function (response)
                   {
                       console.log(response);
                   })
           }
       }
    }
</script>
