<template>
  <div id="app">
    <top-header></top-header>
    <div class="main">
      <router-view/>
    </div>
  <nav-footer></nav-footer>
  </div>
</template>

<script>
import TopHeader from '@/components/public/TopHeader'
import NavFooter from '@/components/public/NavFooter';
export default {
  name: 'App',
  components: {
    TopHeader,
    NavFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding:0;
  margin: 0;
  position: relative
}
.main{
  min-width: 1000px;
  margin-top:100px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  margin-bottom:10px
}
</style>
