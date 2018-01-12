<template>
    <div>

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
                    type="text" class="form-control" v-model="user.newPassword"
                    name="name" id="newPassword"
                    placeholder="New Password"/>
        </div>
        <div>
            <a class="btn btn-default" v-on:click.prevent="savePassword()" >Save Password</a>
        </div>
    </div>

</template>


<script type="text/javascript">

    export default {
        props: ['authUser'],

        data: function () {
            return {
                editingPassword: false,
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
                axios.get('api/users/'+ this.authUser.id).then(
                    response => {
                        console.log(response);

                        let user = this.authUser;
                        let oldPassword= response.data.data.password;
                        let newPassword= this.user.newPassword;
                        let inputOldPassword = this.user.oldPassword;
                        console.log(this.user);
                        console.log(user);
                        console.log("old: "+oldPassword);
                        console.log("new: "+newPassword);
                        console.log("input old: "+inputOldPassword);
                        /*bcrypt.compare(inputOldPassword, oldPassword, function (err, res) {
                            if (err) {
                                // handle error
                            }
                            if (res) {
                                //if compare true
                                // Send JWT*/
                        axios.put('api/users/changePassword/' + user.id, this.authUser).then(
                            response => {

                                console.log(response);
                                swal('Sucess');
                            });
                        /*
                                                    } else {
                                                                swal('Password do not match');
                                                    }
                                                });*/

                    });

                this.editingPassword = !this.editingPassword;
                //this.$emit('edit-password', user);
            },

        }
    }
</script>

