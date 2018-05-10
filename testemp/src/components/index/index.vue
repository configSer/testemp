<template>
  <div class="home_page">
      <div class="top_nav">
        <router-link to="/index/homeFirst" tag="div">首页1</router-link>
        <router-link :to="{name:'homeSecond',params:{username:'jspang'}}" tag="div">首页2</router-link>
        <router-link to="/index/homeThird" tag="div">首页3</router-link>
        <router-link to="/index/homeFourth" tag="div">首页4</router-link>
      </div>
    <div class="home_page_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

    export default {
        name: "index",
      data(){
          return {
              jspang:"我是小浣熊"
          }
      },
    }
</script>

<style scoped lang="scss">
  $color:#ccc;
  .home_page{
    height:100%;
    display: flex;
    flex-direction: column;
    .top_nav{
      height:.8rem;
      line-height:.8rem;
      display:flex;
      width:90%;
      margin:0 auto;
      >div{
        flex-grow:1;
        text-align: center;
        margin:0 2px;
        background:$color;
      }
    }
    .home_page_content{
      height:1rem;
      flex-grow:1;
    }
  }
</style>
