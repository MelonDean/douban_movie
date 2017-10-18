<template>
    <div>
        <slot name="one"></slot>
        <span class="el-icon-d-arrow-right"></span>
        <slot name="two"></slot>
        <span class="el-icon-d-arrow-right"></span>
        <slot name="three"></slot>
    </div>
</template>

<style lang='less'>
.el-icon-d-arrow-right{
    font-size: 12px;
    color: skyblue;
}
</style>
