<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>

        <user-list :users="users" @edit-click="editUser" @delete-click="deleteUser" @block-click="blockUser"
                   @message="childMessage" ref="usersListRef"></user-list>

        <div class="alert alert-success" v-if="showSuccess">

            <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
            <strong>{{ successMessage }}</strong>
        </div>
        <user-edit :user="authUser" @user-saved="savedUser" @user-canceled="cancelEdit" v-if="authUser"></user-edit>
        <user-block :user="blockingUser" @user-blocked="blockedUser" @user-canceled="cancelBlock"
                    v-if="blockingUser"></user-block>


    </div>
</template>

<script type="text/javascript">
    import UserList from './userList.vue';
    import UserEdit from './userEdit.vue';
    import UserBlock from './userBlock.vue';


    export default {
        data: function () {
            return {
                title: 'List Users',
                showSuccess: false,
                successMessage: '',
                authUser: this.$auth.getAuthenticatedUser(),
                users: [],
                blockingUser: null,
            }
        },
        methods: {
            editUser: function (user) {
                this.authUser = user;
                this.showSuccess = false;
            },
            deleteUser: function (user) {
                axios.delete('api/users/' + user.id)
                    .then(response => {
                        this.showSuccess = true;
                        this.successMessage = 'User Deleted';
                        this.getUsers();
                    });

            },
            savedUser: function () {
                this.authUser = null;
                this.$refs.usersListRef.editingUser = null;
                this.showSuccess = true;
                this.successMessage = 'User Saved';
            },
            cancelEdit: function () {
                this.authUser = null;
                this.$refs.usersListRef.editingUser = null;
                this.showSuccess = false;
            },
            getUsers: function () {
                axios.get('api/users')
                    .then(response => {
                        this.users = response.data.data;
                    });
            },
            childMessage: function (message) {
                this.showSuccess = true;
                this.successMessage = message;
            },
            blockUser: function (user) {
                this.blockingUser = user;
                this.showSuccess = false;
                /*  axios.post('api/users'+user.id, { blocked: '1'})
                  .then(function(response){
                      this.showSuccess = true;
                      this.successMessage = 'User Blocked';
                  });*/
            },
            cancelBlock: function () {
                this.blockingUser = null;
                this.$refs.usersListRef.editingUser = null;
                this.showSuccess = false;
            },
            blockedUser: function () {
                this.blockingUser = null;
                this.$refs.usersListRef.editingUser = null;
                this.showSuccess = true;
                this.successMessage = 'User Blocked';
            },
        },
        components: {
            'user-list': UserList,
            'user-edit': UserEdit,
            'user-block': UserBlock
        },
        mounted() {
            this.getUsers();
        },
        computed: {
            authenthicatedUser() {
                return this.$auth.getAuthenticatedUser();
            }
        },

    }
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
</style>