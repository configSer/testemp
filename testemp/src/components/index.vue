<template>
  <div class="pageall">
    <div class="content_all">
      <router-view></router-view>
    </div>
    <div class="foot_nav">
      <router-link to="/index" tag="figure">
        <div><img src="./../assets/img/one.png" alt=""></div>
        <figcaption>首页</figcaption>
      </router-link>
      <router-link to="/second" tag="figure">
        <div><img src="./../assets/img/four.png" alt=""></div>
        <figcaption>第二页</figcaption>
      </router-link>
      <router-link to="/three" tag="figure">
        <div><img src="./../assets/img/three.png" alt=""></div>
        <figcaption>第三页</figcaption>
      </router-link>
      <router-link to="/four" tag="figure">
        <div><img src="./../assets/img/two.png" alt=""></div>
        <figcaption>第四页</figcaption>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $color:#ccc;
  .pageall{
     height:100%;
     display: flex;
     flex-direction:column;
     .content_all{
       height:1rem;
       flex-grow:1;
     }
     .foot_nav{
       height:1.2rem;
       box-sizing: border-box;
       border-top:1px solid $color;
       padding:0 .5rem;
       display: flex;
       justify-content: space-between;
       align-items: center;
       figure{
         text-align: center;
         img{height:.5rem;}
       }
     }
   }
</style>
