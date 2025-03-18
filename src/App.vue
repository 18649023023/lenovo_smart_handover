<template>
  <!-- vue3.0配置 -->
  <router-view></router-view>
</template>

<script>
// 解决 ElTable 自动宽度高度导致的「ResizeObserver loop limit exceeded」问题
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

// 检查 ResizeObserver 是否已定义
if (window.ResizeObserver) {
  const _ResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
      callback = debounce(callback, 16);
      super(callback);
    }
  };
} else {
  // 如果 ResizeObserver 未定义，可以采用其他解决方案，或者给出一个提示
  console.warn(
    "ResizeObserver is not supported in this browser. Consider using a polyfill or alternative solution."
  );
}
</script>
<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  background-color: #f1f1f1;
  box-sizing: border-box;
}

.dingtalk-main-header,
.dingtalk-main-header-inner {
  display: none !important;
}

.detailMessage {
  .el-message-box__title {
    justify-content: left !important;
    font-weight: bolder;
  }
}

.columns {
  font-size: 16px;
}

.el-message-box__btns {
  justify-content: center !important;
}

.el-message-box__message {
  p {
    white-space: pre-line;
  }
}

*,
.el-tabs__item,
.el-form-item__label {
  font-size: 16px;
}

.van-toast {
  // width: 100px !important;
  font-size: 14px;
  text-align: left !important;
}

.oparetion {
  font-size: 16px;
}

.submitbtn {
  width: 80px;
}

h2,
h3,
h4 {
  margin: 0;
}

.el-date-picker__header-label {
  position: relative;
  top: 10px !important;
}

.detailtitle {
  font-size: 18px !important;
  font-weight: bolder;
}

.today {
  .cell {
    color: #333 !important;
    font-weight: 700 !important;
  }
}

.current {
  .cell {
    // color: #409eff !important;
    color: #409eff !important;
    font-weight: 700 !important;
  }
}

.el-popconfirm__action {
  .el-button--primary {
    background-color: #409eff !important;
    border: transparent;
    padding: 10px 10px;
  }
}

.el-scrollbar__bar {
  bottom: 0 !important;
}

.el-form-item {
  margin-right: 10px !important;
  flex: 1;
  align-items: center;
}

.el-table .cell {
  line-height: inherit !important;
}

table {
  width: 100%;
}

.is-horizontal,
.is-vertical {
  display: inherit !important;
}

th {
  color: #333;
  background-color: #fff !important;
}

th,
td {
  padding: 10px !important;
  background-color: #fff;
}

.el-table-fixed-column--right,
.el-table-fixed-column--right {
  // right: -1px !important;
  background: #fff !important;
}

.el-date-table th {
  white-space: nowrap !important;
}

.el-table th.el-table__cell {
  // background-color: transparent !important;
}

.warn {
  color: rgb(0, 21, 255);
  font-size: 12px;
  padding-left: 10px;
}

.el-table__inner-wrapper::before {
  height: 0 !important;
}

.pagecontent {
  .el-input {
    width: auto;
    // height: 40px;
  }
}

.pagecontent {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;

  .el-select {
    width: auto !important;
  }

  .el-input {
    height: 40px;
    width: 60px !important;
    line-height: 40px;
  }

  .el-pagination__sizes {
    width: 120px !important;

    .el-select {
      width: 120px;
    }

    .el-input {
      width: 120px !important;
    }
  }

  .el-pager li,
  .btn-prev,
  .btn-next {
    height: 40px;
    width: 40px;
    line-height: 40px;
  }

  .el-pagination.is-background .el-pager li.is-active,
  .is-active {
    background-color: #0e5db4;
  }

  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    font-size: 14px;
  }
}
</style>
