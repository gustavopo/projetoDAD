<template>
    <div>
        <div>
            <div class="topnav" id="myTopnav">
                <router-link to="/statistics"> Statistics</router-link>

                <router-link v-if="isAdmin" to="/users"> Users</router-link>

                <router-link to="/singlememorygame"> SinglePlayer</router-link>

                <router-link to="/multimemorygame"> Multiplayer</router-link>

                <router-link v-if="isAdmin" to="/imagesManagement"> Images Management</router-link>

            </div>
            <div align="right">
                <router-link v-if="isAuth" to="/userPage">Gestão da Conta</router-link>

                <router-link v-if="isAdmin" to="/adminPasswordEdit"> AdminPasswordChange</router-link>

                <button @click="logoutClick"  v-if="isAuth" to="/logout">Logout</button>

                <router-link v-if="!isAuth" to="/login"> Login</router-link>

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
                isAuth: null,
                isAdmin: null
            }
        },

        created() {
            this.isAuth = this.$auth.isAuthenticated();
            this.isAdmin = this.$auth.isAdmin();
            if (this.isAuth) {
                this.setAuthenticatedUser();
            }


        },

        methods: {

            setAuthenticatedUser() {

           // console.log("token : " + this.$auth.getToken());
                this.$http.get('api/user',{
                    headers: {
                        "Authorization": "Bearer " + this.$auth.getToken(),
                        "Accept": "application/json",
                    }
                }).then(response => {
                    this.$auth.setAuthenticatedUser(response.body);
                }).catch((error) => {
                    console.log(error);
                });

            },


            logoutClick() {
                        this.$auth.destroyToken();
                      console.log("Logout OK!");
                        //Redirecionar user após este ficar autenticado
                        location.reload();
                        this.$router.push("/statistics");
            }
        }
    }

</script>

