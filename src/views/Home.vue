<template>
  <div class="home">
    <el-container class="container" style="flex: 1; overflow: hidden">
      <el-aside class="aside">
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
        >
          <div class="asidetop">
            <!-- <img src="@/assets/Image/leweilogo1.png" style="width: 40px;"/> -->
            <div>
              <div style="width: 100%; text-align: center">
                <el-Image
                  :src="require('@/assets/Image/lian_images/logo.png')"
                  class="logo"
                />
              </div>

              <div class="title">智慧交班</div>
            </div>
          </div>
          <div class="menu">
            <div v-for="(v, index) in menulist" :key="index">
              <div style="width: 100%; display: flex" class="menulist">
                <span :class="`icon iconfont ${v.icon}`" class="icons"> </span>
                <span>{{ v.name }}</span>
              </div>
              <!-- 子菜单 -->
              <div
                v-for="(m, i) in v.children"
                :key="i"
                @click="handleSelect(m)"
                :class="{ isactive: qaselectindex === m.name }"
                class="childmenu"
              >
                <div>
                  <span :class="`icon iconfont ${m.icon}`" class="icons"></span>
                  <span :class="`${m.icon}_name`">{{ m.name }}</span>
                  <span v-if="IsVolumn" style="position: relative; flex: 1">
                    <span
                      class="icon iconfont horns"
                      v-if="
                        menuaudiolist[m.key].url &&
                        menuaudiolist[m.key].url !== audiourl
                      "
                      @click="playaudio(m)"
                      >&#xe67c;</span
                    >
                    <span
                      v-else-if="
                        menuaudiolist[m.key].url &&
                        menuaudiolist[m.key].url == audiourl
                      "
                      class="icon iconfont horns"
                    >
                      &#xe751;
                    </span>
                    <img
                      v-else
                      src="@/assets/Image/lian_images/loading.gif"
                      class="loadinggif"
                    />
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
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <div class="viewcontain" ref="area">
        <!-- 顶部退出登录 -->
        <div class="navtop">
          <div class="navbars">
            <div class="left">
              <img
                src="@/assets/Image/lian_images/bobao.svg"
                class="horn"
                @click="playaudio({ name: '早安' })"
              />
              <span
                class="nowtime"
                v-if="formitem.start && formitem.start.welcomeLK"
                >{{ formitem["start"]["welcomeLK"].content }}</span
              >
            </div>
            <!-- 交班日期 -->
            <div class="block">
              <el-config-provider :locale="locale">
                <span class="demonstration">交班日期</span>
                <el-date-picker
                  v-model="handoverDate"
                  :clearable="false"
                  :editable="false"
                  type="date"
                  placeholder="请选择"
                  class="datetime"
                  @change="datechange"
                />
              </el-config-provider>
              <span class="icon iconfont dateicon">&#xe6cc;</span>
            </div>
          </div>
        </div>
        <!-- 展示区域 -->
        <div class="areas">
          <!-- 交班总览 -->
          <div class="views" id="整体情况">
            <!-- 标题 -->
            <div class="titlelist">
              <img
                class="titleicon"
                src="@/assets/Image/lian_images/联想切图_42-66.png"
                alt=""
              />
              <div class="viewtitle">
                <span>交班</span>
                <span>总览</span>
              </div>
            </div>
            <!-- 数据展示 -->
            <div class="overview">
              <!-- 整体情况 -->
              <div class="situation s0" id="整体情况">
                <img
                  class="leftimg"
                  src="@/assets/Image/lian_images/联想切图_56-76.png"
                />
                <img
                  class="rightbottomimg"
                  src="@/assets/Image/lian_images/联想切图_82.png"
                />
                <!-- 跳转详情 -->
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="详情"
                  placement="top-start"
                >
                  <div
                    class="link"
                    @click="
                      opendetail(
                        '整体情况',
                        {
                          ONEMENU: '当日总览',
                          TWOMENU: '公司运转情况',
                          THREEMENU: '运转情况',
                          Detail:
                            formitem.ToDayGeneralView.OverallSituation.Detail,
                        },
                        formitem.ToDayGeneralView.OverallSituation.Content
                      )
                    "
                  >
                    <span class="icon iconfont edit">&#xe73b;</span>
                  </div>
                </el-tooltip>

                <!-- 良好表情 -->
                <div
                  class="face"
                  v-if="
                    formitem.ToDayGeneralView.OverallSituation.Content.includes(
                      '良好'
                    ) ||
                    formitem.ToDayGeneralView.OverallSituation.Content.includes(
                      '优秀'
                    )
                  "
                >
                  <img src="@/assets/Image/lian_images/disableface2.png" />
                  <img src="@/assets/Image/lian_images/face1.png" />
                  <img src="@/assets/Image/lian_images/disableface3.png" />
                </div>
                <!-- 一般表情 -->
                <div
                  class="face"
                  v-else-if="
                    formitem.ToDayGeneralView.OverallSituation.Content.includes(
                      '及格'
                    )
                  "
                >
                  <img src="@/assets/Image/lian_images/disableface1.png" />
                  <img src="@/assets/Image/lian_images/face2.png" />
                  <img src="@/assets/Image/lian_images/disableface3.png" />
                </div>
                <!-- 差表情 -->
                <div
                  class="face"
                  v-else-if="
                    formitem.ToDayGeneralView.OverallSituation.Content.includes(
                      '不及格'
                    )
                  "
                >
                  <img src="@/assets/Image/lian_images/disableface1.png" />
                  <img src="@/assets/Image/lian_images/face3.png" />
                  <img src="@/assets/Image/lian_images/disableface2.png" />
                </div>
                <div class="title alltitle">整体情况</div>
                <div>
                  {{
                    formitem.ToDayGeneralView.OverallSituation.Content
                      ? formitem.ToDayGeneralView.OverallSituation.Content
                      : nodata
                  }}
                </div>
              </div>
              <!-- 重要事件 ，领导指示 -->
              <div class="overviewlist">
                <!-- 重要事件 -->
                <div class="situation s1" id="重要事件">
                  <img
                    class="leftimg"
                    src="@/assets/Image/lian_images/联想切图_56-76.png"
                  />
                  <img
                    class="rightbottomimg"
                    src="@/assets/Image/lian_images/联想切图_59-79.png"
                  />
                  <!-- 跳转详情 -->
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="详情"
                    placement="top-start"
                  >
                    <div
                      class="link"
                      @click="
                        opendetail('重要事件', {
                          ONEMENU: '当日总览',
                          TWOMENU: '重要事件',
                          THREEMENU: '话务',
                          Detail: formitem.ToDayGeneralView.FocusEvent.Detail,
                        })
                      "
                    >
                      <span class="icon iconfont edit">&#xe73b;</span>
                    </div>
                  </el-tooltip>
                  <div class="title">关注事件</div>
                  <div style="line-height: 1.8">
                    {{
                      formitem.ToDayGeneralView.FocusEvent.Content
                        ? formitem.ToDayGeneralView.FocusEvent.Content
                        : nodata
                    }}
                  </div>
                </div>
                <!-- 领导指示 -->
                <div class="situation s2" id="领导指示">
                  <img
                    class="leftimg"
                    src="@/assets/Image/lian_images/联想切图_56-76.png"
                  />
                  <img
                    class="rightbottomimg"
                    src="@/assets/Image/lian_images/联想切图_85.png"
                  />
                  <!-- 跳转详情 -->
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="详情"
                    placement="top-start"
                  >
                    <div
                      class="link"
                      @click="
                        opendetail(
                          '领导指示',
                          {
                            ONEMENU: '当日总览',
                            TWOMENU: '领导指示',
                            THREEMENU: '所有指示内容',
                            Detail:
                              formitem.ToDayGeneralView.LeaderInstruct.Detail,
                          },
                          formitem.ToDayGeneralView.LeaderInstruct.Content
                        )
                      "
                    >
                      <span class="icon iconfont edit">&#xe73b;</span>
                    </div>
                  </el-tooltip>
                  <div class="title">领导指示</div>
                  <div style="line-height: 1.8">
                    {{
                      formitem.ToDayGeneralView.LeaderInstruct.Content
                        ? formitem.ToDayGeneralView.LeaderInstruct.Content
                        : nodata
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 上班次情况 -->
          <div class="views" id="安全交班">
            <!-- 标题 -->
            <div class="titlelist">
              <img
                class="titleicon1"
                src="@/assets/Image/lian_images/联想切图_42-66.png"
                alt=""
              />
              <div class="viewtitle">
                <span>上班次</span>
                <span>情况</span>
              </div>
            </div>
            <!-- 安全交班数据展示 -->
            <div class="overview boxview" id="安全交班">
              <!-- 跳转详情 -->
              <el-tooltip
                class="box-item"
                effect="dark"
                content="详情"
                placement="top-start"
              >
                <div
                  class="link"
                  @click="
                    opendetail('安全交班', {
                      ONEMENU: '',
                      TWOMENU: '',
                      THREEMENU: '',
                      Detail: formitem.SecureJb.Detail,
                    })
                  "
                >
                  <span class="icon iconfont edit">&#xe73b;</span>
                </div>
              </el-tooltip>
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">安全交班</span>
              </div>
              <div class="lists">
                <div v-if="formitem.SecureJb.Content">
                  <div
                    v-for="(item, index) in formitem.SecureJb.Content.split(
                      '\\n'
                    )"
                    :key="index"
                    v-show="item"
                    style="line-height: 1.8"
                  >
                    {{ item }}
                  </div>
                </div>
                <div v-else>{{ nodata }}</div>
              </div>
            </div>
            <!-- 话务交班数据展示 -->
            <div class="overview boxview" id="话务交班">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">话务交班</span>
              </div>
              <div class="lists">
                <el-card shadow="always">
                  <el-row v-show="HWSUM">
                    <el-col :span="17">
                      <div
                        style="width: 100%; height: 35vh"
                        ref="hwchart"
                      ></div>
                    </el-col>
                    <el-col :span="7">
                      <div class="hwcharts">
                        <!-- 总量 -->
                        <div class="hwtotals">
                          <div class="title">总量</div>
                          <div class="sums">{{ HWSUM }}通</div>
                        </div>
                        <!-- 同比、环比 -->
                        <div class="hwpercent">
                          <div class="hwtotals">
                            <div class="title">{{ HBSTATUS }}</div>
                            <div class="sums2">{{ HBDATA1 }}通</div>
                          </div>
                          <div class="imgs">
                            <img
                              src="@/assets/Image/lian_images/联想切图_96.png"
                            />
                          </div>
                          <div class="hwtotals">
                            <div class="title">{{ TBSTATUS }}</div>
                            <div class="sums1">{{ TBDATA1 }}通</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <img
                    v-if="!HWSUM && !HWMSG"
                    src="@/assets/Image/lian_images/chartsloading.gif"
                    class="chartsloading"
                  />
                  <div v-else-if="!HWSUM && HWMSG">
                    {{ HWMSG }}
                  </div>
                </el-card>
                <el-row class="cardlist" :gutter="20">
                  <el-col :span="12">
                    <el-card shadow="always">
                      <div class="hwlist">
                        <div class="content">
                          <!-- 横线 -->
                          <div class="pline"></div>
                          <!-- 标题 -->
                          <div class="title">话务排名情况</div>
                          <!-- 内容 -->
                          <div class="detail pre">
                            {{
                              formitem.HwJb.ProductRank.Content
                                ? formitem.HwJb.ProductRank.Content
                                : nodata
                            }}
                          </div>
                        </div>
                        <!-- 跳转详情 -->
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="详情"
                          placement="top-start"
                        >
                          <div
                            class="link"
                            @click="
                              opendetail('产品排名情况', {
                                ONEMENU: '话务交班',
                                TWOMENU: '话务排名',
                                THREEMENU: '产品排名',
                                Detail: formitem.HwJb.ProductRank.Detail,
                              })
                            "
                          >
                            <span class="icon iconfont">&#xe73b;</span>
                          </div>
                        </el-tooltip>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="12">
                    <el-card shadow="always">
                      <div class="hwlist">
                        <div class="content">
                          <!-- 横线 -->
                          <div class="wline"></div>
                          <!-- 标题 -->
                          <div class="title">问题排名情况</div>
                          <!-- 内容 -->
                          <div class="detail pre">
                            {{
                              formitem.HwJb.ProblemRank.Content
                                ? formitem.HwJb.ProblemRank.Content
                                : nodata
                            }}
                          </div>
                        </div>
                        <!-- 跳转详情 -->
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="详情"
                          placement="top-start"
                        >
                          <div
                            class="link"
                            @click="
                              opendetail('问题排名情况', {
                                ONEMENU: '话务交班',
                                TWOMENU: '话务排名',
                                THREEMENU: '问题排名',
                                Detail: formitem.HwJb.ProblemRank.Detail,
                              })
                            "
                          >
                            <span class="icon iconfont">&#xe73b;</span>
                          </div>
                        </el-tooltip>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- 工单交班数据展示 -->
            <div class="overview boxview" id="工单交班">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">工单交班</span>
              </div>
              <div class="lists">
                <el-card shadow="always">
                  <el-row v-if="GDSUM">
                    <!-- 图表 -->
                    <el-col :span="17">
                      <div
                        style="width: 100%; height: 35vh"
                        ref="gdchart"
                      ></div>
                    </el-col>
                    <el-col :span="7">
                      <div class="hwcharts">
                        <!-- 总量 -->
                        <div class="hwtotals">
                          <div class="title">总量</div>
                          <div class="sums">{{ GDSUM }}单</div>
                        </div>
                        <!-- 同比、环比 -->
                        <div class="hwpercent">
                          <div class="hwtotals lf">
                            <div class="title">
                              {{ HBDATA.substr(0, 4) }}
                            </div>
                            <div class="sums2">
                              {{ HBDATA.substr(4, HBDATA.length + 1) }}单
                            </div>
                          </div>
                          <div class="imgs">
                            <img
                              src="@/assets/Image/lian_images/联想切图_96.png"
                            />
                          </div>
                          <div class="hwtotals rg">
                            <div class="title">
                              {{ TBDATA.substr(0, 4) }}
                            </div>
                            <div class="sums1">
                              {{ TBDATA.substr(4, HBDATA.length + 1) }}单
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <img
                    v-else-if="!GDSUM && !GDMSG"
                    src="@/assets/Image/lian_images/chartsloading.gif"
                    class="chartsloading"
                  />
                  <div v-else>
                    {{ GDMSG }}
                  </div>
                </el-card>
                <!-- 详情 -->
                <div class="details">
                  <el-row :gutter="20">
                    <!-- 受理类工单标题 -->
                    <el-col :span="12" class="items">
                      <div
                        class="gtitle"
                        style="margin-top: 15px"
                        id="受理类工单"
                      >
                        <img
                          src="@/assets/Image/lian_images/联想切图_72-102.png"
                        />受理类工单
                      </div>
                      <!-- 详情内容 -->
                      <div class="content">
                        <el-card class="detailcard pre">
                          {{
                            formitem.GdJb.AcceptGd.Content
                              ? formitem.GdJb.AcceptGd.Content
                              : nodata
                          }}
                          <!-- 跳转详情 -->
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="详情"
                            placement="top-start"
                          >
                            <div
                              class="link"
                              @click="
                                opendetail('受理类工单', {
                                  ONEMENU: '',
                                  TWOMENU: '',
                                  THREEMENU: '',
                                  Detail: formitem.GdJb.AcceptGd.Detail.replace(
                                    /^\n+/,
                                    ''
                                  ),
                                })
                              "
                            >
                              <span class="icon iconfont">&#xe73b;</span>
                            </div>
                          </el-tooltip>
                        </el-card>
                      </div>
                      <div class="gtitle" style="margin-top: 20px">
                        <img
                          src="@/assets/Image/lian_images/联想切图_72-102.png"
                        />自动工单
                      </div>
                      <!-- 详情内容 -->
                      <div class="content">
                        <el-card class="detailcard pre">
                          {{
                            formitem.GdJb.AutoGd.Content
                              ? formitem.GdJb.AutoGd.Content
                              : nodata
                          }}
                          <!-- 跳转详情 -->
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="详情"
                            placement="top-start"
                          >
                            <div
                              class="link"
                              @click="
                                opendetail('自动工单', {
                                  ONEMENU: '',
                                  TWOMENU: '',
                                  THREEMENU: '',
                                  Detail: formitem.GdJb.AutoGd.Detail,
                                })
                              "
                            >
                              <span class="icon iconfont edit">&#xe73b;</span>
                            </div>
                          </el-tooltip>
                        </el-card>
                      </div>
                    </el-col>
                    <!-- 管理类工单标题 -->
                    <el-col :span="12" class="items">
                      <div class="gtitle">
                        <img
                          src="@/assets/Image/lian_images/联想切图_72-102.png"
                        />管理类工单
                      </div>
                      <!-- 详情内容 -->
                      <div class="content">
                        <el-card class="detailcard pre">
                          {{
                            formitem.GdJb.ManageGd.Content
                              ? formitem.GdJb.ManageGd.Content
                              : nodata
                          }}
                          <!-- 跳转详情 -->
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="详情"
                            placement="top-start"
                          >
                            <div
                              class="link"
                              @click="
                                opendetail('管理类工单', {
                                  ONEMENU: '',
                                  TWOMENU: '',
                                  THREEMENU: '',
                                  Detail: formitem.GdJb.ManageGd.Detail.replace(
                                    /^\n+/,
                                    ''
                                  ),
                                })
                              "
                            >
                              <span class="icon iconfont edit">&#xe73b;</span>
                            </div>
                          </el-tooltip>
                        </el-card>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <!-- 升级交班数据展示 -->
            <div class="overview boxview" id="升级交班">
              <!-- 跳转详情 -->
              <el-tooltip
                class="box-item"
                effect="dark"
                content="详情"
                placement="top-start"
              >
                <div
                  class="link"
                  @click="
                    opendetail('升级交班', {
                      ONEMENU: '',
                      TWOMENU: '',
                      THREEMENU: '',
                      Detail: formitem.UpgradesJb.Detail,
                    })
                  "
                >
                  <span class="icon iconfont edit">&#xe73b;</span>
                </div>
              </el-tooltip>
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">升级交班</span>
              </div>
              <div class="lists pre">
                <div v-if="formitem.UpgradesJb.Content">
                  <div
                    class="val1"
                    v-for="(l, i) in formitem.UpgradesJb.Content.split('\n')"
                    :key="i"
                    v-show="l"
                  >
                    <div>
                      <img
                        src="@/assets/Image/lian_images/联想切图_45-52.png"
                      />
                      {{ l }}
                    </div>
                  </div>
                </div>
                <div v-else>{{ nodata }}</div>
              </div>
            </div>
            <!-- 巡检交班数据展示 -->
            <div class="overview boxview" id="巡检交班">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">巡检交班</span>
              </div>
              <div class="lists">
                <el-row>
                  <!-- IMCC巡检 -->
                  <el-col :span="24" class="xjlist">
                    <div class="mark"></div>
                    <div class="key">IMCC巡检</div>
                    <div class="val pre">
                      {{
                        formitem.PatrolJb.ImccPatrol.Content
                          ? formitem.PatrolJb.ImccPatrol.Content
                          : nodata
                      }}
                      <!-- 跳转详情 -->
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="详情"
                        placement="top-start"
                      >
                        <span
                          class="icon iconfont spanlinks"
                          @click="
                            opendetail(
                              'IMCC巡检',
                              {
                                ONEMENU: '巡检',
                                TWOMENU: 'IMCC巡检',
                                THREEMENU: 'IMCC巡检',
                                Detail: formitem.PatrolJb.ImccPatrol.Detail,
                              },
                              formitem.PatrolJb.ImccPatrol.Content
                            )
                          "
                          style="line-height: 1.2"
                        >
                          &#xe73b;
                        </span>
                      </el-tooltip>
                    </div>
                  </el-col>
                  <!-- 井盖巡检 -->
                  <el-col :span="24" class="xjlist">
                    <div class="mark"></div>
                    <div class="key">井盖巡检&nbsp;&nbsp;</div>
                    <div class="val pre">
                      {{
                        formitem.PatrolJb.LidInspection.Content
                          ? formitem.PatrolJb.LidInspection.Content
                          : nodata
                      }}
                      <!-- 跳转详情 -->
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="详情"
                        placement="top-start"
                      >
                        <span
                          class="icon iconfont spanlinks"
                          @click="
                            opendetail(
                              '井盖巡检',
                              {
                                ONEMENU: '巡检',
                                TWOMENU: '井盖巡检',
                                THREEMENU: '井盖巡检',
                                Detail: formitem.PatrolJb.LidInspection.Detail,
                              },
                              formitem.PatrolJb.LidInspection.Content
                            )
                          "
                        >
                          &#xe73b;
                        </span>
                      </el-tooltip>
                    </div>
                  </el-col>
                  <!-- 视频会议 -->
                  <el-col :span="24" class="xjlist">
                    <div class="mark"></div>
                    <div class="key">视频会议&nbsp;&nbsp;</div>
                    <div class="val pre">
                      {{
                        formitem.PatrolJb.MP4Meeting.Content
                          ? formitem.PatrolJb.MP4Meeting.Content
                          : nodata
                      }}
                      <!-- 跳转详情 -->
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="详情"
                        placement="top-start"
                      >
                        <span
                          class="icon iconfont spanlinks"
                          @click="
                            opendetail(
                              '视频会议',
                              {
                                ONEMENU: '巡检',
                                TWOMENU: '视频会议',
                                THREEMENU: '视频会议',
                                Detail: formitem.PatrolJb.MP4Meeting.Detail,
                              },
                              formitem.PatrolJb.MP4Meeting.Content
                            )
                          "
                        >
                          &#xe73b;
                        </span>
                      </el-tooltip>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- 接待保障数据展示 -->
            <div class="overview boxview" id="接待保障">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">接待保障</span>
              </div>
              <div class="lists pre">
                {{
                  formitem.ReceptionGuarantee.Content
                    ? formitem.ReceptionGuarantee.Content
                    : nodata
                }}
                <!-- 跳转详情 -->
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="详情"
                  placement="top-start"
                >
                  <div
                    class="link"
                    @click="
                      opendetail(
                        '接待保障',
                        {
                          ONEMENU: '接待保障',
                          TWOMENU: '接待保障',
                          THREEMENU: '接待保障',
                          Detail: formitem.ReceptionGuarantee.Detail,
                        },
                        formitem.ReceptionGuarantee.Content
                      )
                    "
                  >
                    <span class="icon iconfont edit">&#xe73b;</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <!-- 营销交班数据展示 -->
            <div class="overview boxview" id="营销交班">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">营销交班</span>
              </div>
              <div class="lists">
                <div class="yxlist">
                  <el-row :gutter="40">
                    <!-- 线索商机 -->
                    <el-col :span="8">
                      <el-card shadow="never">
                        <div class="yxcard">
                          <!-- 标题图标 -->
                          <div class="titleicon">
                            <img
                              src="@/assets/Image/lian_images/联想切图_13-22.png"
                              alt=""
                            />
                          </div>
                          <!-- 标题 -->
                          <div class="title">线索商机</div>
                          <!-- 内容 -->
                          <div class="detail">
                            {{
                              formitem.MarketingJb.Clue.Content
                                ? formitem.MarketingJb.Clue.Content
                                : nodata
                            }}
                          </div>
                          <!-- 跳转详情 -->
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="详情"
                            placement="top-start"
                          >
                            <div
                              class="link"
                              @click="
                                opendetail('线索商机', {
                                  ONEMENU: '营销交班',
                                  TWOMENU: '线索商机',
                                  THREEMENU: '新增线索商机',
                                  Detail: formitem.MarketingJb.Clue.Detail,
                                })
                              "
                            >
                              <span class="icon iconfont edit">&#xe73b;</span>
                            </div>
                          </el-tooltip>
                        </div>
                      </el-card>
                    </el-col>
                    <!-- 走访 -->
                    <el-col :span="8">
                      <el-card shadow="never">
                        <div class="yxcard">
                          <!-- 标题图标 -->
                          <div class="titleicon">
                            <img
                              src="@/assets/Image/lian_images/联想切图_13-24.png"
                              alt=""
                            />
                          </div>
                          <!-- 标题 -->
                          <div class="title">走访</div>
                          <!-- 内容 -->
                          <div class="detail">
                            {{
                              formitem.MarketingJb.Interview.Content
                                ? formitem.MarketingJb.Interview.Content
                                : nodata
                            }}
                          </div>
                          <!-- 跳转详情 -->
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="详情"
                            placement="top-start"
                          >
                            <div
                              class="link"
                              @click="
                                opendetail('走访', {
                                  ONEMENU: '营销交班',
                                  TWOMENU: '走访',
                                  THREEMENU: '总体',
                                  Detail: formitem.MarketingJb.Interview.Detail,
                                })
                              "
                            >
                              <span class="icon iconfont edit">&#xe73b;</span>
                            </div>
                          </el-tooltip>
                        </div>
                      </el-card>
                    </el-col>
                    <!-- 供应商 -->
                    <el-col :span="8">
                      <el-card shadow="never">
                        <div class="yxcard">
                          <!-- 标题图标 -->
                          <div class="titleicon gyx">
                            <img
                              src="@/assets/Image/lian_images/联想切图_12-19.png"
                              alt=""
                            />
                          </div>
                          <!-- 标题 -->
                          <div class="title">供应商</div>
                          <!-- 内容 -->
                          <div class="detail">
                            {{
                              formitem.MarketingJb.Provision.Content
                                ? formitem.MarketingJb.Provision.Content
                                : nodata
                            }}
                          </div>
                          <!-- 跳转详情 -->
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="详情"
                            placement="top-start"
                          >
                            <div
                              class="link"
                              @click="
                                opendetail(
                                  '供应商',
                                  {
                                    ONEMENU: '营销交班',
                                    TWOMENU: '供应商',
                                    THREEMENU: '供应商',
                                    Detail:
                                      formitem.MarketingJb.Provision.Detail,
                                  },
                                  formitem.MarketingJb.Provision.Content
                                )
                              "
                            >
                              <span class="icon iconfont edit">&#xe73b;</span>
                            </div>
                          </el-tooltip>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <!-- 项目交班数据展示 -->
            <div class="overview boxview" id="项目交班">
              <!-- 跳转详情 -->
              <el-tooltip
                class="box-item"
                effect="dark"
                content="详情"
                placement="top-start"
              >
                <div
                  class="link"
                  @click="
                    opendetail('项目交班', {
                      ONEMENU: '',
                      TWOMENU: '',
                      THREEMENU: '',
                      Detail: formitem.ProjectJb.Detail,
                    })
                  "
                >
                  <span class="icon iconfont edit">&#xe73b;</span>
                </div>
              </el-tooltip>
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">项目交班</span>
              </div>
              <div class="lists pre">
                {{
                  formitem.ProjectJb.Content
                    ? formitem.ProjectJb.Content
                    : nodata
                }}
              </div>
            </div>
            <!-- 事项清单数据展示 -->
            <div class="overview boxview" id="事项清单">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">事项清单</span>
              </div>
              <div class="lists">
                <div class="sxlist">
                  <el-row :gutter="10">
                    <!-- 总览 -->
                    <el-col :span="6">
                      <el-card shadow="never" style="position: relative">
                        <div class="keyzl">总览</div>
                        <div
                          class="pre"
                          style="
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                          "
                        >
                          <div v-if="formitem.LtemList.GeneralView.Content">
                            <div
                              class="val"
                              v-show="z"
                              v-for="(
                                z, i
                              ) in formitem.LtemList.GeneralView.Content.split(
                                '\n'
                              )"
                              :key="i"
                            >
                              {{ z }}
                            </div>
                          </div>
                          <div v-else>
                            {{ nodata }}
                          </div>
                        </div>
                        <!-- 跳转详情 -->
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="详情"
                          placement="top-start"
                        >
                          <div
                            class="link"
                            @click="
                              opendetail(
                                '总览',
                                {
                                  ONEMENU: '清单',
                                  TWOMENU: '总览',
                                  THREEMENU: '总览',
                                  Detail: formitem.LtemList.GeneralView.Detail,
                                },
                                formitem.LtemList.GeneralView.Content
                              )
                            "
                          >
                            <span class="icon iconfont edit">&#xe73b;</span>
                          </div>
                        </el-tooltip>
                      </el-card>
                    </el-col>
                    <!-- 部门推进情况 -->
                    <el-col :span="18">
                      <el-card shadow="never">
                        <div class="keybm">部门推进情况</div>
                        <div class="pre">
                          <el-row
                            v-if="formitem.LtemList.DepartmentPropel.Content"
                          >
                            <el-col
                              :span="12"
                              class="val1"
                              v-show="l"
                              v-for="(
                                l, i
                              ) in formitem.LtemList.DepartmentPropel.Content.split(
                                '\n'
                              )"
                              :key="i"
                            >
                              <div>{{ l }}</div>
                            </el-col>
                          </el-row>
                          <div v-else>
                            {{ nodata }}
                          </div>
                        </div>
                        <!-- 跳转详情 -->
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="详情"
                          placement="top-start"
                        >
                          <div
                            class="link"
                            @click="
                              opendetail('部门推进情况', {
                                ONEMENU: '清单',
                                TWOMENU: '其他部门推进情况',
                                THREEMENU: '其他部门推进情况',
                                Detail:
                                  formitem.LtemList.DepartmentPropel.Detail,
                              })
                            "
                          >
                            <span class="icon iconfont edit">&#xe73b;</span>
                          </div>
                        </el-tooltip>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <!-- 考核情况数据展示 -->
            <div class="overview boxview" id="考核情况">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">考核情况</span>
              </div>
              <div class="lists">
                {{
                  formitem.ExamineCondition.Content
                    ? formitem.ExamineCondition.Content
                    : nodata
                }}
                <!-- 跳转详情 -->
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="详情"
                  placement="top-start"
                >
                  <div
                    class="link"
                    @click="
                      opendetail(
                        '考核情况',
                        {
                          ONEMENU: '考核情况',
                          TWOMENU: '上昼夜考核情况',
                          THREEMENU: '上昼夜+本周',
                          Detail: formitem.ExamineCondition.Detail,
                        },
                        formitem.ExamineCondition.Content
                      )
                    "
                  >
                    <span class="icon iconfont edit">&#xe73b;</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <!-- 工作安排数据展示 -->
            <div class="overview boxview" id="工作安排">
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">工作安排</span>
              </div>
              <div class="lists">
                {{
                  formitem.WorkArrangement.CompanyInspection.Content
                    ? formitem.WorkArrangement.CompanyInspection.Content
                    : nodata
                }}
                <!-- 跳转详情 -->
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="详情"
                  placement="top-start"
                >
                  <div
                    class="link"
                    @click="
                      opendetail(
                        '工作安排',
                        {
                          ONEMENU: '工作安排',
                          TWOMENU: '公司级检查',
                          THREEMENU: '公司级检查',
                          Detail:
                            formitem.WorkArrangement.CompanyInspection.Detail,
                        },
                        formitem.WorkArrangement.CompanyInspection.Content
                      )
                    "
                  >
                    <span class="icon iconfont edit">&#xe73b;</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <!-- 其它部门上报数据展示 -->
            <div class="overview boxview" id="其它部门上报">
              <!-- 跳转详情 -->
              <el-tooltip
                class="box-item"
                effect="dark"
                content="详情"
                placement="top-start"
              >
                <div
                  class="link"
                  @click="
                    opendetail('其它部门上报', {
                      ONEMENU: '',
                      TWOMENU: '',
                      THREEMENU: '',
                      Detail: formitem.OtherDepartments.Detail,
                    })
                  "
                >
                  <span class="icon iconfont edit">&#xe73b;</span>
                </div>
              </el-tooltip>
              <div class="lefttopimg1">
                <span class="title1_grade">上班次情况</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">其它部门上报</span>
              </div>
              <div class="lists">
                {{
                  formitem.OtherDepartments.Content
                    ? formitem.OtherDepartments.Content
                    : nodata
                }}
              </div>
            </div>
          </div>
          <!-- 下班次情况 -->
          <div class="views" id="下班次安排">
            <!-- 标题 -->
            <div class="titlelist">
              <img
                class="titleicon1"
                src="@/assets/Image/lian_images/联想切图_42-66.png"
                alt=""
              />
              <div class="viewtitle">
                <span>下班次</span>
                <span>安排</span>
              </div>
            </div>
            <!-- 未完成事件数据展示 -->
            <div class="overview boxview" id="未完成事件">
              <div class="lefttopimg1">
                <span class="title1_grade">下班次安排</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">未完成事件</span>
              </div>
              <div class="lists">
                <!-- 工单未完成事件 -->
                <div class="unfinished">
                  <!-- 工单汇总 -->
                  <div class="summary">
                    <img src="@/assets/Image/lian_images/联想切图_36-57.png" />
                    <div class="result summarycontent">
                      {{
                        formitem.NoOkEvent.GdEvent.Content
                          ? formitem.NoOkEvent.GdEvent.Content.split("\n")[0]
                          : "工程未完成事件"
                      }}
                    </div>
                  </div>
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
                              <img
                                src="@/assets/Image/lian_images/联想切图_45.png"
                              />
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
                              <img
                                src="@/assets/Image/lian_images/联想切图_45.png"
                              />
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
                              <img
                                src="@/assets/Image/lian_images/联想切图_45.png"
                              />
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
                              <img
                                src="@/assets/Image/lian_images/联想切图_45.png"
                              />
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
                  <!-- 跳转详情 -->
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="详情"
                    placement="top-start"
                  >
                    <div
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
                            formitem.NoOkEvent.GdEvent.GdEventgq_Detail,
                        })
                      "
                    >
                      <span class="icon iconfont edit">&#xe73b;</span>
                    </div>
                  </el-tooltip>
                </div>
                <!-- 技术维保事件 -->
                <div class="technical" id="技术维保事件">
                  <div class="summary">
                    <img src="@/assets/Image/lian_images/联想切图_36-54.png" />
                    <div class="result">技术维保事件</div>
                    <!-- 工单详细 -->
                    <div class="detail pre">
                      {{
                        formitem.NoOkEvent.TechnologyWxEvent.Content
                          ? formitem.NoOkEvent.TechnologyWxEvent.Content
                          : nodata
                      }}
                    </div>
                  </div>
                  <!-- 跳转详情 -->
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="详情"
                    placement="top-start"
                  >
                    <div
                      class="link"
                      @click="
                        opendetail(
                          '技术维保事件',
                          {
                            ONEMENU: '未完成事件',
                            TWOMENU: '技术维保未完成事件',
                            THREEMENU: '技术维保进行中',
                            Detail: formitem.NoOkEvent.TechnologyWxEvent.Detail,
                          },
                          formitem.NoOkEvent.TechnologyWxEvent.Content
                        )
                      "
                    >
                      <span class="icon iconfont edit">&#xe73b;</span>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <!-- 计划事件数据展示 -->
            <div class="overview boxview">
              <div class="lefttopimg1">
                <span class="title1_grade">下班次安排</span>
                <span class="title2_grade">/</span>
                <span class="title3_grade">计划事件</span>
              </div>
              <div class="lists plans" id="计划事件">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div class="planlist">
                        <div class="plantitle">升级工单</div>
                        <div class="plandetail">
                          {{
                            formitem.PlanEvent.UpgradesGd.Content
                              ? formitem.PlanEvent.UpgradesGd.Content
                              : nodata
                          }}
                        </div>
                        <div>
                          <img
                            src="@/assets/Image/lian_images/联想切图_33-30.png"
                          />
                        </div>
                      </div>
                      <!-- 跳转详情 -->
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="详情"
                        placement="top-start"
                      >
                        <div
                          class="link"
                          @click="
                            opendetail(
                              '升级工单',
                              {
                                ONEMENU: '计划事件',
                                TWOMENU: '升级工单',
                                THREEMENU: '升级工单',
                                Detail: formitem.PlanEvent.UpgradesGd.Detail,
                              },
                              formitem.PlanEvent.UpgradesGd.Content
                            )
                          "
                        >
                          <span class="icon iconfont edit">&#xe73b;</span>
                        </div>
                      </el-tooltip>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div class="planlist">
                        <div class="plantitle">接待保障</div>
                        <div class="plandetail">
                          {{
                            formitem.PlanEvent.ReceptionGuarantee.Content
                              ? formitem.PlanEvent.ReceptionGuarantee.Content
                              : nodata
                          }}
                        </div>
                        <div>
                          <img
                            src="@/assets/Image/lian_images/联想切图_33-40.png"
                          />
                        </div>
                      </div>
                      <!-- 跳转详情 -->
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="详情"
                        placement="top-start"
                      >
                        <div
                          class="link"
                          @click="
                            opendetail(
                              '接待保障',
                              {
                                ONEMENU: '计划事件',
                                TWOMENU: '接待保障',
                                THREEMENU: '接待保障',
                                Detail:
                                  formitem.PlanEvent.ReceptionGuarantee.Detail,
                              },
                              formitem.PlanEvent.ReceptionGuarantee.Content
                            )
                          "
                        >
                          <span class="icon iconfont edit">&#xe73b;</span>
                        </div>
                      </el-tooltip>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="always">
                      <div class="planlist">
                        <div class="plantitle">其他部门上报</div>
                        <div class="plandetail">
                          {{
                            formitem.PlanEvent.otherDepartmentReport.Content
                              ? formitem.PlanEvent.otherDepartmentReport.Content
                              : nodata
                          }}
                        </div>
                        <div>
                          <img
                            src="@/assets/Image/lian_images/联想切图_33.png"
                          />
                        </div>
                      </div>
                      <!-- 跳转详情 -->
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="详情"
                        placement="top-start"
                      >
                        <div
                          class="link"
                          @click="
                            opendetail(
                              '其他部门上报',
                              {
                                ONEMENU: '计划事件',
                                TWOMENU: '其他部门上报',
                                THREEMENU: '其他部门上报',
                                Detail:
                                  formitem.PlanEvent.otherDepartmentReport
                                    .Detail,
                              },
                              formitem.PlanEvent.otherDepartmentReport.Content
                            )
                          "
                        >
                          <span class="icon iconfont edit">&#xe73b;</span>
                        </div>
                      </el-tooltip>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-container>
    <div class="audios">
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
      <audio
        controls="controls"
        ref="audioElement"
        controlsList="nodownload noplaybackrate"
      >
        <source :src="audiourl" />
      </audio>
    </div>
    <!-- <div  style="overflow: hidden">
      <NoPermissions />
    </div> -->
  </div>
