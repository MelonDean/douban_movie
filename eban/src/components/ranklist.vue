<template>
    <div class="ranklist-container">
        <dl>
            <dt>
                <slot name="title">排行榜</slot>
            </dt>
            <dd v-for='(item,index) in rank' @click="ranktomoviedetail(item.id)">
                <span>{{index+1}}</span>
                <span>{{item.title}}</span>
            </dd>
            <dd>
                <slot></slot>
            </dd>
        </dl>
    </div>
</template>

<script type='text/javascript'>
import {mapMutations} from 'vuex'
export default {
    props: ['rank'],
    methods: {
        ...mapMutations({
            setdetaildata:"setdetaildata"
        }),
        ranktomoviedetail(id) {
            this.$http.jsonp(`https://api.douban.com/v2/movie/subject/${id}`).then((res)=>{
                this.setdetaildata(res.data)
                this.$router.push({
                    path:'/moviedetail',
                    query:id
                })
            })
        }
    }
}
</script>

<style type='text/css' lang='less'>
.ranklist-container {
    width: 100%;
    box-sizing: border-box;
    dl {
        text-align: left;
        width: 100%;
        line-height: 40px;
        dt {
            border-bottom: 1px solid #666;
            font-weight: 700;
            font-size: 16px;
            color: #FF6A6A;
        }
        dd {
            height: 40px;
            font-size: 14px;
            border-bottom: 1px solid #666;
            &:hover {
                background-color: lightblue;
            }
        }
    }
}
</style>