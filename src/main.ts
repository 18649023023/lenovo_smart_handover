// import "@babel/polyfill"; //(一定要在最上面，第一行)
import "babel-polyfill";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();
import { createApp } from "vue";
import App from "./App.vue";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElContainer,
  ElAside,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElHeader,
  ElDropdown,
  ElIcon,
  ElDropdownMenu,
  ElDropdownItem,
  ElSelect,
  ElOption,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElImage,
  ElRow,
  ElLink,
  ElCol,
  ElForm,
  ElFormItem,
  ElPopconfirm,
  ElSlider,
  ElDialog,
  ElCheckbox,
  ElCard,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPagination,
  ElTag,
  ElLoading,
  ElTooltip,
  ElAutocomplete,
  ElAvatar,
  ElDatePicker,
  ElConfigProvider,
  ElInputNumber,
  ElUpload,
  ElSwitch,
} from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import "amfe-flexible";
import "@/assets/font/iconfont.css";
import {
  Button,
  NavBar,
  Col,
  Row,
  Cell,
  CellGroup,
  Field,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
  DropdownMenu,
  DropdownItem,
  Picker,
  ActionSheet,
  Popup,
  Form,
  Toast,
  Calendar,
  Loading,
  Dialog,
} from "vant";
import "vant/lib/index.css";
import "./rem.js";
import AudioPlayer from "@liripeng/vue-audio-player";

createApp(App)
  .use(AudioPlayer)
  //移动
  .use(Button)
  .use(Dialog)
  .use(Loading)
  .use(Calendar)
  .use(NavBar)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(RadioGroup)
  .use(Radio)
  .use(Tabs)
  .use(Tab)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Picker)
  .use(ActionSheet)
  .use(Popup)
  .use(Form)
  .use(Toast)
  //PC
  .use(ElButton)
  .use(ElSwitch)
  .use(ElTable)
  .use(ElTableColumn)
  .use(ElLink)
  .use(ElTabs)
  .use(ElTabPane)
  .use(ElSelect)
  .use(ElOption)
  .use(ElInput)
  .use(ElRadio)
  .use(ElRadioGroup)
  .use(ElImage)
  .use(ElRow)
  .use(ElCol)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElPopconfirm)
  .use(ElSlider)
  .use(ElDialog)
  .use(ElCheckbox)
  .use(ElCard)
  .use(ElBreadcrumb)
  .use(ElBreadcrumbItem)
  .use(ElPagination)
  .use(ElTag)
  .use(ElLoading)
  .use(ElAutocomplete)
  .use(ElAvatar)
  .use(ElDatePicker)
  .use(ElConfigProvider)
  .use(ElContainer)
  .use(ElAside)
  .use(ElScrollbar)
  .use(ElMenu)
  .use(ElMenuItem)
  .use(ElSubMenu)
  .use(ElHeader)
  .use(ElDropdown)
  .use(ElIcon)
  .use(ElDropdownMenu)
  .use(ElDropdownItem)
  .use(ElInputNumber)
  .use(ElUpload)
  .use(ElSelect)
  .use(ElTooltip)
  .use(router)
  .mount("#app");
