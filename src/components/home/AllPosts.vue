<template>
  <div id="allpost" class="allpost">
    <ul>
        <li v-for="post in curPostList" style="list-style:none;margin-bottom:10px;;border-bottom:1px solid #e1e1e1">
             <div class="container" style="border-bottom:1px solid lightyellow">
                                <!--头部区域的设计-->
                 <div class="header" style="border-bottom:1px dashed lightgray">  
                        <!-- <div class="userhead" style="width:30px;height:100%;float:left;border-radius:10px">
                             <img :src="post.userImg" alt="" style="height:100%;">
                        </div> -->
                         <div class="message-tips" style="height:100%;width:80%;margin-left:0;line-height:30px;vertical-align:middle;box-sizing:border-box;overflow:hidden">
                            <!-- <span>{{post.userName}}</span>&nbsp; -->
                             <span>发表于：{{post.postDate}}</span>&nbsp;
                             <span>来自于:news.163.com&nbsp; &nbsp;&nbsp;</span>&nbsp;
                            <span>{{post.category}}</span>
                            <span></span>
                            </div> 
                    </div>
                                 <!--核心内容区域的设计-->
                 <div class="content" style="width:100%;margin-top:5px;box-sizing:border-box;overflow:hidden;display:flex;">
                            <!--最左侧的消息图片-->
                        <div v-if="post.postImage" class="content-img" style="height:100px;max-height:160pxbox-sizing:border-box;overflow:hidden;text-align:left;margin-right:15px;flex:1">
                             <img  :src="post.postImage" :onerror="errorImg01" alt="图片无加载" style="height:120px;width:auto;">
                         </div>
                            <!--右侧的内容区-->
                        <div class="content-main" style="margin-left:0px;flex:5">
                             <!--右侧上部的内容区-->
                             <div class="main-top" style="text-align:left;width:100%;padding:0;">
                                 <div v-if="post.postTitle" style="font-size:14px;color:#eb7350;margin-top:0;">{{post.postTitle}}</div>
                                 <div style="font-size:14px;font-weight:bold;color:#3498db;margin-top:5px" >
                                     <router-link id="postsummary" :to="{ name: 'post', params: { postId: post.postId }}" style="text-decoration:none;color:#3498db">{{post.postSummary|beautifyWords}}</router-link></div>
                                   </div>
                                   <!--右侧下部的操作区，分享、喜欢、评论和yes-->
                             <div class="main-bottom" style="margin-top:20px">
                                 <div class="left" style="height:100%;text-align:left;">
                                     <a style="margin-right:30px" ><i class="el-icon-share" style="color:gray;"></i></a>
                                     <a style="margin-right:30px" @click="post.isShow=!post.isShow"><i class="icon iconfont icon-pinglun" style="color:gray;"></i>
                                        <span style="margin-left:5px;font-size:13px;color:#A9A9A9;font-weight:bold">{{post.comments.length}}</span></a>
                                     <a style="margin-right:30px" @click="likeThis(post.postId)">
                                         <i  class="el-icon-star-off" style="color:gray;"></i>
                                         <i v-if="iscollects" class="el-icon-star-on" style="color:gray;"></i>
                                         </a>
                                     
                                    
                                </div>
                            </div>
                        </div>                                    
                    </div>

            <!--评论区域-->
                 <div  v-if="post.isShow" style="width:100%;background:#fafafa;border:1px solid lightgray;border-radius:5px;margin-bottom:10px">
                     <div style="width:95%;margin-left:2.5%;margin-bottom:30px;padding:0px;text-align:left">
                        <input type="text" v-model="newcomment"  placeholder="请输入您对该信息的个人意见" style="width:65%;height:30px;margin-top:5px;margin-right:0px;border:1px solid lightgray;border-radius:3px;padding-left:10px">
                        <div style="display:inline-block;width:30%;margin-left:0px">
                            <button type="submit" @click="deliverComment(post.postId)" style="width:50%;margin-top:5px;height:35px;border:1px solid lightgray;border-radius:3px" >
                            发表评论
                              </button>
                        </div>
                        
                     </div>
                    <ul v-if="post.comments.length!=0" style="width:95%;margin-left:2.5%;list-style:none;margin-bottom:20px;background:white;padding:10px 10px;">
                        <li v-for="item in post.comments" style="border-bottom:2px solid white;margin-bottom:5px;text-align:left">
                                <a  style="text-decoration:none;margin-right:20px;color:#0c73c2;font-size:12px">{{item.commentUser}}:</a>
                                <span v-if="item.reply" style="font-size:10px;color:#fa8723">回复{{item.toExUser}}：</span>
                                <a  style="text-decoration:none;margin-right:30px;color:gray;font-size:10px">{{item.content}}</a>
                                <a  style="text-decoration:none;margin-right:30px;color:gray;font-size:10px">{{item.commentDate}}</a>
                                <a  style="text-decoration:none;margin-left:30px;color:#1E90FF;font-size:10px" @click="item.showReply=!item.showReply">回复</a>
                                <div  id="replyComment" v-if="item.showReply">
                                    <input type="text" style="border:1px solid lightgray;border-radius:3px;" v-model="replycomment">
                                    <button type="submit" style="border:1px solid lightgray;border-radius:3px" @click="replyComment(post.postId,item.commentUser,item.commentId)">回复
                                    </button>
                                </div>
                        </li>
                    </ul>
                </div>
              
            </div>
         </li>
    </ul>

         <!--分页符-->
        <div>
          <paginator  :pageCount="pageCount" :initPage="initPage" @click="togglePage($event)"></paginator>
         </div>
  </div>
