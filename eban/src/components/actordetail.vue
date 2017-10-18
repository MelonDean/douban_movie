<template>
    <div class="actordetail-container">
        <headerinfo></headerinfo>
        <searchbox></searchbox>
        <div class="w">
            <div class="wl">
                <moviesort></moviesort>
                <div>&nbsp;</div>
                <div class="actor-info">
                    <h2>{{actordata.name}}-{{actordata.name_en}}</h2>
                    <div class="actor-info-box clearfix">
                        <img :src="actordata.avatars.medium" alt="" class="actor-image fl">
                        <div class="actor-info-list fl">
                            <dl>
                                <dd>性别：<span>{{actordata.gender}}</span></dd>
                                <dd>星座: <span>暂无。。</span></dd>
                                <dd>主要作品:<span>{{movies}}</span></dd>
                                <dd>出生地: <span>{{actordata.born_place}}</span></dd>
                                <dd>职业: <span>演员</span></dd>
                                <dd>更多中文名: <span>{{alias}}</span></dd>  
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="actor-works">
                    <div v-for='item in works' class="clearfix work-item">
                        <singlecard :item='item.subject' class="fl"></singlecard>
                        <div class="fl proinfo" >
                            <h4>原名：{{item.subject.original_title}}</h4>
                            <div>
                                演员：<span v-for="actor in item.subject.casts">{{actor.name}}<i>&nbsp;</i></span>
                            </div>
                            <div>
                                上映年份：<span>{{item.subject.year}}</span>
                            </div>
                            <div>
                                类型：<span>{{item.subject.genres.join('/')}}</span>
                            </div>
                            <div>
                                导演：<span>{{item.subject.directors[0]?item.subject.directors[0].name:"未知"}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import singlecard from './singlecard'
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
        singlecard,
        searchbox
    },
    created() {
        this.init()
    },
    mounted(){
        setLocal(this.actordata.id,this.actordata)
    },
    computed:{
        ...mapGetters({
            actordata : 'detaildata'
        }),
        alias(){
            return this.actordata.aka_en.join('/')
        },
        movies(){
            return `《${this.actordata.works[0].subject.title}》`
        },
        works(){
            return this.actordata.works
        }
    },
    methods:{
        ...mapMutations({
            setdetaildata:'setdetaildata'
        }),
        init(){
            this.$http.jsonp(`http://api.douban.com/v2/movie/celebrity/${this.$route.query.id}`).then((res)=>{
                console.log(this.res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    data() {
        return {
           
            
        }
    }
}
</script>

<style type='text/css' lang='less'>
.actordetail-container{
    overflow: hidden;
    text-align: left;
    .actor-info{
        padding-bottom: 20px;
        border-bottom: 1px dashed black;
        .actor-image{
            margin-right: 20px;
            height: 190px;
            width: 135px;
        }

        h2{
            margin-bottom:10px;
        }
    }

    .work-item{
        margin-top: 20px;
        border-bottom: 1px solid #ccc;
    }
    .actor-works{
        text-align: center;
    }
    .proinfo{
        text-align: left;
        margin-left: 20px;
        line-height: 30px;
        >div{
            font-size: 16px;
            font-weight: 400;
            margin:10px 0;
            line-height: 20px;
            span{
                font-size: 14px;
            }
        }
    }
    .actor-info-list{
        dl{
            padding: 10px;
            dd{
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                span{
                    font-size: 14px;
                    font-weight: 700;
                }
            }
        }
    }

}

</style>