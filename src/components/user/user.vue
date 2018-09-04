<template>
  <div class="user">
      <div class="top" style=""> 
          <!--头像设置-->
          <div class="userImg">
              <img :src="user.userImg" style="float:left;width:auto;height:80%">
            </div>
            <!--用户名和操作信息-->
            <div class="userInfo">
                <div class="userInfo-top">
                    <span style="font-size:20px;margin-right:30px">{{user.userName}}</span>
                    <i class="el-icon-edit"></i>
                </div>
                
                <div class="userInfo-bottom" style="padding:0">
                    <ul style="list-style:none;text-align:left;padding-left:0;position:absolute;left:0;bottom:20px;margin:0">
                        <li>
                            <a href="">
                                <span class="bold">推荐</span>
                                <span class="gray">{{posts.length}}</span>
                            </a>
                        </li>
                         <li>
                            <a href="">
                                <span class="bold">收藏</span>
                                <span class="gray"></span>
                            </a>
                        </li>
                         <li>
                            <a href="">
                                <span class="bold">原创</span>
                                <span class="gray"></span>
                            </a>
                        </li>
                         <li>
                            <a href="">
                                <span class="blod">评论</span>
                                <span class="gray"></span>
                            </a>
                        </li>
                         <li>
                            <a href="">
                                <span class="bold">yes</span>
                                <span class="gray"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="post">
               
                 <el-button type="success" @click.native="deliver" style="height:60px">发表文章</el-button>
                </div>

          </div>
 

      <div class="content">
           <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="推荐" name="first" >
                    <ul style="list-style:none;padding:0">
                          <li v-for="item in posts" style="width:100%;margin-bottom:20px;padding:10px;border-bottom:1px dashed lightgray">
                               <div style="text-align:left;padding-right:10px;font-size:12px">
                                   <span style="color:orange;margin-right:10px">{{item.category}}&nbsp;&nbsp;</span>
                                   <a :href="item.postLink"  target="_blank" style="color:#369;padding-right:10px;text-decoration:none">{{item.postSummary}}</a>
                               </div>
                            </li>
                          </ul>
                </el-tab-pane>
                <el-tab-pane label="收藏" name="second">
                    <ul style="list-style:none">
                        <li v-for="collect in finalcollects" style="width:100%;margin-bottom:20px;padding:10px;border-bottom:1px dashed lightgray">
                               <div style="text-align:left;padding-right:10px;font-size:12px">
                                   <span style="color:orange;margin-right:10px">{{collect.likeDate}}&nbsp;&nbsp;</span>
                                   <a  target="_blank" style="color:#369;padding-right:10px;text-decoration:none">{{collect.postId}}</a>
                               </div>
                            </li>
                          </ul>
                </el-tab-pane>
                <el-tab-pane label="原创" name="third">原创</el-tab-pane>
                <el-tab-pane label="评论" name="fourth">评论</el-tab-pane>
            </el-tabs>
  
      </div>
  </div>

</template>


<script>
Array.prototype.distinct = function (){
 var arr = this,
  len = arr.length;
  var compare = function (obj1, obj2) {
    var val1 = obj1.postId;
    var val2 = obj2.postId;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
} 
 arr.sort(compare)
 function loop(index){
  if(index >= 1){
   if(arr[index].postId === arr[index-1].postId){
    arr.splice(index,1);
   }
   loop(index - 1); //递归loop函数进行去重
  }
 }
 loop(len-1);
 return arr;
};

import axios from 'axios'
export default {
data(){
    return{
        user:{},
        userName:"",
        userId: '',
        posts:[],
        activeName:"first",
        collects:[],
        finalcollects:[]
    }
},

mounted(){
// this.getUser()
},
methods:{
    // getUser(){
    //     this.userId=this.$route.params.userId;        
    //     axios.post("users/loaduser",{userId:this.userId}).then((response)=>{
    //         let res=response.data;
    //         if(res.status=="0"){
    //             this.user=res.result.doc;
    //             this.userName=this.user.userName;
    //             this.getUserPosts();
    //             this.getCollects();
       
    //         }
    //     })
    // },
    // getUserPosts(){
    //     axios.post("/posts/loadposts",{userName:this.userName}).
    //     then((response)=>
    //   {
    //         let res=response.data;
    //         if(res.status=="0"){
    //             this.posts=res.result.doc;
    //         }
    //     })
    // },

    // getCollects(){
    //     axios.get("/users/collects",{userName:this.userName}).
    //         then((response)=>{
    //             let res=response.data;
    //             console.log(res)
    //             if(res.status=="0"){
    //                 this.collects=res.result.doc.collectedPosts;
    //                 this.finalcollects=this.collects.distinct();
    //             }
    //         })
    // },

    deliver(){
        this.$router.push("/deliver")
    }
}
}
</script>

<style scoped>
.user{
  position: relative;
  height: 100%;
  min-height: 720px;  
  max-width: 1380px;
  min-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
}
.top{
   height:160px;
   width:100%;
   position: relative;
   background: white;
   border-radius: 5px
}
.userImg{
    height:100%;
    width:15%;
    position: absolute;
    left: 0
}
.userImg img{
    margin-top:10%;
    margin-left:10px;
    border-radius: 50%
}
.userInfo{
    height:100%;
    width:70%;
    position: absolute;
    left: 15%
}
.userInfo-top{
    width:100%;
    height:50%;
    text-align: left;
    line-height: 80px
}
.userInfo-bottom{
    width:100%;
    height:50%;
}

.post{
    height: 100%;
    line-height: 160px;
    width: 15%;
    position:absolute;
    right:0
}


.content{
    margin-top:20px;
    min-height:540px;
}
ul li{
    display: inline-block;
    margin-right:20px;

}
ul li a{
        text-decoration:none
}


.bold{
    
    color:black
}
.gray{
    color:gray;
    font-weight: normal
}
</style>
