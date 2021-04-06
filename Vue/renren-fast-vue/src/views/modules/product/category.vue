<!--  -->
<template>
  <div>
    <el-switch v-model="draggable" active-text="关闭拖拽" inactive-text="开启拖拽"></el-switch>
    <el-button type="primary" v-if="draggable" v-on:click="batchUpdate">批量更新</el-button>
    <el-button type="danger" v-on:click="batchDelete" :disabled="nodeSelectedList.length <= 0">批量删除</el-button>
    <el-tree
      :data="products"
      :props="defaultProps"
      :expand-on-click-node="false"
      show-checkbox
      node-key="catId"
      :default-expanded-keys="expandedKeys"
      @node-drop="handleDrop"
      @check-change="handleSelect"
      :draggable="draggable"
      :allow-drop="allowDrop"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="node.level <= 2"
            type="text"
            size="mini"
            @click="() => append(data)"
          >Append</el-button>
          <el-button type="text" size="mini" @click="() => update(data)">Update</el-button>
          <el-button
            v-if="node.childNodes.length == 0"
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >Delete</el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog title="新增商品分类" :visible.sync="addDialogFormVisible" :close-on-click-modal="false">
      <el-form :model="category">
        <el-form-item label="分类名称">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改商品分类" :visible.sync="updateDialogFormVisible" :close-on-click-modal="false">
      <el-form :model="category">
        <el-form-item label="分类名称">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="category.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="计数单位">
          <el-input v-model="category.productUnit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCategory">确 定</el-button>
      </div>
    </el-dialog>
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
      maxLevel: 1,
      draggable: false,
      parentCatId: [],
      products: [],
      expandedKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      nodeSelectedList: [],
      category: {
        catId: null,
        name: "",
        parentCid: 0,
        catLevel: 0,
        sort: 0,
        showStatus: 1,
        icon: "",
        productUnit: ""
      },
      nodeToUpdate: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
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
    append(data) {
      console.log("append", data);
      //初始化
      this.category.catId = null;
      this.category.showStatus = "1";
      this.category.name = "";
      this.category.sort = 0;
      this.category.icon = "";
      this.category.productUnit = "";
      this.category.parentCid = data.catId;
      this.category.catLevel = data.catLevel * 1 + 1;
      this.addDialogFormVisible = true;
    },
    update(data) {
      this.$http({
        url: this.$http.adornUrl("/product/category/info/" + data.catId),
        method: "get",
        params: this.$http.adornParams({})
      }).then(({ data }) => {
        console.log("update", data);
        //数据回显
        this.category.catId = data.category.catId;
        this.category.parentCid = data.category.parentCid;
        this.category.catLevel = data.category.catLevel;
        this.category.showStatus = data.category.showStatus;
        this.category.name = data.category.name;
        this.category.sort = data.category.sort;
        this.category.icon = data.category.icon;
        this.category.productUnit = data.category.productUnit;
        this.updateDialogFormVisible = true;
      });
    },
    remove(node, data) {
      //弹出确认框
      this.$confirm(`此操作将删除商品分类【${data.name}】, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("remove", node, data);
          //获取id
          var ids = [data.catId];
          //执行删除
          this.$http({
            url: this.$http.adornUrl("/product/category/delete"),
            method: "post",
            data: this.$http.adornData(ids, false)
          }).then(({ data }) => {
            console.log("商品分类删除成功", data);
            //刷新产品分类列表
            this.getProductList();
            //恢复删除之前展开的分类, expandedKeys绑定在el-tree里面的属性default-expanded-keys
            this.expandedKeys = [node.parent.data.catId];
          });
          //消息提示
          this.$message({
            type: "success",
            message: "商品分类删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addCategory() {
      console.log(this.category);
      this.$http({
        url: this.$http.adornUrl("/product/category/save"),
        method: "post",
        data: this.$http.adornData(this.category, false)
      })
        .then(({ data }) => {
          console.log("商品分类添加成功", data);
          //刷新产品分类列表
          this.getProductList();
          //恢复添加之前展开的分类, expandedKeys绑定在el-tree里面的属性default-expanded-keys
          this.expandedKeys = [this.category.parentCid];
          this.addDialogFormVisible = false;
          //消息提示
          this.$message({
            type: "success",
            message: "商品分类添加成功!"
          });
        })
        .catch(() => {
          //消息提示
          this.$message({
            type: "error",
            message: "商品分类添加失败!"
          });
        });
    },
    updateCategory() {
      console.log(this.category);
      //提取需要修改的字段
      var { catId, name, icon, productUnit } = this.category;
      var categoryToUpdate = { catId, name, icon, productUnit };
      this.$http({
        url: this.$http.adornUrl("/product/category/update"),
        method: "post",
        data: this.$http.adornData(categoryToUpdate, false)
      })
        .then(({ data }) => {
          console.log("商品分类修改成功", data);
          //刷新产品分类列表
          this.getProductList();
          //恢复修改之前展开的分类, expandedKeys绑定在el-tree里面的属性default-expanded-keys
          this.expandedKeys = [this.category.parentCid];
          this.updateDialogFormVisible = false;
          //消息提示
          this.$message({
            type: "success",
            message: "商品分类修改成功!"
          });
        })
        .catch(() => {
          //消息提示
          this.$message({
            type: "error",
            message: "商品分类修改失败!"
          });
        });
    },
    //判断是否允许拖动
    allowDrop(draggingNode, dropNode, type) {
      console.log("拖动", draggingNode, dropNode, type);
      this.maxLevel = 1;
      this.nodeMaxDeep(draggingNode);
      var deep = this.maxLevel - draggingNode.level + 1;

      if (type == "inner") {
        console.log(this.maxLevel);
        console.log(draggingNode.level);
        console.log(deep);
        console.log(dropNode.level);
        return deep + dropNode.level <= 3;
      } else {
        return deep + dropNode.parent.level <= 3;
      }
    },
    //获取一个节点最大深度
    nodeMaxDeep(node) {
      if (node.childNodes != null && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (node.childNodes[i].level > this.maxLevel) {
            this.maxLevel = node.childNodes[i].level;
          }
          this.nodeMaxDeep(node.childNodes[i]);
        }
      } else {
        this.maxLevel = node.level;
      }
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", draggingNode, dropNode, dropType);
      let parentCatId = 0;
      let catLevel = 0;
      var nodeToSort = [];
      if (dropType == "inner") {
        //设置父节点
        parentCatId = dropNode.data.catId;
        catLevel = dropNode.level * 1 + 1;
        //设置需要重新排序的节点
        nodeToSort = dropNode.childNodes;
      } else if (dropType == "before" || dropType == "after") {
        //设置父节点 (如果移动到最顶端, dropNode.parent.data.catId就是undefined, 这时就将新的parentCatId设置为0)
        parentCatId = dropNode.parent.data.catId == undefined ? 0 : dropNode.parent.data.catId;
        catLevel = dropNode.level;
        //设置需要重新排序的节点
        nodeToSort = dropNode.parent.childNodes;
      }

      //设置需要更新的节点列表
      //注意，所有需要更新的节点都在nodeToSort里面,因为除了被移动的节点本身，其他节点只有顺序(sort)的值会发生变化而需要更改
      for (let i = 0; i < nodeToSort.length; i++) {
        //如果是被移动的节点(每个要进行更新的节点里面包含catId和需要更新的字段)
        if (nodeToSort[i].data.catId == draggingNode.data.catId) {
          this.nodeToUpdate.push({
            catId: nodeToSort[i].data.catId,
            sort: i,
            parentCid: parentCatId,
            catLevel: catLevel
          });
          //如果被移动的节点的catLevel发生变化，那么每个子节点的catLevel也需要更新
          if (nodeToSort[i].data.catLevel != nodeToSort[i].level) {
            this.updateChildNodeLevel(nodeToSort[i]);
          }
        } else {
          //如果不是被移动的节点(每个要进行更新的节点里面包含catId和需要更新的字段) - 只有sort值, 也就是排列顺序需要更新
          this.nodeToUpdate.push({ catId: nodeToSort[i].data.catId, sort: i });
        }
      }

      //将需要展开的节点保存起来
      this.parentCatId.push(parentCatId);

      console.log("nodeToUpdate", this.nodeToUpdate);
    },
    updateChildNodeLevel(node) {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].data.catLevel != node.childNodes[i].level) {
          this.nodeToUpdate.push({
            catId: node.childNodes[i].data.catId,
            catLevel: node.childNodes[i].level
          });
          //继续更新其子节点
          this.updateChildNodeLevel(node.childNodes[i]);
        }
      }
    },
    batchUpdate(){
      //执行更新
      this.$http({
        url: this.$http.adornUrl("/product/category/updateBatch"),
        method: "post",
        data: this.$http.adornData(this.nodeToUpdate, false)
      })
        .then(({ data }) => {
          //刷新列表
          this.getProductList();
          //展开所移动节点的父节点, expandedKeys绑定在el-tree里面的属性default-expanded-keys
          this.expandedKeys = this.parentCatId;
          //清空更新节点列表
          this.nodeToUpdate = [];
          this.parentCatId = [];
          //消息提示
          this.$message({
            type: "success",
            message: "商品分类移动成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "商品分类移动失败!"
          });
        });
    },
    batchDelete(){
      console.log(this.$refs.tree.getCheckedNodes(true,false));
      let catIds = [];
      let productNameList = [];
      let checkedNodes = this.$refs.tree.getCheckedNodes(true,false);
      for(let i=0;i<checkedNodes.length;i++){
        catIds.push(checkedNodes[i].catId);
        productNameList.push(checkedNodes[i].name);
      }

      if(catIds.length > 0){
        this.$confirm(`此操作将删除商品分类【${productNameList}】, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("batchDelete", catIds, productNameList);
          //执行删除
          this.$http({
            url: this.$http.adornUrl("/product/category/delete"),
            method: "post",
            data: this.$http.adornData(catIds, false)
          }).then(({ data }) => {
            console.log("商品分类删除成功", data);
            //刷新产品分类列表
            this.getProductList();
          });
          //消息提示
          this.$message({
            type: "success",
            message: "商品分类删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }else{
          this.$message({
            type: "warn",
            message: "请勾选要删除的商品分类"
          });
      }
    },
    handleSelect(node,selected,childSelected){
      this.nodeSelectedList = this.$refs.tree.getCheckedNodes(true,false);
    }
    //add new method here
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