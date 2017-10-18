<template>
    <div class="headerinfo-container clearfix">
        <div class="headerinfo-left">
            <ul class="clearfix tipstarget" @click="mutationnnnn">
                <transition name='tips-fade'>
                    <div v-if="tip" class="tips" >{{tipsinfo}}<img src="../assets/images/tips.gif" alt="" srcset=""></div>
                </transition>
                <li class="nav-item">
                    <a href="#">豆瓣</a>
                </li>
                <li class="nav-item">
                    <a href="#">读书</a>
                </li>
                <li class="nav-item">
                    <a href="#">电影</a>
                </li>
                <li class="nav-item">
                    <a href="#">音乐</a>
                </li>
                <li class="nav-item">
                    <a href="#">同城</a>
                </li>
                <li class="nav-item">
                    <a href="#">小组</a>
                </li>
                <li class="nav-item">
                    <a href="#">阅读</a>
                </li>
                <li class="nav-item">
                    <a href="#">FM</a>
                </li>
                <li class="nav-item">
                    <a href="#">时间</a>
                </li>
                <li class="nav-item">
                    <a href="#">东西</a>
                </li>
                <li class="nav-item">
                    <a href="#">市集</a>
                </li>
                <li class="nav-item">
                    <a href="#">更多</a>
                </li>
            </ul>
        </div>
        <div class="headerinfo-right">
            <span class="login" v-if='username'>{{username}}</span>
            <span class="login" @click='logbox' v-if='!username'>登录</span>
            <span class="register" v-if='username' @click='showuserinfo'>欢迎您</span>
            <span class="register" @click='register' v-if='!username'>注册</span>
        </div>
        <div class='loginbox'>
            <el-dialog :visible.sync="logstatus" title="登录">
                <el-form label-width="80px" >
                    <el-form-item label='用户名'>
                        <el-input v-model="loginname"></el-input>
                    </el-form-item>
                    <el-form-item label='密码'>
                        <el-input type='password' v-model="loginpassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click='logincommit'>登录</el-button>
                        <el-button @click='cancel'>取消</el-button>
                    </el-form-item>
                </el-form>
                <div class="res-mes" v-if='warningmes'>
                    <i class="el-icon-warning">{{warningmes}}</i>
                </div>
            </el-dialog>
        </div>
        <div class='registerbox'>
            <el-dialog :visible.sync="restatus" title="注册">
                <el-form label-width="80px" >
                    <el-form-item label='用户名'>
                        <el-input v-model="regname"></el-input>
                    </el-form-item>
                    <el-form-item label='密码'>
                        <el-input type='password' v-model="regpass"></el-input>
                    </el-form-item>
                    <el-form-item label='确认密码'>
                        <el-input type='password' v-model="regrepass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click='registercommit'>注册</el-button>
                        <el-button @click='cancel'>取消</el-button>
                    </el-form-item>
                </el-form>
                <div class="res-mes" v-show="warningmes">
                    <i class="el-icon-warning">{{warningmes}}</i>
                </div>
            </el-dialog>
        </div>
        <div class='userinfo' v-if="false">
            <dl>
                <dt @click="showdetail">
                    <i>我想看的</i>
                    <i class="arrow" :class="arrowdirection"></i>
                </dt>
                <dd v-for='item in userinfolist' v-if='item.wanna&&!seen'>{{item.wanna}}>156</dd>
            </dl>
            <dl>
                <dt>我看过的</dt>
                <dd></dd>
            </dl>
            <dl>
                <dt>我的短评</dt>
                <dd v-for='item in userinfolist' v-if='item.estimate'>{{item.estimate}}</dd>
            </dl>
            <dl>
                <dt>我的豆列</dt>
                <dd></dd>
            </dl>
        </div>
    </div>
</template>

<script type='text/javascript'>
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
import {setLocal,getLocal} from '../assets/js/base'

