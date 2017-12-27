<template>
    <div>
        <img v-bind:src="pieceImageURL(img)" v-on:click.prevent="clickTile(r1,c1)">
        <p>{{img}}</p>
    </div>
</template>

<script type="text/javascript">


export default {

    props: ['img', 'r1', 'c1', 'missed', 'matched'],
    data: function () {
        return {
            tileFlipped: false,
            missedTile:false,

        }
    },

    methods: {
        pieceImageURL: function (img) {
            let imgSrc = String(img);
            console.log(img);
            let self = this;


            if (!this.tileFlipped || this.missed) {
                return 'img/hidden.png';
            }if(this.tileFlipped && !this.matched) {
                return 'img/' + imgSrc + '.png';
            }else{
                return 'img/empty.png';
            }
        },

        clickTile: function (r1, c1) {
                console.log("misssed: "+this.missed);
                this.tileFlipped = true;
                this.$emit('click-tile', r1, c1);

            }
        },
        beforeMount() {

        }

    }
    </script>
