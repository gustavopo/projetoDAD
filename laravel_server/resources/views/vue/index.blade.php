@extends('master')

@section('title', 'Jogo da Memória')

@section('content')
    <router-link to="/users">Users</router-link> -
    <router-link to="/singlememorygame"> SinglePlayer </router-link> -
    <router-link to="/multimemorygame"> Multiplayer </router-link>

    <router-view></router-view>
@endsection

@section('pagescript')
    <script src="js/vueapp.js"></script>

    <!-- <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/vueapp.js"></script>
     -->
@stop
