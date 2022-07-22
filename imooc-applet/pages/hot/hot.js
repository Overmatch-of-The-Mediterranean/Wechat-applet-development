Page({
  listData:{},
 data: {
   rankType: undefined,
   rankTypes:[{
       title:'实战排行',
       type:'project'
     },
     {
      title:'路径排行',
      type:'path'
    }],
    rankPeriod: undefined,
    rankPeriods:[{
      title:'周',
      value:'week'
    },
    {
      title:'月',
      value:'month'
    }],
    currentList:[]
  },
  onLoad() {
    wx.request({
      url: 'https://www.fastmock.site/mock/e85283acd24926300e4c1ced32faffa5/weixin/api/getRecommend',
      success:(res)=>{
        const {data:{data}}=res;
        this.listData=data;
        const rankPeriod = wx.getStorageSync('rankPeriod') || 'week';
        const rankType = wx.getStorageSync('rankType') || 'project';
        this.setData({
          rankPeriod,
          rankType
        })
        this.changeCurrentList(rankPeriod,rankType)
      }
    })
  },
  changeCurrentList(rankType,rankPeriod){
    let currentList = [];
    if(rankType==='project' && rankPeriod==='week') {
      currentList = this.listData.projectWeek;
    } else if(rankType==='project' && rankPeriod==='month') {
      currentList = this.listData.projectMonth;
    } else if(rankType==='path' && rankPeriod==='week') {
      currentList = this.listData.pathWeek;
    } else {
      currentList = this.listData.pathMonth;
    }
    this.setData({currentList});
  },
  handleTabChange(e) {
    const rankType = e.currentTarget.dataset.type;
    const {rankPeriod} = this.data;
    this.setData({
      rankType
    })
    wx.setStorage({
      data:rankType,
      key:'rankType'
    })
    this.changeCurrentList(rankType,rankPeriod);
  },
  handlePeriodChange(e) {
    const rankPeriod = e.currentTarget.dataset.value;
    const {rankType} = this.data;
    this.setData({
      rankPeriod
    })
    wx.setStorage({
      data:rankPeriod,
      key:'rankPeriod'
    })
    this.changeCurrentList(rankType,rankPeriod);
  }
})