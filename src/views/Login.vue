<template>
  <div class="loginbg"></div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({});

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // 当前设备是移动端
      console.log("这是移动设备");
      router.replace({
        name: "mobileHome",
      });
    } else {
      // 当前设备是Web端
      console.log("这是Web端");
      router.replace({
        name: "Home",
      });
    }

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.loginbg {
  width: 100%;
  height: 100%;
}
</style>
