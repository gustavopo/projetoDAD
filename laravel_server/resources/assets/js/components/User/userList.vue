<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Blocked</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users"  :key="user.id" :class="{activerow: editingUser === user}">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.blocked }} </td>

            <td v-if="authUserProp.name != user.name">
                <a class="btn btn-xs btn-danger" v-on:click.prevent="blockUser(user)">Block</a>
                <a class="btn btn-xs btn-primary" v-on:click.prevent="unblockUser(user)">Unblock</a> 
                <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
              

            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/javascript">
    // Component code (not registered)
    module.exports={
        props: ['users', 'authUserProp'],
        data: function(){
            return {
                editingUser: null,
                blockingUser: true,
            }
        },
        methods: {
            editUser: function(user){
                this.editingUser = user;
                this.$emit('edit-click', user);
            },
            /*isBlocked: function(user)
            {
            if (this.user.blocked == 1) {
                user.blocked = 'yes';
            }else{
                user.blocked = 'no';
            }
        
            },*/
            deleteUser: function(user){
                this.editingUser = null;
                this.$emit('delete-click', user);
            },
            blockUser: function(user){
                this.editingUser = user;
                this.$emit('block-click', user);
            },
            unblockUser: function(user){
                this.editingUser = user;
                this.$emit('unblock-click', user);
            },
            
        },
        
    }
</script>

<style scoped>
    tr.activerow {
        background: #123456  !important;
        color: #fff          !important;
    }

</style>