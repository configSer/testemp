<template>
  <div class="homeFourth">
    <div class="navbar" v-model="tabView">
      <div @click="changeIndex">
        <yd-icon name="home" size=".5rem" color="#ff5558" v-show="indexFlag"></yd-icon>
        <yd-icon name="home-outline" size=".5rem" color="#ff5558" v-show="!indexFlag"></yd-icon>
      </div>
      <div @click="changeSecond">
        <yd-icon name="shopcart" size=".5rem" color="#ff5558" v-show="secondFlag"></yd-icon>
        <yd-icon name="shopcart-outline" size=".5rem" color="#ff5558" v-show="!secondFlag"></yd-icon>
      </div>
      <div @click="changeThird">
        <yd-icon name="order" size=".5rem" color="#ff5558" v-show="thirdFlag"></yd-icon>
        <yd-icon name="feedback" size=".5rem" color="#ff5558" v-show="!thirdFlag"></yd-icon>
      </div>
      <div @click="changeFour">
        <yd-icon name="ucenter" size=".5rem" color="#ff5558" v-show="fourFlag"></yd-icon>
        <yd-icon name="ucenter-outline" size=".5rem" color="#ff5558" v-show="!fourFlag"></yd-icon>
      </div>
    </div>
    <component :is="tabView"></component>
    <div>{{msg}} <button @click="changeAuther">修改</button></div>
  </div>
</template>

<script>
  import one from './../../index/homepage/homeFirst'
  import two from './../../index/homepage/homeSecond'
  import three from './../../index/homepage/homeThird'
  import four from './../../index/homepage/homeFourth'
  export default {
    name: "home-fourth",
    data() {
      return {
        indexFlag: false,
        secondFlag: false,
        thirdFlag: false,
        fourFlag: false,
        msg:"",
        tabView:'one',
      }
    },
    components:{
      one, two, three, four
    },
    mounted(){

    },
    methods: {
      getVarDate() {
        this.$axios.get('./../../../static/data/info.json').then(res => {
          let data = res.data.info
        }, err => {
          console.log(err)
        }).catch(data => {
          console.log(data)
        })
      },
      changeIndex() {
        this.indexFlag = true;
        this.secondFlag = false;
        this.thirdFlag = false;
        this.fourFlag = false;
        this.tabView = 'one'
      },
      changeSecond() {
        this.indexFlag =false ;
        this.secondFlag = true;
        this.thirdFlag = false;
        this.fourFlag = false;
        this.tabView = 'two'
      },
      changeThird() {
        this.indexFlag = false;
        this.secondFlag = false;
        this.thirdFlag = true;
        this.fourFlag = false;
        this.tabView = 'three'
      },
      changeFour() {
        this.indexFlag = false;
        this.secondFlag = false;
        this.thirdFlag = false;
        this.fourFlag = true;
        this.tabView = 'four'
      },
      changeAuther(){
        this.$store.commit('newAuther',"我是警察，举起手来");
        this.msg = this.$store.state.msg;
      }
    }
  }
</script>

<style scoped>
.navbar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:1rem;
}
</style>
