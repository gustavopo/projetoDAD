<template>
    <div class="jumbotron">
        <h2>Unblock User</h2>
        <div class="form-group">
           <label >Name</label>
            <p>{{user.name}}</p>
        </div>
         <div class="form-group">
            <label for="inputReason_reactivated">Unblocking Reason</label>
            <input
                    type="text" class="form-control" v-model="user.reason_reactivated"
                    name="reason_reactivated" id="inputReason_reactivated"
                    placeholder="Bom comportamento"/>
        </div>


        <div class="form-group">
            <a class="btn btn-default" v-on:click.prevent="unblockUser()">Unblock</a>
            <a class="btn btn-default" v-on:click.prevent="cancelUnblock()">Cancel</a>
        </div>
    </div>
</template>


<script type="text/javascript">
    module.exports={
        props: ['user'],
        methods: {
           unblockUser: function(user){
                axios.get('api/users/'+this.user.id)
                    .then(response => {
                        this.showSuccess = true;
                        if (this.user.blocked == '0') {
                            swal("User is already unblocked");
                        }
                        else{
                           this.user.reason_reactivated;
                            this.user.blocked = 0;
                            console.log(this.user.reason_reactivated);
                            axios.put('api/users/block/'+this.user.id, this.user).then(response => {          
                                console.log(response.data.data);
                              swal("User unblocked successfully!");
                               //this.$emmit('user-blocked', this.user);
                              });
                            
                            //this.successMessage = 'User blocked';
                        } 
                    });
            },
            cancelUnblock: function(){
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