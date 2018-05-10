<template>
  <div class="home-third">
    <div class="container">
      <div class="btn" @click="getText()" v-show="showFlag">获取数据</div>
      <div class="text" v-for="item in msg">
        <yd-rollnotice autoplay="2000">
          <yd-rollnotice-item>{{item.name}}</yd-rollnotice-item>
          <yd-rollnotice-item>{{item.age}}</yd-rollnotice-item>
          <yd-rollnotice-item>{{item.address}}</yd-rollnotice-item>
        </yd-rollnotice>
      </div>
    </div>
    <test></test>
  </div>
</template>

<script>
  import test from '../../complete/sest'
  export default {

    name: "home-third",
    data(){
      return {
        msg:"",
        showFlag:true,
      }
    },
    methods: {
      getText(){
        this.$axios.get('./../../../static/data/info.json').then((data)=>{
          let res = data.data.info;
          this.msg = res[0].msg;
          this.showFlag = false;
        }).catch((response)=>{
          console.log(response);
        })
      }
    },
    components:{
      test,
    }
  }
</script>

<style scoped>

</style>
