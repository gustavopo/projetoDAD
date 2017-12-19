<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>

    </div>
</template>

<script type="text/javascript">
    import UserList from './userList.vue';
    import UserEdit from './userEdit.vue';

    export default {
        data: function(){
            return {
                title: 'List Users',
                showSuccess: false,
                successMessage: '',
                currentUser: null,
                users: []

            }
        },
        methods: {

        },
        components: {
            'user-list': UserList,
            'user-edit': UserEdit
        },
        mounted() {
        console.log("user.vue");
        }

    }
</script>

<style scoped>
    p {
        font-size: 2em;
        text-align: center;
    }
</style>