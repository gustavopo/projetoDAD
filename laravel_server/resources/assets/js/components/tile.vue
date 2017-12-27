<template>
    <div>
        <img v-bind:src="pieceImageURL(img)" v-on:click.prevent="clickTile(r1,c1)">
        <p>{{img}}</p>
    </div>
</template>

<script type="text/javascript">


export default {

    props: ['img', 'r1', 'c1', 'missed'],
    data: function () {
        return {
            tileFlipped: false,
            oldImg:null,
            missedTile:false,
        }
    },

    methods: {
        pieceImageURL: function (img) {
            let imgSrc = String(img);
            console.log(img);
 

            if (!this.tileFlipped ||  this.missed) {
                return 'img/hidden.png';
            } else {
                return 'img/' + imgSrc + '.png';
            }
        },

        clickTile: function (r1, c1) {
                //console.log(r1+" " + c1);
                console.log("misssed: "+this.missed);
                this.tileFlipped = true;
                this.$emit('click-tile', r1, c1);


            }
        },
        beforeMount() {

        }

    }
    </script>
