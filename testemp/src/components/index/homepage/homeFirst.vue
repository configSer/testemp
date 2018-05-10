<template>
    <div class="home_first">
      <yd-slider autoplay="3000">
        <yd-slider-item>
          <a href="">
            <img src="http://static.ydcss.com/uploads/ydui/1.jpg">
          </a>
        </yd-slider-item>
        <yd-slider-item>
          <a href="">
            <img src="http://static.ydcss.com/uploads/ydui/2.jpg">
          </a>
        </yd-slider-item>
        <yd-slider-item>
          <a href="">
            <img src="http://static.ydcss.com/uploads/ydui/3.jpg">
          </a>
        </yd-slider-item>
      </yd-slider>
      <yd-button type="danger" size="large" shape="circle">获取</yd-button>
      <tuobu  :obj="obj" @transferUser="getUser">
        <div slot="lilisa">生命就像一条大河</div>
        <div slot="pipixia">将我困住无法挣脱</div>
      </tuobu>


      <div style="font-size:1rem;color:#ff5558;">{{user}}</div>

      <div>{{msg}}</div>
    </div>
</template>

<script>
    import tuobu from '../../complete/tuobu'
    export default {
      name: 'home_first',
      data() {
        return {
          obj:{
            left_cont:"我是左边的内容",
            right_cont:"我是右边的内容"
          },
          user:"",
          msg:"",
        }
      },
      mounted () {
        this.msg = this.$store.state.msg;
      },
      methods: {
        getUser(msg){
          this.user = msg
        }
      },
      computed: {
      },
      components:{
        tuobu,
      }
    }
</script>

<style scoped lang="scss">
  .home_first{
    height:100%;
  }
</style>
