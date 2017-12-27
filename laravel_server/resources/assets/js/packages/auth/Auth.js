export default function (Vue) {
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
