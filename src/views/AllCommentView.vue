<template>
  <div class="main-body">
    <div class="comment" style="text-align: left" v-for="comment in commentList">
      <div>
        <div style="display:inline-block;vertical-align: top; margin-left: 2px; margin-top: -10px">
          <h5>{{ comment.user.username }} 看过</h5>
        </div>
        <div style="display:inline-block;vertical-align: top; margin-left: 2px; margin-top: -10px"  @click="viewFilmInfo(comment.film.filmId)">
         <a href="#" style="text-decoration: none"><h5 style="color: #159eff">{{ comment.film.filmName }}</h5></a>
        </div>
        <div style="display:inline-block;vertical-align: top; margin-left: 2px; margin-top: 10px">
          <el-rate
              v-model="comment.rating"
              disabled
              text-color="#ff9900"
              :max="5"
          ></el-rate>
        </div>
        <div style="display:inline-block;vertical-align: top;margin-left: 2px; margin-top: -10px">
          <h5 style="color: #99a9bf">{{ comment.time }}</h5>
        </div>
      </div>
      <div>
        <span>{{comment.content}}</span>
      </div>
      <el-divider></el-divider>
    </div >
    <div class="pagination">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: "AllCommentView",
  data(){
    return{
      commentList:[],
      total:0,
      currentPage:1,  //当前所在页默认是第一页
      pageSize:10,  //每页显示多少行数据 默认设置为10
      pageTicket:[],//分页后的当前页数据
    }
  },
  methods:{
    getFilmInfo(){
      this.$axios.get("/comment/all").then(ref=> {
        console.log(ref.data)
        if(ref.data!=null){
          this.$data.commentList = ref.data
          this.$data.total=ref.data.length;
          this.getPageInfo();
          this.$notify({
            type:'success',
            message: '数据加载成功'
          })
        }else {
          this.$notify({
            type:'error',
            message: '数据加载失败'
          })
        }
      })
    },
    getPageInfo(){
      this.$data.pageTicket=[];
      // 获取当前页的数据
      for(let i=(this.currentPage-1)*this.$data.pageSize;i<this.total;i++){
        //把遍历的数据添加到pageTicket里面
        this.$data.pageTicket.push(this.$data.commentList[i]);
        //判断是否达到一页的要求
        if(this.$data.pageTicket.length===this.$data.pageSize) break;
      }
    },
    //调整当前的页码
    handleCurrentChange(pageNumber){
      //修改当前的页码
      this.$data.currentPage=pageNumber;
      //数据重新分页
      this.getPageInfo()
    },
    viewFilmInfo(id){
      this.$router.push({path:"/index/filmInfo", query:{id}})
    }
  },
  created() {
    this.getFilmInfo();
  }
}
</script>

<style scoped>
.main-body{
  width: 1120px;
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 20px;
  text-align: left;
}
.title{
  width: 100%;
  margin-left:30px;
  margin-top: -20px;
}
/deep/ .comment .el-rate__icon {
  font-size: 10px;
}
.pagination{
  width: 100%;
  text-align: center;
}
</style>
