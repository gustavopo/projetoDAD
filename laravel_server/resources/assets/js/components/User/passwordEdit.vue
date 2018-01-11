<template>
    <div>

        <div class="form-group">
            <label for="oldPassword">Old Password</label>
            <input
                    type="text" class="form-control" v-model="authUser.password"
                    name="name" id="oldPassword"
                    placeholder="Old Password"/>
        </div>

        <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
                    type="text" class="form-control" v-model="authUser.password"
                    name="name" id="newPassword"
                    placeholder="New Password"/>
        </div>
    </div>
</template>


<script type="text/javascript">

    export default {
        props: ['authUser'],

        data: function () {
            return {
                editingPassword: false,
            }

        },
        methods: {}
    }
</script>

