<template>
    <div @click='con'>
        <img :src="singleactor.avatars.medium" alt="" class="castimg">
        <h6>{{singleactor.name}}</h6>
    </div>
</template>

<script type='text/javascript'>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: ['singleactor'],
    methods: {
        ...mapMutations({
            setdetaildata:'setdetaildata'
        }),
        con() {
            let url = `http://api.douban.com/v2/movie/celebrity/${this.singleactor.id}`
            this.$http.jsonp(url).then((res) => {
                this.setdetaildata(res.data)
                this.$router.push({
                    path: 'actor',
                    query: {
                        id: this.singleactor.id
                    }
                })
            })
        }
    }
}
</script>

<style type='text/css' lang='less'>
.castimg {
    width: 95px;
    height: 133px;
    margin: 0 20px;
}

h6 {
    text-align: center
}
</style>