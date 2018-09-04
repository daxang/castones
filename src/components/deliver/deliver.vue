<template>
    <div>
        <h4>请输入</h4>
        <el-tabs type="border-card">
            <el-tab-pane label="推荐">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原文链接" prop="postLink">
                      <el-input v-model="ruleForm.postLink"></el-input>
                    </el-form-item>
                    <el-form-item label="原文标题" prop="postTitle">
                      <el-input v-model="ruleForm.postTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="图片地址" prop="postImage">
                      <el-input v-model="ruleForm.postImage"></el-input>
                    </el-form-item>
  
                    <el-form-item label="消息概要" prop="postSummary">
                      <el-input type="textarea" v-model="ruleForm.postSummary"></el-input>
                    </el-form-item>

                        <el-form-item label="消息类别" prop="category">
                      <el-select v-model="ruleForm.category" placeholder="请选择消息类别">
                        <el-option label="news" value="news"></el-option>
                        <el-option label="wtf" value="wtf"></el-option>
                        <el-option label="darwin" value="darwin"></el-option>
                        <el-option label="cheers" value="cheers"></el-option>
                        <el-option label="longreads" value="longreads"></el-option>
                        <el-option label="resource" value="resource"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                    

            </el-tab-pane>
            <el-tab-pane label="原创">原创</el-tab-pane>
    
        </el-tabs>
     <!--发表成功后弹出弹框-->
        <modal v-if="deliverSuccess" @close="showModal = false">
          <div slot="header" style="text-align:left">
            <span style="font-size:20px;font-weight:bolder;color:#cc5a18">
              ok！
            </span>
           
          </div>
          <div slot="body">
            
            <span>恭喜你，在这个平台上发表了一篇精彩的文章，所有的小伙伴们都会看到它，而且，说不定马上就会有无数的YES朝你蜂拥而至呢！</span>
          
          </div>
         
        <div slot="footer">
          <a class="btn " href="javascript:;" @click="showModal = false" style="text-decoration:none;color:gray;margin-right:20px">再发一篇</a>
          <a class="btn btn--m btn--red" href="javascript:;" style="text-decoration:none" @click="toHome">
          前往首页
          </a>
        </div>
      </modal>
    </div>
</template>

<script>
import axios from "axios";
import Modal from './../public/Modal'
export default {
  data() {
    return { 
      createMethod:Number,
      errTip: false,
      errTip01:false,
      sucTip:false,
      showModal:false,
      deliverSuccess:false,
      ruleForm: {
        postLink: '',
        postTitle:"",
        postImage:"",
        category:"",
        delivery: false,
        type: [],
        resource: '',
        },
      rules: {
          postLink: [
            { required: true, message: '请将原文的链接粘贴在此', trigger: 'blur' },
            { min: 3, max: 200, message: '', trigger: 'blur' }
          ],
          postTitle: [
            { required: true, message: '请将原文的标题写在这儿', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50个字符', trigger: 'blur' }
          ],
           postSummary: [
            { required: true, message: '请把你要说的概要写在这儿', trigger: 'blur' },
            { min: 3, max: 500, message: '不要超过500个字', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择消息类别', trigger: 'change' }
          ],
         
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      
    };
  },

  components:{
    Modal
  },

  mounted(){
 
  },

  methods: {
 
    deliver(){
      this.sucTip=false;
     this.$refs["formone"].restFields()

    },
    toHome(){
     this.$router.push({
       path:"/"})
   },
    reset(){
      document.querySelector("#words").reset()
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { 
                       this.$message({
                          message: 'congratulations，你成功发表了一则评论',
                          type: 'success'
                          });
                     
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
