<template>
  <div class="main-body">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in lunBoFilmList">
        <el-image
            :src="item.filmUrl"
            style="width: 100%;height: 100%"
            fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="hot-film">
      <div>
        <div class="hot-title">
          <h3>热门电影</h3>
        </div>
        <div style="margin-top: -30px">
          <el-divider></el-divider>
        </div>
        <div v-for="film in hotFilmList" @click="viewFilmInfo(film.filmId)">
          <div style="float: left">
            <div style="width: 183px">
              <el-image
                  style="width: 173px; height: 200px; margin-left: 10px"
                  :src="film.filmUrl"
                  fit="cover"></el-image>
            </div>
            <div style="width: 183px">
              <span style=" width: 80px;">{{film.filmName}}</span>
              <span style=" width: 100px; margin-left: 10px">{{film.filmRating}}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-film">
      <div>
        <div class="hot-title">
          <h3>最近热映</h3>
        </div>
        <div style="margin-top: -30px">
          <el-divider></el-divider>
        </div>
        <div v-for="film in newHotFilmList" @click="viewFilmInfo(film.filmId)">
          <div style="float: left">
            <div style="width: 183px">
              <el-image
                  style="width: 173px; height: 200px; margin-left: 10px"
                  :src="film.filmUrl"
                  fit="cover"></el-image>
            </div>
            <div style="width: 183px">
              <span style=" width: 80px;">{{film.filmName}}</span>
              <span style=" width: 100px; margin-left: 10px">{{film.filmRating}}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-film">
      <div>
        <div class="hot-title">
          <h3>最近上映</h3>
        </div>
        <div style="margin-top: -30px">
          <el-divider></el-divider>
        </div>
        <div v-for="film in newFilmList" @click="viewFilmInfo(film.filmId)">
          <div style="float: left">
            <div style="width: 183px">
              <el-image
                  style="width: 173px; height: 200px; margin-left: 10px"
                  :src="film.filmUrl"
                  fit="cover"></el-image>
            </div>
            <div style="width: 183px">
              <span style=" width: 80px;">{{film.filmName}}</span>
              <span style=" width: 100px; margin-left: 10px">{{film.filmRating}}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "MainView",

  data() {
    return {
      username:this.$route.query.username,
      activeIndex: '1',
      hotFilmList:[
      ],
      newFilmList:[

      ],
      newHotFilmList:[

      ],
      lunBoFilmList:[]
    };
  },
  methods:{
    viewFilmInfo(id){
      this.$router.push({path:"/index/filmInfo", query:{id}})
    }
  },
  created() {
    this.$axios.get("/hot").then(ref=>{
      this.$data.hotFilmList=ref.data
    })
    this.$axios.get("/new").then(ref=>{
      this.$data.newFilmList=ref.data
    })
    this.$axios.get("/newHot").then(ref=>{
      this.$data.newHotFilmList=ref.data
    })
    this.$axios.get("/lunBo").then(ref=>{
      this.$data.lunBoFilmList=ref.data
    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.main-body{
  width: 1120px;
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 20px;
}
.hot-film{
  width: 100%;
}
.hot-film .hot-title{
  display: flex;
  width: 100%;
}
</style>
