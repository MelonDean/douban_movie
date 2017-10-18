<template>
    <div class="singlecard-container" @click='showid'>
        <div class="singlecard-img">
            <img :src="item.images.small" alt="">
        </div>
        <h4 class="singlecard-title">{{item.title}}</h4>
        <div class="singlecard-score">
            <span></span>
            <span>{{item.rating.average}}</span>
        </div>
    </div>
</template>

<script type='text/javascript'>
import { mapMutations } from 'vuex'
import {mapGetters} from 'vuex'
export default {
    props: ['item'],
    methods: {
        ...mapMutations({
            setdetaildata: 'setdetaildata'
        }),
        showid() {
            let url = `https://api.douban.com/v2/movie/subject/${this.item.id}`
            this.$http.jsonp(url).then((res) => {
                this.setdetaildata(res.data)
                this.$router.push({
                    path: 'moviedetail',
                    query:{
                        id:this.item.id,
                        user:this.user
                    }
                })
            })
        }
    },
    computed:{
        ...mapGetters({
            user:'user'
        })
    }
}
</script>

<style type='text/css' lang='less'>
.singlecard-container {
    .singlecard-img {
        img {
            width: 115px;
            height: 160px;
        }
    }
    .singlecard-title {
        text-align: center;
        height: 22px;
        line-height: 22px;
        font-weight: 400;
        font-size: 14px;
    }
    .singlecard-score {
        font-size: 12px;
        span {
            display: inline-block;
            height: 19px;
            line-height: 19px;
            color: red;
        }
    }
    .singlecard-title {
        width: 115px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>