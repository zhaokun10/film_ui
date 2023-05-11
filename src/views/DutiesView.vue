<template>
  <div style="margin-left: 200px">
    <!--卡片试图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="15">
          <el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              clearable
              @clear="getDutiesList"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="handlesearch"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
          >添加职业
          </el-button
          >
        </el-col>
      </el-row>

      <!--用户列表区域-->
      <el-table :data="pageTicket" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="电影类别" prop="dutiesName"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog
        title="添加电影类别"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
    >
      <!--主体区域-->
      <el-form
          :model="addForm"
          ref="addFormRef"
          label-width="70px"
      >
        <el-form-item label="电影类别" prop="dutiesName">
          <el-input v-model="addForm.dutiesName"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDuties">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
    >
      <el-form
          :model="editForm"
          ref="editFormRef"
          label-width="70px"
      >
        <el-form-item label="电影类别" prop="dutiesName">
          <el-input v-model="editForm.dutiesName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
      },
      dutiesList: [],
      newDutiesList: [],
      total: 0,
      currentPage: 1,  //当前所在页默认是第一页
      pageSize: 10,  //每页显示多少行数据 默认设置为10
      pageTicket: [],//分页后的当前页数据
      // 控制添加用户对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        "DutiesName": ""
      },
      // 修改用户对话框
      editDialogVisible: false,
      editForm: {},
    }
  },
  created() {
    this.getDutiesList()
  },
  methods: {
    async getDutiesList() {
      this.$axios.get("/duties/all").then(ref => {
        this.dutiesList = ref.data
        this.newDutiesList = ref.data
        this.total = ref.data.length
        this.getPageInfo()
        console.log(ref.data)
      })
    },
    handlesearch: function () {
      this.pageTicket = this.newDutiesList.filter(item => {
        // filter()对象遍历,true 返回对象参数值,如果多条数据,自动使用数组拼接
        if (item.dutiesName.includes(this.queryInfo.query)) {
          return item
        }
      })
      this.total = this.pageTicket.length
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getDutiesList()
    },
    getPageInfo() {
      this.pageTicket = []
      // 获取当前页的数据
      for (let i = (this.currentPage - 1) * this.pageSize; i < this.total; i++) {
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.newDutiesList[i]);

        //判断是否达到一页的要求
        if (this.pageTicket.length === this.pageSize) break;
      }
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentPage = pageNumber;
      //数据重新分页
      this.getPageInfo()
    },
    // 监听添加用户对话框的关闭事件
    async addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addDuties() {
      console.log(this.addForm)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        this.$axios.post("/duties/addDuties", this.addForm).then(ref => {
          // if (ref.status !== 201) return this.$message.error('添加失败')
          // 添加成功
          this.$message.success('添加成功')
          // 隐藏弹出框
          this.addDialogVisible = false
          // 刷新用户列表
          this.getDutiesList()
        })
      })
    },
    // 修改用户
    async showEditDialog(id) {
      this.$axios.get("/duties/findDutiesByDutiesId?dutiesId=" + id).then(ref => {
        this.editForm = ref.data
      })
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.editForm.dutiesList=[]
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        this.$axios.post("/duties/updateDuties", this.editForm).then(ref => {
          if (ref.status !== 200) {
            return this.$message.error(this.meta.msg)
          }
          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据列表
          this.getDutiesList()
          // 提示修改成功
          this.$message.success('更新成功')
        })

      })
    },
    // 根据id删除对应的用户信息
    async removeUserById(id) {
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch(err => err)
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 发送删除请求
      this.$axios.post("/duties/deleteDuties", id).then(ref => {
        this.$message.success('删除成功')
        this.getDutiesList()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

