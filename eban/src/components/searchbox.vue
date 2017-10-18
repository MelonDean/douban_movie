<template>
    <div class="searchbox-container w">
        <div class="searchtitle fl">豆瓣电影</div>
        <div class="searchinput fl" @mouseleave='unshow'>
            <input type="text" placeholder="请输入你要查询的电影、电视剧" @input='searchit' v-model="query" @keyup.enter='searchit'>
            <span @click='searchit'>搜索</span>
            <ul class="searchlist" v-if='result' >
                <li v-for='(item,index) in result.subjects' :class="{ceshi:target === index}" @mouseover='checkone(index)' @click='jumptodetail(item.id)'>
                    <img :src="item.images.small">
                    <div>
                        <h5>{{item.title}}</h5>
                        <h6>{{item.original_title}}</h6>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type='text/javascript'>
import {mapMutations} from 'vuex'
export default{
    components:{

    },
    methods:{
        ...mapMutations({
            setdetail:"setdetaildata"
        }),
        searchit(){
            let url = `https://api.douban.com/v2/movie/search?q=${encodeURIComponent(this.query)}`
            this.$http.jsonp(url).then((res)=>{
                this.result = res.data
            })
        },
        scale(){

        },
        checkone(index){
            this.target = index
        },
        unshow(){
            this.result = false
        },
        jumptodetail(id){
            console.log(222)
            let url = `https://api.douban.com/v2/movie/subject/${id}`;
            this.$http.jsonp(url).then((res)=>{
                this.detail = res.data
                this.setdetail(this.detail)
                this.$router.push({
                    path:'moviedetail',
                    query:{
                        id:id
                    }
                })
            })

        }
    },
    data(){
        return{
            result:{},
            query:'',
            target :'',
            showme:true,
            detail:''
        }
    }
}
</script>

<style type='text/css' lang='less'>
    .searchbox-container{
        text-align: left;
        height: 74px;
        .searchtitle{
            display: inline-block;
            color: #27a;
            font-size: 30px;
            line-height: 74px;
            width: 145px;
            margin-left: 20px;
            text-align: left;
        }
        .searchinput{

            display: inline-block;
            font-size: 0;
            position: relative;
            input{
                border: 1px solid sandybrown;
                text-indent: 20px;
                height: 30px;
                width: 460px;
                margin-top: 20px;
                border-top-left-radius:10px;
                border-bottom-left-radius:10px;
            }
            span{
                position: absolute;
                top:20px;
                display: inline-block;
                height: 30px;
                line-height: 30px;
                width: 40px;
                color: red;
                line-height: 30px;
                border-top-right-radius:10px;
                border-bottom-right-radius:10px;
                background-color: skyblue;
                font-size:16px;
                text-align:center;
                border: 1px solid sandybrown;
            }
        }
    }
    .searchlist{
        width: 460px;
        background-color:#BBFFFF;
        position: absolute;
        top: 50px;
        left: 0px;
        z-index: 222;
        max-height: 600px;
        overflow: scroll;
        overflow-x: hidden;
        li{
            height: 80px;
            border-radius: 15px;
            border-bottom: 1px solid #ccc;
            z-index: 2222;
            position: relative;
            text-align: left;
            text-indent: 70px;
            img{
                height: 80px;
                width: 60px;
                position: absolute;
                left: 0;
            }
            h5{
                color: black;
                font-size: 18px;
                text-align: left;
            }
            h6{
                text-align: left;
                font-size: 16px;
            }
        }
        .ceshi{
            background-color: #00FFFF;
        }
    }

</style>