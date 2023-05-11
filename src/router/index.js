import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import IndexView from "@/views/IndexView.vue";
import HotFilmView from "@/views/HotFilmView.vue";
import MainView from "@/views/MainView.vue";
import RecommendedFilms from "@/views/RecommendedFilms.vue";
import AllFilmView from "@/views/AllFilmView.vue";
import SearchResultView from "@/views/SearchResultView.vue";
import FilmInfoView from "@/views/FilmInfoView.vue";
import AllCommentView from "@/views/AllCommentView.vue";
import MyProfileView from "@/views/MyProfileView.vue";
import Index from "@/views/Index.vue";
import UserManage from "@/views/UserManage.vue";
import GoodsManage from "@/views/GoodsManage.vue";
import UserInfo from "@/views/UserInfo.vue";
import Comment from "@/views/Comment.vue";
import ActorView from "@/views/ActorView.vue";
import FilmTypeView from "@/views/FilmTypeView.vue";
import DutiesView from "@/views/DutiesView.vue";
import CountryView from "@/views/CountryView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/',
        component: IndexView,
        children: [
            {
                path: '',
                name: 'main',
                component: MainView
            },
            {
                path: 'hot',
                name: 'hot',
                component: HotFilmView
            },
            {
                path: 'recommended',
                name: 'recommended',
                component: RecommendedFilms
            },
            {
                path: 'all',
                name: 'all',
                component: AllFilmView
            },
            {
                path: 'searchResult',
                name: 'searchResult',
                component: SearchResultView
            },
            {
                path: 'filmInfo',
                name: 'filmInfo',
                component: FilmInfoView
            },
            {
                path: 'allComments',
                name: 'allComments',
                component: AllCommentView
            }, {
                path: 'myProfile',
                name: 'myProfile',
                component: MyProfileView
            }
        ]
    },
    {
        path:'/main',
        component:Index,
        children:[
            {
                path:'/user',
                component:UserManage,
            },
            {
                path:'/goods',
                component:GoodsManage,
            },
            {
                path:'/userInfo',
                component:UserInfo
            },
            {
                path:'/comment',
                component:Comment
            },
            {
                path:'/actor',
                component:ActorView
            },
            {
                path:'/filmType',
                component:FilmTypeView
            },
            {
                path:'/duties',
                component:DutiesView
            },
            {
                path:'/country',
                component:CountryView
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
