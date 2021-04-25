<template>
  <div id="app">
    <a-back-top style="right: 50px">
      <div class="back-top">
        <a-icon type="up" />
      </div>
    </a-back-top>
    <router-view />
  </div>
</template>

<style lang="less">
.back-top {
  background: #f7f9fa;
  border: 1px solid #e5e9ef;
  border-radius: 3px;
  width: 45px;
  height: 45px;
  margin-bottom: 8px;
  transition: all 0.3s;
  cursor: pointer;
  color: #999;
  text-align: center;
  font-size: 18px;
  &:hover {
    background: #fa541c;
    color: #fff;
  }
  i {
    margin-top: 12px;
  }
}
</style>
