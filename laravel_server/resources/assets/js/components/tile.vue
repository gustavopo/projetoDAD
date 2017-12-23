<template>
    <div>
        <img v-bind:src="pieceImageURL(img)" v-on:click.prevent="clickTile(r1,c1)"> 
        <p>{{img}}</p>
    </div>
</template>

<script type="text/javascript">


export default {

    props: ['img','r1','c1'],
    data: function () {
        return {
            tileFlipped: false,
        }
    },

    methods: {
        pieceImageURL: function (img) {
            var imgSrc = String(img);
            console.log('na tile');
            return 'img/' + imgSrc + '.png';
           },

           clickTile: function (r1, c1) {
            //console.log(r1+" " + c1);
            this.tileFlipped = true;
            this.$emit('click-tile',r1, c1);
        }
    },
    beforeMount() {

    }

}
</script>
