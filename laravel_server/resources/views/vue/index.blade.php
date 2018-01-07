@extends('master')

@section('title', 'Jogo da Memória')

@section('content')
  <index></index>


@endsection

@section('pagescript')
<script src="js/vueapp.js">

    import Index from '../../assets/js/components/Index.vue'

    export default {
        data: function(){
            return {
            }
        },  components: {
            'index': Index
        },

    }

</script>

@stop
