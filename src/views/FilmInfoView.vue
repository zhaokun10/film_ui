<template>
  <div class="main-body">

    <div style="display:inline-block;vertical-align: top; width: 200px" >
      <el-image
          style="width: 200px; height: 300px;"
          :src="film.filmUrl"
          fit="cover"></el-image>
    </div>
    <div style="display:inline-block;vertical-align: top; margin-left: 10px;width: 900px" >
    <div>
      <div class="title">
        <h1>{{ film.filmName }}</h1>
      </div>
 <div style="margin-left: 30px">
   <div style="margin-top: -15px">
     <span>{{ film.showTime }}/{{film.countryString.countryName}}</span>
   </div>
   <div v-for="actor in film.actorList">
     <span v-if="actor.duties==1">导演:{{actor.actorName}}</span>
   </div>
   <div v-for="actor in film.actorList">
     <span v-if="actor.duties==2">主演:{{actor.actorName}}</span>
   </div>
   <div v-for="actor in film.actorList">
     <span v-if="actor.duties==3">演员:{{actor.actorName}}</span>
   </div>
 </div>
      <div style="margin-left: 30px">
        <h3>简介:</h3>
        <p>
          {{film.profile}}
        </p>
      </div>
      <div style="margin-left: 30px">
       <h3> 评分:</h3>
        <el-rate
            v-model="film.filmRating"
            disabled
            show-score
            text-color="#ff9900"
            :max="5"
            score-template="{value}分"
        ></el-rate>
      </div>
      <div style="margin-left: 30px">
        <a style="color: #159eff" href="#" @click="dialogVisible=true">评论</a>
      </div>
    </div>
    </div>
    <el-divider></el-divider>
    <div class="comment" style="text-align: left" v-for="comment in commentList">
      <div>
        <div style="display:inline-block;vertical-align: top; margin-left: 2px; margin-top: -10px">
          <h5>{{ comment.user.username }} 看过</h5>
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
    <el-dialog
        title="发表评论"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form label-width="80px">
        <el-form-item label="评论内容">
          <el-input type="textarea" v-model="content"></el-input>
        </el-form-item>
        <el-form-item label="打分:">
          <div style="margin-top: 10px">
            <el-rate v-model="rate"></el-rate>

          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="insertComment">确 定</el-button>
  </span>
    </el-dialog>
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
import {ref} from "vue";

export default {
  name: "FilmInfoView",
  data(){
    return{
      value:5.0 ,
      dialogVisible:false,
      rate:'',
      content:'',
      film:{},
      commentList:[],
      total:0,
      currentPage:1,  //当前所在页默认是第一页
      pageSize:10,  //每页显示多少行数据 默认设置为10
      pageTicket:[],//分页后的当前页数据
    }
  },
  methods:{
    getFilmInfo(){
      this.$axios.get("/filmInformation?filmId="+this.$route.query.id).then(ref=> {
            this.$data.film = ref.data
        console.log(ref.data)
          }
      )
      this.$axios.get("/comment/filmComment?filmId="+this.$route.query.id).then(ref=> {
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
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    insertComment(){
      const comment={
        'userId':this.$store.state.userId,
        'filmId':this.$route.query.id,
        'rating':this.$data.rate,
        'content':this.$data.content,

      }
      console.log(comment)
      this.$axios.post("/comment/add", comment).then(ref=>{
        if(ref.data===1){
          this.$notify({
            type:"success",
            message:'评论成功'
          })
          this.getFilmInfo();
          this.$data.dialogVisible=false
        }else {
          this.$notify({
            type:"error",
            message:'评论失败'
          })
        }
      })
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
