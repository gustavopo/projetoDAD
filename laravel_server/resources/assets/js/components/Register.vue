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
                        <div class="form-group" :class="{'has-error': errors.name.lenght}">
                            <input v-model="User.name" class="form-control" type="text" placeholder="Nome completo"/>
                        </div>

                        <!--Nickname-->
                        <div class="form-group" :class="{'has-error': errors.nickname.lenght}">
                            <input v-model="User.nickname" class="form-control" type="text" placeholder="Nickname"/>
                        </div>

                        <!--Email-->
                        <div class="form-group" :class="{'has-error': errors.email.lenght}">
                            <input v-model="User.email" class="form-control" type="email" placeholder="Email"/>
                        </div>

                        <!--Password-->
                        <div class="form-group" :class="{'has-error': errors.password.lenght}">
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
                },
                errors: {
                    name: [],
                    nickname: [],
                    email: [],
                    password: []
                }

            }
        },


        methods: {

            resetUser() {
                this.user =
                    {
                        name: null,
                        nickname: null,
                        email: null,
                        password: null
                    }
            },

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
                        //console.log(response);
                        this.resetUser()
                        let successMessage= response.data.message;
                        alert('Sucess'+sucessMessage);
                    })
                    .catch((error) => {



                    //Show errors
                        let data = error.response.data;
                        console.log(data);
                        for (let key in this.errors) {
                            this.errors[key] = []
                            let errorMessage = data[key];
                            console.log('key  ', key);
                           console.log('errorMessage: ', response.data.message);
                        alert('Error' + errorMessage);
                            if (errorMessage) {
                                this.error[key] = errorMessage;
                            }
                        }


                    });

                console.log("UTILIZADOR CRIADO COM SUCESSO");

                this.$router.push("/users");

                //TODO: ONClick register -> enviar email de confirmação
            }
        }
    }
</script>