</template>

<script>
//import paginator from "../public/paginator"
import vuePaginator from 'vue-paginator-simple';
export default {
  name: 'AllPost',
  components:{
    'paginator': vuePaginator
  },
  data(){
      return{
        allposts:[
             {
                "postId":20180914006,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
                    "commentId":8221201802181611434,
                    "commentUser":"user01",
                    "content":"果然是生意人啊，丝毫没受打击",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"imnew113",
                    "content":"奶茶妹妹没有现身",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"user03",
                    "content":"隐藏的深而已",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611434,
                    "toExUser":"user01"
                },
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
             {
                "postId":20180914005,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
                    "commentId":8221201802181611434,
                    "commentUser":"user01",
                    "content":"果然是生意人啊，丝毫没受打击",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"imnew113",
                    "content":"奶茶妹妹没有现身",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"user03",
                    "content":"隐藏的深而已",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611434,
                    "toExUser":"user01"
                },
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
             {
                "postId":20180914006,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
                    "commentId":8221201802181611434,
                    "commentUser":"user01",
                    "content":"果然是生意人啊，丝毫没受打击",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"imnew113",
                    "content":"奶茶妹妹没有现身",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"user03",
                    "content":"隐藏的深而已",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611434,
                    "toExUser":"user01"
                },
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
             {
                "postId":20180914006,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
                    "commentId":8221201802181611434,
                    "commentUser":"user01",
                    "content":"果然是生意人啊，丝毫没受打击",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"imnew113",
                    "content":"奶茶妹妹没有现身",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"user03",
                    "content":"隐藏的深而已",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611434,
                    "toExUser":"user01"
                },
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
             {
                "postId":20180914006,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
                    "commentId":8221201802181611434,
                    "commentUser":"user01",
                    "content":"果然是生意人啊，丝毫没受打击",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"imnew113",
                    "content":"奶茶妹妹没有现身",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"user03",
                    "content":"隐藏的深而已",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611434,
                    "toExUser":"user01"
                },
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
             {
                "postId":20180914006,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
                    "commentId":8221201802181611434,
                    "commentUser":"user01",
                    "content":"果然是生意人啊，丝毫没受打击",
                    "commentDate":"2018-02-18 16:11:42",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"imnew113",
                    "content":"奶茶妹妹没有现身",
                    "commentDate":"2018-02-26 14:47:01",
                    "reply":"",
                },
                {
                    "commentId":8227201802261447034,
                    "commentUser":"user03",
                    "content":"隐藏的深而已",
                    "commentDate":"2018-02-19 16:11:42",
                    "reply":true,
                    "to":8221201802181611434,
                    "toExUser":"user01"
                },
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
             {
                "postId":20180914006,
                "postTitle": '看刘强东现身京东总部出席商务活动 签约国际时尚集团如意控股',
                "postDate":  '2018-09-04 20:52:57',
                "postImage": 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536056165438&di=e4baebe85e59125548beb16ccf7950e1&imgtype=0&src=http%3A%2F%2Fi0.hexun.com%2F2018-09-03%2F193972786.jpg',
                "postSummary": '在签约仪式现场，刘强东身着深色修身西装，精神饱满，与如意控股集团董事局主席邱亚夫一行相谈甚欢，心情丝毫未受近日传言影响。',
                "category": 'Longreads',
                "isShow":false,
                "comments":[
                ],
                "postLink": 'http://tech.qq.com/a/20180904/074221.htm'
            },
            {
                "postId":20180912001,
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
                "postId":20180913006,
                "postTitle": '看完电影《关原之战》，想问一下西军为什么输得那么被动？真实的关原之战是怎样？',
                "postDate":  '2018-02-26 20:52:57',
                "postImage": '',
                "postSummary": '毛利军队为什么不派斥候侦查战况，然后强行突破吉川军，下去助战？输了关原之战肯定对毛利家没好处的，为什么毛利不努力去作战？',
                "category": 'Longreads',
                "isShow":false,
                "comments":[{
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
                },
                ],
                "postLink": 'http://renjian.163.com/17/1218/17/D5V2NRAL000181RV.html'
            },
        ],
        postId:Number,
        allPostsNum:0,//总信息条数
        pageCount:0,//总页数
        initPage:1,//起始页是第一页
        errorImg01: 'this.src="' + require('@/assets/dog.png') + '"',
        activeIndex: null,
        newcomment:"",
        comments:[],
        replycomment:"",
        colorRed:false,
        colorGray:true,
        iscollects:false,
        curPostList:[]
       }
   } ,
   mounted(){
     this.getAllPosts();
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
   methods:{
       //获取mongodb数据库中所有文章数据
     getAllPosts(){
           this.allPostsNum= this.allposts.length;
           this.pageCount=Math.ceil(this.allPostsNum/11);
           this.curPostList=this.allposts.slice(0,10);
          for(let i=0;i<this.curPostList.length;i++){
              this.curPostList[i].comments.reverse()   
          }
         }
     },
     //获取用户头像
     //为每个新闻加载评论,
    toggle(index){
            this.activeIndex = index;
        },
    togglePage(indexPage){
      //打印出当前页数   
      if(this.pageCount==1){
          this.curPostList=this.allposts;
      }else if(indexPage==1){
          this.curPostList=this.allposts.slice(0,10);
      }
      else if(indexPage==this.pageCount){
          this.curPostList=this.allposts.slice((indexPage-1)*11-1);
      }else{
          this.curPostList=this.allposts.slice((indexPage-1)*11-1,indexPage*11-1)
          };
      
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
                }
                else{
                 this.$message({
                 message: 'sorry，需要登录以后才能发表评论',
                 type: 'warning'
                 });
          //  alert("只有登录之后才能发表评论哦");
            return
        }
    },


//收藏文章
    // likeThis(postId){
    //     var isUserId=document.cookie.indexOf("userId");
    //     if(isUserId==-1){
    //         this.$message({
    //             message: 'sorry，需要登录以后才能操作哦',
    //             type: 'warning'
    //             });
    //        // alert("只有登录之后才能发表评论哦");
    //         return
    //     }
    //     axios.post("/users/likethis",{
    //         postId:postId   
    //     }).then((response)=>{
    //         let res = response.data;
    //         if (res.status == "0") {
    //             console.log("chenggongle")
    //         }
    //     })

    //     },
  


 
}
</script>

<style scoped>
 @import 'vue-paginator-simple/dist/vue-paginator-simple.css';
.allpost{
    min-height:720px;
}

.container{
    width:100%;
    box-sizing: border-box;
    overflow: hidden;
}
.header{
    width: 100%;
    height: 30px;
    text-align: left;
    vertical-align: middle;
    padding: 0;

}
.header span{
    font-size: 10px;
    color:darkgray;
    height: 100%;
    padding: 0;
}
.bg-none{
    background: none;
    border: none
}
.red{
    color:red
}
.gray{
    color:gray
}

input::-webkit-input-placeholder{
            color:#E0E0E0;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#E0E0E0;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#E0E0E0;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#E0E0E0;
        }
</style>

