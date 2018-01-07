<template>
    <div class="jumbotron">
        <h2>Block User</h2>
        <div class="form-group">
           <label for="inputName">Name</label>
            <input
                    type="text" class="form-control" v-model="user.name"
                    name="name" id="inputName"
                    placeholder="Fullname"/>
        </div>
         <div class="form-group">
            <label for="inputReason_blocked">Blocking Reason</label>
            <input
                    type="text" class="form-control" v-model="user.reason_blocked"
                    name="reason_blocked" id="inputReason_blocked"
                    placeholder="Mau comportamento"/>
        </div>


        <div class="form-group">
            <a class="btn btn-default" v-on:click.prevent="blockUser()">Block</a>
            <a class="btn btn-default" v-on:click.prevent="cancelBlock()">Cancel</a>
        </div>
    </div>
</template>


<script type="text/javascript">
    module.exports={
        props: ['user'],
        methods: {
            blockUser: function(){
                axios.put('api/users/'+this.user.id, this.user)
                    .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    //Object.assign(this.user, response.data.data);
                    this.user.blocked = '1';
                    console.log(response);
                this.$emit('user-blocked', this.user)
            });
            },
            cancelBlock: function(){
                axios.get('api/users/'+this.user.id)
                    .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    Object.assign(this.user, response.data.data);
                this.$emit('user-canceled', this.user);
            });
            }
        }
    }
</script>

<style scoped>

</style>