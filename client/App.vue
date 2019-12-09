<template>
  <div id="app">
    <div class='ribbon'>
       <router-link to="/" exact><span>首页</span></router-link>
       <router-link to="/topics/11"><span>异步数据</span></router-link>
       <router-link to="/counter"><span>Vue原生事件</span></router-link>
       <router-link to="/about"><span>无状态组件</span></router-link>
       <router-link to="/test"><span>异步组件</span></router-link>
     </div>
     <img class="logo" src="./assets/images/logo.png" />
     <transition name="fade" mode="out-in">
       <router-view class="view" />
     </transition>
     
  </div>
</template>

<script>
console.log(process.env.NODE_ENV)
</script>

<style>
  .view {
    width: 500px;
    background: #fff;
    margin: 10px auto;
    min-height: 300px;
    padding: 20px;
    box-sizing: border-box;
    opacity: 0.8;
  }
  .ribbon {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
  .ribbon:after, .ribbon:before {
    margin-top:0.5em;
    content: "";
    float:left;
    border:1.5em solid #fff;
  }
  .ribbon:after {
    border-right-color:transparent;
  }
  .ribbon:before {
    border-left-color:transparent;
  }
  .ribbon a:link, .ribbon a:visited {
    color:#000;
    text-decoration:none;
      float:left;
      height:3.5em;
    overflow:hidden;
  }
  .ribbon span {
    background:#fff;
    display:inline-block;
    line-height:3em;
    padding:0 1em;
    margin-top:0.5em;
    position:relative;
    transition: background-color 0.2s, margin-top 0.2s;
  }
  .ribbon a:hover span {
    background:#FFD204;
    margin-top:0;
  }
  .ribbon span:before {
    content: "";
    position:absolute;
    top:3em;
    left:0;
    border-right:0.5em solid #9B8651;
    border-bottom:0.5em solid #fff;
  }
  .ribbon span:after {
    content: "";
    position:absolute;
    top:3em;
    right:0;
    border-left:0.5em solid #9B8651;
    border-bottom:0.5em solid #fff;
  }
  .logo {
    position: absolute;
    width: 100px;
    left: 100px;;
    top: 30px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
