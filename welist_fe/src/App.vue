<template>
  <div id="app">
    <header :class="['bg-light', 'page-header', logStatus ? 'page-header-flex' : '']">
      <span :class="logStatus ? 'welist-on' : 'welist'">WeList</span>
      <br v-if="!logStatus" />
      <el-divider v-if="!logStatus"></el-divider>
      <span class="slogan">To The Future, Step by Step</span>
      <div class="user-info" v-if="logStatus">
        <span class="uid">{{userInfo.uname}}</span>
        <el-avatar
          class="avatar"
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <el-button class="logout-btn" type="danger" size="small" circle @click="handleLogOut">退出</el-button>
      </div>
    </header>
    <router-view class="container-70" v-if="logStatus" />
    <log-or-reg v-if="!logStatus" class="log-btn"></log-or-reg>
  </div>
</template>

<script>
import LogOrReg from './components/LogOrReg'
import { mapGetters, mapMutations } from 'vuex'

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
      'logStatus',
      'userInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'clearUserInfo'
    ]),
    handleLogOut () {
      this.clearUserInfo()
    }
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

  .welist-on
    font-size 2rem
    margin-right 2rem

  .slogan
    font-size 1rem
    color $text-lll

  .user-info
    display flex
    justify-content space-around
    align-items center
    color $text-lll

    .uid
      margin-right 0.4rem

    .logout-btn
      opacity 0
      margin-left 5px
      transition all 0.5s

    &:hover
      .logout-btn
        opacity 1

.page-header-flex
  display flex
  justify-content space-between
  align-items center

.log-btn
  text-align center
  margin-top 15%
</style>
