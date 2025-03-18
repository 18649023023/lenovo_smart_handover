<template>
  <div class="page" ref="pages">
    <div
      style="
        width: 100%;
        height: 100%;
        z-index: 10;
        position: fixed;
        background-color: rgba(000, 000, 000, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      "
      v-show="loading"
    >
      <van-loading size="50" color="#7EB9F7" vertical
        ><span style="font-size: 20px">Loading...</span></van-loading
      >
    </div>
    <div style="width: 100%; position: sticky; z-index: 2; top: 0">
      <!-- 顶部 -->
      <Navbar @exit="exit" />
      <div class="navtop">
        <div class="lf">
          <el-Image
            :src="require('@/assets/Image/lian_images/logo.png')"
            class="logo"
          />
          <div class="title">智慧交班</div>
        </div>
        <!-- 早安 -->
        <div id="早安" class="morning">
          <div
            class="scrolling-text"
            v-if="formitem.start && formitem.start.welcomeLK"
          >
            {{ formitem["start"]["welcomeLK"].content }}
          </div>
        </div>
      </div>
      <!-- 日期选择 -->
      <div class="dateselectbox">
        <!-- 七日 -->
        <div class="datelists">
          <div
            class="days"
            v-for="(item, index) in datelist"
            :key="index"
            :class="{ selectdays: item === selectdate }"
            @click="changeselect(item)"
            :id="`d-${item.replace(/-/g, '')}`"
          >
            <div class="week">{{ getWeek(item) }}</div>
            <div class="date">{{ setDays(item) }}</div>
          </div>
        </div>
        <div class="dayop">
          <!-- 选择日历 -->
          <div class="dateoperation">
            <div class="calendarbox" @click="() => (showcalendar = true)">
              <div class="icon iconfont">&#xe706;</div>
              <div class="label">日历</div>
            </div>
            <div class="calendarbox1" @click="selectcalendar(todays)">
              <div class="label">返回<br />今日</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        height: 90vh;
        overflow: auto;
        display: flex;
        flex-direction: column;
      "
    >
      <!-- 导航图片 -->
      <div class="navimg">
        <img
          src="@/assets/Image/lian_images/carousel.png"
          class="carouselimg"
        />
      </div>
      <!-- 菜单区域 -->
      <!-- 一级菜单 -->
      <div class="tabmenu">
        <van-tabs
          v-model:active="tabactive"
          background="transparent"
          type="line"
          :class="`tab${
            tabactive == '总览' ? 1 : tabactive == '上班次情况' ? 2 : 3
          }`"
          @click-tab="menutabactive"
        >
          <van-tab title="总览" name="总览" title-class="tab1"> </van-tab>
          <van-tab title="上班次情况" name="上班次情况" title-class="tab2">
          </van-tab>
          <van-tab title="下班次情况" name="下班次情况" title-class="tab3">
          </van-tab>
        </van-tabs>
      </div>
      <!-- 二级菜单 -->
      <div class="tabmenu2">
        <van-tabs
          v-model:active="itemactive"
          background="transparent"
          class="tabsitem"
          title-active-color="#3656CA"
          title-inactive-color="#333333"
          scrollspy
          @click-tab="menutab"
        >
          <van-tab
            title="整体情况"
            name="整体情况"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="重要事件"
            name="重要事件"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="领导指示"
            name="领导指示"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="安全交班"
            name="安全交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="话务交班"
            name="话务交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="工单交班"
            name="工单交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="升级交班"
            name="升级交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="巡检交班"
            name="巡检交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="接待保障"
            name="接待保障"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="营销交班"
            name="营销交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="项目交班"
            name="项目交班"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="事项清单"
            name="事项清单"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="考核情况"
            name="考核情况"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="工作安排"
            name="工作安排"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="其它部门上报"
            name="其它部门上报"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="未完成事件"
            name="未完成事件"
            title-class="tab4"
          ></van-tab>
          <van-tab
            title="计划事件"
            name="计划事件"
            title-class="tab4"
          ></van-tab>
        </van-tabs>
      </div>
      <!-- 内容 -->
      <div
        class="content"
        @touchstart="onTouchStart"
        @scroll="onScroll"
        ref="scrollContainer"
        style="position: relative"
      >
        <!-- 总览 -->
        <!-- 一级标题标志 -->
        <div id="整体情况" ref="整体情况" parent="总览" class="parenttitle">
          总览
        </div>
        <div id="整体情况" ref="整体情况" parent="总览" class="tabsitems">
          <!-- 跳转详情 -->
          <div
            v-if="formitem.ToDayGeneralView.OverallSituation.Content"
            class="righttopimg"
            @click="
              opendetail('整体情况', {
                ONEMENU: '当日总览',
                TWOMENU: '公司运转情况',
                THREEMENU: '运转情况',
              })
            "
          >
            <span class="icon iconfont edit">&#xe73b;</span>
          </div>
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-07.png"
              class="titleimg"
            />
            <span>一、整体情况</span>
          </div>
          <div class="dataitem">
            {{
              formitem.ToDayGeneralView.OverallSituation.Content
                ? formitem.ToDayGeneralView.OverallSituation.Content
                : nodata
            }}
          </div>
        </div>
        <div id="重要事件" ref="重要事件" parent="总览" class="tabsitems">
          <!-- 跳转详情 -->
          <div
            v-if="formitem.ToDayGeneralView.FocusEvent.Content"
            class="righttopimg"
            @click="
              opendetail('重要事件', {
                ONEMENU: '当日总览',
                TWOMENU: '重要事件',
                THREEMENU: '话务',
              })
            "
          >
            <span class="icon iconfont edit">&#xe73b;</span>
          </div>
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-09.png"
              class="titleimg"
            />
            <span>二、重要事件</span>
          </div>
          <div class="dataitem">
            {{
              formitem.ToDayGeneralView.FocusEvent.Content
                ? formitem.ToDayGeneralView.FocusEvent.Content
                : nodata
            }}
          </div>
        </div>
        <div id="领导指示" ref="领导指示" parent="总览" class="tabsitems">
          <!-- 跳转详情 -->
          <div
            class="righttopimg"
            v-if="formitem.ToDayGeneralView.LeaderInstruct.Content"
            @click="
              opendetail('领导指示', {
                ONEMENU: '当日总览',
                TWOMENU: '领导指示',
                THREEMENU: '所有指示内容',
              })
            "
          >
            <span class="icon iconfont edit">&#xe73b;</span>
          </div>
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-11.png"
              class="titleimg"
            />
            <span>三、领导指示</span>
          </div>
          <div class="dataitem">
            {{
              formitem.ToDayGeneralView.LeaderInstruct.Content
                ? formitem.ToDayGeneralView.LeaderInstruct.Content
                : nodata
            }}
          </div>
        </div>

        <!-- 上班次情况 -->
        <!-- 一级标题标志 -->
        <div id="安全交班" parent="上班次情况" class="parenttitle">
          上班次情况
        </div>
        <div id="安全交班" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-13.png"
              class="titleimg"
            />
            <span>一、安全交班</span>
          </div>
          <div v-if="formitem.SecureJb.Content">
            <div
              class="dataitem"
              v-for="(item, index) in formitem.SecureJb.Content.split('。')"
              :key="index"
              v-show="item"
            >
              {{ item }}。
            </div>
          </div>
        </div>
        <!-- 话务交班 -->
        <div id="话务交班" parent="上班次情况" class="tabsitems">
          <div>
            <div class="tabtitle">
              <img
                src="@/assets/Image/lian_images/未标题-1_03-15.png"
                class="titleimg"
              />
              <span>二、话务交班</span>
            </div>
          </div>
        </div>
        <div id="话务交班" parent="上班次情况" class="tabsitems">
          <div class="dataitem">
            <div class="itemtitle">1、话务量</div>
            <div v-show="HWSUM">
              上班次呼入话务总量{{ HWSUM }}通。环比{{ HBSTATUS1
              }}{{ HBDATA1 }}通。同比{{ TBSTATUS1 }}{{ TBDATA1 }}通
              <div style="width: 100%; height: 20vh" ref="hwchart"></div>
            </div>
            <img
              v-if="!HWSUM && !HWMSG"
              src="@/assets/Image/lian_images/chartsloading.gif"
              class="chartsloading"
            />
            <div v-else-if="!HWSUM && HWMSG">
              {{ HWMSG }}
            </div>
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div class="link" v-if="formitem.HwJb.ProductRank.Content">
              <span
                class="icon iconfont edit"
                @click="
                  opendetail('产品排名情况', {
                    ONEMENU: '话务交班',
                    TWOMENU: '话务排名',
                    THREEMENU: '产品排名',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle">2、产品排名情况</div>
            {{
              formitem.HwJb.ProductRank.Content
                ? formitem.HwJb.ProductRank.Content
                : nodata
            }}
          </div>
          <div class="dataitem problem">
            <!-- 跳转详情 -->
            <div class="link" v-if="formitem.HwJb.ProblemRank.Content">
              <span
                class="icon iconfont edit"
                @click="
                  opendetail('问题排名情况', {
                    ONEMENU: '话务交班',
                    TWOMENU: '话务排名',
                    THREEMENU: '问题排名',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle">3、问题排名情况</div>
            {{
              formitem.HwJb.ProblemRank.Content
                ? formitem.HwJb.ProblemRank.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 工单交班 -->
        <div id="工单交班" parent="上班次情况" class="tabsitems">
          <div>
            <div class="tabtitle">
              <img
                src="@/assets/Image/lian_images/未标题-1_03-17.png"
                class="titleimg"
              />
              <span>三、工单交班</span>
            </div>
          </div>
        </div>
        <div id="工单交班" parent="上班次情况" class="tabsitems">
          <div class="dataitem">
            <div class="itemtitle">1、工单量</div>
            <div v-if="GDSUM">
              上班次下发工单总量{{ GDSUM }}单。环比{{ HBDATA.split("-")[0]
              }}{{ HBDATA.split("-")[1] }}单。同比{{ TBDATA.split("-")[0]
              }}{{ TBDATA.split("-")[1] }}单
              <div style="width: 100%; height: 20vh" ref="gdchart"></div>
            </div>
            <img
              v-else-if="!GDSUM && !GDMSG"
              src="@/assets/Image/lian_images/chartsloading.gif"
              class="chartsloading"
            />
            <div v-else>
              {{ GDMSG }}
            </div>
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div class="link" v-if="formitem.GdJb.AcceptGd.Content">
              <span
                class="icon iconfont edit"
                @click="
                  opendetail('受理类工单', {
                    ONEMENU: '工单交班',
                    TWOMENU: '受理工单',
                    THREEMENU: '工单量',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle">2、受理类工单</div>
            {{
              formitem.GdJb.AcceptGd.Content
                ? formitem.GdJb.AcceptGd.Content
                : nodata
            }}
          </div>
          <div class="dataitem problem">
            <!-- 跳转详情 -->
            <div class="link" v-if="formitem.GdJb.ManageGd.Content">
              <span
                class="icon iconfont edit"
                @click="
                  opendetail('管理类工单', {
                    ONEMENU: '工单交班',
                    TWOMENU: '管理类工单',
                    THREEMENU: '工单量',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle">3、管理类工单</div>
            {{
              formitem.GdJb.ManageGd.Content
                ? formitem.GdJb.ManageGd.Content
                : nodata
            }}
          </div>
          <div class="dataitem problem">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.GdJb.AutoGd.Content"
              class="links"
              @click="
                opendetail('自动工单', {
                  ONEMENU: '',
                  TWOMENU: '',
                  THREEMENU: '',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">4、自动工单</div>
            {{
              formitem.GdJb.AutoGd.Content
                ? formitem.GdJb.AutoGd.Content
                : nodata
            }}
          </div>
        </div>
        <!--升级交班 -->
        <div id="升级交班" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-19.png"
              class="titleimg"
            />
            <span>四、升级交班</span>
          </div>
          <div class="dataitem">
            {{
              formitem.UpgradesJb.Content ? formitem.UpgradesJb.Content : nodata
            }}
          </div>
        </div>
        <!-- 巡检交班 -->
        <div id="巡检交班" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-21.png"
              class="titleimg"
            />
            <span>五、巡检交班</span>
          </div>
          <div class="dataitem">
            <van-row>
              <!-- IMCC巡检 -->
              <van-col :span="24" class="xjlist">
                <span
                  class="icon iconfont xjlink edit"
                  v-if="formitem.PatrolJb.ImccPatrol.Content"
                  @click="
                    opendetail('IMCC巡检', {
                      ONEMENU: '巡检',
                      TWOMENU: 'IMCC巡检',
                      THREEMENU: 'IMCC巡检',
                    })
                  "
                >
                  &#xe73b;
                </span>
                <!-- <div class="mark"></div> -->
                <div class="key">IMCC巡检</div>
                <div class="val">
                  {{
                    formitem.PatrolJb.ImccPatrol.Content
                      ? formitem.PatrolJb.ImccPatrol.Content
                      : nodata
                  }}
                </div>
              </van-col>
              <!-- 井盖巡检 -->
              <van-col :span="24" class="xjlist">
                <span
                  v-if="formitem.PatrolJb.LidInspection.Content"
                  class="icon iconfont xjlink edit"
                  @click="
                    opendetail('井盖巡检', {
                      ONEMENU: '巡检',
                      TWOMENU: '井盖巡检',
                      THREEMENU: '井盖巡检',
                    })
                  "
                >
                  &#xe73b;
                </span>
                <!-- <div class="mark"></div> -->
                <div class="key">井盖巡检</div>
                <div class="val">
                  {{
                    formitem.PatrolJb.LidInspection.Content
                      ? formitem.PatrolJb.LidInspection.Content
                      : nodata
                  }}
                </div>
              </van-col>
              <!-- 视频会议 -->
              <van-col :span="24" class="xjlist">
                <span
                  v-if="formitem.PatrolJb.MP4Meeting.Content"
                  class="icon iconfont xjlink edit"
                  @click="
                    opendetail('视频会议', {
                      ONEMENU: '巡检',
                      TWOMENU: '视频会议',
                      THREEMENU: '视频会议',
                    })
                  "
                >
                  &#xe73b;
                </span>
                <!-- <div class="mark"></div> -->
                <div class="key">视频会议</div>
                <div class="val">
                  {{
                    formitem.PatrolJb.MP4Meeting.Content
                      ? formitem.PatrolJb.MP4Meeting.Content
                      : nodata
                  }}
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <!-- 接待保障 -->
        <div id="接待保障" parent="上班次情况" class="tabsitems">
          <!-- 跳转详情 -->
          <div
            v-if="formitem.ReceptionGuarantee.Content"
            class="link"
            @click="
              opendetail('接待保障', {
                ONEMENU: '接待保障',
                TWOMENU: '接待保障',
                THREEMENU: '接待保障',
              })
            "
          >
            <span class="icon iconfont edit">&#xe73b;</span>
          </div>
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-23.png"
              class="titleimg"
            />
            <span>六、接待保障</span>
          </div>
          <div class="dataitem">
            {{
              formitem.ReceptionGuarantee.Content
                ? formitem.ReceptionGuarantee.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 营销交班 -->
        <div id="营销交班" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-25.png"
              class="titleimg"
            />
            <span>七、营销交班</span>
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.MarketingJb.Clue.Content"
              class="link"
              @click="
                opendetail('线索商机', {
                  ONEMENU: '营销交班',
                  TWOMENU: '线索商机',
                  THREEMENU: '新增线索商机',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">1、线索商机</div>
            {{
              formitem.MarketingJb.Clue.Content
                ? formitem.MarketingJb.Clue.Content
                : nodata
            }}
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.MarketingJb.Interview.Content"
              class="link"
              @click="
                opendetail('走访', {
                  ONEMENU: '营销交班',
                  TWOMENU: '走访',
                  THREEMENU: '总体',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">2、走访</div>
            {{
              formitem.MarketingJb.Interview.Content
                ? formitem.MarketingJb.Interview.Content
                : nodata
            }}
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div class="link">
              <span
                v-if="formitem.MarketingJb.Provision.Content"
                class="icon iconfont edit"
                @click="
                  opendetail('供应商', {
                    ONEMENU: '营销交班',
                    TWOMENU: '供应商',
                    THREEMENU: '供应商',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle">3、供应商</div>
            {{
              formitem.MarketingJb.Provision.Content
                ? formitem.MarketingJb.Provision.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 项目交班 -->
        <div id="项目交班" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-27.png"
              class="titleimg"
            />
            <span>八、项目交班</span>
          </div>
          <div class="dataitem">
            {{
              formitem.ProjectJb.Content ? formitem.ProjectJb.Content : nodata
            }}
          </div>
        </div>
        <!-- 事项清单 -->
        <div id="事项清单" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-29.png"
              class="titleimg"
            />
            <span>九、事项清单</span>
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div class="link">
              <span
                v-if="formitem.LtemList.GeneralView.Content"
                class="icon iconfont edit"
                @click="
                  opendetail('总览', {
                    ONEMENU: '清单',
                    TWOMENU: '总览',
                    THREEMENU: '总览',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle keyzl">1、总览</div>
            {{
              formitem.LtemList.GeneralView.Content
                ? formitem.LtemList.GeneralView.Content
                : nodata
            }}
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div class="link">
              <span
                v-if="formitem.LtemList.DepartmentPropel.Content"
                class="icon iconfont edit"
                @click="
                  opendetail('部门推进情况', {
                    ONEMENU: '清单',
                    TWOMENU: '其他部门推进情况',
                    THREEMENU: '其他部门推进情况',
                  })
                "
                >&#xe73b;</span
              >
            </div>
            <div class="itemtitle keybm">2、部门推进情况</div>
            {{
              formitem.LtemList.DepartmentPropel.Content
                ? formitem.LtemList.DepartmentPropel.Content.replace(/\s/g, "")
                : nodata
            }}
          </div>
        </div>
        <!-- 考核情况 -->
        <div id="考核情况" parent="上班次情况" class="tabsitems">
          <!-- 跳转详情 -->
          <div
            v-if="formitem.ExamineCondition.Content"
            class="link"
            @click="
              opendetail('考核情况', {
                ONEMENU: '考核情况',
                TWOMENU: '上昼夜考核情况',
                THREEMENU: '上昼夜+本周',
              })
            "
          >
            <span class="icon iconfont edit">&#xe73b;</span>
          </div>
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-31.png"
              class="titleimg"
            />
            <span>十、考核情况</span>
          </div>
          <div class="dataitem">
            {{
              formitem.ExamineCondition.Content
                ? formitem.ExamineCondition.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 工作安排 -->
        <div id="工作安排" parent="上班次情况" class="tabsitems">
          <!-- 跳转详情 -->
          <div
            v-if="formitem.WorkArrangement.CompanyInspection.Content"
            class="link"
            @click="
              opendetail('工作安排', {
                ONEMENU: '工作安排',
                TWOMENU: '公司级检查',
                THREEMENU: '公司级检查',
              })
            "
          >
            <span class="icon iconfont edit">&#xe73b;</span>
          </div>
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-33.png"
              class="titleimg"
            />
            <span>十一、工作安排</span>
          </div>
          <div class="dataitem">
            {{
              formitem.WorkArrangement.CompanyInspection.Content
                ? formitem.WorkArrangement.CompanyInspection.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 其它部门上报 -->
        <div id="其它部门上报" parent="上班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-35.png"
              class="titleimg"
            />
            <span>十二、其它部门上报</span>
          </div>
          <div class="dataitem">
            {{
              formitem.OtherDepartments.Content
                ? formitem.OtherDepartments.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 下班次情况 -->
        <!-- 一级标题标志 -->
        <div id="未完成事件" parent="下班次情况" class="parenttitle">
          下班次情况
        </div>
        <!-- 未完成事件 -->
        <div id="未完成事件" parent="下班次情况" class="tabsitems">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-52.png"
              class="titleimg"
            />
            <span>一、未完成事件</span>
          </div>
          <div class="dataitem pre">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.NoOkEvent.GdEvent.Content"
              class="link"
              @click="
                opendetail('工单未完成事件', {
                  ONEMENU: '',
                  TWOMENU: '',
                  THREEMENU: '',
                  Detail:
                    formitem.NoOkEvent.GdEvent.Content +
                    formitem.NoOkEvent.GdEvent.GdEventpf_Detail +
                    formitem.NoOkEvent.GdEvent.GdEventdcz_Detail +
                    formitem.NoOkEvent.GdEvent.GdEventczz_Detail +
                    formitem.NoOkEvent.GdEvent.GdEventpf_Detail,
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">1、工单未完成事件</div>
            {{
              formitem.NoOkEvent.GdEvent.Content
                ? formitem.NoOkEvent.GdEvent.Content
                : nodata
            }}
            <!-- 工单详细 -->
            <div class="detail pre">
              <div v-if="formitem.NoOkEvent.GdEvent.Content">
                <div class="panel">
                  <!-- 工单派发 -->
                  <div
                    class="pitem"
                    v-if="
                      formitem.NoOkEvent.GdEvent.GdEventpf_Content &&
                      formitem.NoOkEvent.GdEvent.GdEventpf_Content !==
                        '暂无数据'
                    "
                  >
                    <!-- 标题 -->
                    <div
                      class="title"
                      v-if="
                        formitem.NoOkEvent.GdEvent.GdEventpf_Content.split(
                          '\n'
                        )[1]
                      "
                    >
                      {{
                        formitem.NoOkEvent.GdEvent.GdEventpf_Content.split(
                          "\n"
                        )[1]
                      }}
                    </div>
                    <!-- 列 -->
                    <div
                      class="val1"
                      v-for="(
                        l, i
                      ) in formitem.NoOkEvent.GdEvent.GdEventpf_Content.split(
                        '\n'
                      )"
                      :key="i"
                      v-show="l && i > 1"
                    >
                      <div>
                        <img src="@/assets/Image/lian_images/联想切图_45.png" />
                        {{ l }}
                      </div>
                    </div>
                  </div>
                  <!-- 待处置 -->
                  <div
                    class="pitem"
                    v-if="
                      formitem.NoOkEvent.GdEvent.GdEventdcz_Content &&
                      formitem.NoOkEvent.GdEvent.GdEventdcz_Content !==
                        '暂无数据'
                    "
                  >
                    <!-- 标题 -->
                    <div
                      class="title"
                      v-show="
                        formitem.NoOkEvent.GdEvent.GdEventdcz_Content.split(
                          '\n'
                        )[1]
                      "
                    >
                      {{
                        formitem.NoOkEvent.GdEvent.GdEventdcz_Content.split(
                          "\n"
                        )[1]
                      }}
                    </div>
                    <!-- 列 -->
                    <div
                      class="val1"
                      v-for="(
                        l, i
                      ) in formitem.NoOkEvent.GdEvent.GdEventdcz_Content.split(
                        '\n'
                      )"
                      :key="i"
                      v-show="i > 1"
                    >
                      <div>
                        <img src="@/assets/Image/lian_images/联想切图_45.png" />
                        {{ l }}
                      </div>
                    </div>
                  </div>
                  <!-- 处置中 -->
                  <div
                    class="pitem"
                    v-if="
                      formitem.NoOkEvent.GdEvent.GdEventczz_Content &&
                      formitem.NoOkEvent.GdEvent.GdEventczz_Content !==
                        '暂无数据'
                    "
                  >
                    <!-- 标题 -->
                    <div
                      class="title"
                      v-show="
                        formitem.NoOkEvent.GdEvent.GdEventczz_Content.split(
                          '\n'
                        )[1]
                      "
                    >
                      {{
                        formitem.NoOkEvent.GdEvent.GdEventczz_Content.split(
                          "\n"
                        )[1]
                      }}
                    </div>
                    <!-- 列 -->
                    <div
                      class="val1"
                      v-for="(
                        l, i
                      ) in formitem.NoOkEvent.GdEvent.GdEventczz_Content.split(
                        '\n'
                      )"
                      :key="i"
                      v-show="i > 1"
                    >
                      <div>
                        <img src="@/assets/Image/lian_images/联想切图_45.png" />
                        {{ l }}
                      </div>
                    </div>
                  </div>
                  <!-- 挂起 -->
                  <div
                    class="pitem"
                    v-if="
                      formitem.NoOkEvent.GdEvent.GdEventgq_Content &&
                      formitem.NoOkEvent.GdEvent.GdEventgq_Content !==
                        '暂无数据'
                    "
                  >
                    <!-- 标题 -->
                    <div
                      class="title"
                      v-show="
                        formitem.NoOkEvent.GdEvent.GdEventgq_Content.split(
                          '\n'
                        )[1]
                      "
                    >
                      {{
                        formitem.NoOkEvent.GdEvent.GdEventgq_Content.split(
                          "\n"
                        )[1]
                      }}
                    </div>
                    <!-- 列 -->
                    <div
                      class="val1"
                      v-for="(
                        l, i
                      ) in formitem.NoOkEvent.GdEvent.GdEventgq_Content.split(
                        '\n'
                      )"
                      :key="i"
                      v-show="i > 1"
                    >
                      <div>
                        <img src="@/assets/Image/lian_images/联想切图_45.png" />
                        {{ l }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 以上完成 -->
                <div style="text-align: center">
                  {{ formitem.NoOkEvent.GdEvent.Content.split("\r")[1] }}
                </div>
              </div>
              <div v-else>暂无数据！</div>
            </div>
          </div>
          <div class="dataitem pre">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.NoOkEvent.TechnologyWxEvent.Content"
              class="link"
              @click="
                opendetail('技术维保事件', {
                  ONEMENU: '未完成事件',
                  TWOMENU: '技术维保未完成事件',
                  THREEMENU: '技术维保进行中',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">2、技术维保事件</div>
            {{
              formitem.NoOkEvent.TechnologyWxEvent.Content
                ? formitem.NoOkEvent.TechnologyWxEvent.Content
                : nodata
            }}
          </div>
        </div>
        <!-- 计划事件 -->
        <div id="计划事件" parent="下班次情况" class="tabsitems" style="margin-bottom: 100px;">
          <div class="tabtitle">
            <img
              src="@/assets/Image/lian_images/未标题-1_03-53.png"
              class="titleimg"
            />
            <span>二、计划事件</span>
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.PlanEvent.UpgradesGd.Content"
              class="link"
              @click="
                opendetail('升级工单', {
                  ONEMENU: '计划事件',
                  TWOMENU: '升级工单',
                  THREEMENU: '升级工单',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">1、升级工单</div>
            {{
              formitem.PlanEvent.UpgradesGd.Content
                ? formitem.PlanEvent.UpgradesGd.Content
                : nodata
            }}
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.PlanEvent.ReceptionGuarantee.Content"
              class="link"
              @click="
                opendetail('接待保障', {
                  ONEMENU: '计划事件',
                  TWOMENU: '接待保障',
                  THREEMENU: '接待保障',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">2、接待保障</div>
            {{
              formitem.PlanEvent.ReceptionGuarantee.Content
                ? formitem.PlanEvent.ReceptionGuarantee.Content
                : nodata
            }}
          </div>
          <div class="dataitem">
            <!-- 跳转详情 -->
            <div
              v-if="formitem.PlanEvent.otherDepartmentReport.Content"
              class="link"
              @click="
                opendetail('其他部门上报', {
                  ONEMENU: '计划事件',
                  TWOMENU: '其他部门上报',
                  THREEMENU: '其他部门上报',
                })
              "
            >
              <span class="icon iconfont edit">&#xe73b;</span>
            </div>
            <div class="itemtitle">3、其他部门上报</div>
            {{
              formitem.PlanEvent.otherDepartmentReport.Content
                ? formitem.PlanEvent.otherDepartmentReport.Content
                : nodata
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="heights"></div>

    <!-- 播放栏 -->
    <div class="audiofooter">
      <!-- <audioPlayer /> -->
      <vue-audio-player
        class="audio-player-style"
        ref="audioPlayer"
        :audio-list="menuaudiolist"
        :show-play-button="false"
        :show-prev-button="false"
        :show-next-button="false"
        :show-playback-rate="false"
        :show-volume-button="false"
        theme-color="#409eff"
      >
      </vue-audio-player>
      <!-- <audio
        controls="controls"
        ref="audioElement"
        autobuffer="autobuffer"
        controlsList="nodownload noplaybackrate noplay"
      >
        <source :src="audiourl" />
      </audio> -->
      <div class="playlist">
        <!-- 播放列表 -->
        <span class="icon iconfont list" @click="() => (audiolistshow = true)"
          >&#xea82;</span
        >

        <!-- 播放按钮 -->
        <span class="playeven">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="重新请求语音信息"
            placement="top-start"
          >
            <span class="icon iconfont refresh" @click="getVoiceContentText"
              >&#xe620;</span
            >
          </el-tooltip>
          <!-- 上一个 -->
          <!-- <span
            class="icon iconfont"
            :class="{ disabled: selectindex < 1 || !audiourl }"
            :disabled="selectindex < 1 || !audiourl"
            @click="forwardbtn"
            >&#xeb15;</span
          > -->
          <span v-if="audiourl">
            <!-- 播放/暂停 -->
            <span class="icon iconfont playbtn" v-if="!isplay" @click="playbtn"
              >&#xe87c;</span
            >
            <span class="icon iconfont playbtn" v-else @click="playbtn"
              >&#xe616;</span
            >
          </span>
          <!-- 无播放 -->
          <span class="icon iconfont playbtnno" v-else>&#xe87c;</span>
          <!-- 下一个 -->
          <!-- <span
            class="icon iconfont"
            :disabled="selectindex == menuaudiolist.length || !audiourl"
            :class="{
              disabled: selectindex == menuaudiolist.length || !audiourl,
            }"
            @click="nextbtn"
            >&#xeb14;</span
          > -->
        </span>
      </div>
    </div>

    <van-action-sheet v-model:show="audiolistshow" title="播放列表">
      <div
        v-for="(item, index) in menuaudiolist"
        :key="index"
        :class="{ isactive: qaselectindex === item.name }"
        @click="playaudio(item)"
        class="audiolist"
      >
        <span class="title">{{ item.name }}</span>
        <span v-if="IsVolumn" style="position: relative; flex: 1">
          <span v-if="item.url" class="icon iconfont icons">&#xe67c;</span>
          <span v-else style="position: relative">
            <img
              src="@/assets/Image/lian_images/loading.gif"
              class="loadinggif"
            />
          </span>
        </span>
        <span v-else style="position: relative; flex: 1">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="msgerr + '，请联系管理员'"
            placement="top-start"
          >
            <span class="icon iconfont warnmsg">&#xe60e;</span>
          </el-tooltip>
        </span>
      </div>
    </van-action-sheet>

    <van-calendar
      v-model:show="showcalendar"
      :default-date="defaultStartDate"
      :min-date="new Date(1990, 1, 1)"
      :max-date="new Date()"
      :show-confirm="false"
      @select="selectcalendar"
    />
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref, nextTick } from "vue";
import { showDialog } from "vant";
import database from "@/utils/database.ts";
import * as echarts from "echarts";
import url from "@/http/url";
import http from "@/http";
import TTSRecorder from "@/utils/TTSRecorder.js";
import { showSuccessToast, showToast } from "vant";
import Navbar from "@/components/mobileNavbar.vue";
import audioPlayer from "@/components/audioPlayer.vue";
import * as dd from "dingtalk-jsapi";
import mobileNavbarVue from "@/components/mobileNavbar.vue";

export default {
  components: {
    Navbar,
    audioPlayer,
  },
  setup() {
    const ttsRecorder = new TTSRecorder();
    const { tokenURL } = url;
    const { listdata } = database;
    const scrollContainer = ref(null);
    const audioElement = ref(null);
    const sectionRefs = ref([]); // 存储所有子节点的引用
    const hwchart = ref(null);
    const gdchart = ref(null);
    const loading = ref(false);
    const pages = ref(null);
    const data = reactive({
      HWMSG: "",
      GDMSG: "",
      IsVolumn: true,
      GDSUM: "", //工单总量
      HBDATA: "", //工单环比值
      TBDATA: "", //工单同比值
      HBSTATUS: "", //工单环比状态
      TBSTATUS: "", //工单同比状态
      HWSUM: "", //话务总量
      HBSTATUS1: "", //话务环比状态
      TBSTATUS1: "", //话务同比状态
      HBDATA1: "", //话务环比值
      TBDATA1: "", //话务同比值
      nodata: "",
      isplay: false,
      audiolistshow: false,
      qaselectindex: null,
      selectindex: null,
      tabactive: null,
      itemactive: null,
      defaultStartDate: new Date(),
      datelist: [],
      selectdate: null,
      showcalendar: false,
      maxDate: null,
      minDate: new Date(2000, 1, 1),
      formitem: { ...listdata.data },
      chardata1: [],
      chardata2: [],
      hwXArea: [],
      chardata3: [],
      chardata4: [],
      gdXArea: ["受理类工单", "管理类工单", "自动工单"],
      menuaudiolist: [
        { name: "早安", url: "", content: "" },
        { name: "整体情况", url: "", content: "" },
        { name: "重要事件", url: "", content: "" },
        { name: "领导指示", url: "", content: "" },
        { name: "安全交班", url: "", content: "" },
        { name: "话务交班", url: "", content: "" },
        { name: "工单交班", url: "", content: "" },
        { name: "升级交班", url: "", content: "" },
        { name: "巡检交班", url: "", content: "" },
        { name: "接待保障", url: "", content: "" },
        { name: "营销交班", url: "", content: "" },
        { name: "项目交班", url: "", content: "" },
        { name: "事项清单", url: "", content: "" },
        { name: "考核情况", url: "", content: "" },
        { name: "工作安排", url: "", content: "" },
        { name: "其它部门上报", url: "", content: "" },
        { name: "未完成事件", url: "", content: "" },
        { name: "计划事件", url: "", content: "" },
      ],
      audiourl: "",
      selectname: null,
      parentisactive: false,
      todays: null,
      isScroll: false,
      token: null,
    });
    let hwCharts = null,
      gdCharts = null;
    onMounted(() => {
      dd.biz.navigation.hideBar({
        hidden: true, // true：隐藏，false：显示
        onSuccess: function (result) {
          console.log(result, "result");
        },
        onFail: function (err) {
          console.log(err, "err");
        },
      });
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

      data.maxDate = new Date(year, month, day);
      data.todays = `${year}-${month}-${day}`;
      data.selectdate = `${year}-${month}-${day}`;

      data.selectname = Object.assign({}, { ...data.menuaudiolist[0] });

      getDayList(data.selectdate);
      playaudiostatus();
      // hwchartbox();
      // gdchartbox();
      getGDChartData();
    });

    const handleBeforePlay = (next) => {};

    const refreshToken = () => {
      return new Promise((resolve, reject) => {
        http
          .post("OAuth2/accessToken", {
            // .post(tokenURL, {
            appKey: "LKRPC01",
            appSecret: "IIxbtPWazRSDRMpzpbDWxDwdTqaelOhc",
          })
          .then((res) => {
            console.log("刷新token", res);
            return resolve(res.content.accessToken);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    };

    //获取工单图表相关数据接口
    const getGDChartData = async () => {
      data.nodata = "";
      data.GDMSG = "";
      loading.value = true;

      let dates = new Date(data.selectdate);
      let year = dates.getFullYear();
      let month =
        dates.getMonth() + 1 > 9
          ? dates.getMonth() + 1
          : "0" + (dates.getMonth() + 1);
      let day = dates.getDate() > 9 ? dates.getDate() : "0" + dates.getDate();
      data.selectdate = `${year}-${month}-${day}`;

      await refreshToken().then((r) => {
        data.token = r;
      });

      await getHWChartData();
      await getContentByDate();

      await http
        .get(`FWDApex/znjbNew/getGDChartData?pdate=${data.selectdate}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          withCredentials: false,
        })
        .then((res) => {
          const { GDSUM, HBDATA, TBDATA } = res.data;
          const { SLGDSUM, GLGDSUM, ZDGDSUM } = res.data.GD;
          const { SLGDJS, GLGDJS, ZDGDJS } = res.data.JS;
          data.chardata3 = [SLGDSUM, GLGDSUM, ZDGDSUM];
          data.chardata4 = [SLGDJS, GLGDJS, ZDGDJS];

          data.GDSUM = GDSUM;
          data.HBDATA = HBDATA;
          data.TBDATA = TBDATA;

          if (res && res.code == "2") {
            data.GDMSG = "接口返回错误，请联系管理员";
          }
        })
        .then(() => {
          gdchartbox();
        })
        .catch((err) => {
          data.GDMSG = "接口返回错误，请联系管理员";
        });

      await getVoiceContentText();
    };

    //获取话务图表相关数据接口
    const getHWChartData = async () => {
      data.HWMSG = "";
      http
        .get(`FWDApex/znjbNew/getHWChartData?pdate=${data.selectdate}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          withCredentials: false,
        })
        .then((res) => {
          console.log("话务图表", res.data);
          let arr = JSON.parse(
            res.data.HWCHARTDATA.replace(/\\/g, "")
          ).reverse();
          const { HBDOWN, HBSTATUS, HBUP } = res.data.HB;
          const { TBDOWN, TBSTATUS, TBUP } = res.data.TB;

          if (res && res.code == "2") {
            data.HWMSG = "接口返回错误，请联系管理员";
          }

          data.HWSUM = res.data.HWSUM;
          data.HBSTATUS1 = HBSTATUS;
          data.TBSTATUS1 = TBSTATUS;
          //同比
          data.TBDATA1 = TBSTATUS == "上涨" ? TBUP : TBDOWN;
          //环比
          data.HBDATA1 = HBSTATUS == "上涨" ? HBUP : HBDOWN;

          data.hwXArea = [];
          data.chardata1 = [];
          data.chardata2 = [];
          arr.forEach((item) => {
            data.hwXArea.push(item.hours);
            data.chardata1.push(item.HWSUM);
            data.chardata2.push(item.HWJS);
          });
          hwchartbox();
        })
        .catch((err) => {
          data.HWMSG = "接口返回错误，请联系管理员";
        });
    };

    //获取接口
    const getContentByDate = async () => {
      await http
        .get(`FWDApex/znjbNew/getContentByDate?pdate=${data.selectdate}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          withCredentials: false,
        })
        .then((res) => {
          console.log("数据返回", res.data);

          data.formitem = Object.assign(
            {},
            { ...data.formitem },
            { ...res.data }
          );

          data.nodata = "暂无数据！";
        })
        .catch((err) => {
          data.nodata = "暂无数据！";
        });
    };

    //开启监测音频
    const playaudiostatus = () => {
      audioElement.value.addEventListener("ended", onAudioEnded);
    };

    const getDayList = (days) => {
      // 获取今天的日期
      let today = new Date(days);

      // 创建一个空数组，用于存储过去六天的日期
      const pastSixDays = [];

      // 向数组中添加过去六天的日期
      for (let i = 0; i <= 30; i++) {
        // 创建一个新的日期对象，表示i天前的日期
        const pastDate = new Date(today);
        // 减去i天
        pastDate.setDate(today.getDate() - i);
        // 提取年月日
        const yearMonthDay = pastDate.toISOString().split("T")[0];
        // 将日期添加到数组中
        pastSixDays.push(yearMonthDay);
        // 获取所有的日期
        data.datelist = [...pastSixDays];
      }
    };

    //映射周期
    const getWeek = (w) => {
      let date = new Date(w);
      let week = date.getDay();
      let res = "";

      switch (week) {
        case 1:
          res = "周一";
          break;
        case 2:
          res = "周二";
          break;
        case 3:
          res = "周三";
          break;
        case 4:
          res = "周四";
          break;
        case 5:
          res = "周五";
          break;
        case 6:
          res = "周六";
          break;
        case 7:
          res = "周日";
          break;
        case 0:
          res = "周日";
          break;
      }

      return res;
    };

    const setDays = (d) => {
      let month = d.substring(d.indexOf("-") + 1, d.lastIndexOf("-"));
      let day = d.substring(d.lastIndexOf("-") + 1);
      return `${month}.${day}`;
    };

    //选择日期
    const changeselect = (d) => {
      data.selectdate = d;
      data.defaultStartDate = new Date(d);
      data.qaselectindex = null;
      data.audiourl = null;
      audioElement.value.load();
      getGDChartData();
    };

    //选择日历
    const selectcalendar = (value) => {
      let date = new Date(value);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      data.selectdate = `${year}-${month}-${day}`;
      if (!data.datelist.includes(data.selectdate)) {
        getDayList(data.selectdate);
        setTimeout(() => {
          handleSelect(data.selectdate);
        }, 500);
      } else {
        setTimeout(() => {
          handleSelect(data.selectdate);
        }, 200);
      }
      data.showcalendar = false;
      getGDChartData();
    };

    //点击菜单切换
    const handleSelect = (selectdate) => {
      let id = selectdate.replace(/-/g, "");
      const element = document.getElementById(`d-${id}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    };

    let beforeScrollTop = 0;

    const onScroll = () => {
      data.isScroll = true;
      const parentScrollTop = scrollContainer.value.scrollTop;
      console.log(parentScrollTop);

      //子节点滚动定位
      for (let section of scrollContainer.value.children) {
        if (section) {
          const childOffsetTop = section.offsetTop;

          //检查子节点是否完全出现在父容器的视口中;
          if (
            parentScrollTop >= childOffsetTop &&
            parentScrollTop < childOffsetTop + section.offsetHeight
          ) {
            data.itemactive = getElementAttributes(section).id;
            if (data.parentisactive == false) {
              data.tabactive = getElementAttributes(section).parent;
            }
          }
        }
      }
      if (data.itemactive == "整体情况") {
        pages.value.scrollTop = parentScrollTop + 32;
      } else {
        pages.value.scrollTop = 120 + 32;
      }
    };

    //触碰滚屏区域
    const onTouchStart = () => {
      data.parentisactive = false;
    };

    // 获取元素的所有属性
    const getElementAttributes = (el) => {
      const attrs = {};
      for (let attr of el.attributes) {
        attrs[attr.name] = attr.value;
      }
      return attrs;
    };

    //二级菜单切换
    const menutab = (t) => {
      const element = document.querySelector("#" + t.title);
      if (element) {
        const scrollableContainer = element.closest(".content");
        // window.location.hash = `#${t}`;
        scrollableContainer.scroll({
          top: element.offsetTop, // 计算相对于容器顶部的偏移量
          behavior: "smooth",
        });
        // window.scrollTo({
        //   top: element.offsetTop,
        //   behavior: "smooth",
        // });
        // element.scrollIntoView({ behavior: "smooth" });
      }
    };
    //一级菜单切换
    const menutabactive = (t) => {
      data.parentisactive = true;
      if (t.title == "总览") {
        data.itemactive = "整体情况";
      } else if (t.title == "上班次情况") {
        data.itemactive = "安全交班";
      } else if (t.title == "下班次情况") {
        data.itemactive = "未完成事件";
      }

      menutab({ title: data.itemactive });
    };

    //话务图表
    const hwchartbox = () => {
      hwCharts = echarts.init(hwchart.value);
      hwCharts.clear();

      let series = [
        {
          name: "话务量",
          type: "line",
          smooth: true,
          data: [...data.chardata1],
          itemStyle: {
            color: "#3F76C6",
          },
        },
        {
          name: "同期基数",
          type: "line",
          smooth: true,
          data: [...data.chardata2],
          itemStyle: {
            color: "#AB1B49",
          },
        },
      ];

      const options = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          orient: "horizontal",
          right: "0",
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: data.hwXArea,
        },
        yAxis: {
          type: "value",
        },
        series,
        grid: { x: 25, y: 45, x2: 25, y2: 25 },
      };

      hwCharts.setOption(options);
      const resizeObserver = new ResizeObserver(() => {
        hwCharts.resize();
      });
      resizeObserver.observe(hwchart.value);
    };
    // //工单图表
    const gdchartbox = () => {
      gdCharts = echarts.init(gdchart.value);
      gdCharts.clear();

      let series = [
        {
          name: "工单量",
          type: "bar",
          data: [...data.chardata3],
          // 设置柱状图宽度
          barWidth: 30,
          label: {
            show: true,
            position: "inside",
            position: "insideBottom",
            color: "#fff",
          },
          itemStyle: {
            borderRadius: [20, 20, 0, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#7AC8DA" },
              { offset: 1, color: "#5B7BC1" },
            ]),
          },
        },
        {
          name: "同期基数",
          type: "line",
          smooth: true,
          data: [...data.chardata4],
          label: {
            show: true,
          },
          itemStyle: {
            color: "#AB043F",
          },
        },
      ];

      const options = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          orient: "horizontal",
          right: "0",
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: data.gdXArea,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: false,
          },
        },
        series,
        grid: { x: 25, y: 45, x2: 25, y2: 25 },
      };

      gdCharts.setOption(options);
      const resizeObserver = new ResizeObserver(() => {
        gdCharts.resize();
      });
      resizeObserver.observe(gdchart.value);
    };

    //点击菜单切换
    const audioSelect = (m) => {
      data.qaselectindex = m.title;
      const element = document.querySelector("#" + data.qaselectindex);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    let num = 0,
      times = null;
    //获取音频接口
    const getVoiceContentText = async () => {
      data.isplay = false;
      data.qaselectindex = null;
      clearInterval(times);
      times = null;
      nextTick(() => {
        data.audiourl = null;
        audioElement.value.load();
      });
      ttsRecorder.setbasefile();

      http
        .get(`FWDApex/znjbNew/getVoiceContentText?pdate=${data.selectdate}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          withCredentials: false,
        })
        .then((res) => {
          console.log("获取音频", res);
          data.IsVolumn = true;
          ttsRecorder.audioStop();
          let obj = Object.assign({}, { ...res });

          data.menuaudiolist.forEach((item) => {
            if (obj.hasOwnProperty(item.name)) {
              item.content = obj[item.name];
            }
          });
          if (res.code == "2") {
            showToast({
              type: "fail",
              message: "抱歉，语音暂无内容！",
              overlayClass: "toasts",
              overlayStyle: {
                width: "30%",
              },
            });

            data.IsVolumn = false;
            loading.value = false;
          }
        })
        .then(() => {
          num = 0;
          setTimeout(() => {
            getData();
          }, 500);
        })
        .catch((err) => {
          loading.value = false;
        });
    };
    const getData = () => {
      const arr = data.menuaudiolist;
      console.log("arr", arr, arr.length);

      times = setInterval(() => {
        if (num < arr.length) {
          let m = JSON.parse(JSON.stringify(arr[num]));
          play(m).then((r) => {
            if (r) {
              if (m.name == "早安") {
                console.log(m.content + "--查阅：", r);
              }
              data.menuaudiolist[num].url = r;
              if (!data.audiourl) {
                data.audiourl = data.menuaudiolist[0].url;
                data.selectname = data.menuaudiolist[0];
                audioElement.value.load();
              }
              loading.value = false;
              num++;
            }
          });
        } else {
          console.log("data.menuaudiolist", data.menuaudiolist);
          clearInterval(times);
          times = null;
        }
      }, 2000);
    };

    //执行播放音频
    const playbtn = () => {
      data.isplay = !data.isplay;
      if (data.isplay) {
        // let list = data.menuaudiolist.filter((l) => {
        //   return l.name == data.selectname.name;
        // });
        console.log("播放信息", data.selectname);
        console.log(
          "data.audiourl !== data.selectname.url",
          data.audiourl !== data.selectname.url
        );
        if (data.audiourl !== data.selectname.url) {
          data.audiourl = data.selectname.url;
          audioElement.value.load();
        }
        if (data.selectname.name == "早安") {
          audioSelect({ title: data.selectname.name });
          audioElement.value.load();
          data.audiourl = data.selectname.url;
        } else {
          menutab({ title: data.selectname.name });
          data.qaselectindex = data.selectname.name;
        }

        data.selectindex = data.menuaudiolist.findIndex(
          (item) => item.name === data.qaselectindex
        );

        setTimeout(() => {
          audioElement.value.play();
        }, 400);
      } else {
        let playPromise = audioElement.value.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audioElement.value.pause();
            })
            .catch(() => {});
        }
      }
    };

    //执行播放
    const play = (item) => {
      // console.log("text>>>>>>", item);

      return new Promise((resolve, reject) => {
        // console.log("进入", ttsRecorder.basefile());
        if (ttsRecorder.basefile()) {
          const url = `data:audio/mp3;base64,${ttsRecorder.basefile()}`;
          resolve(url);
          ttsRecorder.setbasefile();
        } else {
          // console.log("ttsRecorder.IsRuns() ", ttsRecorder.IsRuns());
          if (ttsRecorder.IsRuns() === false) {
            ttsRecorder.setParams({
              text: item.content,
            });
            if (
              ["init", "endPlay", "errorTTS"].indexOf(ttsRecorder.status) > -1
            ) {
              ttsRecorder.start();
            } else {
              // ttsRecorder.stop();
            }
          }
        }
      });
    };

    //播放全局音频
    const playaudio = (m) => {
      console.log("播放对象", m);
      data.selectname = m;

      // data.audiourl = m.url;
      data.isplay = false;
      setTimeout(() => {
        playbtn();
        data.audiolistshow = false;
      }, 300);
    };

    // 音频播放结束时的处理函数
    const onAudioEnded = () => {
      console.log("音频播放结束了");
      let len = data.menuaudiolist.length;
      data.selectindex = data.menuaudiolist.findIndex(
        (item) => item.name === data.qaselectindex
      );
      if (data.selectindex + 1 < len) {
        let item = data.menuaudiolist[data.selectindex + 1];
        playaudio(item);
      }
    };
    // 播放上一个音频
    const forwardbtn = () => {
      console.log("播放上一个音频");
      let len = data.menuaudiolist.length;
      data.selectindex = data.menuaudiolist.findIndex(
        (item) => item.title === data.qaselectindex
      );
      if (0 < data.selectindex - 1 < len) {
        let item = data.menuaudiolist[data.selectindex - 1];
        playaudio(item);
      }
    };
    // 播放下一个音频
    const nextbtn = () => {
      console.log("播放下一个音频");
      let len = data.menuaudiolist.length;
      data.selectindex = data.menuaudiolist.findIndex(
        (item) => item.title === data.qaselectindex
      );
      if (data.selectindex + 1 < len) {
        let item = data.menuaudiolist[data.selectindex + 1];
        playaudio(item);
      }
    };

    //查看详情弹窗
    const opendetail = (title, info) => {
      let { ONEMENU, TWOMENU, THREEMENU, Detail } = info;
      if (ONEMENU) {
        http
          .get(
            `FWDApex/znjbNew/getSingleDetailByDate?pdate=${data.selectdate}&ONEMENU=${ONEMENU}&TWOMENU=${TWOMENU}&THREEMENU=${THREEMENU}`,
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
              withCredentials: false,
            }
          )
          .then((res) => {
            let message = res.data
              ? res.data.replace(/\s+\n/g, "")
              : "暂无内容！";

            showDialog({
              title: title + "详情",
              message,
              confirmButtonColor: "#79BBFF",
              messageAlign: res.data ? "left" : "center",
            }).then(() => {
              // on close
            });
          });
      } else {
        let message = Detail ? Detail : "暂无内容！";
        showDialog({
          title: title + "详情",
          message,
          confirmButtonColor: "#79BBFF",
          messageAlign: Detail ? "left" : "center",
        }).then(() => {
          // on close
        });
      }
    };

    //退出
    const exit = () => {
      dd.biz.navigation.close({
        onSuccess: function (result) {
          console.log("result", result);
        },
        onFail: function (err) {
          console.log("err", err);
        },
      });
    };

    return {
      ...toRefs(data),
      getWeek,
      setDays,
      changeselect,
      selectcalendar,
      onScroll,
      scrollContainer,
      sectionRefs,
      menutab,
      menutabactive,
      hwchart,
      gdchart,
      playaudio,
      audioElement,
      playbtn,
      forwardbtn,
      nextbtn,
      onTouchStart,
      loading,
      opendetail,
      pages,
      getVoiceContentText,
      exit,
      handleBeforePlay,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.page {
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  //display: flex;
  //flex-direction: column;
  .navtop {
    width: 100%;
    height: 50px;
    background-color: #036ac7;
    color: #fff;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    .lf {
      display: flex;
      align-items: center;
      padding-right: 10px;
      .logo {
        width: 20px;
        margin: 0 10px;
      }
    }
    .morning {
      flex: 1;
      display: flex;
      align-items: center;
      overflow: hidden;

      white-space: nowrap; /* 防止文本换行 */
    }
    .scrolling-text {
      font-size: 13px;
      display: inline-block;
      padding-left: 100%; /* 确保文本从容器的右侧开始 */
      animation: scroll-left 20s linear infinite; /* 定义动画 */
    }

    @keyframes scroll-left {
      from {
        transform: translateX(0); /* 初始位置 */
      }
      to {
        transform: translateX(-100%); /* 结束位置，文本完全离开容器 */
      }
    }
    .rg {
      display: flex;
      align-items: center;
      padding-right: 10px;
      box-sizing: border-box;
      .usericon,
      .dir {
        color: #fff;
        font-size: 20px;
      }
      .dir {
        font-size: 14px;
        margin-left: 5px;
        margin-top: 5px;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 0px;
    // cursor: pointer;
  }
  .van-tab__text {
    font-size: 16px;
  }
  .dateselectbox {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 10px 0 18px 0;
    background-color: #3b99fb;

    box-sizing: border-box;
    align-items: center;

    .datelists {
      flex: 3;
      display: flex;
      overflow: auto;
      direction: rtl;
      align-items: center;
      .days {
        // flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        color: #fff;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 8px;
        margin: 15px 5px 5px 5px;
        .week {
          font-size: 12px;
        }
        .date {
          // margin-top: 5px;
          font-size: 15px;
        }
      }
    }

    .selectdays {
      margin-top: 1px;
      background-color: #fff;
      div {
        color: #3a99fc;
      }
    }
    .dayop {
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      color: #fff;
      padding: 8px 4px 4px 4px;
      box-sizing: border-box;
      .dateoperation {
        width: 80px;
        display: flex;
        .calendarbox {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          box-sizing: border-box;

          .icon {
            font-size: 18px;
          }
          .label {
            font-size: 13px;
          }
        }
        .calendarbox1 {
          margin-top: 1px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
          // padding: 10px 5px 5px 5px;
          box-sizing: border-box;
          .label {
            font-size: 13px;
          }
        }
      }
    }
  }
  .carouselimg {
    width: 100%;
    height: 150px;
  }

  .imgtitle {
    width: 30px;
  }
  .tabmenu {
    .van-tab__text {
      z-index: 1;
      font-size: 16px;
    }
    .van-tabs__line {
      border-radius: 8px;
      bottom: 24px;
      height: 10px;
      z-index: 0;
      background-color: #3a99fc;
    }
    .van-tabs__content {
      display: none;
      .van-tabs__line {
        display: none;
      }
    }
    .tab0 {
      .van-tabs__line {
        width: 0px;
      }
    }
    .tab1 {
      .van-tabs__line {
        width: 50px;
      }
    }
    .tab2 {
      .van-tabs__line {
        width: 100px;
      }
    }
    .tab3 {
      .van-tabs__line {
        width: 100px;
      }
    }
  }
  .tabmenu2 {
    border-bottom: 1px solid #ebe1d2;
    width: 100%;
    .van-tab--active {
      font-weight: normal;
    }
    .van-tabs__line {
      display: none;
    }
  }
  .disabled {
    color: #999;
  }

  .content {
    margin: 10px 0;
    flex: 1;
    overflow: auto;

    .tabsitems {
      margin-bottom: 20px;
      padding: 0 10px;
      box-sizing: border-box;
      position: relative;
      .titleimg {
        width: 25px;
        margin-right: 10px;
      }
      .link,
      .righttopimg {
        position: absolute;
        z-index: 1;
        top: 5px;
        right: 5px;
      }
      .righttopimg {
        position: absolute;
        z-index: 1;
        top: 5px;
        right: 10px;
      }
      .tabtitle {
        display: flex;
        align-items: center;
        line-height: 30px;
        font-size: 16px;
        font-weight: bolder;
        position: relative;
      }
      .dataitem {
        position: relative;
        margin: 10px 0 15px 0;
        font-size: 16px;
        padding: 0 30px;
        box-sizing: border-box;
        .itemtitle {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .xjlist {
          display: flex;
          // align-items: center;
          position: relative;
          margin-bottom: 10px;

          .mark {
            width: 20px;
            height: 20px;
            background-image: url("@/assets/Image/lian_images/联想切图_10.png");
            background-repeat: no-repeat; /* 不重复 */
            background-size: 100% 100%; /* 覆盖整个元素 */
            margin-right: 5px;
            margin-top: 5px;
          }
          .key {
            width: 80px;
            font-size: 14px;
            padding-top: 7px;
            // white-space: nowrap;
            // margin-right: 20px;
            font-weight: bolder;
            display: flex;
            // align-items: center;
            overflow: hidden;
          }
          .val {
            flex: 1;
            padding-top: 6px;
            font-size: 15px;
          }
        }
        .keyzl {
          background-image: url("@/assets/Image/lian_images/联想切图_13.png");
        }
        .keybm {
          background-image: url("@/assets/Image/lian_images/联想切图_16.png");
        }
        .keyzl,
        .keybm {
          width: 30px;
          height: 30px;
          background-repeat: no-repeat; /* 不重复 */
          background-size: 100% 100%; /* 覆盖整个元素 */
          padding-left: 13px;
          box-sizing: border-box;
          white-space: nowrap;
          font-weight: bolder;
          display: flex;
          align-items: center;
          padding-bottom: 5px;
          box-sizing: border-box;
          font-size: 14px;
        }
      }
      .problem {
        margin-top: 10px;
      }
    }
    .parenttitle {
      background-image: url("@/assets/Image/lian_images/未标题-1_03.png");
      background-repeat: no-repeat; /* 不重复 */
      background-size: 100% 100%; /* 覆盖整个元素 */
      background-position: center center; /* 居中放置 */
      font-size: 14px;
      color: #fff;
      padding: 0px 30px;
      padding-bottom: 2px;
      box-sizing: border-box;
      line-height: 30px;
      margin-bottom: 20px;
    }
  }
  .audiolist {
    padding: 10px 10px;
    color: #666;
    text-align: center;
    .title {
      margin-left: 20px;
      margin-right: 10px;
    }
  }

  .isactive {
    color: #0a77db;
  }
  .heights {
    height: 0px;
  }

  .audiofooter {
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f1;
    z-index: 2;
    .vue-audio-player {
      width: 90%;
      height: 40px;
      // margin-bottom: 10px;
    }
    audio {
      width: 100%;
      height: 40px;
    }
    //设置播放器背景色
    audio::-webkit-media-controls-enclosure {
      background-color: unset;
    }
    audio::-webkit-media-controls-panel {
      background-color: transparent;
      color: #fff;
      border-radius: 5px;
    }

    /* 显示进度条 */
    audio::-webkit-media-controls-timeline {
      // display: none !important;
      // background-color: #5e85ea;
    }
    audio::-webkit-media-controls-play-button {
      display: none !important;
    }

    /*video默认aduio音量按钮*/
    audio::-webkit-media-controls-mute-button {
      // display: none !important;
    }

    .playlist {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      padding: 0 20px;
      box-sizing: border-box;
      .icon {
        font-size: 25px;
      }
      .list {
        flex: 1.5;
      }
      .playeven {
        flex: 4;
        .playbtn {
          margin: 0 40px;
        }
        .playbtnno {
          margin: 0 40px;
          color: #999;
        }
      }
    }
  }
  .pre {
    white-space: pre-line;
  }
  .link,
  .links {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 1;
  }
  .edit {
    color: #0a77db;
    font-size: 18px;
  }
  .van-dialog__message {
    white-space: pre-line;
  }
  white-space: pre-line;
  .loadinggif {
    position: absolute;
    width: 40px;
  }
  .xjlink {
    position: absolute;
    z-index: 1;
    top: 5px;
    right: -30px;
  }
  .refresh {
    cursor: pointer;
    font-size: 20px;
    font-weight: bolder;
    margin-right: 5px;
  }
  .pitem {
    margin-top: 10px;
  }
  .val1 {
    img {
      width: 10px;
    }
  }
}
</style>
