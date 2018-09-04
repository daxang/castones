<template>
  <div class="top-header">
      <div class="gap">
          <div class="wrapper">
                      <!--头部logo-->
                        <div class="logo"  @click="toHome">
                            <img class="logo-img" src="./../../assets/cat.png" style="height:60px;margin-top:10px;float:left">
                              </div>
                      <!--头部中间搜索框-->
                        <div class="search">   
                              <form  action="/search" method="get" id="search" style="width:100%;height:100%;text-align:center">
                               <input class="keyword" autocomplete="off" placeholder="....." name="key" >
                                <button class="search-submit" type="submit" >搜索</button>
                              </form>
						                
                             </div>

                      <!--头部用户区-->         
                        <div class="account" >
                            <div class="container" style="width:100%;height:100%">
                               <div class="navbar-right-container"  style="width:100%;height:100%" >
                                  <div class="navbar-menu-container" style="width:100%;height:100%;position:relative;padding:0">
                                    <div style="height:30px;width:30px;position:absolute;right:140px;margin-top:25px;" v-if="nickName">
                                       <img :src="userImg"  style="width:30px;height:30px;vertical-align:middle;" >
                                    </div>
                                    <el-dropdown size="medium" split-button  v-if="nickName" style="height:30px;margin-top:25px;width:150px;position:absolute;right:0px;">
                                         <router-link :to="{name:'user',params:{userId:userId}}" style="text-decoration:none;"> <span v-text="nickName" style="width:150px;color:white"></span></router-link>
                                          <el-dropdown-menu slot="dropdown"  style="color:white">
                                            <el-dropdown-item>
                                              <router-link :to="{name:'user',params:{userId:userId}}" style="text-decoration:none;color:gray">个人中心页面</router-link>
                                              </el-dropdown-item>
                                            <el-dropdown-item>信息设置</el-dropdown-item>
                                            <el-dropdown-item>反馈与求助</el-dropdown-item>
                                              <el-dropdown-item  @click.native="getCookie" >dianji</el-dropdown-item>
                                            <el-dropdown-item @click.native="logout" >退出</el-dropdown-item>
                                          </el-dropdown-menu>
                                        </el-dropdown>
                                    <!--如果没有登录，则显示如下信息-->
                                    <div style="height:100%;line-height:80px;width:100%;margin:0 auto;"  v-if="!nickName">
                                      <a href="javascript:void(0)" class="navbar-link" style="text-decoration:none;color:white;margin-left:30px" id="show-modal" v-bind:showModal="showModal" @click="showLogin">登录</a>
                                       <a href="javascript:void(0)" class="navbar-link" style="text-decoration:none;color:white;float:right;margin-right:10px"  id="show-modal" v-bind:showModal="showModal02" @click="showSignup">注册</a>
                                    </div>
                                   
                                  </div>
                                </div>
                            </div>
                             </div>
            
          </div>
      </div>

      <!--登录弹框-->
        <modal v-if="showModal" @close="closeShowModal">
          <div slot="header" style="text-align:left">
            <span style="font-size:16px;font-weight:bolder;color:#cc5a18">
              你一定有什么想要跟我们一起分享的东西，赶紧的，快让我们大开眼界吧，我们已经迫不及待了！
            </span>
           
          </div>
          <div slot="body">
            <div style="text-align:left;margin-bottom:10px;color:red">
              <span v-if="errTip">用户名或密码不正确</span>
              
            </div>
             <el-input placeholder="请输入用户名" v-model="userName" style="margin-bottom:10px">
             </el-input>
             <el-input placeholder="请输入密码" v-model="userPwd" type="password">
             </el-input>
              <p style="text-align:left">
            <span>没有账号?要不要注册一个呢？在此</span>
            <a class="pointer" @click="showSignup" style="color:#42b983;font-weight:bolder；:hover{cursor:pointer}">注册 </a>
          </p>
          </div>
         
        <div slot="footer">
          <a class="" @click="showModal = false" style="text-decoration:none;color:gray;margin-right:20px">关闭</a>
          <a class="btn btn--m btn--red" style="text-decoration:none" @click="login">
            <el-button type="primary" plain>登录</el-button>
          </a>
        </div>
      </modal>

