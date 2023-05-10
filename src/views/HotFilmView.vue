<template>
<div class="hot-body">
  <div>
    <div class="title">
      <h1>热门电影</h1>
    </div>
    <div v-for="film in pageTicket" @click="viewFilmInfo(film.filmId)">
      <div class="film_info" >
        <el-image
            style="width: 173px; height: 200px;"
            :src="film.filmUrl"
            fit="cover"></el-image>
      </div>

      <div class="film_info" style="width: 900px; margin-left: 10px">
        <div style="margin-top: -20px">
          <h3>{{ film.filmName }}</h3>
        </div>
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
        <div>
          <span>
            {{film.profile}}
          </span>
        </div>
        <div>
          <el-rate
              v-model="film.filmRating"
              disabled
              show-score
              text-color="#ff9900"
              :max="10"
              score-template="{value}"
         >
          </el-rate>
        </div>
      </div>
      <el-divider></el-divider>
    </div>

  </div>
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
  name: "HotFilmView",
  data(){
    return{
      value:4.5,
      total:0,
      currentPage:1,  //当前所在页默认是第一页
      pageSize:10,  //每页显示多少行数据 默认设置为10
      pageTicket:[],//分页后的当前页数据
      allHotFilmList:[]

    }
  },
  methods:{
    getHotFilmList(){
      this.$axios.get("/allHot").then(ref=>{
        if(ref.data!=null){
          this.$data.allHotFilmList = ref.data
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
        this.$data.pageTicket.push(this.$data.allHotFilmList[i]);
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
      this.$router.push({path:"/filmInfo", query:{id}})
    }
  },
  created() {
this.getHotFilmList()
  }
}
</script>

<style scoped>
.hot-body{
  width: 1120px;
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 20px;
  text-align: left;
}
.title{
  width: 100%;
}
/deep/ .el-rate__icon {
  font-size: 10px;
}
.film_info{
   display:inline-block;vertical-align: top;
}
.pagination{
  width: 100%;
  text-align: center;
}
</style>
