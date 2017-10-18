<template>
    <div class="doubleslider-container">
        <div class="ds-title">
            <h5 class="fl">最新热门电影</h5>
            <ul class="clearfix fl"  @click='test'>
                <li class="ds-item fl" :dataq="0" :class="{dbactive:dbindex == 0 }">热门</li>
                <li class="ds-item fl" :dataq="1" :class="{dbactive:dbindex == 1 }">最新</li>
                <li class="ds-item fl" :dataq="2" :class="{dbactive:dbindex == 2 }">豆瓣高分</li>
                <li class="ds-item fl" :dataq="3" :class="{dbactive:dbindex == 3 }">冷门佳片</li>
                <li class="ds-item fl" :dataq="4" :class="{dbactive:dbindex == 4 }">华语</li>
                <li class="ds-item fl" :dataq="5" :class="{dbactive:dbindex == 5 }">欧美</li>
                <li class="ds-item fl" :dataq="6" :class="{dbactive:dbindex == 6 }">韩国</li>
                <li class="ds-item fl" :dataq="7" :class="{dbactive:dbindex == 7 }">日本</li>
            </ul>
            <!-- <div class="ds-more">更多...</div> -->
        </div>
        <div class="ds-content">
            <el-carousel height='425px' :interval='4000' indicator-position='outside' :autoplay='autoplay'> 
                <el-carousel-item class="ds-card-items clearfix" v-for='nihao in result' >
                    <div class="ds-card-item fl" v-for="data in nihao">
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
            url:'https://api.douban.com/v2/movie/search?tag=%E7%83%AD%E9%97%A8&count=30&start=0',
            cardData:[],
            result:[],
            autoplay:true,
            typeArr:['最新','豆瓣','高分','冷门','佳片','华语','欧美','韩国','日本'],
            hotMovies:{},
            dbindex:0
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=40').then((res)=>{
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
            let target = e.srcElement.attributes.dataq.value
            let q = encodeURIComponent(this.typeArr[target])
            console.log(target)
            this.dbindex = parseInt(target)
            let url = `https://api.douban.com/v2/movie/search?tag=${q}&count=40`
            if(localStorage.getItem(target)){
                this.result = JSON.parse(localStorage.getItem(target))
            }else{
                this.$http.jsonp(url).then((res)=>{
                this.result = res.data.subjects
                this.result = this.result.concat(res.data.subjects)
                this.result = this.processArr(this.result)
                let temp;
                temp = JSON.stringify(this.result)
                localStorage.setItem(target,temp)
                })
            }
        }
    }
}
</script>

<style type='text/css' lang='less'>
.ds-lh{
    height: 21px;
    line-height: 21px;
}

.doubleslider-container{
    width: 675px;
    .ds-title{
        height: 50px;
        vertical-align: top;
        h5{
            .ds-lh;
            font-size: 16px;
            color: #111;
        }
        ul{
            margin-left:14px;
            .ds-lh;
            .ds-item{
                margin: 0;
                margin-right: 12px;
                padding: 0;
                color: rgba(0, 0, 0, 0.9);
                vertical-align: inherit;
                font-size: 13px;
                border-radius: 0;
                cursor: pointer;

                :hover{
                    color: blue
                }
            }
            .dbactive{
                color: #FF6A6A;
                font-weight: 400;
                font-size: 16px;                  
            }
        }
        .ds-more{
            .ds-lh;
        }
    }
    .ds-content{
        width: 100%;
        .ds-card-items{
            width: 675px;
            height: 100%;
            float: left;
            .ds-card-item{
                margin-right: 25px;
                &:nth-child(5n){
                    margin-right: 0px;
                }
            }
        }
    }
}
</style>