<template>
  <div class="debtmanage">
    <div class="debtmanage_nav">
      <div class="tab-item"
           v-for="(item,index) in tabList"
           v-model="debtLibraryTabIndex"
           v-bind:class="{active:(currentIndex == index)}"
           @click="onItemClick(index)">
        <span class="tab-link">{{item}}</span>
      </div>

    </div>
    <!--数据scroll盒子-->
    <!-- 已充电 -->
    <div id="mescroll0" class="  mescroll" v-show="currentIndex==0">
      <div id="dataList0">
        <ul v-for="(item,index) in newsList0" class="oul">
          <li>{{item.name}}</li>
          <li>{{item.age}}</li>
          <li>{{item.address}}</li>
        </ul>
      </div>
    </div>
    <!-- 待充电 -->
    <div id="mescroll1" class="  mescroll" v-show="currentIndex==1">
      <div id="dataList1">
        <ul v-for="(item,index) in newsList1" class="oul">
          <li>{{item.name}}</li>
          <li>{{item.age}}</li>
          <li>{{item.address}}</li>
        </ul>
      </div>
    </div>
    <!-- 异常 -->
    <div id="mescroll2" class=" mescroll" v-show="currentIndex==2">
      <div id="dataList2">
        <ul v-for="(item,index) in newsList2" class="oul" :key="index">
          <li>{{item.name}}</li>
          <li>{{item.age}}</li>
          <li>{{item.address}}</li>
        </ul>
      </div>
    </div>
    <!-- 异常 -->
    <div id="mescroll3" class=" mescroll" v-show="currentIndex==3">
      <div id="dataList3">
        <ul v-for="(item,index) in newsList3" class="oul" :key="index">
          <li>{{item.name}}</li>
          <li>{{item.age}}</li>
          <li>{{item.address}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import MeScroll from 'mescroll.js'

  export default {
    name: 'debtManage',
    data() {
      return {
        tabList: ['首页', '图书', '收藏','留言'],
        debtLibraryTabIndex: 0,
        currentIndex: 0,
        mescrollArr: new Array(4),		//4个菜单所对应的4个mescroll对象
        newsList0: [],
        newsList1: [],
        newsList2: [],
        newsList3: [],
        tabIndex: 0,
        factory_id: ''
      }
    },
    mounted() {
      console.log(this.$route.params.username)


      //根据tabIndex初始化首页
      let num = Number(this.$route.params.tabindex)
      this.tabIndex = num == 9 ? 0 : num || 0
      this.currentIndex = this.tabIndex
      this.debtLibraryTabIndex = this.tabIndex
      this.mescrollArr[this.tabIndex] = this.initMescroll("mescroll" + this.tabIndex, "dataList" + this.tabIndex)
    },
    methods: {
      onItemClick(index) {
        if (this.currentIndex != index) {
          this.currentIndex = index;
          if (this.mescrollArr[index] == null) {
            this.mescrollArr[index] = this.initMescroll("mescroll" + index, "dataList" + index);
          }
        }
      },
      initMescroll(mescrollId, clearEmptyId) {
        //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
        let mescroll = new MeScroll(mescrollId, {
          //下拉刷新的所有配置项
          down:{
            use: true, //是否初始化下拉刷新; 默认true
            auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
            autoShowLoading: true, //如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
            isLock: false, //是否锁定下拉,默认false;
            isBoth: false, //下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认false,两者不可同时触发;
            offset: 60, //触发刷新的距离,默认80
            outOffsetRate: 0.2, //超过指定距离范围外时,改变下拉区域高度比例;小于1,越往下拉高度变化越小;
            hardwareClass: "mescroll-hardware", //硬件加速样式;解决iOS下拉因隐藏进度条而闪屏的问题,参见mescroll.min.css
            warpClass: "mescroll-downwarp", //容器,装载布局内容,参见mescroll.min.css
            resetClass: "mescroll-downwarp-reset", //高度重置的动画,参见mescroll.min.css
            htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新</p>', //布局内容
            inited: function(mescroll, downwarp) {
              //console.log("down --> inited");
              //初始化完毕的回调,可缓存dom
              mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
              mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
            },
            inOffset: function(mescroll) {
              //console.log("down --> inOffset");
              //进入指定距离offset范围内那一刻的回调
              if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "下拉刷新";
              if(mescroll.downProgressDom) mescroll.downProgressDom.classList.remove("mescroll-rotate");
            },
            outOffset: function(mescroll) {
             // console.log("down --> outOffset");
              //下拉超过指定距离offset那一刻的回调
              if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "释放更新";
            },
            onMoving: function(mescroll, rate, downHight) {
              //下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离offset的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
             // console.log("down --> onMoving --> mescroll.optDown.offset="+mescroll.optDown.offset+", downHight="+downHight+", rate="+rate);
              if(mescroll.downProgressDom) {
                var progress = 360 * rate;
                mescroll.downProgressDom.style.webkitTransform = "rotate(" + progress + "deg)";
                mescroll.downProgressDom.style.transform = "rotate(" + progress + "deg)";
              }
            },
            beforeLoading: function(mescroll, downwarp) {
              //console.log("down --> beforeLoading");
              //准备触发下拉刷新的回调
              return false; //如果要完全自定义下拉刷新,那么return true,此时将不再执行showLoading(),callback();
            },
            showLoading: function(mescroll) {
              //console.log("down --> showLoading");
              //触发下拉刷新的回调
              if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "加载中 ...";
              if(mescroll.downProgressDom) mescroll.downProgressDom.classList.add("mescroll-rotate");
            }
          },
          //上拉加载的所有配置项
          up: {
            use: true, //是否初始化上拉加载; 默认true
            auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
            isLock: false, //是否锁定上拉,默认false;当列表没有更多数据时会自动锁定不可上拉;在endSuccess如果检查到有下一页数据,则会自动解锁true
            isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
            callback: this.getListData, //上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
            page: {
              num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
              size: 12, //每页数据条数
              time: null //加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
            },
            noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            offset: 100, //离底部的距离
            resetShowDownScroll: false, //重置上拉加载数据,是否显示下拉的进度布局;默认false,默认显示上拉加载的进度布局;
            /*toTop: {
              //回到顶部按钮,需配置src才显示
              src: "", //图片路径,默认null;
              offset: 1000, //列表滚动多少距离才显示回到顶部按钮,默认1000
              warpClass: "mescroll-totop", //按钮样式,参见mescroll.min.css
              showClass: "mescroll-fade-in", //显示样式,参见mescroll.min.css
              hideClass: "mescroll-fade-out", //隐藏样式,参见mescroll.min.css
              duration: 300 //回到顶部的动画时长,默认300ms
            },*/
            loadFull: {
              use: false, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
              delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
            empty: {
              //列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
              warpId:'webGame', //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
              icon: null, //图标,默认null
              tip: "暂无相关数据~", //提示
              btntext: "", //按钮,默认""
              btnClick: null, //点击按钮的回调,默认null
            },
            clearId: null, //加载第一页时需清空数据的列表id; 如果此项有值,将不使用clearEmptyId的值;
            clearEmptyId: "", //相当于同时设置了clearId和empty.warpId; 简化写法;
            hardwareClass: "mescroll-hardware", //硬件加速样式,动画更流畅,参见mescroll.min.css
            warpClass: "mescroll-upwarp", //容器,装载布局内容,参见mescroll.min.css
            htmlLoading: '<p class="upwarp-progress mescroll-rotate"><p class="upwarp-tip">加载中..</p></p>', //上拉加载中的布局
            htmlNodata: '<p class="upwarp-nodata">更多精彩敬请期待</p>', //无数据的布局
            inited: function(mescroll, upwarp) {
              //console.log("up --> inited");
              //初始化完毕的回调,可缓存dom 比如 mescroll.upProgressDom = upwarp.getElementsByClassName("upwarp-progress")[0];
            },
            showLoading: function(mescroll, upwarp) {
             // console.log("up --> showLoading");
              //上拉加载中.. mescroll.upProgressDom.style.display = "block" 不通过此方式显示,因为ios快速滑动到底部,进度条会无法及时渲染
              upwarp.innerHTML = mescroll.optUp.htmlLoading;
            },
            showNoMore: function(mescroll, upwarp) {
              //console.log("up --> showNoMore");
              //无更多数据
              upwarp.innerHTML = mescroll.optUp.htmlNodata;
            },
            onScroll: function(mescroll, y){ //列表滑动监听,默认onScroll: null;
              //y为列表当前滚动条的位置
             // console.log("up --> onScroll 列表当前滚动的距离 y = " + y);
            }
          }
        });
        return mescroll;
      },
      getListData(page) {
        //联网加载数据
        var self = this;
        var dataIndex = this.currentIndex; //记录当前联网的nav下标,防止快速切换时,联网回来curNavIndex已经改变的情况;
        this.getListDataFromNet(dataIndex, page.num, page.size, function (pageData) {
          self.mescrollArr[dataIndex].endSuccess(pageData.length);
          self.setListData(pageData, dataIndex, page);
        }, function () {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          self.mescrollArr[dataIndex].endErr();
        });
      },
      /*设置列表数据
       * pageData 当前页的数据
       * dataIndex 数据属于哪个nav */
      setListData(pageData, dataIndex, page) {
        //更新列表数据
        switch (dataIndex) {
          case 0:
            if (page.num == 1) this.newsList0 = [];
            this.newsList0 = this.newsList0.concat(pageData);
            break;
          case 1:
            if (page.num == 1) this.newsList1 = [];
            this.newsList1 = this.newsList1.concat(pageData);
            break;
          case 2:
          if (page.num == 1) this.newsList2 = [];
          this.newsList2 = this.newsList2.concat(pageData);
          break;
          case 3:
            if (page.num == 1) this.newsList3 = [];
            this.newsList3 = this.newsList3.concat(pageData);
            break;
        }
      },
      /*联网加载列表数据*/
      getListDataFromNet(curNavIndex, pageNum, pageSize, successCallback, errorCallback) {
        let listData = [];
        let that = this
        setTimeout(function(){
          that.$axios.get('./../../../static/data/info.json').then(res => {
            let data = res.data.info[0].msg;

            if (curNavIndex == 0){
              listData = data
            }else if (curNavIndex == 1){
              listData = data
            }else if(curNavIndex == 2){
              listData = data
            }else if (curNavIndex == 3){
              listData = data
            }
            successCallback&&successCallback(listData)
          })
        },1000)
      }
    },
  }
</script>
<style scoped lang="scss">
  $color: #00CFB5;
  /*模拟的标题*/
  .debtmanage {
    height:100%;
    display: flex;
    flex-direction: column;
    .debtmanage_nav {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 1rem;
      font-size: 0.28rem;
    }
    /*菜单*/
    .debtmanage_nav .tab-item {
      flex: 1;
      line-height: 1rem;
      text-align: center;
      font-size: .34rem;
    }
    .debtmanage_nav .active {
      border-bottom: 1px solid $color;
      color: $color;
    }
  }
</style>
