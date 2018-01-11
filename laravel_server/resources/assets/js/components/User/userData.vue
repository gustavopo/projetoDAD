<template>
    <div>
        <table class="table table-user-information">
            <tbody>
            <tr>
                <td>Name:</td>
                <td>{{this.authUser.name}} </td>
            </tr>
            <tr>
                <td>Nickname:</td>
                <td>{{this.authUser.nickname}}</td>
            </tr>
            <tr>

                <td>Email</td>
                <td><a>{{this.authUser.email}}</a></td>
            <tr>


            </tr>
            <hr>
            <br>

            </tbody>
        </table>
    </div>

</template>

<script type="text/javascript">
    // Component code (not registered)
    export default {
        props: ['authUser'],
        data: function () {
            return {}

        },


        methods: {},


    }
</script>

