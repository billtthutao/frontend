<!--Message Detail  -->
<template>
<div class='msg-detail'>
    <span>Message Detail: {{this.$route.params.id}}</span>
    <ul>
        <li>id:{{msg.id}}</li>
        <li>title:{{msg.title}}</li>
        <li>content:{{msg.content}}</li>
    </ul>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    msg: {}
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    $route: function(value){
              this.msg = this.messageList.find(msg => msg.id === value.params.id*1)
    }
},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    setTimeout(()=>{
        this.messageList = [
        {
          id: 1,
          title: 'message001',
          content:'NBA Basketball'
        },
        {
          id: 2,
          title: 'message002',
          content: 'FiFA Football'
        },
        {
          id: 3,
          title: 'message003',
          content: 'Content of Message003'
        },
      ];
    },1000)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>