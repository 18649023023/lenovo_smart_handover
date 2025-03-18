<template>
    <div class="nopermission">
        <el-image  :src="require('@/assets/Image/nopermission3.svg')" fit="cover" />
        <div class="dis">暂无权限</div>
    </div>
</template>

<script>
export default {
    setup () {
    return {};
    }
}
</script>

<style lang="scss" scoped>
    .nopermission{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        .dis{
            margin-top: 40px;
            font-size: 18px;
            color: #999;
        }
    }
</style>