export default {
    props:['userinfomation'],
    data() {
        return {
            logstatus: false,
            restatus:false,
            regname:'',
            regpass:'',
            regrepass:'',
            warningmes:"",
            loginpassword:'',
            loginname:'',
            username:"",
            loginsuccess:false,
            seen:false,
            userinfo:{},
            userinfolist:{},
            tip:false,
            tipsinfo:"施工中。。。。。。。"
        }
    },
    mounted(){
        // 初始化相关用户数据
        if(this.user){
            this.username = this.user
            this.loginsuccess = true
        }else if(this.userinfomation){
            this.username = this.userinfomation
        }else{
            return
        }

        this.userinfolist = getLocal(this.username).data
        
    },
    computed:{
        ...mapGetters({
            user:'user',
            vueuserinfo:'userinfo'
        }),
        arrowdirection (){
            return this.seen?"el-icon-arrow-up":"el-icon-arrow-down"
        }
    },
    methods:{
        ...mapMutations({
            setuser:'setuser',
            setuserinfo :'setuserinfo',
            setpassword:'setpassword'
        }),
        logbox(){
            this.logstatus= true
        },
        register(){
            this.restatus = true
        },
        cancel(){
            this.restatus = false
            this.logstatus = false
        },
        showuserinfo(){
            
        },
        registercommit(){
            if(!this.regname || !this.regpass || !this.regrepass){
                this.warningmes = "用户名或者密码不能为空"
                setTimeout(()=>{
                    this.warningmes = ""
                },2000)
            }else if(this.regname !== this.regrepass){
                this.warningmes = "两次输入的密码不同，请重新输入"
                setTimeout(()=>{
                    this.warningmes = ""
                },2000)
            }else if(localStorage.getItem(this.regname)){
                this.warningmes = "此用户已存在，请重新输入"
                setTimeout(()=>{
                    this.warningmes = ""
                },2000)                
            }else{
                //注册账号，并保存相关密码
                this.userinfo.password = this.regpass
                setLocal(this.regname,this.userinfo)
                this.setpassword(this.password)
                this.warningmes = "注册成功，稍后将跳转至登录界面"
                setTimeout(()=>{
                    this.restatus = false
                    this.logstatus = true
                    this.warningmes = ''
                },2000)
            }
        },
        mutationnnnn(){
            this.tip = true;
            setTimeout(()=>{
                this.tip = false
            },3000)
        },
        logincommit(){
            let checkpassword = getLocal(this.loginname).password
            if(!this.loginname || !this.loginpassword){
                this.warningmes = "用户名或者密码不能为空"
                setTimeout(()=>{
                    this.warningmes = ""
                },2000)                
            }else if(!localStorage.getItem(this.loginname) || this.loginpassword !==checkpassword){
                this.warningmes = "用户名或者密码错误"
                setTimeout(()=>{
                    this.warningmes = ""
                },2000)                    
            }else{
                this.restatus = false
                this.logstatus = false
                this.loginsuccess = true
                this.username = this.loginname
            }

            //登录成功后使用localStorage保存数据
            //登录成功以后获取对应账号的相关数据并渲染
            this.setuser(this.username)
            //查询本地数据看看是否存在
            if(getLocal(this.username)){
                //如果存在，则向其中添加
                console.log(getLocal(this.loginname))
            }else{
                // password:    data
                this.setuserinfo(Object.assign({},this.vueuserinfo,getLocal(this.username)))
                setLocal(this.username,this.vueuserinfo)               
            }
        },
        showdetail(){
            this.seen = !this.seen
        }
    }

}
</script>

<style type='text/css' lang='less'>
.headerinfo-container {
    background-color: #545652;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    min-width: 950px;
    width: 100%;
    position:relative;

    .headerinfo-left {
        float: left;
        height: 28px;
        .nav-item {
            text-align: center;
            cursor: pointer;
            width: 48px;
            float: left;
            a {
                color: white;
            }
        }
    }
    .headerinfo-right {
        float: right;
        color: white;
        margin-right: 20px;
        span {
            display: inline-block;
            width: 48px;
            cursor: pointer;
        }
    }
    .res-mes{
        color: red;
    }
}
    .userinfo{
        position:absolute;
        top:28px;
        right:0;
        background-color:pink;
        width:350px;
        max-height: 800px;
        overflow: scroll;
        dt{
            text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            font-weight: 400;
            border-bottom: 1px solid #666;
            .arrow{
                margin-left: 30px;
            }

        }
        dd{
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            padding-left: 10px;
            background-color: skyblue;
        }
    }
    .tipstarget{
        position: relative;
        .tips{
            width:100%;
            background-color:rgba(255, 255,255, 0.9);
            position: absolute;
            left: 10px;
            top: 35px;
            z-index: 222;
            border-radius: 10px;
            text-align: center;
            font-size: 18px;
            font-family: Lucida;
            line-height: 60px;
        }
    }
    .tips-fade-enter,
    .tips-fade-leave-to{
        transform: translateX(-510px);
        opacity: 0;
    }
    .tips-fade-leave,
    .tips-fade-enter-to{
        transform: translateX(0);
        opacity: 1;
    }
    .tips-fade-enter-active,
    .tips-fade-leave-active{
        transition:all 1s ease;
    }

</style>