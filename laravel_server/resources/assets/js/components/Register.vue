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
                            <input v-model="User.name" class="form-control" type="text" placeholder="Nome completo"/>
                        </div>

                        <!--Nickname-->
                        <div class="form-group">
                            <input v-model="User.nickname" class="form-control" type="text" placeholder="Nickname"/>
                        </div>

                        <!--Email-->
                        <div class="form-group">
                            <input v-model="User.email" class="form-control" type="email" placeholder="Email"/>
                        </div>

                        <!--Password-->
                        <div class="form-group">
                            <input v-model="User.password" class="form-control" type="password" placeholder="Password"/>
                        </div>

                        <!-- Button-->
                        <button @click.prevent="registerUser" class="btn btn-success pull-right">
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
                title: 'Registar Novo Utilizador',
                User: {
                    name: '',
                    nickname: '',
                    email: '',
                    password: ''
                }

            }
        },


        methods: {
            registerUser() {

                let newUser =
                    {
                        name: this.User.name,
                        nickname: this.User.nickname,
                        email: this.User.email,
                        password: this.User.password
                    }

                console.log(newUser);
                axios.post('/api/register', newUser)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                    let data= error.response.data;

                        console.log(data);
                    });

console.log("UTILIZADOR CRIADO COM SUCESSO");
                //TODO: ONClick register -> enviar email de confirmação
            }
        }
    }
</script>

