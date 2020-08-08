<template>
  <div id="app">
    <header class="el page-header fixed top-0 bg-light">
      <span class="welist">WeList</span>
      <br />
      <el-divider></el-divider>
      <span class="slogan text-info">To The Future, Step by Step</span>
    </header>
    <router-view class="container-70" />
  </div>
</template>

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
</style>
