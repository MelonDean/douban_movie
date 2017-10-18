
<template>
    <div class="moviedetail-container">
        <headerinfo></headerinfo>
        <searchbox></searchbox>
        <div class="w">
            <div class="wl">
                <moviesort></moviesort>
                <div>&nbsp;</div>
                <div class="mainbox clearfix">
                    <div class="mainbox-title clearfix">
                        <h2 class="fl">{{db.title}}</h2>
                        <h4 class="fl">{{db.original_title}}</h4>
                        <h3 class="fl">{{db.year}}</h3>
                    </div>
                    <div class="mainbox-content">
                        <div class="mainbox-avator fl">
                            <img :src="db.images.medium" alt="">
                        </div>
                        <div class="mainbox-info fl">
                            <dl>
                                <dd>
                                    导演:
                                    <a href='#'>{{db.directors[0].name}}</a>
                                </dd>
                                <dd>
                                    编剧: 数据缺失。。。。
                                </dd>
                                <dd>
                                    主演:{{dataprocess.casts}}
                                </dd>
                                <dd>
                                    类型:{{dataprocess.genres}}
                                </dd>
                                <dd>
                                    制片国家/地区:{{dataprocess.countries}}
                                </dd>
                                <dd>
                                    语言:中文
                                </dd>
                                <dd>
                                    上映日期:{{db.year}}
                                </dd>
                                <dd>
                                    片长:未知
                                </dd>
                                <dd>
                                    又名:{{dataprocess.aka}}
                                </dd>
                            </dl>
                        </div>
                        <div class="rating-box fl">
                            <div class="clearfix">
                                <h2 class="fr">{{db.rating.average}}分</h2 class="fl">
                                <h6>豆瓣评分</h6>
                            </div>
                            <div class="rating-star">
                                <el-rate v-model="scorevalue" disabled show-score>
                                </el-rate>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feedback">
                    <el-button @click='wanttosee'>想看</el-button>
                    <el-button>看过</el-button>
                    <div class="feedback-rate">
                        <span>评价</span>
                        <el-rate v-model="feedbackvalue"></el-rate>
                    </div>
                </div>
                <div class="sharebutton">
                    <el-button size='small' @click='writeestimate'>写短评</el-button>
                    <el-button size='small'>写影评</el-button>
                    <el-button size='small'>提问题</el-button>
                    <el-button size='small'>添加到豆列</el-button>
                    <el-button size='small'>分享到</el-button>
                </div>
                <div class="abstract">
                    <span>{{db.title}}</span>
                    <span>的剧情简介.....</span>
                    <p><i></i>{{db.summary}}</p>
                </div>

                <div class="abstract">
                    <span>{{db.title}}</span>
                    <span>的影人.....</span>
                    <span>(查看全部)</span>
                    <div class="clearfix castimg-items">

                        <div v-for="item in db.casts" class="fl">
                            <!-- <img :src="item.avatars.medium" alt="" class="castimg" >
                            <h6>{{item.name}}</h6> -->
                            <singleactorcard :singleactor='item'></singleactorcard>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <div>
            <el-dialog title="添加收藏：写短评" :visible.sync="dialogVisible" width="30%">
                <el-form label-width="80px">
                    <el-form-item label="简短评价">
                        <el-input type="textarea" v-model="estimate"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="checkestimate">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-dialog
        :visible.sync="visible"
        width="30%"
        center>
        <div style="width:100%;text-align:center">{{dialogmes}}</div>
        </el-dialog>
        <div class="footer">
            <footerinfo></footerinfo>
        </div>
    </div>
</template>

<script type='text/javascript'>
import headerinfo from './headerinfo'
import moviesort from './moviesort'
import footerinfo from './footerinfo'
import singleactorcard from './singleactorcard'
import searchbox from './searchbox'

import { mapGetters } from 'vuex'
import {mapMutations} from 'vuex'
import {getLocal,setLocal} from '../assets/js/base'

