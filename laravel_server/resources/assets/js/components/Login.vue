<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
        </div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-body">


                        <!--Email-->
                        <div v-if="loginByEmail" class="form-group">
                            <input v-model="email" class="form-control" type="email" placeholder="Email"/>
                        </div>

                        <!--Nickname-->
                        <div v-if="!loginByEmail" class="form-group">
                            <input v-model="nickname" class="form-control" type="text" placeholder="Nickname"/>
                        </div>

                        <!--Password-->
                        <div class="form-group">
                            <input v-model="password" class="form-control" type="password" placeholder="Password"/>
                        </div>

                        <!-- Buttons-->
                        <div>
                            <button @click="loginClick" class="btn btn-success pull-right">
                                Login
                            </button>
                            <button v-if="!loginByEmail" @click="toogleLoginType" class="btn btn-success pull-right">
                                Login by Email
                            </button>
                            <button v-if="loginByEmail" @click="toogleLoginType" class="btn btn-success pull-right">
                                Login by Nickname
                            </button>
                        </div>


                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Login',
                email: '',
                nickname: '',
                password: '',
                loginByEmail: true,
            }
        },


        methods: {
            loginClick() {
               /* let data =
                    {
                        client_id: 2,
                        client_secret: 'heCChs0HZYPmDvNTEKrC1XOw05Y361M7TaJjsVsv',
                        grant_type: 'password',
                        username: this.email,
                        password: this.password
                    };*/
                let userLogin =
                    {
                        email: this.email,
                        nickname:this.nickname,
                        password: this.password
                    };

                this.$http.post("/api/login", userLogin)
                    .then(function (response) {
                        console.log(response);
                        this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now());
                        let self=this;//Redirecionar user após este ficar autenticado


                        axios.get('api/user-data', {
                            headers:{
                                'Authorization': 'Bearer ' + this.$auth.getToken(),
                                'Accept': 'application/json'
                            }
                        }).then(function (response) {

                            //console.log(response.data);
                            self.$auth.setAuthenticatedUser(response.data);

                            });
                        //Route::get('users/{id}', 'UserControllerAPI@getUser');

                        this.$router.push("/multimemorygame");



                    }).catch((error) => {
                    swal('Invalid Credentials! ');
                    console.log(error);
                });

                console.log(this.$auth.getAuthenticatedUser());
            },
            toogleLoginType() {

                this.loginByEmail = !this.loginByEmail;
            }

        }
    }
</script>

