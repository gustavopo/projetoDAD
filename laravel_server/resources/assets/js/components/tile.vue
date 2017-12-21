<template>
    <div>
        <img v-bind:src="pieceImageURL(tile)" v-on:click="clickPiece(key)">
    </div>
</template>

<script type="text/javascript">
   export default {
        props: ['img'],

        data: {


        },

        methods: {
            pieceImageURL: function (tile) {
                var imgSrc = String(tile);
                if(this.tileFlipped){
                    return 'img/' + imgSrc + '.png';
                    this.$emit('edit-click', tileFlipped);
                }else{
                    return 'img/0.png';
                }
            },

            clickPiece: function(index) {
                if(this.gameEnded){
                    console.log('juca');
                    return;
                }

                this.tileFlipped=true;
                //this.board[index] = this.currentValue;
                this.successMessage = this.currentPlayer+' has Played';
                this.showSuccess = true;
                //this.currentValue = (this.currentValue == 1)? 2 : 1;
                // this.checkGameEnded();
            },

        }
    }
</script>
