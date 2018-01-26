<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
        </div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-body">


                        <!-- input-->
                        <div class="form-group">
                            <label>Email: </label>
                            <input v-model="email" class="form-control" type="email" placeholder="Email"/>
                        </div>

                        <!-- Button -->
                        <div>
                            <button @click="sendCode" class="btn btn-success pull-right">
                                Submit (Send Code)
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Forgot Password',
                email:''



            }
        },


        methods: {

            sendCode() {

                let userToSend = {
                    email: this.email,
                };

                console.log(userToSend);

                if(userToSend.email != '')
                {
                axios.post('/api/password/email', userToSend )
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                }else
                {
                    swal('Email field is empty!');
                }

            }


        }
    }
</script>

