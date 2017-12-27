<template>
    <div>

        <div>
            <h3 class="text-center">{{ title }}</h3>
        </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-body">

                    <!--Nome-->
                    <div class="form-group">
                        <input v-model="name" class="form-control" type="text" placeholder="Nome completo"/>
                    </div>

                    <!--Nickname-->
                    <div class="form-group">
                        <input v-model="nickname" class="form-control" type="text" placeholder="Nickname"/>
                    </div>

                    <!--Email-->
                    <div class="form-group">
                        <input v-model="email" class="form-control" type="email" placeholder="Email"/>
                    </div>

                    <!--Password-->
                    <div class="form-group">
                        <input v-model="password" class="form-control" type="password" placeholder="Password"/>
                    </div>

                    <!-- Button-->
                    <button @click="registerClick" class="btn btn-success pull-right">
                        Registar
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
                name: '',
                nickname: '',
                email: '',
                password: '',
                title:'Registar Novo Utilizador'
            }
        },

        methods: {
            registerClick() {
                /* CODIGO DO LOGIN
                let data =
                    {
                        client_id: 2,
                        client_secret: 'Qe0mbwcLZprCg28nIEOWM5w7Fn5o3nmAtYpU8A5A',
                        grant_type: 'password',
                        username: this.email,
                        password: this.password
                    }

                this.$http.post("http://projetodad.dad/oauth/token", data)
                    .then(function (response) {
                        console.log(response);
                        this.$auth.setToken(response.body.access_token, response.body.expires_in + Date.now())
                    })*/


                //TODO: ONClick register -> enviar email de confirmação
            }
        }
    }
</script>

