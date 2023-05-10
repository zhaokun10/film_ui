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
              @clear="getFilmList"
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
          >添加电影</el-button
          >
        </el-col>
      </el-row>

      <!--电影列表区域-->
      <el-table :data="pageTicket" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="电影名称" prop="filmName"></el-table-column>
        <el-table-column label="上映时间" prop="showTime" width="80"></el-table-column>
        <el-table-column label="简介" prop="profile" width="300"></el-table-column>
        <el-table-column label="图片" prop="filmUrl">
          <template slot-scope="scope">
            <el-image style="width: 200px; height: 100px" :src="scope.row.filmUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="是否为热门">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.isHot==1"
                @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.filmId)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeFilmById(scope.row.filmId)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog
        title="添加电影"
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
        <el-form-item label="电影名称" prop="filmName">
          <el-input v-model="addForm.filmName"></el-input>
        </el-form-item>
        <el-form-item label="上映时间" prop="showTime">
          <el-input v-model="addForm.showTime"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="country">
          <el-select v-model="addForm.country">
            <el-option
                v-for="item in countryList"
                :key="item.id"
                :label="item.countryName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为热门" prop="country">
          <el-select v-model="addForm.isHot">
            <el-option
                v-for="item in hotList"
                :key="item.id"
                :label="item.hotName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
        <el-form-item label="电影介绍" prop="profile">
          <el-input v-model="addForm.profile"></el-input>
        </el-form-item>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-change="handleChange"
            :auto-upload="false"
            :http-request="httpRequest"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFilm">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
        title="修改电影"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
    >
      <el-form
          :model="editForm"
          ref="editFormRef"
          label-width="70px"
      >
        <el-form-item label="电影名称" prop="filmName">
          <el-input v-model="editForm.filmName"></el-input>
        </el-form-item>
        <el-form-item label="上映时间" prop="showTime">
          <el-input v-model="editForm.showTime"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="country">
          <el-select v-model="editForm.country">
            <el-option
                v-for="item in countryList"
                :key="item.id"
                :label="item.countryName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为热门" prop="country">
          <el-select v-model="editForm.isHot">
            <el-option
                v-for="item in hotList"
                :key="item.id"
                :label="item.hotName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
        <el-form-item label="电影介绍" prop="profile">
          <el-input v-model="editForm.profile"></el-input>
        </el-form-item>
        <el-upload
            class="upload-demo"
            ref="upload"
            :file-list="fileList"
            :on-preview="edithandlePreview"
            :on-change="editHandleChange"
            :auto-upload="false"
            :http-request="httpRequest"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFilmInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
      },
      filmList: [],
      newFilmList: [],
      countryList:[],
      fileList:[],
      hotList:[
        {
          id:1,
          hotName:'是'
        },
      {
        id:2,
            hotName:'否'
      }
      ],
      total:0,
      currentPage:1,  //当前所在页默认是第一页
      pageSize:2,  //每页显示多少行数据 默认设置为10
      pageTicket:[],//分页后的当前页数据
      // 控制添加用户对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        filmName: '',
        showTime: '',
        profile: '',
        type: '',
        country:'',
        filmUrl:'',
        isHot:''
      },
      // 修改用户对话框
      editDialogVisible: false,
      editForm: {
        filmName: '',
        showTime: '',
        profile: '',
        type: '',
        country:'',
        filmUrl:'',
        isHot:''
      },
    }
  },
  created() {
    this.getFilmList()
    this.getCountryList()
  },
  methods: {
    async getFilmList() {
      this.$axios.get("/all").then(ref=>{
        this.filmList = ref.data
        console.log(ref.data)
        this.newFilmList = ref.data
        this.total=ref.data.length
        this.getPageInfo();
      })
    },
    handlePreview(file){
      console.log(file)
    },
    edithandlePreview(file){
      console.log(file)
    },
    handleChange(file, fileList){
      this.addForm.filmUrl="http://localhost:9000/image/"+fileList[0].name
    },
    editHandleChange(file, fileList){
      this.editForm.filmUrl="http://localhost:9000/image/"+fileList[0].name
    },
    httpRequest(param) {
      console.log(param)
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData()// FormData 对象
      fd.append('file', fileObj)// 文件对象

      let url = 'http://localhost:9000/file'
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(url, fd, config).then(res => {
        console.log(res)
      })
    },
    async getCountryList() {
      this.$axios.get("/film/country").then(ref=>{
        this.countryList = ref.data
      })
    },
    getPageInfo(){
      this.pageTicket=[]
      // 获取当前页的数据
      for(let i=(this.currentPage-1)*this.pageSize;i<this.total;i++){
        //把遍历的数据添加到pageTicket里面
        this.pageTicket.push(this.newFilmList[i]);

        //判断是否达到一页的要求
        if(this.pageTicket.length===this.pageSize) break;
      }
    },
    handlesearch: function () {
      this.filmList = this.newFilmList.filter(item => {
        // filter()对象遍历,true 返回对象参数值,如果多条数据,自动使用数组拼接
        if (item.filmName.includes(this.queryInfo.query)) {
          return item
        }
      })
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.currentPage=pageNumber;
      //数据重新分页
      this.getPageInfo()
    },
    // 修改用户状态
    async userStateChanged(filmInfo) {
      if(filmInfo.isHot==0){
        filmInfo.isHot=1
      }else {
        filmInfo.isHot=0
      }
      filmInfo.country= filmInfo.countryString.id
      console.log(filmInfo.country)
      this.$axios.post("/film/update",filmInfo).then(ref=>{
        this.$message.success('更改成功')
      })

    },
    // 监听添加用户对话框的关闭事件
    async addDialogClosed() {
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addFilm() {
      console.log(this.addForm)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        this.$axios.post("/insert", this.addForm).then(ref=>{
          // if (ref.status !== 201) return this.$message.error('添加失败')
          // 添加成功
          this.$message.success('添加成功')
          this.$refs.upload.submit()
          // 隐藏弹出框
          this.addDialogVisible = false
          // 刷新用户列表
          this.getUserList()
        })
      })
    },
    // 修改用户
    async showEditDialog(id) {
      this.$axios.get("/filmInfo?filmId="+id).then(ref=>{
        this.editForm = ref.data
      })
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editFilmInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户信息的数据请求
        this.$axios.post("/film/update",this.editForm).then(ref=>{
          if (ref.status !== 200) {
            return this.$message.error(this.meta.msg)
          }
          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据列表
          this.getUserList()
          // 提示修改成功
          this.$message.success('更新成功')
        })

      })
    },
    // 根据id删除对应的用户信息
    async removeFilmById(id) {
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
      this.$axios.post("/film/delete", id).then(ref=>{
        this.$message.success('删除成功')
        this.getFilmList()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

