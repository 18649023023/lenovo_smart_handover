<template>
  <div class="navbarbg">
    <el-row>
      <!-- <el-col :span="12" class="logo">Laviana BI</el-col> -->
      <el-col :span="24" class="user">
        <el-avatar :src="avatar" />
        <div>{{ username }}</div>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;">
      <el-popconfirm
        title="确定退出？"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="exitbtn"
      >
        <template #reference>
          <span class="icon iconfont exit" title="退出">&#xe6b2;</span>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, onActivated, nextTick } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    //初始状态
    const userobj = reactive({
      department: "采购",
      username: "",
      avatar: "",
    });
    //进入后渲染
    onMounted(() => {
      let author: any = localStorage.getItem("author");
      userobj.username = JSON.parse(author).user.name;
      userobj.avatar = JSON.parse(author).user.avatar;
    });

    //退出事件
    const exitbtn = () => {
      clearAllCookies();
      router.replace("/");
    };
    const clearAllCookies = () => {
      if (document.cookie) {
        var c = document.cookie.split(";"),
          l = location.hostname;
        if (c.length > 0) {
          for (var i = 0; i < c.length; i++) {
            var t = c[i].split("="),
              n = t[0] + "='';path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = n + "domain=" + l.substring(l.indexOf(".") + 1);
          }
        }
      }
    };

    return {
      ...toRefs(userobj),
      exitbtn,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.navbarbg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: sticky;
    bottom: 0;
    z-index: 50;
  .el-avatar {
    background-color: #fff;
    border: 1px solid #f1f1f1;
    width: 50px;
    height: 50px;
  }

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    font-size: 25px;
  }

  .user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
        font-size: 18px;
        margin-top: 12px;
    }
  }
  .exit {
        color: rgba(180,64,113);
      cursor: pointer;
      font-size: 38px;
      font-weight: bold;
    }
}
</style>
