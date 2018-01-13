<template>
    <div class="jumbotron">
        <h2>Editar Password Admin</h2>

        <div class="form-group">
            <label for="oldPassword">Old Password</label>
            <input
                    type="text" class="form-control" v-model="user.oldPassword"
                    name="name" id="oldPassword"
                    placeholder="Old Password"/>
        </div>

        <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
                    type="text" class="form-control"  v-model="user.password"
                    name="name" id="newPassword"
                    placeholder="New Password"/>
        </div>
        <div>
            <a class="btn btn-default" v-on:click.prevent="savePassword()">Save Password</a>
        </div>
    </div>

</template>


<script type="text/javascript">

    export default {
        //props: ['authUser'],

        data: function () {
            return {
                user: {
                    id: '',
                    password: ''
                },
            }

        },
        methods: {
            savePassword: function () {
                console.log("entre no save password 22222 ->");
                let bcrypt = require('bcryptjs');
                let authUser = this.$auth.getAuthenticatedUser();
                console.log(authUser);
                axios.get('api/users/' + authUser.id).then(
                    response => {
                        console.log(response);

                        let user = authUser;
                        let oldPassword = response.data.data.password;
                        let newPassword = this.user.newPassword;
                        let inputOldPassword = this.user.oldPassword;
                        authUser.password = this.user.password;
                        console.log(authUser);
                        // console.log(user);
                        console.log("old: " + oldPassword);
                        console.log("new: " + newPassword);
                        console.log("input old: " + inputOldPassword);

                        /* teste sem bcrypt a funcionar
                                    if (inputOldPassword == oldPassword) {
                                        axios.put('api/users/changePassword/' + this.authUser.id, this.authUser).then(
                                            response => {
                                                console.log(response);
                                                Object.assign(this.authUser, response.data.data);
                                              //  this.$emit('password-changed', this.authUser)
                                                swal('Sucess! Password changed');
                                            });
                                    }else {
                                        swal('Password do not match');
                                    }*/

                        console.log(user);

                        bcrypt.compare(inputOldPassword, oldPassword, function (err, res) {
                            if (err) {
                                console.log("Error password edit: "+ err);
                            }
                            if (res) {
                                console.log("entrei no put");
                                axios.put('api/users/changePassword/' + user.id, user).then(
                                    response => {
                                        console.log(user);
                                        console.log(response);
                                        swal('Sucess! Password changed');
                                    });

                            } else {
                                //if(old password != inputOldPassword)
                                //swal password antiga está errada
                                //if password are diferentes
                                //swal passwords do not match

                                swal('Password do not match');
                            }
                        });

                    });

                this.editingPassword = !this.editingPassword;
                //this.$emit('edit-password', user);
            },

        }
    }
</script>

