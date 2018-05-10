<template>
  <footer>
    <p>
      Copyright&nbsp;&copy;&nbsp;{{author}}{{age}}岁{{msg}} - 2016 All rights reserved
    </p>
  </footer>
</template>

<script>
  export default {
    name: 'footerDiv',
    data () {
      return {

      }
    },
    computed: {
      author () {
        return this.$store.state.author
      },
      age(){
        return this.$store.state.age
      },
      msg(){
        return this.$store.state.msg
      }
    }
  }
</script>
