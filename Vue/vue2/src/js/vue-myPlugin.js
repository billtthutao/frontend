(function(){
    const MyPlugin = {} //需要向外暴露的插件对象

    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod1 = function () {
          console.log('myGlobalMethod1')
        }
        Vue.myGlobalMethod2 = function () {
            console.log('myGlobalMethod2')
          }
      
        // 2. 添加全局资源
        Vue.directive('text-upper', function(el,binding){
            console.log('my-directive1')
            el.textContent = binding.value.toUpperCase()
        })
        Vue.directive('text-lower', function(el,binding){
            console.log('my-directive2')
            el.textContent = binding.value.toLowerCase()
        })
      
        // 3. 注入组件选项
        // Vue.mixin({
        //   created: function () {
        //     // 逻辑...
        //   }
        //   ...
        // })
      
        // 4. 添加实例方法
        Vue.prototype.$myMethod1 = function (methodOptions) {
          console.log('vue实例方法1')
        }
        Vue.prototype.$myMethod2 = function (methodOptions) {
            console.log('vue实例方法2')
        }
    }

    //向外暴露插件
    window.MyPlugin = MyPlugin
})()