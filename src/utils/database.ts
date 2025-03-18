//基本数据 generalView/getJiaoBanContentByDate
const listdata = {
  data: {
    //总览
    ToDayGeneralView: {
      //整体情况
      OverallSituation: {
        Content: "",
        Detail: "",
      },
      //重要事件
      FocusEvent: {
        Content: "",
        Detail: "",
      },
      //领导指示
      LeaderInstruct: {
        Content: "",
        Detail: "",
      },
    },
    // 上班次情况
    //安全交班
    SecureJb: "",
    //话务交班
    HwJb: {
      //话务量
      HwQuantity: {
        Content: "",
        Detail: "",
      },
      //产品排名情况
      ProductRank: {
        Content: "",
        Detail: "",
      },
      //问题排名情况
      ProblemRank: {
        Content: "",
        Detail: "",
      },
    },
    //工单交班
    GdJb: {
      //工单总量
      GdQuantity: "",
      //受理类工单
      AcceptGd: {
        Content: "",
        Detail: "",
      },
      //管理类工单
      ManageGd: {
        Content: "",
        Detail: "",
      },
      //自动工单
      AutoGd: {
        Content: "",
        Detail: "",
      },
    },
    //升级交班
    UpgradesJb: {
      Content: "",
      Detail: "",
    },
    //巡检交班
    PatrolJb: {
      //imcc巡检
      ImccPatrol: {
        Content: "",
        Detail: "",
      },
      //井盖巡检
      LidInspection: {
        Content: "",
        Detail: "",
      },
      //视频会议
      MP4Meeting: {
        Content: "",
        Detail: "",
      },
    },
    //接待保障
    ReceptionGuarantee: {
      Content: "",
      Detail: "",
    },
    //营销交班
    MarketingJb: {
      //线索商机
      Clue: {
        Content: "",
        Detail: "",
      },
      //走访
      Interview: {
        Content: "",
        Detail: "",
      },
      //供应商
      Provision: {
        Content: "",
        Detail: "",
      },
    },
    //项目交班
    ProjectJb: {
      Content: "",
      Detail: "",
    },
    //事项清单
    LtemList: {
      //总览
      GeneralView: {
        Content: "",
        Detail: "",
      },
      //部门推进情况
      DepartmentPropel: {
        Content: "",
        Detail: "",
      },
    },
    //考核情况
    ExamineCondition: {
      Content: "",
      Detail: "",
    },
    //工作安排
    WorkArrangement: {
      //公司级检查
      CompanyInspection: {
        Content: "",
        Detail: "",
      },
    },
    //其他部门上报
    OtherDepartments: {
      Content: "",
      Detail: "",
    },
    // 下班次安排
    //未完成事件
    NoOkEvent: {
      //工单事件
      GdEvent: {
        Content: "",
        Detail: "",
      },
      //技术维保事件
      TechnologyWxEvent: {
        Content: "",
        Detail: "",
      },
    },
    //计划事件
    PlanEvent: {
      //升级工单
      UpgradesGd: {
        Content: "",
        Detail: "",
      },
      //接待保障
      ReceptionGuarantee: {
        Content: "",
        Detail: "",
      },
      //其他部门上报
      otherDepartmentReport: {
        Content: "",
        Detail: "",
      },
    },
  },
};

//generalView/getHuawuChartDataByDate 当日话务图表数据
const hwldata = {
  code: "0",
  msg: "请求成功",
  data: {
    话务交班: {
      话务量: {
        同比: {
          状态: "下降",
          量: "20",
        },
        总量: "55",
        同期基数: {
          "8.8": "4",
          "8.9": "8",
          "8.11": "10",
          "8.10": "6",
        },
        环比: {
          状态: "上涨",
          量: "20",
        },
        话务量: {
          "8.8": "2",
          "8.9": "4",
          "8.11": "5",
          "8.10": "3",
        },
      },
    },
  },
};

//General_view/to_day_gd_content 当日工单图表数据
const gddata = {
  code: "0",
  msg: "请求成功",
  data: {
    工单交班: {
      工单量: {
        同比: {
          状态: "下降",
          量: "20",
        },
        工单量: {
          受理工单: "2",
          管理工单: "4",
          自动工单: "3",
        },
        总量: "55",
        环比: {
          状态: "上涨",
          量: "20",
        },
        同期基数: {
          受理工单: "4",
          管理工单: "8",
          自动工单: "6",
        },
      },
    },
  },
};

export default {
  listdata,
};
