<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>


        <images-list :images="images" ref="imagesListRef" @delete-click="deleteImage"></images-list>

<!--

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
            <tr v-for="image in images"  :key="image.id"> <!--:class="{activerow: editingUser === user}
                <td>{{ image.id }}</td>
                <td>{{ image.face }}</td>
                <td>{{ image.active }}</td>
                <td>{{ image.path }}</td>
            </tr>
            </tbody>
        </table>-->

    </div>

</template>

<script>
    import ImagesList from './imagesList.vue';

    export default {
        data: function () {
            return {
                title: 'Images Management',
                images: [],
                showSuccess: false,
                successMessage: '',

            }
        },

        methods: {
            getImages: function () {
                axios.get('api/images')
                    .then(response => {
                        this.images = response.data.data;
                    });
            },
            deleteImage: function (image) {
                console.log("image"+image);
                console.log(image);
                axios.delete('api/images/' + image.id)
                    .then(response => {
                        this.showSuccess = true;
                        this.successMessage = 'Image Deleted';
                        //this.getImages();
                        console.log("response: " + response);
                    }).catch((error)=>
                console.log(error)
                )},

        },
        mounted() {
            this.getImages();
        },
        components: {
            'images-list': ImagesList
        },
    }

</script>

