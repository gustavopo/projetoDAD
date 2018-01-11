<template xmlns:>
    <div class="jumbotron">
        <h2>Editar Dados do Utilizador</h2>
        <div class="form-group">
            <label for="inputName">Name</label>
            <input
                    type="text" class="form-control" v-model="authUser.name"
                    name="name" id="inputName"
                    placeholder="Fullname"/>
        </div>

        <div class="form-group">
            <label for="inputNickname">Nickname</label>
            <input
                    type="text" class="form-control" v-model="authUser.nickname"
                    name="name" id="inputNickname"
                    placeholder="Nickname"/>
        </div>
        <div class="form-group">

        <div class="form-group">

            <label for="inputEmail">Email</label>
            <input
                    type="email" class="form-control" v-model="authUser.email"
                    name="email" id="inputEmail"
                    placeholder="Email address"/>
        </div>

            <div v-if="this.editingPassword">

                <div class="form-group">
                    <label for="oldPassword">Old Password</label>
                    <input
                            type="text" class="form-control" v-model="this.oldPassword"
                            name="name" id="oldPassword"
                            placeholder="Old Password"/>
                </div>

                <div class="form-group">
                    <label for="newPassword">New Password</label>
                    <input
                            type="text" class="form-control" v-model="this.newPassword"
                            name="name" id="newPassword"
                            placeholder="New Password"/>
                </div>
            </div>
    <!-- CODIGO DO COMPONENTE EDIT PASSWORD -> PODEMOS TENTAR ARRANJAR MAS NAO TAVA A CONSEGUIR POR ISSO FIZ LOGO NA VISTA
            <password-edit v-if="editingPassword" :authUser="this.authUser" :editigPassword="editingPassword"
                           @edit-password="editPassowrd(this.authUser)">
            </password-edit>
    -->
        <div class="form-group">
            <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
            <a   class="btn btn-default" v-if="!this.editingPassword" v-on:click.prevent="editPassowrd(this.authUser)">Edit Password</a>
            <a   class="btn btn-default"  v-if="this.editingPassword" v-on:click.prevent="savePassword(this.authUser)">Save Password</a>
            <a class="btn btn-default" v-on:click.prevent="cancelEdit(this.authUser)">Cancel</a>
        </div>




        </div>
    </div>
</template>


<script type="text/javascript">

    import PasswordEdit from './passwordEdit.vue';
    export default {
        props: ['authUser','editingUser'],

        data: function () {
            return {
                editingPassword: false,
                oldPassword: '',
                newPassword: ''

            }

        },

        methods: {
            saveUser: function () {
                axios.put('api/users/' + this.authUser.id, this.authUser)
                    .then(response => {
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        console.log(response.data);
                        console.log(response.data.data);

                        Object.assign(this.authUser, response.data.data);
                        this.$emit('user-saved', this.authUser)
                    });
                //TODO MENSAGENS
                //swal("User edited with Sucess!", "success")
            },
            
            cancelEdit: function () {
                axios.get('api/users/' + this.authUser.id)
                    .then(response => {
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.authUser, response.data.data);
                        this.$emit('user-canceled', this.authUser);
                    });
                this.editingUser=!this.editingUser;

            },

            editPassowrd: function (user) {


                this.editingPassword = !this.editingPassword;
                //this.$emit('edit-password', user);
            },

            savePassword: function (user) {

                console.log("Password: " + this.authUser.password);

                if(this.authUser.password === this.oldPassword)
                {
                    //save new password
                    axios.put('api/users/' + this.authUser.id, this.authUser)
                        .then(response => {
                            // Copy object properties from response.data.data to this.user
                            // without creating a new reference
                            console.log(response.data);
                            console.log(response.data.data);

                            Object.assign(this.authUser, response.data.data);
                            this.$emit('user-saved', this.authUser)
                        });

                }

                //verificar se password do campo é igual a password do user
                //se sim
                //guardar nova password
                //se nao
                //console log password antiga diferente
                //return

                this.editingPassword = !this.editingPassword;
                //this.$emit('edit-password', user);
            },

            computed: {
                // a computed getter
               /* cancelFunction: function () {
                  this.editingUser=false;
                }*/
            },
            components: {
                'password-edit': PasswordEdit,

            },
        }
    }
</script>

<style scoped>

</style>