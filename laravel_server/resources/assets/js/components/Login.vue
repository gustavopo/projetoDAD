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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Login',
                email: '',
                password: ''
            }
        },


        methods: {
            loginClick() {
                let data =
                    {
                        client_id: 2,
                        client_secret: '4z1sfrSTfP2XOV6JiXSS2z4e1EphDTWyHs4SZkPh',
                        grant_type: 'password',
                        username: this.email,
                        password: this.password
                    }

                this.$http.post("http://projetodad.dad/oauth/token", data)
                    .then(function (response) {
                        console.log(response);
                        //this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now())
                        //console.log(this.$auth.getAuthenticatedUser());
                        //Redirecionar user após este ficar autenticado
                        this.$router.push("/singlememorygame");

                    }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