<!--注册弹框-->
        <modal v-if="showModal02" @close="closeShowModal02">
          <div slot="header" style="text-align:left">
             <span style="font-size:16px;font-weight:bolder;color:#cc5a18">
              如果你认同我们，可以顺手注册一下，在无聊、无力或者无助的时候，希望这儿能给你一点自己的空间！
            </span>
          </div>
          <div slot="body">
            <div style="text-align:left;margin-bottom:10px;color:red">
              <span v-if="successTip" style="color:green;margin-top:50px;font-size:20px;font-weight:bold">注册成功</span>
              <span v-if="errTip">注册失败</span>
              <span v-if="haveTip">用户名重复</span>
              <span v-if="nullTip">请全部填完</span>
            </div>
             <el-input placeholder="请输入用户名"  v-model="userName" v-if="!success" style="margin-bottom:10px">
             </el-input>
             <el-input placeholder="请输入密码" type="password" v-model="userPwd" v-if="!success"  style="margin-bottom:10px">
             </el-input>
             <el-input placeholder="请重复输入密码" type="password" v-model="userPwd1" v-if="!success" >
             </el-input>
              <p style="text-align:left" v-if="!success" >
                <span>已经拥有一个账号了？在此</span>
                <a  class="pointer" @click="showLogin" style="color:#42b983;font-weight:bolder;">登录 </a>
                </p>

          </div>
        <div slot="footer" style="margin-top:50px">
            <a class="" v-if="!success" href="javascript:;" @click="showModal02 = false" style="text-decoration:none;color:gray;margin-right:20px">关闭</a>
          <a class="btn btn--m btn--red"  v-if="!success"  href="javascript:;" style="text-decoration:none" @click="signup">
            <el-button type="primary" plain>注册</el-button>
          </a>
        </div>
      </modal>

  </div>
</template>


<script>
    import './../../assets/css/modal.css'
    import Modal from './Modal'
    import {mapState} from 'vuex'
