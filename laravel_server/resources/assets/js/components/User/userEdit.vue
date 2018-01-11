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


        <div class="form-group">
            <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
            <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
        </div>
    </div>
    </div>
</template>


<script type="text/javascript">
    export default {
        props: ['authUser','editingUser'],

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
            computed: {
                // a computed getter
               /* cancelFunction: function () {
                  this.editingUser=false;
                }*/
            }
        }
    }
</script>

<style scoped>

</style>