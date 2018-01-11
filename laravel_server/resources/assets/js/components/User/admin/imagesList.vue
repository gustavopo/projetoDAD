<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Id</th>
            <th>Face</th>
            <th>Active</th>
            <th>Image</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="image in images" :key="image.id"> <!--:class="{activerow: editingUser === user}-->
            <td>{{ image.id }}</td>
            <td>{{ image.face }}</td>
            <td>{{ image.active }}</td>
            <td><img v-bind:src="pieceImageURL(image.path)"/></td>
            <td>   <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteImage(image)">Delete</a> </td>
        </tr>



        </tbody>
    </table>
</template>


<script type="text/javascript">
    // Component code (not registered)
    module.exports={
        props: ['images'],

        data: function(){
            return {

            }
        },
        methods: {
            pieceImageURL: function (img) {
                let imgSrc = String(img);
                return 'img/' + imgSrc;
            },
            deleteImage: function(image){
                console.log("ID " + image.id)
                this.$emit('delete-click', image);
            },

        },
    }
</script>

<style scoped>
    tr.activerow {
        background: #123456  !important;
        color: #fff          !important;
    }

</style>