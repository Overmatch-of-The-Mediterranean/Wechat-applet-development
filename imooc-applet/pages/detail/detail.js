
Page({
 data: {
  id: undefined
  },
  onLoad(options){
    // console.log(options);
    this.setData({
      id:options.id
    })
  }
})