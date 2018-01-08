<template>
    <div>
        <div>
            <div class="topnav" id="myTopnav">
                <router-link to="/statistics"> Statistics</router-link>
                -
                <router-link to="/users"> Users</router-link>
                -
                <router-link to="/singlememorygame"> SinglePlayer</router-link>
                -
                <router-link to="/multimemorygame"> Multiplayer</router-link>

            </div>
            <div align="right">
                <router-link v-if="isAuth" to="/userPage">Gestão da Conta</router-link>
                -
                <button @click="logoutClick" v-if="isAuth" to="/logout">Logout</button>
                -
                <router-link v-if="!isAuth" to="/login"> Login</router-link>
                -
                <router-link v-if="!isAuth" to="/register"> Register</router-link>
            </div>
        </div>
        <div>

            <router-view></router-view>

        </div>

    </div>

</template>

<script>
    export default {


        data: function () {
            return {
                isAuth: null
            }
        },

        created() {
            this.isAuth = this.$auth.isAuthenticated();


            if (this.isAuth) {
                this.setAuthenticatedUser();
            }

        },

        methods: {

            setAuthenticatedUser() {

            console.log("token : " + this.$auth.getToken());
                this.$http.get('api/user',{
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getToken(),
                        "Accept": "application/json",
                    }
                }).then(response => {
                    console.log("Response:" + response);
                    this.$auth.setAuthenticatedUser(response.body);
                    console.log(this.$auth.getAuthenticatedUser());

                }).catch((error) => {
                    console.log(error);
                });

            },


            logoutClick() {
                        this.$auth.destroyToken();
                      console.log("Logout OK!");
                        //Redirecionar user após este ficar autenticado
                        this.$router.push("/index");
            }
        }
    }

</script>

