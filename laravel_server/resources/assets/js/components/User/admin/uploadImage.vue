<template>
    <div>
    <div class="jumbotron">
        <h1>{{ title }}</h1>
    </div>

    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-body" align="center">

                    <!--Nome-->
                    <div align="left" class="form-group" >
                        <label>Image Name</label>
                        <input  class="form-control" type="text" placeholder="Image Name"/>
                    </div>

                    <!--File-->
                    <div align="left" class="form-group" >
                        <label>File Name</label>
                        <input  class="form-control" type="file" placeholder="Image Name" @change="imageChanged"/>
                    </div>

                    <!-- Button-->
                    <button class="btn btn-xl btn-primary" align="center" >
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
    module.exports={


        data: function(){
            return {
                title: 'Images Management',
                image:'',

            }
        },
        methods: {

            imageChanged (){
                //var fileReader = new File
            }

        },
    }
</script>
