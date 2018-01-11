<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>

        <div align="right">  <a class="btn btn-xl btn-primary" style="margin-right: 40px" v-on:click.prevent="redirectUpload" >Upload Image</a></div>
        <images-list :images="images" ref="imagesListRef" @delete-click="deleteImage"></images-list>

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
                console.log("image" + image);
                console.log(image);
                axios.delete('api/images/' + image.id)
                    .then(response => {
                        this.showSuccess = true;
                        this.successMessage = 'Image Deleted';
                        swal("Image Deleted!", "success")
                        this.getImages();
                        console.log("response: " + response);
                    }).catch((error) =>
                    console.log(error)
                )
            },

            redirectUpload: function () {
               console.log("redirect upload")
                this.$router.push('/uploadImage');
            },

        },
        mounted() {
            this.getImages();
        },
        components: {
            'images-list': ImagesList
        },
    }

</script>

