 <template id="modal-template">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container" id="modal" v-bind:class="{backimg01:isImg01, backimg02:isImg02}">
              <div class="close">
                <el-button  icon="el-icon-close" style="background:transparent" @click="closeModal"></el-button>
              </div>
              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>
<style>

</style>
<script>
    export default{
        props:["mdShow"],
        data(){
            return{
                msg:'hello vue',
                isImg01:false,
                isImg02:false
            }
        },
        mounted(){
          this.setBackground()
          }
        ,
        methods:{
          closeModal(){
            this.$emit("close");
          },
          setBackground(){
           
            var num=Math.floor(Math.random()*10);
            if(num%2==0){
              this.isImg01=true;
              this.isImg02=false
              
            }else{
              this.isImg02=true
              this.isImg01=false
            }
              }
             
            
          
        }
    }
</script>