</template>

<script>
import userExit from "@/components/userExit.vue";
import { useRouter, useRoute } from "vue-router";
import { reactive, toRefs, onMounted, onUnmounted, nextTick, ref } from "vue";
import NoPermissions from "./no_permissions.vue";
import url from "@/http/url";
import http from "@/http";
import lunar from "chinese-lunar-calendar";
import {
  ElConfigProvider,
  ElMessageBox,
  ElLoading,
  ElMessage,
} from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import database from "@/utils/database.ts";
import * as echarts from "echarts";
import axios from "axios";

import TTSRecorder from "@/utils/TTSRecorder.js";

export default {
  components: {
    ElConfigProvider,
    userExit,
    NoPermissions,
    ArrowDown,
  },
  setup() {
    const ttsRecorder = new TTSRecorder();
    const { tokenURL } = url;
    const { listdata } = database;
    const audioElement = ref(null);
    const hwchart = ref(null);
    const gdchart = ref(null);
    const area = ref(null);
    const data = reactive({
      HWMSG: "",
      GDMSG: "",
      IsVolumn: true, //判断获取音频接口是否正常
      GDSUM: "", //工单总量
      HBDATA: "", //工单环比值
      TBDATA: "", //工单同比值
      HWSUM: "", //话务总量
      HBSTATUS: "", //话务环比状态
      TBSTATUS: "", //话务同比状态
      HBDATA1: "", //话务环比值
      TBDATA1: "", //话务同比值
      nodata: "",
      qaselectindex: null, //菜单选中
      selectindex: null,
      selectname: null, //播放选中
      handoverDate: "",
      uninishedcount: null, //未完成事件单数
      menuaudiolist: [
        { name: "早安", url: "", content: "" },
        { name: "整体情况", url: "", content: "" },
        { name: "关注事件", url: "", content: "" },
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
      menulist: [
        {
          name: "交班总览",
          icon: "icon-zonglan",
          children: [
            {
              name: "整体情况",
              icon: "icon-zhengtiqingkuang",
              url: "",
              key: 1,
            },
            { name: "关注事件", icon: "icon-zhongyaoshijian", url: "", key: 2 },
            { name: "领导指示", icon: "icon-lingdaozhishi", url: "", key: 3 },
          ],
        },
        {
          name: "上班次情况",
          icon: "icon-jiaobanjiaojie",
          children: [
            { name: "安全交班", icon: "icon-anquan", url: "", key: 4 },
            { name: "话务交班", icon: "icon-huawu", url: "", key: 5 },
            { name: "工单交班", icon: "icon-jiaoban", url: "", key: 6 },
            { name: "升级交班", icon: "icon-shengji", url: "", key: 7 },
            { name: "巡检交班", icon: "icon-xunjian", url: "", key: 8 },
            { name: "接待保障", icon: "icon-gongwujiedai", url: "", key: 9 },
            { name: "营销交班", icon: "icon-yingxiao", url: "", key: 10 },
            { name: "项目交班", icon: "icon-xiangmu1", url: "", key: 11 },
            { name: "事项清单", icon: "icon-yibanshixiang", url: "", key: 12 },
            { name: "考核情况", icon: "icon-kaoheren", url: "", key: 13 },
            { name: "工作安排", icon: "icon-gongzuoanpai", url: "", key: 14 },
            {
              name: "其它部门上报",
              icon: "icon-qitashangbao",
              url: "",
              key: 15,
            },
          ],
        },
        {
          name: "下班次安排",
          icon: "icon-banjixinxi",
          children: [
            { name: "未完成事件", icon: "icon-weiwancheng", url: "", key: 16 },
            { name: "计划事件", icon: "icon-jihuashu", url: "", key: 17 },
          ],
        },
      ],
      nowdate: null,
      nowweek: null,
      lunars: null,
      username: "",
      status: "上班次公司整体运转情况良好",
      status1: "上班次无重要事件",
      status2: "上班次无领导指示内容",
      audiourl: "",
      formitem: { ...listdata.data },
      chardata1: [],
      chardata2: [],
      hwXArea: [],
      chardata3: [],
      chardata4: [],
      gdXArea: ["受理类工单", "管理类工单", "自动工单"],
      token: null,
      pdate: null,
      msgerr: null,
    });
    let hwCharts = null,
      gdCharts;
    let loading = null;
    onMounted(() => {
      data.qaselectindex = data.menuaudiolist[0].name;
      data.selectname = data.menuaudiolist[0].name;

      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let M =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let week = date.getDay();

      data.username = "Nobody";

      data.handoverDate = `${year}-${month}-${day}`;
      data.nowdate = `${year}.${month}.${day} ${H}:${M}`;
      data.nowweek = `${getWeek(week)}`;
      data.lunars = lunar.getLunar(year, month, day).dateStr;

      //开启监测音频
      playaudiostatus();

      //获取工单图表相关数据接口
      getGDChartData();
    });
    // 可以await sleep 可以让程序暂停执行1.5s
    const sleep = () => {
      return new Promise((resolve) => setTimeout(resolve, 1500));
    };
    //获取token
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
      loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let dates = new Date(data.handoverDate);
      let year = dates.getFullYear();
      let month =
        dates.getMonth() + 1 > 9
          ? dates.getMonth() + 1
          : "0" + (dates.getMonth() + 1);
      let day = dates.getDate() > 9 ? dates.getDate() : "0" + dates.getDate();
      data.pdate = `${year}-${month}-${day}`;
      // 获取token
      await refreshToken().then((r) => {
        data.token = r;
      });

      // 获取页面基础数据
      // await getContentByDates();
      await getContentByDates_new();
      console.log("data", data);
      // 获取话务图表数据
      await getHWChartData();

      // 赋值工单图表
      data.GDSUM = data.formitem.GdJb.GdNumSum.gdsunm; // 工单总数
      data.HBDATA = data.formitem.GdJb.GdNumSum.hb; // 环比
      data.TBDATA = data.formitem.GdJb.GdNumSum.tb; // 同比
      let gdtbsum = JSON.parse(data.formitem.GdJb.Gdtb.GdTbsum);
      let gdtbjs = JSON.parse(data.formitem.GdJb.Gdtb.GdTbjs);
      data.chardata3 = gdtbsum.map(Object.values).flat(); // echart 同期总量
      data.chardata4 = gdtbjs.map(Object.values).flat(); // echart 同期基数
      console.log("data.chardata3", data.chardata3);
      console.log("data.chardata4", data.chardata4);
      gdchartbox(); // 赋值图
      // 获取语音文本
      await getVoiceContentText();
    };

    //获取话务图表相关数据接口
    const getHWChartData = async () => {
      data.HWSUM = null;
      data.HWMSG = "";
      try {
        let arr = JSON.parse(
          data.formitem.HwJb.hwtb.HWCHARTDATA.replace(/\\/g, "")
        ).reverse();
        let { hwtbstate, hwtbnum, hwsum, hwhbstate, hwhbnum } =
          data.formitem.HwJb.hwhb;
        data.HWSUM = hwsum;
        data.HBSTATUS = hwhbstate; // 环比状态
        data.TBSTATUS = hwtbstate; // 同比状态
        //同比 工单数量
        data.TBDATA1 = hwtbnum;
        //环比 工单数量
        data.HBDATA1 = hwhbnum;

        data.hwXArea = [];
        data.chardata1 = [];
        data.chardata2 = [];
        arr.forEach((item) => {
          data.hwXArea.push(item.hours);
          data.chardata1.push(item.HWSUM);
          data.chardata2.push(item.HWJS);
        });
        hwchartbox();
      } catch (e) {
        console.log(e);
        alert("数据异常,请联系管理员");
      }
    };

    // 获取文本数据
    const getContentByDates_new = async () => {
      await http
        .get(`FWDApex/znjbNew/getContentAndDetaillByDate?pdate=${data.pdate}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          withCredentials: false,
        })
        .then((res) => {
          console.log("pc数据返回new", res);
          console.log("开始时间", new Date().getTime());
          const byteCharacters = atob(res);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const decoder = new TextDecoder("utf-8");
          const jsonString = decoder.decode(byteArray);

          // 解析JSON字符串为JSON对象
          let jsonData = JSON.parse(jsonString);

          console.log(jsonData);
          console.log("结束时间", new Date().getTime());
          data.formitem = Object.assign(
            {},
            { ...data.formitem },
            { ...jsonData.data }
          );
          data.nodata = "暂无数据！";
          console.log("data.formitem", data.formitem);
        })
        .catch((err) => {
          data.nodata = "暂无数据！";
          loading.close();
        });
    };

    //开启监测音频
    const playaudiostatus = () => {
      audioElement.value.addEventListener("ended", onAudioEnded);
    };
    //关闭监测音频
    const endaudiostatus = () => {
      audioElement.value.removeEventListener("ended", onAudioEnded);
    };

    // 音频播放结束时的处理函数
    const onAudioEnded = () => {
      console.log("音频播放结束了");
      let len = data.menuaudiolist.length;
      data.selectindex = data.menuaudiolist.findIndex(
        (item) => item.name === data.selectname
      );
      if (data.selectindex + 1 < len) {
        let item = data.menuaudiolist[data.selectindex + 1];
        playaudio(item);
      }
    };

    const getWeek = (w) => {
      let res = "";

      switch (w) {
        case 1:
          res = "星期一";
          break;
        case 2:
          res = "星期二";
          break;
        case 3:
          res = "星期三";
          break;
        case 4:
          res = "星期四";
          break;
        case 5:
          res = "星期五";
          break;
        case 6:
          res = "星期六";
          break;
        case 7:
          res = "星期日";
          break;
      }

      return res;
    };

    //退出事件
    const exitbtn = () => {
      // sessionStorage.clear();
    };

    //点击菜单切换
    const handleSelect = (m) => {
      data.qaselectindex = m.name;
      console.log("m", m);
      const element = document.querySelector("#" + data.qaselectindex);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      let timeoutID = 0;
      if (m.name == "工单交班") {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          document
            .querySelector("#受理类工单")
            .scrollIntoView({ behavior: "smooth" });
        }, 19000);
      }
    };

    //播放全局音频
    const playaudio = (m) => {
      data.selectname = m.name;
      handleSelect(m);
      let list = data.menuaudiolist.filter((l) => {
        return l.name == data.qaselectindex;
      });
      data.audiourl = list[0].url;
      nextTick(() => {
        audioElement.value.load();
        audioElement.value.play();
        playaudiostatus();
      });
    };
    let num = 0,
      times = null;
    //获取音频接口
    const getVoiceContentText = async () => {
      ttsRecorder.SetRuns();
      data.qaselectindex = null;
      data.audiourl = null;
      audioElement.value.load();
      ttsRecorder.setbasefile();
      data.menuaudiolist = [
        { name: "早安", url: "", content: "", keyword: "za" },
        { name: "整体情况", url: "", content: "", keyword: "ztqk" },
        { name: "关注事件", url: "", content: "", keyword: "gzsj" },
        { name: "领导指示", url: "", content: "", keyword: "ldzs" },
        { name: "安全交班", url: "", content: "", keyword: "aqjb" },
        { name: "话务交班", url: "", content: "", keyword: "hwjb" },
        { name: "工单交班", url: "", content: "", keyword: "gdjb" },
        { name: "升级交班", url: "", content: "", keyword: "sjjb" },
        { name: "巡检交班", url: "", content: "", keyword: "xjjb" },
        { name: "接待保障", url: "", content: "", keyword: "jdbz" },
        { name: "营销交班", url: "", content: "", keyword: "yxjb" },
        { name: "项目交班", url: "", content: "", keyword: "xmjb" },
        { name: "事项清单", url: "", content: "", keyword: "sxqd" },
        { name: "考核情况", url: "", content: "", keyword: "khqk" },
        { name: "工作安排", url: "", content: "", keyword: "gzap" },
        { name: "其它部门上报", url: "", content: "", keyword: "qtbmsb" },
        { name: "未完成事件", url: "", content: "", keyword: "wwcsj" },
        { name: "计划事件", url: "", content: "", keyword: "jhsj" },
      ];
      num = 0;
      setTimeout(() => {
        getData();
      }, 500);
    };

    const getData = async () => {
      let arr = [...data.menuaudiolist];
      console.log("arrdata.menuaudiolist", arr, arr.length);
      while (num < arr.length) {
        await http
          .get(
            `FWDApex/znjbNew/getContentVoiceByDate?pdate=${data.pdate}&pmenu=${arr[num].keyword}`,
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
              withCredentials: false,
            }
          )
          .then((res) => {
            console.log("res-Base64-new", res);
            console.log("num", num);
            if (res.code == undefined) {
              data.menuaudiolist[num].url = "data:video/mp4;base64," + res;

              if (num == 0) {
                // 第一次请求
                setTimeout(() => {
                  loading.close();
                }, 300);
                data.audiourl = data.menuaudiolist[num].url;
                audioElement.value.load();
              }
              num++;
            }
          });
        // 睡1.5s
        await sleep();
      }
    };

    //查看详情弹窗
    const opendetail = (title, info, content) => {
      let { ONEMENU, TWOMENU, THREEMENU, Detail } = info;
      let message = Detail ? Detail : "暂无内容！";
      ElMessageBox.alert(message, title + "详情", {
        customClass: "detailMessage",
        showClose: false,
        confirmButtonText: "关闭",
        center: Detail ? false : true,
        customStyle: {
          width: Detail ? "auto" : "20%",
          maxWidth: "none",
        },
      });
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
          orient: "vertical",
          right: "right",
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
    //工单图表
    const gdchartbox = () => {
      nextTick(() => {
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
            orient: "vertical",
            right: "right",
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
      });
    };

    //更改日期
    const datechange = () => {
      data.qaselectindex = data.menuaudiolist[0].name;
      data.selectname = data.menuaudiolist[0].name;
      getGDChartData();
    };

    return {
      handleSelect,
      exitbtn,
      ...toRefs(data),
      hwchart,
      gdchart,
      getWeek,
      locale: zhCn,
      audioElement,
      playaudio,
      opendetail,
      area,
      datechange,
      getVoiceContentText,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #edf2fa;
  box-sizing: border-box;

  .link {
    cursor: pointer;
    color: #fff;
    background-image: url("@/assets/Image/lian_images/联想切图_42-69.png");
    background-repeat: no-repeat; /* 不重复 */
    background-size: 100% 100%; /* 覆盖整个元素 */
    background-position: center center; /* 居中放置 */
    width: 60px;
    height: 35px;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    right: -12px;
    box-sizing: border-box;
    z-index: 1;

    span {
      font-size: 23px;
      // &:hover {
      //   color: #2d84fd;
      // }
    }
  }

  .links {
    position: absolute;
    top: 5px;
    right: 8px;
    cursor: pointer;
    color: #cecece;
    font-size: 14px;

    span {
      font-size: 30px;

      &:hover {
        color: #2d84fd;
      }
    }
  }

  .spanlinks {
    cursor: pointer;
    color: #939090;
    font-size: 30px;

    &:hover {
      color: #2d84fd;
    }
  }

  .audios {
    width: 100%;
    background: rgba(244, 243, 243, 0.8);
    position: fixed;
    bottom: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    audio {
      width: 50%;
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
  }

  .logo {
    width: 28px;
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 8px;
    // cursor: pointer;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: #999;
    border-radius: 5px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #dedfe1;
    -webkit-box-shadow: #999;
    cursor: pointer !important;
  }

  .el-container {
    flex: 1;
    display: flex;
  }

  .aside {
    width: 270px;
    height: 100%;
    position: relative;
    display: flex;
    background-color: #0f7afd;
    color: #fff;
    justify-content: center;
    padding: 10px;

    box-sizing: border-box;

    .asidetop {
      width: 100%;
      display: flex;
      margin-bottom: 30px;
      padding-top: 10px;
      justify-content: center;

      .title {
        font-size: 20px;
      }
    }

    .menu {
      width: 100%;
      padding-bottom: 70px;

      .icons {
        color: #bfc9ed;
        margin-right: 8px;
        font-size: 22px;
      }

      .horns {
        font-size: 18px;
        margin-left: 10px;
        cursor: pointer;
      }

      * {
        font-size: 18px;
      }

      .menulist {
        width: 100%;
        padding-left: 30px;
        line-height: 40px;
        box-sizing: border-box;
      }

      .childmenu {
        width: 100%;
        cursor: pointer;

        div {
          line-height: 40px;
          padding-left: 40px;
          display: flex;
          // align-items: center;
        }
      }
    }
  }

  //显示区域
  .viewcontain {
    width: 100%;
    padding: 0 10px;
    padding-bottom: 30px;
    box-sizing: border-box;
    height: 100vh;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;

    .navtop {
      width: 100%;
      position: sticky;
      background-color: #edf2fa;
      top: 0;
      z-index: 5;
      padding-bottom: 10px;
      padding-top: 10px;
      overflow: auto;

      .navbars {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;

          .horn {
            cursor: pointer;
            width: 30px;
            margin-right: 5px;
          }

          span {
            font-size: 14px;
          }

          .nowtime {
            margin-left: 10px;
            font-weight: bolder;
          }
        }

        .right {
          .tops {
            display: none;
            align-items: center;
            padding-right: 40px;
            box-sizing: border-box;

            .username {
              font-size: 16px;
            }

            .usericon {
              margin: 0 5px 0 8px;
              width: 40px;
            }
          }
        }
      }

      .block {
        width: 350px;
        padding: 2px 20px;
        border-radius: 10px;
        margin-top: 10px;
        margin-left: 25px;
        background-color: #fff;
        box-shadow: 0 0 0 1px rgba(#cdcccc, 0.5);
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .demonstration {
          color: #bbb2a6;
        }

        .datetime {
          flex: 1;
        }

        .el-input__wrapper {
          color: #bbb2a6;
          background-color: transparent;
          box-shadow: none;

          .el-input__prefix {
            display: none;
          }
        }

        .dateicon {
          font-size: 20px;
          color: #a8a3ac;
        }
      }
    }

    .areas {
      background: #edf2fa;
      width: 100%;
      padding: 10px 30px;
      box-sizing: border-box;
      flex: 1;
      overflow: auto;

      .views {
        margin-top: 20px;

        // 交班总览标题
        .titlelist {
          position: relative;
          display: flex;
          align-items: center;
          line-height: 60px;
          margin-bottom: 10px;

          .titleicon {
            position: absolute;
            left: 0;
            top: 0;
            width: 148px;
            z-index: 1;
          }

          .titleicon1 {
            position: absolute;
            left: 2px;
            top: -7px;
            width: 163px;
            z-index: 1;
          }

          .viewtitle {
            padding-left: 20px;

            span {
              font-weight: bolder;
              font-size: 25px;

              &:nth-child(2) {
                color: #4934ec;
              }
            }
          }
        }

        //交班数据展示
        .overview {
          border: 2px solid #fff;
          background: linear-gradient(to bottom, #f2f3f7, #ffffff);
          border-radius: 10px;
          padding: 0px 20px;
          position: relative;

          .situation {
            min-height: 200px;
            border: 1px solid #fff;
            background: linear-gradient(to bottom, #f2f3f7, #ffffff);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 100px;
            // padding-bottom: 50px;
            position: relative;

            .leftimg {
              position: absolute;
              left: 0;
              top: 0;
              width: 100px;
            }

            .rightbottomimg {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 100px;
            }

            .righttopimg {
              background-image: url("@/assets/Image/lian_images/联想切图_42-69.png");
              background-repeat: no-repeat; /* 不重复 */
              background-size: 100% 100%; /* 覆盖整个元素 */
              background-position: center center; /* 居中放置 */
              width: 60px;
              height: 35px;
              position: absolute;
              right: -12px;
              top: 8px;
              z-index: 1;
              display: flex;
              align-items: center;
              padding-left: 10px;
              padding-top: 8px;
              box-sizing: border-box;
              cursor: pointer;

              .edit {
                color: #fff;
                font-size: 25px;
              }
            }

            .lefttopimg,
            .lefttopimg1 {
              background-image: url("@/assets/Image/lian_images/联想切图_99.png");
              background-repeat: no-repeat; /* 不重复 */
              background-size: 100% 100%; /* 覆盖整个元素 */
              background-position: center center; /* 居中放置 */
              width: 70px;
              height: 35px;
              position: absolute;
              left: -12px;
              top: 8px;
              z-index: 1;
              display: flex;
              align-items: center;
              padding-left: 10px;
              padding-top: 8px;
              box-sizing: border-box;

              .edit {
                color: #fff;
                font-size: 25px;
              }
            }

            .face {
              position: absolute;
              margin-top: -61px;

              img {
                width: 130px;
                margin: 0 10px;
              }
            }

            .title {
              font-size: 30px;
              font-weight: bolder;
              color: #333;
              margin: 10px;
            }

            .alltitle {
              margin-top: 80px;
            }
          }

          .s0 {
            padding-bottom: 50px;
          }

          .overviewlist {
            width: 100%;
            display: flex;
            margin: 20px 0;

            .s1 {
              flex: 3;
              padding-top: 60px;
            }

            .s2 {
              margin-left: 40px;
              padding-top: 60px;
              flex: 2;
            }
          }
        }

        //上班次、下班次
        .boxview {
          position: relative;
          padding: 60px 0 40px 0;
          margin-bottom: 20px;
          border: 2px solid #fff;

          .lefttopimg1 {
            background-image: url("@/assets/Image/lian_images/联想切图_99.png");
            background-repeat: no-repeat; /* 不重复 */
            background-size: 100% 100%; /* 覆盖整个元素 */
            background-position: center center; /* 居中放置 */
            // width: 200px;
            padding-right: 20px;
            height: 50px;
            position: absolute;
            left: -18px;
            top: 8px;
            z-index: 1;
            display: flex;
            align-items: center;
            padding-left: 10px;
            padding-top: 15px;
            box-sizing: border-box;

            .title3_grade {
              color: #fff;
              font-size: 14px;
            }

            .title2_grade {
              margin: 0 5px;
              color: #fff;
              font-size: 18px;
            }

            .title1_grade {
              color: #c4cded;
              font-size: 14px;
            }
          }

          .lists {
            margin-top: 20px;
            padding: 0 20px;

            .val1 {
              div {
                display: flex;
                align-items: center;

                img {
                  width: 15px;
                  margin-right: 5px;
                }
              }
            }

            .cardlist {
              margin: 30px 0 30px 0;

              .link {
                right: -30px;
                top: -15px;
              }
            }

            .unfinished,
            .technical {
              width: 100%;
              display: flex;
              flex-direction: column;
              // align-items: center;
              margin-bottom: 20px;
              position: relative;

              .title {
                text-align: center;
                margin: 10px 0;
                font-size: 18px;
              }

              .val1 {
                padding: 5px;
                box-sizing: border-box;

                div {
                  border-radius: 8px;
                  padding: 10px;
                  background-color: #f7f7fa;
                  display: flex;
                  align-items: center;
                  vertical-align: middle;

                  img {
                    width: 15px;
                    margin-right: 5px;
                  }
                }
              }

              .panel {
                display: flex;

                .pitem {
                  background: #fff;
                  padding: 5px;
                  border-radius: 5px;
                  flex: 1;
                  margin: 5px;
                }
              }

              .summary {
                display: flex;
                flex-direction: column;
                align-items: center;
                // margin-bottom: 30px;

                img {
                  width: 60px;
                }

                .result {
                  margin-top: 10px;
                  font-weight: bolder;
                  font-size: 16px;
                }
              }
            }

            .planlist {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;

              .plantitle {
                font-size: 25px;
                font-weight: bolder;
                text-align: center;
              }

              .plandetail {
                margin: 20px 0;
              }

              img {
                width: 50px;
              }
            }

            .details {
              margin-top: 10px;

              .items {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;

                .content {
                  width: 100%;
                  height: 100%;
                  position: relative;
                }

                .gtitle {
                  width: 200px;
                  height: 60px;
                  background-image: url("@/assets/Image/lian_images/联想切图_90.png");
                  background-repeat: no-repeat; /* 不重复 */
                  background-size: 100% 100%; /* 覆盖整个元素 */
                  font-size: 16px;
                  font-weight: bolder;
                  color: #0f7afd;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  // line-height: 30px;
                  padding-top: 17px;
                  padding-left: 8px;
                  box-sizing: border-box;

                  img {
                    width: 20px;
                    margin-right: 5px;
                  }
                }

                .detailcard {
                  color: #333;
                  border-radius: 8px;
                  display: flex;
                  flex-direction: column;
                  align-content: space-between;

                  .el-card__body {
                    justify-content: space-between;
                  }
                }
              }
            }

            .xjlist {
              position: relative;
              display: flex;
              align-items: flex-start;
              // line-height: 45px;
              margin-bottom: 20px;

              .mark {
                width: 45px;
                height: 40px;
                background-image: url("@/assets/Image/lian_images/联想切图_10.png");
                background-repeat: no-repeat; /* 不重复 */
                background-size: 100% 100%; /* 覆盖整个元素 */
                margin-right: 5px;
                margin-top: 5px;
              }

              .key {
                height: 45px;
                white-space: nowrap;
                margin-right: 50px;
                font-weight: bolder;
                display: flex;
                align-items: center;
              }

              .val {
                padding-top: 3px;
              }
            }

            .yxlist {
              position: relative;
              padding: 0 150px;
              box-sizing: border-box;

              .el-card {
                background-color: #f2f2f2;
                border: transparent;
                overflow: visible;
              }

              .yxcard {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 200px;
                position: relative;

                .link {
                  right: -30px;
                  top: -15px;
                }

                .titleicon {
                  margin-top: -50px;
                  position: relative;
                }

                img {
                  width: 40px;
                }

                .gyx {
                  margin-top: -50px;

                  img {
                    width: 45px;
                  }
                }

                .title {
                  font-weight: bolder;
                  font-size: 15px;
                  margin: 10px 0 20px 0;
                }

                .detail {
                  font-size: 14px;
                  flex: 1;
                  overflow: auto;
                  overflow-x: hidden;
                  word-break: break-all;
                  white-space: pre-line;
                }
              }
            }

            .sxlist {
              position: relative;

              .el-card {
                background-color: #fff;
                border: transparent;
                overflow: visible;
                position: relative;

                .keyzl {
                  background-image: url("@/assets/Image/lian_images/联想切图_13.png");
                }

                .keybm {
                  background-image: url("@/assets/Image/lian_images/联想切图_16.png");
                }

                .keyzl,
                .keybm {
                  width: 45px;
                  height: 35px;
                  background-repeat: no-repeat; /* 不重复 */
                  background-size: 100% 100%; /* 覆盖整个元素 */
                  padding-left: 26px;
                  box-sizing: border-box;
                  white-space: nowrap;
                  font-weight: bolder;
                  display: flex;
                  align-items: center;
                  padding-bottom: 5px;
                  box-sizing: border-box;
                  font-size: 18px;
                }

                .keyzl {
                  width: 45px;
                  height: 45px;
                }

                .val,
                .val1 {
                  border-radius: 8px;
                }

                .val {
                  padding: 10px;
                  margin-top: 10px;
                  background-color: #f7f7fa;
                }

                .val1 {
                  padding: 5px;
                  box-sizing: border-box;

                  div {
                    border-radius: 8px;
                    padding: 10px;
                    background-color: #fff0dc;
                  }
                }

                .detail {
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                }
              }
            }

            .hwlist {
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              position: relative;

              .content {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
              }

              .pline,
              .wline {
                margin-top: -22px;
                width: 130px;
                border-radius: 8px;
              }

              .pline {
                border: 4px solid #37c47c;
              }

              .wline {
                border: 4px solid #ceb019;
              }

              .title {
                font-size: 16px;
                font-weight: bolder;
                margin: 20px 0;
              }

              .detail {
                width: 100%;
              }
            }

            .hwcharts {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 35vh;

              .hwtotals {
                display: flex;
                flex-direction: column;
                align-items: center;

                .title {
                  font-weight: bolder;
                  font-size: 20px;
                }

                .sums {
                  font-size: 30px;
                  color: #1446c7;
                }
              }

              .hwpercent {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;

                .imgs {
                  margin: 10px 0px;
                  margin-top: 30px;

                  img {
                    width: 160px;
                  }
                }

                .title {
                  font-weight: bolder;
                  font-size: 18px;
                }

                .sums1 {
                  font-size: 30px;
                  color: #f54e18;
                }

                .sums2 {
                  font-size: 30px;
                  color: #007a85;
                }

                .lf {
                  // margin-left: 100px;
                }
              }
            }

            .el-card {
              position: relative;
            }
          }
        }
      }
    }
  }

  //菜单激活状态
  .isactive {
    background-color: #fff;
    color: rgba(74, 86, 235);

    .icons {
      color: rgba(74, 86, 235) !important;
    }

    // padding: 0 20px;
    border-radius: 18px;
    width: 100%;
  }

  .el-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: visible;

    .el-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }

  .loadinggif {
    position: absolute;
    left: -10px;
    width: 60px;
  }

  .chartsloading {
    width: 30%;
    margin: 0 auto;
  }

  .icon-xunjian_name {
    margin-left: -2px;
  }

  .pre {
    line-height: 1.8;
    font-weight: normal;
  }

  .summarycontent {
    // padding-left: 80px;
  }

  .refresh {
    cursor: pointer;
    font-size: 20px;
    font-weight: bolder;
  }

  .warnmsg {
    margin-left: 10px;
    cursor: default;
  }

  white-space: pre-line;
}
</style>
