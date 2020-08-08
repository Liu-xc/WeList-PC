<template>
  <div id="app">
    <header class="el page-header fixed top-0 bg-light">
      <span class="welist">WeList</span>
      <br />
      <el-divider></el-divider>
      <span class="slogan text-info">To The Future, Step by Step</span>
    </header>
    <router-view class="container-70" v-if="logStatus" />
    <log-or-reg v-if="!logStatus" class="log-btn"></log-or-reg>
  </div>
</template>

<script>
import LogOrReg from './components/LogOrReg'
import { mapGetters } from 'vuex'

export default {
  components: {
    LogOrReg
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'logStatus'
    ])
  }
}
</script>

<style lang="stylus">
@import './assets/globalClass.styl'

.page-header
  padding-left 15%
  padding-right 15%
  padding-top 1.2rem
  padding-bottom 1.2rem

  .welist
    font-size 2rem

  .slogan
    font-size 1rem

.log-btn
  text-align center
  margin-top 15%
</style>
