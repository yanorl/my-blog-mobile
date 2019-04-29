import MyLoading from './Loading.vue'
let instance = null

export default {
  install(Vue, options){
    if(!instance){
      let MyLoadingComponent = Vue.extend(MyLoading)
      instance = new MyLoadingComponent({
        el: document.createElement('div'),  //创建一个div元素，并挂载上去
      })
      document.body.appendChild(instance.$el)
      //var testObj = new MyLoadingComponent().$mount(doucment.createElement('div'))
      //console.log(testObj)
      //挂载到页面有两种方式一种就是appendChil到页面某个元素，另一种就是new了实例之后使用$mount()方法挂载到某个元素，两种方法大同小异
    }
    // console.log(instance)
    instance.isShow = false   //默认false, 为关闭loading浮层显示

    /*
      instance为vue基础构造器（Vue.extend()) 创建出来的一个子类，里面有组件所以的参数（data, methods) 等
      我们instance 点参数名就直接能够修改组件内的参数或者执行方法

    */


    //通过自定义一些方法，来操作组件内部的一些参数或者方法
    let customMethods = {
      show(){
        instance.isShow = true
      },
      hide(){
        instance.isShow = false
      }
    }


    //挂载自定义方法到vue 实例上

    if (!Vue.$vLoading) {
      Vue.$vLoading = customMethods

      // Vue.mixin({
      //   created(){
      //     this.$vLoading = Vue.$vLoading
      //   }
      // })

      Vue.prototype.$vLoading = Vue.$vLoading
    }else{
      console.log('$vLoading方法被占用');
    }
  }
}