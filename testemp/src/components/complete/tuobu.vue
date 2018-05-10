<template>
    <div class="tuoyoup">
      <div class="tuobu">
        <div class="tuobu_left">{{obj.left_cont}}</div>
        <div class="tuobu_right">{{obj.right_cont}}</div>
      </div>
      <slot name="lilisa"></slot>
      <input type="text" v-model="username" @change="setUser">
      <slot name="pipixia"></slot>
    </div>
</template>

<script>
    export default {
        name: "header",
      data(){
          return {
            username:""
          }
      },
      methods:{
        setUser(){
          this.$emit('transferUser',this.username);
        }
      },
      props:['obj'],
    }
</script>

<style scoped lang="scss">
  .tuoyoup{
    background:#ffffff;
    input{
      height:.6rem;
      width:100%;
    }
  }
  .tuobu{
    display: flex;
    justify-content: space-between;
    height:1rem;
    font-size:.3rem;
  }
</style>
