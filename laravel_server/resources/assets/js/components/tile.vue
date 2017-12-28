<template>
    <div>
        <img v-bind:src="pieceImageURL(img)" v-on:click.prevent="clickTile(r1,c1)">
    </div>
</template>

<script type="text/javascript">


export default {

    props: ['img', 'r1', 'c1', 'missed', 'matched', 'tileFlipped'],
    data: function () {
        return {
            missedTile:false,
        }
    },

    methods: {
        pieceImageURL: function (img) {
            let imgSrc = String(img);
            console.log(img);
            let self = this;

            console.log("win : " + this.restartGame);

            if(this.restartGame){
                this.tileFlipped = true;
            }

            if (!this.tileFlipped || this.missed ) {
                return 'img/hidden.png';
            }if(this.tileFlipped && !this.matched) {
                return 'img/' + imgSrc + '.png';
            }else{
                return 'img/empty.png';
            }
        },

        clickTile: function (r1, c1) {
                this.$emit('click-tile', r1, c1);

            }
        },
        beforeMount() {

        }

    }
    </script>
