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

                localStorage.removeItem('id');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                localStorage.removeItem('nickname');
                localStorage.removeItem('admin');
                localStorage.removeItem('blocked');
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
                localStorage.setItem('authUser', data);
                localStorage.setItem('id', data.id);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                localStorage.setItem('nickname', data.nickname);
                localStorage.setItem('admin', data.admin);
                localStorage.setItem('blocked', data.blocked);
            },

            getAuthenticatedUser()
            {
                return localStorage.getItem('authUser');
            },

            getAuthenticatedUserId()
            {
                return localStorage.getItem('id');
            },

            getAuthenticatedUserName()
            {
                return localStorage.getItem('name');
            },
            getAuthenticatedEmail()
            {
                return localStorage.getItem('email');
            },

            isAdmin: function()
            {
                return localStorage.getItem('admin');
            },

            getAuthenticatedNickname()
            {
                return localStorage.getItem('nickname');
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
