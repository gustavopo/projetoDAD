<template>
    <div class="jumbotron">
        <h2>Block User</h2>
        <div class="form-group">
           <label >Name</label>
            <p>{{user.name}}</p>
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
            /*blockUser: function(){
                var user = this.user;
                axios.put('api/users/'+user.id)
                    .then(response=>{
                        if(user.blocked = '1'){
                            console.log("bloqueado");
                        }

                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    //Object.assign(this.user, response.data.data);
                    this.user.blocked = '1';
                    console.log(response);
                this.$emit('user-blocked', this.user)
            });*/

            blockUser: function(user){
                axios.get('api/users/'+this.user.id)
                    .then(response => {
                        this.showSuccess = true;
                        if (this.user.blocked == '1') {
                            swal("User is already blocked");
                        }
                        else{
                            //this.user.blocked = '0';
                            //this.user.reason_blocked = inputReason_blocked;
                            this.user.reason_blocked;
                            this.user.blocked = 1;
                            console.log(this.user.reason_blocked);
                            axios.put('api/users/block/'+this.user.id, this.user).then(response => {          
                                console.log(response.data.data);
                               swal("User blocked successfully!");
                               //this.$emmit('user-blocked', this.user);
                              });

                           
                            //this.successMessage = 'User blocked';

                            // this.$emmit('user-blocked', this.user);

                        } 
                        
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