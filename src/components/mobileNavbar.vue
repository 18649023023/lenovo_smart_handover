<template>
  <div class="navbar">
    <van-nav-bar title="智慧交班" left-arrow @click-left="onClickLeft">
      <template #left>
        <span class="icon iconfont exit">&#xe6ba;</span>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
export default {
  setup(props, { emit }) {
    const onClickLeft = () => {
      emit("exit");
    };
    return { onClickLeft };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.navbar {
  .exit {
    font-size: 26px;
  }
}
</style>
