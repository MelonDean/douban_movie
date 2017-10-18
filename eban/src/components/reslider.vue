<template>
    <div class="reslider-container">
        <div class="reslider-top clearfix">
            <h4 class="reslider-title fl">热门推荐</h4>
        </div>
        <el-carousel>
            <el-carousel-item class="reslider-content-wrapper clearfix" v-for='i in slider'>
                <div class="reslider-content-wrapper clearfix">
                    <div class="reslider-image fl">
                        <img :src="i.url" alt="">
                    </div>
                    <div class="reslider-des fl">
                        <h4>{{i.title}}</h4>
                        <p class="reslider-detail">
                            {{i.des}}
                        </p>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script type='text/javascript'>
export default {
    data(){
        return{
            slider:[
                {
                    url:"https://img1.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/8fa8a0863152837.jpg",
                    title:'2018年奥斯卡外语片各国申报片单一览',
                    des:'中国内地《战狼2》、中国香港《一念无明》、中国台湾《日常对话》等92部新片冲击奥斯卡最佳外语片！'
                },
                {
                    url:"https://img1.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/04ae5a66df5000c.jpg",
                    title:'王的男人”是如何独树一帜傲立特工片的',
                    des:'有人说，在王男和James Bond之间隔了一百个Jason Bourne和Jack Bauer，但王男中你却只看到了萌宠JB。发自内心的趣味性，或许正是一切它和老特工片不那么一样的来源所在吧。'
                },                {
                    url:"https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/dd5223abb0f478d.jpg",
                    title:'潘粤明演技再好，面对毒评也被怼成潘粤暗',
                    des:'潘粤明潘粤暗兄弟承包瓣嘴，感谢网友好评自认浮肿~'
                },                {
                    url:"https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/e5acfbcd2a73092.jpg",
                    title:'善恶之间探索人性黑白',
                    des:'李安、诺兰、科恩兄弟、朴赞郁、奉俊昊都是他的领路人！他是人称“平顶山科恩兄弟”的忻钰坤。处女作《心迷宫》轻松跃入TOP250榜单，新作《暴裂无声》即将上映，听他亲自解析。'
                },                {
                    url:"https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/d50ae5442f54c35.jpg",
                    title:'成龙新片风格大变？',
                    des:'主动求变才是大哥不变的初心！观影会客厅NO.6——豆瓣电影专访成龙！'
                },                {
                    url:"https://img1.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/ba2e1f59d4a1edc.jpg",
                    title:'《正义联盟》全新官方中字预告，大超现身!',
                    des:'神奇女侠笑容美翻，正义联盟英雄集结！BGM《Heroes》燃爆！11月17日北美上映，内地有望同步~'
                },                {
                    url:"https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/f58ba813e965a1d.jpg",
                    title:'伍迪·艾伦新片《摩天轮》首发预告',
                    des:'伍迪·艾伦自编自导，凯特·温丝莱特、贾斯汀·汀布莱克、詹姆斯·贝鲁什、朱诺·坦普尔主演，12月1日北美上映！'
                },                {
                    url:"https://img3.doubanio.com/view/movie_gallery_frame_hot_rec/normal/public/f58ba813e965a1d.jpg",
                    title:'《环太平洋2：雷霆再起》首支预告燃爆来袭',
                    des:'机甲全面升级战斗力逆天！经典BGM变奏后超级燃！'
                },                
            ]
        }
    }
}
</script>

<style type='text/css' lang='less'>
.reslider-container {
    width: 100%;
    height: 100%;
    .reslider-top {
        height: 35px;
        width: 100%;
        border-bottom: 1px solid #eaeaea;
        margin-bottom: 18px;
        .reslider-title {
            height: 35px;
            line-height: 35px;
            font-size: 18px;
            margin-bottom: 18px;
        }
        .reslider-control {}
    }
    .reslider-content-wrapper {
        height: 240px;
        width: 675px;

        .reslider-image {
            width: 350px;
            height: 240px;
        }
        .reslider-des {
            text-align: left;
            width: 325px;
            height: 240px;
            padding: 48px 24px 24px 24px;
            box-sizing: border-box;
            h4 {
                font-size: 18px;
                color: #111;
                line-height: 28px;
                margin-bottom: 18px;
            }
            p {
                font-size: 13px;
                color: #999;
                line-height: 20px
            }
        }
    }
}
        .el-carousel__button {
            background-color:grey;
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
</style>