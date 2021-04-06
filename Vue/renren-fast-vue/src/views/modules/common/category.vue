<!-- 公共树形菜单 -->
<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      :data="products"
      :props="defaultProps"
      :expand-on-click-node="false"
      node-key="catId"
      :default-expanded-keys="expandedKeys"
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="nodeClick"
    ></el-tree>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    //这里存放数据
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      expandedKeys: [],
      products: [],
      filterText: ''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  //watch: {},
  //方法集合
  methods: {
    // 获取商品列表
    getProductList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/product/category/list/tree"),
        method: "get"
      }).then(({ data }) => {
        console.log(data);
        this.products = data.data;
      });
    },
    nodeClick(data, node, component) {
      //将点击节点事件传递给父组件去处理
      this.$emit("tree-node-click", data, node, component);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getProductList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>