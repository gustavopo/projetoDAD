<template>
    <div class="panel panel-info">

        <div>
            <h3 class="text-center">{{ title }}</h3>
        </div>

        <div class="panel-heading">
            <h3 class="panel-title"  > fdsgsdg </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-3 col-lg-3 " align="center">
                    <img alt="User Pic" src="http://babyinfoforyou.com/wp-content/uploads/2014/10/avatar-300x300.png"
                         class="img-circle img-responsive"></div>
                <div class=" col-md-9 col-lg-9 ">
                    <table class="table table-user-information">
                        <tbody>

                        <tr>
                            <td>Department:</td>
                            <td>Programming</td>
                        </tr>
                        <tr>
                            <td>Hire date:</td>
                            <td>06/23/2013</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td>01/24/1988</td>
                        </tr>

                        <tr>
                        <tr>
                            <td>Gender</td>
                            <td>Female</td>
                        </tr>
                        <tr>
                            <td>Home Address</td>
                            <td>Kathmandu,Nepal</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><a href="mailto:info@support.com">info@support.com</a></td>
                        <tr>
                        <td>Phone Number</td>
                        <td>123-4567-890(Landline)<br><br>555-4567-890(Mobile)
                        </td>

                        </tr>


                        </tbody>
                    </table>

                    <a href="#" class="btn btn-primary">My Sales Performance</a>
                    <a href="#" class="btn btn-primary">Team Sales Performance</a>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button"
               class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
            <span class="pull-right">
                            <a href="edit.html" data-original-title="Edit this user" data-toggle="tooltip" type="button"
                               class="btn btn-sm btn-warning"><i class="glyphicon glyphicon-edit"></i></a>
                            <a data-original-title="Remove this user" data-toggle="tooltip" type="button"
                               class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></a>
                        </span>
        </div>

    </div>

</template>

<script type="text/javascript">
    // Component code (not registered)
    module.exports = {
        props: ['user'],
        data: function () {
            return {
                title: 'Gestão do Utilizador',
                showSuccess: false,
                successMessage: '',
                currentUser: null,

            }

        },


        methods: {


            /*
            getUser: function (token) {
                this.$http.get('users/', {api_token: token}).then(function (r) {
                    this.currentUser = r.data.data;
                    console.log("Current User: " + this.currentUser);
                }, function (r) {
                    console.log("Error get User:" + r);
                    this.currentUser = null
                });
            }*/
        },

        beforeMount: function () {
/*
            var token = this.$auth.getToken();
            console.log({api_token: token});
            if (token != '') {
               // this.getUser(token);
            }*/
        },
        created(){
            this.currentUser = this.$auth.isAuthenticated();

        }

    }
</script>

<style scoped>
    tr.activerow {
        background: #123456 !important;
        color: #fff !important;
    }

</style>