export default {
    components: {
        moviesort,
        headerinfo,
        footerinfo,
        singleactorcard,
        searchbox
    },
    created() {
        this.init()
        // 判断是否存在数据
        // this.db = this.detaildata
        //创建阶段获取相关数据，并进行本地存储
        //获取用户信息，username = this.username,此时vuex中保存的是当前登录用户的username
    },
    mounted(){
        
    },
    data() {
        return {
            scorevalue:1,
            feedbackvalue: 0,
            dialogVisible: false,
            see: 0,
            estimate: '',
            db:'',
            dialogmes:'',
            visible:false,
            userdata:{
                wanna:false,
                estimate:'',
                done:false
            }
        }
    },
    computed: {
        ...mapGetters({
            detaildata: 'detaildata',
            username:'user',
            vueuserinfo:'userinfo'
        }),
        dataprocess() {
            
            //处理相关信息数据
            let temp = {}
            // 演员相关信息 
            let castArr = []
            let genres = []
            let countries = []
            let aka = []
            this.db.casts.forEach((item) => {
                castArr.push(item.name)
            })
            this.db.genres.forEach((item) => {
                genres.push(item)
            })
            this.db.countries.forEach((item) => {
                countries.push(item)
            })
            this.db.aka.forEach((item) => {
                aka.push(item)
            })
            temp.casts = castArr.join('/')
            temp.genres = genres.join('/')
            temp.countries = countries.join('/')
            temp.aka = aka.join('/')
            return temp
        }
    },
    methods: {
        ...mapMutations({
            setdetaildata:'setdetaildata',
            setuserinfo:'setuserinfo'
        }),
        init(){
            this.$http.jsonp(`https://api.douban.com/v2/movie/subject/${this.$route.query.id}`).then((res)=>{
                this.db = res.data
                // console.log(this.db)
                this.scorevalue = this.db.rating.average
            })
        },
        checkestimate() {
            //获取本地存储相关数据
            var userestimate = {
                estimate:this.estimate
            }
            let count = 0
            let Localdata = getLocal(this.username)
            Localdata.data.forEach((item)=>{
                if(item.id == this.db.id){
                    count++
                    Object.assign(item,userestimate)
                }
                    //如果没有发现该id对应数据，则手动添加。。
            })
            if(count == 0){
                 //如果没有发现该id对应数据，则手动添加。。
                var userpassword1 = {
                    password:getLocal(this.username)['password']
                }
                let dataArr = getLocal(this.username).data || []
                dataArr.push(Object.assign(userestimate,{
                    id:this.db.id
                }))
                let userdatalocal = Object.assign({},{
                    data:dataArr
                },{userinfo:userpassword1})
                setLocal(this.username,userdatalocal)
            }
        },
        writeestimate() {
            if(!this.username){
                this.visible = true
                this.dialogmes ="请登录"
                return
            }
            this.dialogVisible = true;
        },
        wanttosee(){
            if(!this.username){
                this.visible = true
                this.dialogmes ="请登录"
                return
            }
            let userdata = {
                wanna:true
            }
            let count = 0
            let Localdata = getLocal(this.username)
            Localdata.data.forEach((item)=>{
                if(item.id == this.db.id){
                    count++
                    Object.assign(item,userdata)
                }
            })
            if(count == 0){
                var userpassword = {
                    password:getLocal(this.username)['password']
                }
                //拼接用户数据
                let movieid = this.db.id
                //判断数据中是否存在该id对应的movie
                let dataArr = getLocal(this.username).data || []
                dataArr.push(Object.assign(userdata,{id:movieid}))
                let userdatalocal = Object.assign({},{
                    data:dataArr
                },{userinfo:userpassword})
                //将数据添加到本地存储
                //获取对应电影的id
                setLocal(this.username,userdatalocal)
            }else{
                return
            }

        }
    }
}
</script>

<style type='text/css' lang='less'>
.moviedetail-container {
    min-height: 1000px;
    .footer{
        width: 100%;
    }
    text-align: left;
    .mainbox {
        margin-bottom: 30px;
        .mainbox-title {
            line-height: 20px;
            >h4 {
                margin: 0 20px;
            }
        }
        .mainbox-content {
            margin-top: 20px;
            .mainbox-info {
                width: 333px;
                max-width: 333px;
                font: 12px Arial, Helvetica, sans-serif;
                line-height: 150%;
                color: #666666;
            }
            .mainbox-avator {
                width: 135px;
                height: 188px;
                margin-right: 12px;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .rating-box {
            width: 155px;
            margin: 2px 0 0 0;
            padding: 0 0 0 15px;
            border-left: 1px solid #eaeaea;
            color: #9b9b9b;
            h2 {
                color: black;
                font-weight: bold;
            }
            .rating-star {
                margin-top: 20px;
            }
        }
    }
    .feedback {
        .feedback-rate {
            display: inline-block;
            margin-left: 20px;
             :nth-child(n) {
                display: inline-block;
            }
        }
    }
    .sharebutton {
        margin-top: 20px;
        .el-button {
             :hover {
                color: blue;
            }
        }
    }
    .abstract {
        overflow: hidden;
        span {
            display: inline-block;
            color: #007722;
            font-size: 16px;
            margin: 24px 0 13px 0;
        }
        p {
            margin-bottom: 30px;
            font-size: 13px;
            word-break: break-all;
            i {
                display: inline-block;
                width: 26px;
            }
        }
 
    }
    .castimg-items{
        margin-left: -20px;
        .castimg{
            width: 95px;
            height: 133px;
            margin:0  20px;
        }
        h6{
            text-align: center
        }
    }

}
.footer{
    margin-top: 180px;
}
</style>