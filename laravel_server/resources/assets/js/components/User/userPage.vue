<template>
    <div class="panel panel-info">


        <div>
            <h3 class="text-center">{{this.title}}  </h3>
        </div>

        <div class="panel-heading">
            <h3 class="panel-title"></h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3 col-lg-3 " align="center">
                    <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png"
                         class="img-circle img-responsive"></div>
                <div class=" col-md-9 col-lg-9 ">
                    <user-data :authUser="authUser">

                    </user-data>

                    <user-edit v-if="editingUser" :authUser="authUser" :editingUser="editingUser"
                               @edit-click="editUser(this.authUser)"
                               @user-saved="savedUser" @user-canceled="cancelEdit">

                    </user-edit>


                </div>
            </div>
        </div>
        <div class="panel-footer">
            <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button"
               class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
            <span class="pull-right">
                   <a class="btn btn-xl btn-primary" style="margin-right: 40px">Upload Image</a>
                            <a v-on:click.prevent="editUser(this.authUser)" data-original-title="Edit this user"
                               data-toggle="tooltip" type="button"
                               class="btn btn-sm btn-warning"><i class="glyphicon glyphicon-edit"></i></a>
                            <a v-on:click.prevent="deleteUser(this.authUser)" data-original-title="Remove this user"
                               data-toggle="tooltip" type="button"
                               class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></a>
                        </span>
        </div>

    </div>

</template>

<script type="text/javascript">
    // Component code (not registered)

    import UserData from './userData.vue';
    import UserEdit from './userEdit.vue';

    export default {
        // props: ['user'],
        data: function () {
            return {
                title: 'Gestão do Utilizador',
                showSuccess: false,
                successMessage: '',
                editingUser: false,
                authUser: {
                    name: '',
                    nickname: '',
                    email: '',
                },
            }

        },


        methods: {
            getAuthUser() {

                this.authUser.name = this.$auth.getAuthenticatedUserName();
                this.authUser.nickname = this.$auth.getAuthenticatedNickname();
                this.authUser.email = this.$auth.getAuthenticatedEmail();


            },

            editUser: function (user) {
                //console.log("No edit user.name: " + this.authUser);
                this.editingUser = true;
                this.$emit('edit-click', user);
            },

            cancelEdit: function () {
                this.editingUser = null;
                this.showSuccess = false;
            },

            deleteUser: function (user) {
                console.log(user.data);
                /* axios.delete('api/users/'+user.id)
                     .then(response => {
                         this.$router.push('/statistics');
                     });
                     this.$auth.destroyToken();*/
            },

            savedUser: function () {
                this.showSuccess = true;
                this.successMessage = 'User Saved';
            },
            cancelEdit: function () {
                this.editingUser = false;
                this.showSuccess = false;
            },

            redirectUploadProfilePhoto: function () {
                console.log("redirect upload profile");
                this.$router.push('/uploadImage');
            },


        },


        components: {
            'user-data': UserData,
            'user-edit': UserEdit,
        },

        beforeMount() {
            this.getAuthUser();
            console.log(this.$auth.getAuthenticatedUser());
        },

    }
</script>

<style scoped>
    tr.activerow {
        background: #123456 !important;
        color: #fff !important;
    }

</style>