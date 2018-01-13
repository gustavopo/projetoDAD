    <template>
    <div>
    <div class="jumbotron">
        <h1>{{ title }}</h1>
    </div>

    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-body" align="center">
<br>


                    <div align="left" class="form-group">
                        <label>Face: </label>
                        <select v-model="image.face" >
                            <option value="tile">Tile</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>

                    <div  align="left" class="form-group">
                        <label>Activation Status: </label>
                        <select v-model="image.active" >
                            <option value="1">Active</option>
                            <option value="0">Not Active</option>
                        </select>
                    </div>

                    <!--File-->
                    <div align="left" class="form-group" >
                        <label>File Name</label>
                        <input  class="form-control" type="file" placeholder="Image Name" @change="imageChanged"/>
                    </div>

                    <!-- Button-->
                    <button  @click.prevent="uploadImage(image)" class="btn btn-xl btn-primary" align="center" >
                        Upload Image
                    </button>

                </div>

            </div>
        </div>
    </div>
    </div>
</template>


<script type="text/javascript">
    // Component code (not registered)
    module.exports= {


        data: function () {
            return {
                title: 'Images Management',
                image: {
                    face: '',
                    active: '',
                    path: '',

                },

            }
        },
        methods: {
            imageChanged(e) {
                console.log(e.target.files[0]);
                var fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);

                fileReader.onload = (e) => {
                    this.image.path = e.target.result;
                }

                console.log(this.image);
                console.log(this.image.path);
            },


            uploadImage(image) {
               //console.log("Upload Image click: " + this.image);

                axios.post('/api/images/storeImage', image)
                    .then((response) => {
                        console.log("Sucess " +response.data);
                        this.resetImage();
                     swal('Imagem Upload Successful!')

                    })
                    .catch((error) => {
                        //Show errors
                        console.log("Error: " + error);
                    });
                this.$router.push('/imagesManagement');
                location.reload();
            },
            resetImage()
            {
                this.image = {
                    face: null,
                    active: null,
                    path: null,
                }
            }
        }
    }
</script>
