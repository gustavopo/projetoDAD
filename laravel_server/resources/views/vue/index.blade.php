@extends('master')

@section('title', 'Jogo da Memória')

@section('content')
    <div>
        <div class="topnav" id="myTopnav">
            <router-link to="/users"> Users</router-link> -
            <router-link to="/singlememorygame"> SinglePlayer</router-link> -
            <router-link to="/multimemorygame"> Multiplayer</router-link>
        </div>
        <div align="right">
            <router-link to="/login"> Login</router-link> -
            <router-link to="/register"> Register</router-link>
        </div>
    </div>

    <div>

        <router-view></router-view>

    </div>



@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>

    <!-- <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/vueapp.js"></script>
-->
@stop
