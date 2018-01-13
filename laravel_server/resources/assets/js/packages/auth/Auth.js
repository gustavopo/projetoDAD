export default function (Vue) {
    let authenticatedUser = {}
    Vue.auth =
        {
            setToken: function (token, expiration) {
                localStorage.setItem('token', token);
                localStorage.setItem('expiration', expiration);

            },

            getToken: function () {
                var token = localStorage.getItem('token');
                var expiration = localStorage.getItem('expiration');

                if (!token || !expiration) {
                    return null;
                }

                if (Date.now() > parseInt(expiration)) {
                    //token is expired
                    this.destroyToken();
                    return null;
                }
                else {
                    return token;
                }
            },

            destroyToken: function () {
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
            },


            isAuthenticated: function () {
                if (this.getToken()) {
                    return true;
                }
                else {
                    return false;
                }
            },

            isAuthenticatedAndAdmin: function () {
                let isAdmin = this.getAuthenticatedUser();
                console.log(isAdmin.body);
            },

            setAuthenticatedUser(data){
                authenticatedUser=data
            },

            getAuthenticatedUser()
            {
                return authenticatedUser
            }
        }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: function () {
                return Vue.auth

            }
        }
    })
}
