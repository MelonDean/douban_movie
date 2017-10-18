<template>
    <div class="tvslider-container">
        <div class="tv-title">
            <h5 class="fl">最新热门电视剧</h5>
            <ul class="clearfix fl"  @click='test'>
                <li class="tv-item fl" :dataq="10" :class="{tvactive:index == 10 }">热门</li>
                <li class="tv-item fl" :dataq="11" :class="{tvactive:index == 11 }">国产剧</li>
                <li class="tv-item fl" :dataq="12" :class="{tvactive:index == 12 }">综艺</li>
                <li class="tv-item fl" :dataq="13" :class="{tvactive:index == 13}">美剧</li>
                <li class="tv-item fl" :dataq="14" :class="{tvactive:index == 14 }">日剧</li>
                <li class="tv-item fl" :dataq="15" :class="{tvactive:index == 15 }">韩剧</li>
                <li class="tv-item fl" :dataq="16" :class="{tvactive:index == 16 }">日本动画</li>
                <li class="tv-item fl" :dataq="17" :class="{tvactive:index == 17 }">纪录片</li>
            </ul>
            <!-- <div class="tv-more">更多...</div> -->
        </div>
        <div class="tv-content">
            <el-carousel height='425px' indicator-position='outside' :autoplay = "autoplay"> 
                <el-carousel-item class="tv-card-items clearfix" v-for='nihao in result'>
                    <div class="tv-card-item fl" v-for="data in nihao">
                        <singlecard :item="data"></singlecard>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script type='text/javascript'>
import singlecard from './singlecard'
import getData from '../assets/js/base'
export default{
    components:{
        singlecard
    },
    data(){
        return{
            cardData:[],
            result:[],
            autoplay:false,
            typeArr:['热门','国产剧','综艺','美剧','日剧','韩剧','日本动画','纪录片'],
            hotMovies:{},
            index:10
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?start=20&count=40').then((res)=>{
                this.cardData = res.data.subjects
                this.result = this.processArr(this.cardData)
            })
        },
        processArr(arr){
            let res = []
            res[0] = arr.slice(0,10)
            res[1] = arr.slice(10,20)
            res[2] = arr.slice(20,30)
            res[3] = arr.slice(30,40)
            return res
        },
        test(e){
            // 判断该key对应的数组是否存在，若存在，直接返回使用该数组，不存在就存储
            let key = e.srcElement.attributes.dataq.value
            this.index = parseInt(key)
            let target = this.index -10 
            let q = encodeURIComponent(this.typeArr[target])
            let url = `https://api.douban.com/v2/movie/search?tag=${q}&count=40`
            if(localStorage.getItem(key)){
                this.result = JSON.parse(localStorage.getItem(key))
            }else{
                this.$http.jsonp(url).then((res)=>{
                    this.result = res.data.subjects
                    this.result = this.result.concat(res.data.subjects)
                    this.result = this.processArr(this.result)
                    localStorage.setItem(key,JSON.stringify(this.result))
                })
            }

        }
    }
}
</script>

<style type='text/css' lang='less'>
.tv-lh{
    height: 21px;
    line-height: 21px;
}

.tvslider-container{
    width: 675px;
    .tv-title{
        height: 50px;
        vertical-align: top;
        h5{
            .tv-lh;
            font-size: 16px;
            color: #111;
        }
        ul{
            margin-left:14px;
            .tv-lh;
            .tv-item{
                margin-right: 12px;
                color: rgba(0, 0, 0, 0.9);
                vertical-align: inherit;
                font-size: 13px;
                cursor: pointer;
                border-radius: 0;
            }
            .tvactive{
                color: #FF6A6A;
                font-weight: 400;
                font-size: 16px;
            }
        }
        .tv-more{
            .tv-lh;
        }
    }
    .tv-content{
        width: 100%;
        .tv-card-items{
            width: 675px;
            height: 100%;
            float: left;
            .tv-card-item{
                margin-right: 25px;
                &:nth-child(5n){
                    margin-right: 0px;
                }
            }
        }
    }
}

</style>