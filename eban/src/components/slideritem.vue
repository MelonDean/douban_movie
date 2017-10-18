<template>
    <div class="slideritem-container">
        <div class="singlecard-items clearfix" ref='slider'>
            <div v-for='item in movies.subjects'>
                <singlecard  class="singlecard-item" :item="item"></singlecard>
            </div>
        </div>
    </div>
</template>

<script type='text/javascript'>
import singlecard from './singlecard'

export default{
    props:['movies','currentnum'],
    components :{
        singlecard
    },
    watch:{
        currentnum(val,oldvalue){
            let pos = 0;
            let target = Math.ceil(this.movies.subjects.length/5)
            if(val==1){
                pos = 0
            }else{
                pos = (val-1)*700
            }
            
            if(val == 1 && oldvalue == target){
                this.$refs.slider.style.transition = `all 1s ease`  
                this.$refs.slider.style.transform = `translateX(0)`
            }else{
                this.$refs.slider.style.transition = `all 1s ease`
                this.$refs.slider.style.transform = `translateX(-${pos}px)`
            }

        }
    }
}
</script>

<style type='text/css' lang='less'>
.slideritem-container{
    width: 675px;
    height: 211px;
    position: relative;
    overflow: hidden;
}
.singlecard-items{
    position: absolute;
    width:400%;
    height: 211px;
    overflow: hidden;
    .singlecard-item{
        margin-right: 25px;
        float: left;  
    }
}

</style>