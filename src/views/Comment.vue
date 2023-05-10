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
              @clear="getUserList"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="handlesearch"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--用户列表区域-->
      <el-table :data="pageTicket" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户" prop="user.username"></el-table-column>
        <el-table-column label="电影" prop="film.filmName"></el-table-column>
        <el-table-column label="评论内容" prop="content"></el-table-column>
        <el-table-column label="评论时间" prop="time"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserById(scope.row.userId)"
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
      commentList: [],
      newCommentList: [],
      total:0,
      currentPage:1,  //当前所在页默认是第一页
      pageSize:2,  //每页显示多少行数据 默认设置为10
      pageTicket:[],//分页后的当前页数据
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      this.$axios.get("/comment/all").then(ref=>{
        this.commentList = ref.data
        this.newCommentList = ref.data
        this.total=ref.data.length
        this.getPageInfo()
        console.log(ref.data)
      })
    },
    handlesearch: function () {
      this.pageTicket = this.newCommentList.filter(item => {
        // filter()对象遍历,true 返回对象参数值,如果多条数据,自动使用数组拼接
        if (item.user.username.includes(this.queryInfo.query)) {
          return item
        }
      })
      this.total=this.pageTicket.length
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    getPageInfo(){
      this.pageTicket=[]
      // 获取当前页的数据
      for(let i=(this.currentPage-1)*this.pageSize;i<this.total;i++){
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.newCommentList[i]);

        //判断是否达到一页的要求
        if(this.pageTicket.length===this.pageSize) break;
      }
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.currentPage=pageNumber;
      //数据重新分页
      this.getPageInfo()
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
      this.$axios.post("/delete", id).then(ref=>{
        this.$message.success('删除成功')
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

