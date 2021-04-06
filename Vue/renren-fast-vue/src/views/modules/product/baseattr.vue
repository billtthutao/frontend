<!-- 规格参数 -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <category @tree-node-click="treeNodeClick"></category>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <div class="mod-config">
            <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
              <el-form-item>
                <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="success" @click="getAllDataList()">查询全部</el-button>
                <el-button
                  v-if="isAuth('product:attr:save')"
                  type="primary"
                  @click="addOrUpdateHandle()"
                >新增</el-button>
                <el-button
                  v-if="isAuth('product:attr:delete')"
                  type="danger"
                  @click="deleteHandle()"
                  :disabled="dataListSelections.length <= 0"
                >批量删除</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="dataList"
              border
              v-loading="dataListLoading"
              @selection-change="selectionChangeHandle"
              style="width: 100%;"
            >
              <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
              <el-table-column prop="attrId" header-align="center" align="center" label="id"></el-table-column>
              <el-table-column prop="attrName" header-align="center" align="center" label="属性名"></el-table-column>
              <el-table-column
                v-if="attrType == 1"
                prop="searchType"
                header-align="center"
                align="center"
                label="可检索"
              >
                <template slot-scope="scope">
                  <i class="el-icon-success" v-if="scope.row.searchType==1"></i>
                  <i class="el-icon-error" v-else></i>
                </template>
              </el-table-column>
              <el-table-column prop="valueType" header-align="center" align="center" label="值类型">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.valueType==0">单选</el-tag>
                  <el-tag v-else>多选</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="icon" header-align="center" align="center" label="图标"></el-table-column>
              <el-table-column prop="valueSelect" header-align="center" align="center" label="可选值">
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
              <el-table-column prop="enable" header-align="center" align="center" label="启用">
                <template slot-scope="scope">
                  <i class="el-icon-success" v-if="scope.row.enable==1"></i>
                  <i class="el-icon-error" v-else></i>
                </template>
              </el-table-column>
              <el-table-column prop="catelogName" header-align="center" align="center" label="所属分类"></el-table-column>
              <el-table-column
                v-if="attrType == 1"
                prop="groupName"
                header-align="center"
                align="center"
                label="所属分组"
              ></el-table-column>
              <el-table-column
                v-if="attrType == 1"
                prop="showDesc"
                header-align="center"
                align="center"
                label="快速展示"
              >
                <template slot-scope="scope">
                  <i class="el-icon-success" v-if="scope.row.showDesc==1"></i>
                  <i class="el-icon-error" v-else></i>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                header-align="center"
                align="center"
                width="150"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="addOrUpdateHandle(scope.row.attrId)"
                  >修改</el-button>
                  <el-button type="text" size="small" @click="deleteHandle(scope.row.attrId)">删除</el-button>
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
            <!-- 弹窗, 新增 / 修改 -->
            <add-or-update
              :type="attrType"
              v-if="addOrUpdateVisible"
              ref="addOrUpdate"
              @refreshDataList="getDataList"
            ></add-or-update>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Category from "../common/category";
import AddOrUpdate from "./attr-add-or-update"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Category, AddOrUpdate },
  props: {
    attrType: {
      type: Number,
      default: 1
    }
  },
  data() {
    //这里存放数据
    return {
      dataForm: {
        key: ""
      },
      catId: 0,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取数据列表
    treeNodeClick(data, node, component) {
      if (node.level == 3) {
        this.catId = data.catId;
      }

      this.getDataList();
    },
    getAllDataList() {
      this.catId = 0;
      this.getDataList();
    },
    getDataList() {
      this.dataListLoading = true;
      let type = this.attrType == 0 ? "sale" : "base";
      this.$http({
        url: this.$http.adornUrl(`/product/attr/${type}/list/${this.catId}`),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key
        })
      }).then(({ data }) => {
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
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.attrGroupId;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/product/attr/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
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
  activated() {
    this.getDataList();
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>