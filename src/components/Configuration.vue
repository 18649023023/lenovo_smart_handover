<template>
    <div class="configdialog">
        <el-dialog v-model="dialogVisible" :show-close="true" :close-on-click-modal="false" :width="'80%'">
            <template #header>
                <b slot="title" class="title">
                    表头管理
                </b>
            </template>
            <div>
           
            <!--表头管理-->
            <el-row v-if="columnlist">
                <el-col :span="6" v-for="(item,index) in columnlist" :key="index">
                    <el-checkbox v-model="item[item['props']+'_show']" :label="item[item['props']+'_label']" size="large"/>
                </el-col>
            </el-row>
        </div>
            
            <template #footer>
                <span class="dialog-footer">
                    <el-button class="resetbtn" @click="resetbtn">重置</el-button>
                    <el-button class="cancelbtn" @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" class="confirmbtn" @click="confirmbtn">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    
    setup(props,context) {
        const data = reactive({
            dialogVisible: false,
            columnlist: [],
            screenlist: []
        })
        
        //打开模态框
        const modalopen = (column)=>{
            data.columnlist = JSON.parse(JSON.stringify(column))
            
        }
        const confirmbtn = () => {
            context.emit('custom-event',data.columnlist)
            data.dialogVisible = false
        }
        const resetbtn = () => {
            context.emit('reset-event')
        }

        return { ...toRefs(data), confirmbtn,modalopen,resetbtn}
    }
}
</script>

<style lang="scss" scoped>
::v-deep.configdialog {
    .el-dialog__header {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        border-bottom:1px solid #f1f1f1;
        .title {
            font-size: 20px;
            font-weight: bolder;
        }

        .el-dialog__headerbtn {
            position: relative;
        }
    }
    .el-dialog__body{
        padding:10px 20px;
    }
    .el-checkbox__label{
        color: #333;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background: #0E5DB4;
        border-color: #0E5DB4;
    }
    .confirmbtn {
        background-color: #0E5DB4;
    }
    h3{
        margin-bottom: 0;
        padding: 0 !important;
    }
    .cancelbtn {
        background-color: #fff;
        color: #333;
    }

    .cancelbtn,
    .confirmbtn {
        width: 100px;
        cursor: pointer;
    }
}</style>