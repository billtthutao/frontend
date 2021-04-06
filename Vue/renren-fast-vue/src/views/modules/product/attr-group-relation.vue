<!--  -->
<template>
  <div>
    <el-dialog title="关联属性" :visible.sync="attrRelationDialogVisible" :close-on-click-modal="false">
      <el-dialog
        width="40%"
        title="选择属性"
        :visible.sync="innerVisible"
        append-to-body
        :close-on-click-modal="false"
      >
        <div>
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
              <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList()">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="innerSelectionChangeHandle"
            style="width: 100%;"
          >
            <el-table-column type="selection" header-align="center" align="center"></el-table-column>
            <el-table-column prop="attrId" header-align="center" align="center" label="属性id"></el-table-column>
            <el-table-column prop="attrName" header-align="center" align="center" label="属性名"></el-table-column>
            <el-table-column prop="icon" header-align="center" align="center" label="属性图标"></el-table-column>
            <el-table-column prop="valueSelect" header-align="center" align="center" label="可选值列表">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <span v-for="(i,index) in scope.row.valueSelect.split(';')" :key="index">
                      {{i}}
                      <br />
                    </span>
                  </div>
                  <el-tag>{{scope.row.valueSelect.split(";")[0]+" ..."}}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAddRealtion"
            :disabled="innerdataListSelections.length <= 0"
          >确认新增</el-button>
        </div>
      </el-dialog>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="addRelation">新建关联</el-button>
          <el-button
            type="danger"
            @click="batchDeleteRelation"
            :disabled="dataListSelections.length <= 0"
          >批量删除</el-button>
          <el-table
            :data="attrRelationTableData"
            style="width: 100%"
            @selection-change="selectionChangeHandle"
            border
          >
            <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
            <el-table-column prop="attrId" label="#"></el-table-column>
            <el-table-column prop="attrName" label="属性名"></el-table-column>
            <el-table-column prop="valueSelect" label="可选值">
              <template slot-scope="scope">
                <el-tooltip placement="top">
                  <div slot="content">
                    <span v-for="(i,index) in scope.row.valueSelect.split(';')" :key="index">
                      {{i}}
                      <br />
                    </span>
                  </div>
                  <el-tag>{{scope.row.valueSelect.split(";")[0]+" ..."}}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column fixed="right" header-align="center" align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="deleteAttrRelationHandle(scope.row.attrId)"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="attrRelationDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="attrRelationDialogVisible = false">确 定</el-button>
          </span>
        </el-col>
      </el-row>
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
      attrGroupId: 0,
      attrRelationDialogVisible: false,
      attrRelationTableData: [],
      dataListSelections: [],
      innerVisible: false,
      dataList: [],
      innerdataListSelections: [],
      dataForm: {
        key: ""
      },
      dataListLoading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    deleteAttrRelationHandle(attrId) {
      let attrIds = [attrId];
      this.$http({
        url: this.$http.adornUrl(
          `/product/attrgroup/attr/relation/delete/${this.attrGroupId}`
        ),
        method: "post",
        data: this.$http.adornData(attrIds, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.innerVisible = false;
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.init(this.attrGroupId);
              //触发父组件刷新数据
              this.$emit("refreshData");
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      }).catch(()=>{
        this.$message.error("操作失败");
      });
    },
    batchDeleteRelation() {
      let attrIds = [];
      this.dataListSelections.forEach(item => {
        attrIds.push(item.attrId);
      });
      this.$http({
        url: this.$http.adornUrl(
          `/product/attrgroup/attr/relation/delete/${this.attrGroupId}`
        ),
        method: "post",
        data: this.$http.adornData(attrIds, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.innerVisible = false;
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.init(this.attrGroupId);
              //触发父组件刷新数据
              this.$emit("refreshData");
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl(
          `/product/attrgroup/${this.attrGroupId}/noattr/relation`
        ),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key
        })
      }).then(({ data }) => {
        console.log(data);
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 新增关联选中的属性到属性组
    submitAddRealtion() {
      let attrIds = [];
      this.innerdataListSelections.forEach(item => {
        attrIds.push(item.attrId);
      });
      this.$http({
        url: this.$http.adornUrl(
          `/product/attrgroup/attr/relation/${this.attrGroupId}`
        ),
        method: "post",
        data: this.$http.adornData(attrIds, false)
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.innerVisible = false;
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.init(this.attrGroupId);
              //触发父组件刷新数据
              this.$emit("refreshData");
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    addRelation() {
      this.getDataList();
      this.innerVisible = true;
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    innerSelectionChangeHandle(val) {
      this.innerdataListSelections = val;
    },
    init(attrGroupId) {
      console.log("init", attrGroupId);
      this.attrRelationDialogVisible = true;
      this.attrGroupId = attrGroupId || 0;
      this.$http({
        url: this.$http.adornUrl(
          `/product/attrgroup/${this.attrGroupId}/attr/relation`
        ),
        method: "get"
      }).then(({ data }) => {
        console.log(data);
        this.attrRelationTableData = data.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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