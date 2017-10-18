<template>
    <div class="movie-container">
        <headerinfo></headerinfo>
        <div class="search-box">
            <searchbox></searchbox>
        </div>
        <div class="w clearfix">
            <div class="wl fl">
                <!-- <moviesort></moviesort> -->
                <div>&nbsp;</div>
                <div class="clearfix">
                    <breadcrumb class="movie-breadcrumb">
                        <span slot="one">正在热映</span>
                        <span slot="two">全部正在热映</span>
                        <span slot="three">即将上映</span>
                    </breadcrumb>
                    <div class="slider-controller">
                        <span class="el-icon-arrow-left" @click='DefaultNumMinus'></span>
                        <span>{{sliderDefaultNum}}</span>
                        <span>/</span>
                        <span>{{sliderTotalNum}}</span>
                        <span class="el-icon-arrow-right" @click='DefaultNumPlus'></span>
                    </div>
                </div>

                <div class="movie-slider">
                    <slideritem :movies='movies' :currentnum='sliderDefaultNum'></slideritem>
                </div>

                <div class="movie-add">
                    <img src="../assets/images/add.jpg" alt="">
                </div>

                <div class="doubleslider">
                    <doubleslider></doubleslider>
                </div>
                <div class="tvslider">
                    <tvslider></tvslider>
                </div>

                <div class="recommend">
                    <reslider></reslider>
                </div>
            </div>
            <div class="wm fl">&nbsp;</div>
            <div class="wr fl indexright">
                <div class="right-add">
                    <img src="../assets/images/add2.jpg" alt="">
                </div>
                <transition name='fade'>
                    <ranklist :rank='usrank' v-if='ranksort ==1'>
                        <div slot='title'>北美排行榜&nbsp;
                            <span @click='getMoreRank'>下一个榜单</span>
                        </div>
                        <div @click="addrank" v-if='this.morerank==10'>展开更多</div>
                    </ranklist>
                </transition>
                <transition name='fade'>
                    <ranklist :rank='usrank' v-if='ranksort ==2'>
                        <div slot='title'>TOP250&nbsp;
                            <span @click='getMoreRank'>下一个榜单</span>
                        </div>
                        <div @click="addrank" v-if='this.morerank==10'>展开更多</div>
                    </ranklist>
                </transition>
                <transition name='fade'>
                    <ranklist :rank='usrank' v-if='ranksort ==3'>
                        <div slot='title'>新片热映&nbsp;
                            <span @click='getMoreRank'>下一个榜单</span>
                        </div>
                        <div @click="addrank" v-if='this.morerank==10'>展开更多</div>
                    </ranklist>
                </transition>
                <div class="right-add">
                    <img src="../assets/images/add2.jpg" alt="">
                </div>
            </div>
        </div>
        <footerinfo></footerinfo>
    </div>
</template>

<script type='text/javascript'>
import headerinfo from './headerinfo'
import moviesort from './moviesort'
import slideritem from './slideritem'
import breadcrumb from './breadcrumb'
import doubleslider from './doubleslider'
import tvslider from './tvslider'
import reslider from './reslider'
import footerinfo from './footerinfo'
import searchbox from './searchbox'
import ranklist from './ranklist'

import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
//引入工具函数，做数据缓存
import {getLocal,setLocal} from '../assets/js/base'

export default {
    components: {
        headerinfo,
        moviesort,
        slideritem,
        breadcrumb,
        doubleslider,
        tvslider,
        reslider,
        footerinfo,
        searchbox,
        ranklist
    },
    data() {
        return {
            movies: {},
            sliderTotalNum: 0,
            sliderDefaultNum: 1,
            usrank: '',
            morerank: 10,
            ranksort: 1,
            rankurl: "https://api.douban.com/v2/movie/top250"
        }
    },
    created() {
        this.init()
        this.rankinit()
    },
    computed: {
        ...mapGetters([
            'sliderList',
        ])
    },
    methods: {
        ...mapMutations({
            setsliderlist: "setsliderlist"
        }
        ),
        DefaultNumPlus() {
            if (this.sliderDefaultNum == this.sliderTotalNum) {
                this.sliderDefaultNum = 1
            } else {
                this.sliderDefaultNum++
            }
        },
        DefaultNumMinus() {
            if (this.sliderDefaultNum == 1) {
                this.sliderDefaultNum = this.sliderTotalNum
            } else {
                this.sliderDefaultNum--
            }
        },
        addrank() {
            this.morerank = 10 ? 20 : 10
            this.rankinit()
        },
        init() {
            let url = "https://api.douban.com/v2/movie/top250"
            this.$http.jsonp(url).then((res) => {
                this.movies = res.data
                this.setsliderlist(res.data)
                this.sliderTotalNum = Math.ceil(res.data.subjects.length / 5)
            })
        },
        rankinit() {
            if(getLocal(this.rankurl)&&getLocal(this.rankurl).length == this.morerank){
                this.usrank = getLocal(this.rankurl)
            }else{
                this.$http.jsonp(this.rankurl).then((res) => {
                    this.usrank = res.data.subjects.slice(0, this.morerank)
                    setLocal(this.rankurl,this.usrank)
                })
            }

        },
        getMoreRank() {
            if (this.ranksort == 3) {
                this.ranksort = 1
            } else {
                this.ranksort++
            }
            switch (this.ranksort) {
                case 1:
                    this.rankurl = 'https://api.douban.com/v2/movie/coming_soon';
                    break;
                case 2:
                    this.rankurl = 'https://api.douban.com/v2/movie/top250';
                    break;
                case 3:
                    this.rankurl = 'https://api.douban.com/v2/movie/in_theaters';
                    break;
                default:
                    this.rankurl = 'https://api.douban.com/v2/movie/top250';
            }
            this.rankinit()
        }
    }
}
</script>

<style type='text/css' lang='less'>
.movie-container {
    background-color: #ccc;
}

.movie-breadcrumb {
    text-align: left;
    height: 36px;
    line-height: 36px;
    color: #111;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 18px;
    float: left;
}

.slider-controller {
    float: right;
    line-height: 36px;
}

.movie-add {
    width: 100%;
    height: 112px;
    margin: 20px 0;
}

.right-add {
    width: 100%;
    height: 400px;
    background-color: rgb(255 , 255, 255);
    opacity: 0.4;
    margin: 30px 0;
    border-radius: 10px;
    background-position: 0 0;
    background-size: cover;
    img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s
}

.fade-enter,
.fade-leave-to{
    opacity: 0
}
.fade-leave,
.fade-enter-to{
    opacity: 1
}
</style>