// index.js
// 获取应用实例
const app = getApp()

Page({
  data:{
    type:'recommend',
    showIcon:true,
    swiperList:[],
    courses:[],
    activities:[],
    searchList:null,
    tabs:[
      {name:'推荐',type:'recommend'},
      {name:'路径',type:'path'},
      {name:'实战',type:'project'},
      {name:'活动',type:'activity'}
    ]
  },
  onLoad(e){
    // 请求接口，得到数据，并解构赋值，然后替换数据
    wx.request({
      url: 'https://www.fastmock.site/mock/e85283acd24926300e4c1ced32faffa5/weixin/api/getData',
      success:(res)=>{
        const {data:{data}}=res
        const {swiperList,courses,activities}=data
        this.setData({
          swiperList,
          courses,
          activities
        })
      }
    })
  },
  handleInputChange(e){
    // console.log(e);
    const value = e.detail.value;
    let searchList = null;
    if(value) {
      searchList = this.data.courses.filter(item=>item.title.indexOf(value)>-1)
    }
    this.setData({
        showIcon:value? false:true,
        searchList
      })
  },

  // 改变小横杠的位置
  changeType(e){
    // console.log(e);
    const type = e.currentTarget.dataset.type
    this.setData({type})
  },
  handleCourseTap(e) {
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})