export default {
  name: "topHeader",
  data() {
    return {
      users:[{
        "userName":"user001",
        "userPwd":"user001",
        "createDate":"20180903",
        "userId":"2018090301"
      },{
        "userName":"user002",
        "userPwd":"user002",
        "createDate":"20180903",
        "userId":"2018090302"
      },{
        "userName":"user003",
        "userPwd":"user003",
        "createDate":"20180903",
        "userId":"2018090303"
      },{
        "userName":"user004",
        "userPwd":"user004",
        "createDate":"20180903",
        "userId":"2018090304"
      },
      ],
      user:{},
      userName: '',
      userPwd: '',
      userPwd1:"",
      userId:"",
      showModal:false,
      showModal02:false,
      successTip:false,
      errTip:false,
      haveTip:false,
      nullTip:false,
      loginModalFlag:false,
      success:false
    };
  },

  //  mounted(){
  //   this.checkLogin();
  // },
  components:{
    Modal
  },
 
  methods:{
    //检查是否已登录
    // checkLogin(){
    //   console.log(this.userId)
    //   axios.get("/users/checkLogin").then((response)=>{
    //     let res=response.data;
    //     let path=this.$route.pathname
    //     if(res.status=="0"){
    //       this.$store.commit("updateUserInfo",res.result);
    //      this.userId=this.getCookie("userId")
    //     }else{
    //         this.$router.push({
    //           path:"/"
    //         })
    //     }
    //     }
    //     )
    //       },
  closeShowModal(){
    this.showModal=false;
    this.userPwd=""
    this.userPwd1=""
  },

  closeShowModal02(){
    this.showModal02=false;
    this.userPwd=""
    this.userPwd1=""
  },

  //点击登录按钮，弹出登录框

  showLogin(){
    this.showModal02=false;
    this.showModal=true;
  },
  //点击注册按钮，弹出注册框

  showSignup(){
    this.showModal=false;
    this.showModal02=true;
  },
    //登录
   login(){
     if(!this.userName ||!this.userPwd){
       this.errTip=true;
       return;
     }
     var userInfo={"userName":this.userName,"userPwd":this.userPwd}
     if(JSON.stringify(a).indexOf(JSON.stringify(b))!=-1){
       this.user=userInfo
     }else{
        this.$message.error('错了哦，没有这个用户');
     }
   },
   //get cookie中的userId
  getCookie(name){
    name= name + "=";
    var start = document.cookie.indexOf(name),
        value = null;
    if(start>-1){
        var end = document.cookie.indexOf(";",start);
        if(end == -1){
            end = document.cookie.length;
        }
        value = document.cookie.substring(start+name.length,end);
        return value;
    }
   return
},

   //注册
   signup(){
     if(!this.userName||!this.userPwd){
       this.nullTip=true;
       return;
     }
     if(this.userName.length<3){
        this.$message({
                 message: 'sorry，用户名不能少于3个字符',
                 type: 'warning'
                 });
       return
     }
     if(this.userPwd.length<6){
        this.$message({
                 message: 'sorry，密码的长度不能少于6个字符',
                 type: 'warning'
                 });
       return
     }
     if(this.userPwd!=this.userPwd1){
        this.$message({
                 message: 'sorry，两次输入的密码不一致',
                 type: 'warning'
                 });
       return
     }
     this.nullTip=false;
     this.haveTip=false;
     axios.post("/users/signup",{
       userName:this.userName,
       userPwd:this.userPwd
     }).then((response)=>{
       let res=response.data;
       if(res.status=="0"){
         this.successTip=true;
         this.success=true;
         setTimeout(
           this.closeShowModal02(),3000)
           }else {
              if(res.status=="2"){
                this.haveTip=true;
              }else{
                this.errTip=true;
              }
       }
     })
   },

   toHome(){
     this.$router.push({
       path:"/"})
   },

    closeModal(){
        this.mdShow = false;
         this.mdShowCart = false;
         },
     closePop(){
         this.filterBy=false;
        this.overLayFlag=false;
        this.mdShowCart = false;
        },
      logout(){
        axios.post("/users/logout").then((response)=>{
          let res=response.data;
          let path=this.$route.pathname
          if(res.status=="0"){
            console.log("这是退出后的："+this.userId)
            this.$store.commit("updateUserInfo",res.result.userName);
            this.$router.push({
              path:"/"
            })
          }
        })
      }
  }
};
</script>

<style>
.top-header {
  width: 100%;
  height: 80px;
  background: #fa8723;
  font-size: 10px;
  position:fixed;
  top: 0;
  margin-bottom: 10px;
  z-index: 1000
  
}
.gap {
  min-width: 1000px;
  height: 100%;
  padding: 0 20px;
  border-bottom: 1px solid #cc5a18;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}
.wrapper {
  position: relative;
  width: auto;
  height: 100%;
  max-width: 1380px;
  min-width: 1000px;
  margin: 0 auto;
  position:relative
}

.logo {
  width: 20%;
  height:100%;
  line-height: 80px;
  display: table-cell;
  position:absolute;
  left:0;
}
.logo :hover{
  cursor: pointer;
}

.search {
 width: 60%;
 height:100%;
 line-height: 80px;
  position:absolute;
  left:20%;
  text-align: center;
}
.keyword{
  height:30px;
  width:300px;
  border-radius: 5px;
  border:none;
  padding-left:10px;
  padding-top: 0;
  padding-bottom: 0
}
.search-submit{
  height:30px;
  width:50px;
  color:gray;
  border: none;
  border-radius: 5px
}
.account {
  width: 20%;
  height:100%;
  padding-left: 15px;
  font-size: 10px;
  position: absolute;
  right:0
}
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.el-button{
  background: #fa8723;
  border:none
}

.pointer{
  cursor: pointer;
}
</style>
