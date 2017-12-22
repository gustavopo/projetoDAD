<template>
    <div>
        <img v-bind:src="pieceImageURL(img)"> <!--v-on:click="clickTile(key)-->
    </div>
</template>

<script type="text/javascript">


    export default {

        props: ['img'],
        data: function () {
            return {
                tileFlipped: false,

            }
        },

        methods: {
            pieceImageURL: function (tile) {
                var imgSrc = String(tile);
                console.log("g" + this.img);
                return 'img/' + imgSrc + '.png';
            },

            clickTile: function (tile) {
                if (this.gameEnded) {
                    console.log('juca');
                    return;
                }
                this.tileFlipped = true;
                this.$emmit('click-tile', tile);
            },
        },
    beforeMount() {
        console.log(this.img);
    }
    }
</script>
