<template>
  <div class="home" >
      <div  class="home-container">
          <!--分成左右两列布局-->
           <el-row>
          <!--左侧主内容区域-->               
                <el-col :span="17">
                    <div class="grid-content bg-purple">
                        
                        <el-tabs type="border-card">
                            <el-tab-pane label="推荐" >
                                <all-posts></all-posts>
                            </el-tab-pane>
                            
                         
                        <!--
                            <el-tab-pane >
                                <span slot="label"><i class="icon iconfont icon-news"></i> 消息树</span>
                                <news></news>
                            </el-tab-pane>
                            <el-tab-pane >
                                  <span slot="label"><i class="icon iconfont icon-apps_custom_question4_btn"></i> what the F....</span>
                                  <wtf></wtf>
                            </el-tab-pane>
                            <el-tab-pane > 
                                 <span slot="label"><i class="icon iconfont icon-houzi"></i> 达尔文</span>
                                 <darwin></darwin>
                                 </el-tab-pane>
                            <el-tab-pane >
                                <span slot="label"><i class="icon iconfont icon-reading"></i> 长文</span>
                                <long-reads></long-reads>
                            </el-tab-pane>
                            <el-tab-pane>
                                <span slot="label"><i class="icon iconfonticon-ziyuan"></i> 资源</span>
                                <resource></resource>
                            </el-tab-pane>
                            -->
                            </el-tabs>
                        </div>
                        </el-col>

    <!--右侧广告区域-->      
                <el-col :span="6" :offset="1" style="">
                    <div class="grid-content bg-purple-light" style="width:100%">
                        <div style="width:100%;height:50px;margin-bottom:10px">
                            <div style="float:left;display:inline-block;width:47.5%;height:50px;line-height:50px;font-size:12px;background:#00a2ca;color:white;cursor:pointer;border-radius:5px">
                                <a @click="toDeliver" style="">发表信息</a>
                            </div>
                            <div style="float:right;display:inline-block;width:47.5%;height:50px;font-size:12px;background:#00a2ca;color:white;cursor:pointer;border-radius:5px">
                                <p>联系方式
                                shimaonews@gmail.com</p>
                            </div>
                        </div>
                        <div style="width:100%;height:30px;line-height:30px;color:white;font-size:12px;background:#00a2ca;border-radius:5px">历史上最热议的消息</div> 
                        <ul style="list-style:none;text-align:left;text-align:left;padding-left:0">
                            <li v-for="post in mostCommentedPosts" :key="post.id" style="font-size:10px;width:100%;height:auto">
                               <p>
                                   <a style="margin-right:10px;background-color:lightgray">&nbsp;&nbsp;{{post.comments.length}}&nbsp;&nbsp;</a>
                                   <a :href="post.postLink" style="text-decoration:none;color:black" target="_blank">{{post.postTitle}}</a>
                               </p>
                               
                                
                            </li>
                        </ul>

                    </div>
                    </el-col>
                </el-row>
      </div>
      <!--使用elementui的layout布局 将主内容区分成左右两块-->
          
  </div>
</template>

<script>

import AllPosts from "./AllPosts";
export default {
  name: "home",
  components: {
    AllPosts,
   
  },
  data() {
    return {
        allposts1:[],
        sortAllPosts:[],
        mostCommentedPosts:[]
    };
  },

  methods:{
    
     toDeliver(){
         var isUserId=document.cookie.indexOf("userId");
         if(isUserId==-1){
              this.$message({
                 message: 'sorry，登录后才能发表信息',
                 type: 'warning'
                 });
                 return
         }
         this.$router.push({
                path:"/deliver"})
                    }
  }
};
</script>

<style  scoped>
.home {
  min-width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
}
.home-container {
  position: relative;
  height: 100%;
  min-height: 720px;  
  max-width: 1380px;
  min-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
}

/*layout布局的原生css样式照搬过来*/
</style>
