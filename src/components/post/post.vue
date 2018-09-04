<template>
   <div class="home" >
      <div  class="home-container">
          <!--分成左右两列布局-->
           <el-row>
          <!--左侧主内容区域-->               
                <el-col :span="17" style="background:white;border-radius:10px;padding-bottom:30px">
                   <!--内容母块-->
                   <div class="content-container" style="width:90%;margin:0 auto;display: flex;flex-direction: column">
                       <!--内容标题母块-->
                       <div class="title-container son-container" style="width:100%;margin:20px 0;text-align:left">
                           <a href="javascript:;" style="margin-right:50px;font-size:16px;font-weight:bold;color:darkgray;text-decoration:none">{{post.postTitle}}</a>
                           
                       </div>
                         <!--作者头像和消息操作母块-->
                       <div class="userimg-container " style="width:100%;margin:0;height:30px;box-sizing:border-box;position:relative;padding:0">
                           <div style="position:absolute;left:0px;bottom:0px">
                               <span class="font-size-10px"  style="text-transform: uppercase;color:#BDBDBD;font-weight:bold">{{post.category}}</span>
                               <span class="font-size-10px" style="margin-left:20px" >{{post.postDate}}</span>
                           </div>
                             <div style="position:absolute;right:10px;bottom:0px">
                         
                               <a href="javascript:;" style="margin-left:10px;text-decoration:none;font-style:italic" class="font-size-10px">收藏</a>
                              
                           </div>
                        
                       </div>

                         <!--消息概要母块-->
                         <div class="summary-container" style="width:100%;margin-top:10px;;box-sizing:border-box;overr-flow:hidden;border-radius:5px;">
                             <div style="width:100%;height:90%;font-size:16px;font-weight:bold;text-align:left;line-height:1.5;margin-left:0px" >
                               <a :href="post.postLink" style="font-size:14px;font-weight:bold;color:#3498db;text-decoration:none" target="_blank">{{post.postSummary| beautifyWords}}</a>
                            </div>
                         </div>


                         <!--区别线-->
                        <div style="width：120;margin-top:20px;margin-bottom:20px;border:1px solid lightgray">

                        </div>

                        <!--发表评论母块-->
                         <div class="comment-container" style="width:100%;height:40px;margin-top:10px;box-sizing:border-box;display:flex;flex-direction: row;justify-content:space-between">
                              <div style="width:80%;height:40px;border-radius:5px;">
                                <textarea v-model="newcomment" name="" id="" cols="30" rows="10" style="width:100%;height:100%;border-radius:5px;margin:0;padding:0;border:1px solid lightgray"></textarea>
                                </div>
                                <div style="width:15%;height:100%;border-radius:5px;padding:0;text-align:right">
                                    <el-button type="primary" style="height:100%;"  @click="deliverComment(post.postId)">发表评论</el-button>
                                </div>
                         </div>



                         <!--评论专区母块-->
                         <div class="comments-container"  style="width:100%;margin-top:10px;border:1px dashed lightgray;border-radius:5px;padding-left:10px">
                            <div class="comments-content-container" style="width:90%;margin-top:10px;">
                                <div style="text-align:left;margin:0;padding:0;border-bottom:1px dashed lightgray">
                                    <a >最新评论</a>
                                    <a >总共{{post.comments.length}}条评论</a>
                                </div>
                                <ul style="list-style:none;width:100%;margin-top:10px;box-sizing:border-box;overr-flow:hidden;padding:0">
                                    <li v-for="item in post.comments" style="border-bottom:2px solid white;margin-bottom:5px;text-align:left;min-height:50px;border-bottom:1px solid lightgray">
                                        <a  style="text-decoration:none;margin-right:20px;color:#0c73c2;font-size:12px">{{item.commentUser}}:</a>
                                        <span v-if="item.reply" style="font-size:10px;color:#fa8723">回复{{item.toExUser}}：</span>
                                        <a  style="text-decoration:none;margin-right:30px;color:gray;font-size:10px">{{item.content}}</a>
                                        <a  style="text-decoration:none;margin-right:30px;color:gray;font-size:10px">{{item.commentDate}}</a>
                                        <a style="float:right;text-decoration:none;margin-left:40px;color:#1E90FF;font-size:10px;cursor:pointer" @click="item.showReply=!item.showReply">回复</a>
                                       
                                        
                                        <div  id="replyComment" v-if="item.showReply">
                                            <input type="text" style="border:1px solid lightgray;border-radius:3px;" v-model="replycomment">
                                            <button type="submit" style="border:1px solid lightgray;border-radius:3px" @click="replyComment(post.postId,item.commentUser,item.commentId)">回复
                                            </button>
                                        </div>
                                </li>
                                </ul>
                            </div>
                         </div>



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
                                axuxuanze@gmail.com</p>
                            </div>
                        </div>
                        <div style="width:100%;height:30px;line-height:30px;color:white;font-size:12px;background:#00a2ca;border-radius:5px">历史上最热议的消息</div> 
                        <ul style="list-style:none;text-align:left;text-align:left;padding-left:0">
                            <li v-for="posts in mostCommentedPosts" style="font-size:10px;width:100%;height:auto">
                               <p>
                                   <a style="margin-right:10px;background-color:lightgray">&nbsp;&nbsp;{{posts.comments.length}}&nbsp;&nbsp;</a>
                                   <span>{{posts.postTitle}}</span>
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
import axios from 'axios'
export default {
  data(){
      return{
           allposts:[
            {
                "postId":20180912001,
                "postTitle":'东北一男子要求军人让座 女乘客两次按住：凭啥？',
                "postDate":  '2018-02-26 20:53:57',
                "postImage": 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104324624,994128868&fm=27&gp=0.jpg ',
                "postSummary": '1月19日，东北的刘女士在车上，遇到一男子要求军人让座，两次把军人按在座位上，怒斥该男子：“为人民服务就得给你让座啊？”“有灾有难哪回不是他们第一时间跑出去救你啊！”“不知道军民一家亲啊？”',
                "category": 'Darwin',
                "comments":[]
            },
             {
                "postId":20180912009,
                "postTitle": '东北一男子要求军人让座 女乘客两次按住：凭啥？',
                "postDate":  '2018-02-26 20:53:57',
                "postImage": 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104324624,994128868&fm=27&gp=0.jpg ',
                "postSummary": '1月19日，东北的刘女士在车上，遇到一男子要求军人让座，两次把军人按在座位上，怒斥该男子：“为人民服务就得给你让座啊？”“有灾有难哪回不是他们第一时间跑出去救你啊！”“不知道军民一家亲啊？”',
                "category": 'Darwin',
                "comments":[],
                "postLink": ''
            },
             {
                "postId":20180912008,
                "postTitle": ' 丘吉尔：没有胜利就没有生存',
                "postDate":  '2018-02-26 20:52:57',
                "postImage": ' ',
                "postSummary": '我绝对相信，我们只能将战争进行到胜利。即使我们当中有一个被击败了，另一个也决不可放弃斗争。如果英国本土遭到浩劫，化为一片焦土，英国政府便准备从“新大陆”发动战争。如果德国击败两个盟国中的一国，或两国都被击败，它是不会对我们表示仁慈的；我们将永远沦为附庸和奴隶。宁可使西欧文明及其全部成就走向悲惨而壮烈的结局，也不可让两大民主国家苟延残喘，被人剥夺所有一切值得为之生存的东西。',
                "category": 'Longreads',
                "comments":[],
                "postLink": 'http://renjian.163.com/17/1211/15/D5CSO39A000181RV.html'
            },
              {
                "postId":20180912007,
                "postTitle": '去除伊拉克国籍的犹太人',
                "postDate":  '2018-02-26 20:52:57',
                "postImage": 'http://cms-bucket.nosdn.127.net/fe1062faa92e4d74b5a81714dae4900720171218165948.jpeg ',
                "postSummary": '1950年10月底，在一个秋高气爽的日子里，七十名犹太人离开了札胡。从摩苏尔来的办事员在犹太会堂里摆了几张桌子填写文件。申请离开的都是城里那些一无所有的人：小贩、挑夫、乞丐，他们几乎全都不识字。大部分人只背了一些破烂衣服，顶多再带上一只泥碗或一支已经融了一半的蜡烛。他们拉着孩子，挤进专车，随后就往南驶向摩苏尔和更远的未知世界。',
                "category": 'Longreads',
                "comments":[],
                "postLink": 'http://renjian.163.com/17/1218/17/D5V2NRAL000181RV.html'
            },
            {
                "postId":20180912006,
                "postTitle": '去除伊拉克国籍的犹太人',
                "postDate":  '2018-02-26 20:52:57',
                "postImage": 'http://cms-bucket.nosdn.127.net/fe1062faa92e4d74b5a81714dae4900720171218165948.jpeg ',
                "postSummary": '1950年10月底，在一个秋高气爽的日子里，七十名犹太人离开了札胡。从摩苏尔来的办事员在犹太会堂里摆了几张桌子填写文件。申请离开的都是城里那些一无所有的人：小贩、挑夫、乞丐，他们几乎全都不识字。大部分人只背了一些破烂衣服，顶多再带上一只泥碗或一支已经融了一半的蜡烛。他们拉着孩子，挤进专车，随后就往南驶向摩苏尔和更远的未知世界。',
                "category": 'Longreads',
                "comments":[],
                "postLink": 'http://renjian.163.com/17/1218/17/D5V2NRAL000181RV.html'
            },
            {
                "postId":20180913006,
                "postTitle": '看完电影《关原之战》，想问一下西军为什么输得那么被动？真实的关原之战是怎样？',
                "postDate":  '2018-02-26 20:52:57',
                "postImage": 'http://cms-bucket.nosdn.127.net/fe1062faa92e4d74b5a81714dae4900720171218165948.jpeg ',
                "postSummary": '毛利军队为什么不派斥候侦查战况，然后强行突破吉川军，下去助战？输了关原之战肯定对毛利家没好处的，为什么毛利不努力去作战？',
                "category": 'Longreads',
                "comments":[
                    {
                    "commentId":8221201802181611428,
                    "commentUser":"user01",
                    "content":"村长战争，有什么好玩的",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                    },
                    {
                    "commentId":8227201802261447013,
                    "commentUser":"imnew113",
                    "content":"看过电影，不错的",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                    },
                    {
                    "commentId":8227201802261447026,
                    "commentUser":"user03",
                    "content":"其实还是挺壮观的",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611428,
                    "toExUser":"user01"
                    }]
                    }],
          post:{},
          postId:"",
          userName:"",
          newcomment:'',
          comments:[],
          user:{},
          allposts1:[],
          sortAllPosts:[],
          mostCommentedPosts:[],
          isUserImg:true,
          outWords:"",
          errorImg01: 'this.src="' + require('@/assets/logo.png') + '"',
      }
  },
    filters:{
       beautifyWords:function(value){
           if(!value)return""
           var arr=value.split("");
           if(arr.length<160){
                value=value.toString();
                return value.slice(0,160)
           }else{
                value=value.toString();
                return value.slice(0,160)+"..."
           }
              
       }
   },
  mounted(){
      this.getPost();
      this.getMostCommentedPosts()
  },
  methods:{
      getPost(){
          var postid=this.$route.params.postId
          var post=this.allposts.find(function(x){
              return x.postId===postid
          })
          this.post=post
      },
      getUser(){
          let param={
              userName:this.userName
          }
          axios.get("users/user",{params:param}).then((response)=>{
              let res=response.data;
              if(res.status=="0"){
                  this.user=res.result.doc;
                  if(this.user.userImg){
                      console.log(this.user.userImg)
                      this.isUserImg=true;
                  }else{
                      this.isUserImg=false;
                  }
              }
          }
          )
      },
      getMostCommentedPosts(){
       axios.get("/posts").then((response)=>{
         var res=response.data;
         if(res.status="0"){
           this.allposts1=res.result.list;
           this.sortAllPosts=this.allposts1.sort(function(a,b){  
                                                    var s = a.comments.length;  
                                                    var t = b.comments.length;  
                                                    if(s < t) return -1;  
                                                    if(s > t) return 1;  
                                                });
           this.mostCommentedPosts=this.sortAllPosts.slice(0,9).reverse()
          }
         }
       )
     },
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
                    },
        //发表评论
    deliverComment(postId){
        if(!this.newcomment){
            return
        }else{
             this.$message({
                 message: 'sorry，需要登录以后才能发表评论',
                 type: 'warning'
                 });
          //  alert("只有登录之后才能发表评论哦");
            return
        }
 
    },
//回复评论
  replyComment(val01,val02,val03){
  if(!this.replycomment){
            return
        }else{
               this.$message({
                 message: 'sorry，需要登录以后才能发表评论',
                 type: 'warning'
                 });
            return
        }
    },
  }
}
</script>

<style>
.home {
  min-width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden
}
.home-container {
  position: relative;
  height: 100%;
  min-height:720px;
  max-width: 1380px;
  min-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
}

.font-size-10px{
    font-size: 10px
}
.text-align-left{
    text-align:left
}

.position-relative{
    position:relative;

}
</style>
