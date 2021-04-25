<template>
  <div id="main">
    <a-spin :spinning="loading" size="large">
      <a-card style="margin: 20px 20px">
        <a-button
          class="draft-btn"
          type="dashed"
          size="large"
          @click="handleToDraft"
        >
          <a-icon type="delete" />草稿箱
        </a-button>
        <a-form v-bind="formItemLayout">
          <a-form-item :wrapperCol="{ span: 20 }" style="width: 80%">
            <a-input
              v-model="blog.title"
              class="blog-title"
              placeholder="请输入标题"
            ></a-input>
          </a-form-item>
          <mavon-editor
            class="blog-editor"
            toolbarsBackground="#FA541C11"
            v-model="blog.content"
            @imgAdd="imgAdd"
            ref="md"
          />
          <a-divider />
          <a-form-item label="请选择栏目分类">
            <!-- <a-button @click="blog.selectedChannel = 1"></a-button> -->
            <a-radio-group
              button-style="solid"
              size="large"
              v-model="blog.selectedChannel"
            >
              <a-radio-button
                v-for="item in channels"
                :value="item.channelId"
                :key="item.channelId"
              >
                <!-- {{ item.channelId }} -->
                {{ item.channelName }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <div class="copyright-hint">
            <a-icon type="info-circle" />
            <span>非必选，若不选择分类，则默认进入生活分区</span>
          </div>
          <a-form-item label="请设置文章封面">
            <!--  -->
            <div class="ant-upload-preview" @click="$refs.modal.edit(blog.img)">
              <a-icon type="cloud-upload-o" class="upload-icon" />
              <div class="mask">
                <a-icon type="plus" />
              </div>
              <img :src="blog.img" onerror="this.src='/article.png'" />
            </div>
            <!--  -->
          </a-form-item>
          <a-form-item label="请添加标签">
            <blog-tags :tags="blogTags" @updateTags="updateTags" />
          </a-form-item>
          <a-form-item label="请选择文集">
            <a-button @click="showCataModal">选择文集</a-button>
          </a-form-item>
          <div class="copyright-hint">
            <a-icon type="info-circle" />
            <span>可在个人中心创建或管理文集哦~</span>
          </div>
          <a-form-item class="submit-btns">
            <div v-if="isEdit == 0">
              <a-button
                type="primary"
                size="large"
                shape="round"
                @click="saveBlog(0)"
              >
                提交文章
              </a-button>
              <a-button
                size="large"
                shape="round"
                style="margin-left: 20px"
                @click="saveBlog(1)"
              >
                存为草稿
              </a-button>
            </div>
            <div v-else>
              <a-button
                type="primary"
                size="large"
                shape="round"
                @click="editBlog(0)"
              >
                保存发布
              </a-button>
              <a-button
                size="large"
                shape="round"
                style="margin-left: 20px"
                @click="editBlog(1)"
              >
                存为草稿
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </a-card>
      <!-- 选择文集对话框 -->
      <a-modal
        v-model="cata_visible"
        title="选择文集"
        width="400px"
        @ok="handleCataOk"
      >
        <div class="add_modal">
          <a-radio-group v-model="blog.selectedCatagory">
            <a-radio
              v-for="item in catagory"
              :style="radioStyle"
              :value="item.catagoryId"
              :key="item.catagoryId"
            >
              {{ item.catagoryName }}
            </a-radio>
          </a-radio-group>
        </div>

        <div>
          <a-button
            class="add_catagory_btn"
            v-show="!is_add"
            @click="showAdd"
            :disabled="catagory.length >= 10"
            ><a-icon type="plus"></a-icon>新建文集({{
              this.catagory.length
            }}/10)</a-button
          >
          <div>
            <a-input-search
              v-model="add_cata"
              v-show="is_add"
              placeholder="请输入文集名称"
              @search="onSearch"
            >
              <a-button slot="enterButton"> 新建 </a-button>
            </a-input-search>
          </div>
        </div>
      </a-modal>

      <!-- 封面图片 -->
      <avatar-modal
        :CropWidth="300"
        :modalWidth="900"
        :preStyle="{ width: '300px' }"
        ref="modal"
        @ok="setavatar"
      />
    </a-spin>
  </div>
</template>

<script>
import request from "@/utils/request";
import AvatarModal from "@/components/AvatarModal";
import BlogTags from "@/components/BlogTags";

export default {
  components: {
    AvatarModal,
    BlogTags,
  },
  data() {
    return {
      blog: {
        // id: "",
        title: "",
        content: "",
        selectedChannel: 6,
        selectedCatagory: "",
        img: "/article.png",
        tags: "default",
        // description: "",
      },
      editId: "",
      loading: false,
      channels: [],
      catagory: [],
      is_add: false,
      cata_visible: false,
      add_cata: "",
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px",
      },
      formItemLayout: {
        labelCol: {
          span: 24,
        },
        wrapperCol: {
          span: 16,
        },
      },
    };
  },
  mounted() {
    this.getChannels();
    this.getCatagory(this.userInfo.userId);
    // console.log(this.blog.selectedChannel);
    if (this.$route.query.channelId) {
      this.blog.selectedChannel = parseInt(this.$route.query.channelId);
    }
    if (this.$route.params.blogId) {
      this.getBlog();
    }
  },
  computed: {
    isEdit() {
      if (this.$route.params.blogId) {
        return 1;
      } else {
        return 0;
      }
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    blogTags: function () {
      if (this.blog.tags) {
        return this.blog.tags.split(",");
      } else {
        return [];
      }
    },
    checkContent: function () {
      if (!this.blog.title) {
        return "请输入标题";
      } else if (!this.blog.content) {
        return "请输入文章内容";
      } else {
        return 0;
      }
    },
  },
  methods: {
    // 显示文集对话框
    showCataModal() {
      this.cata_visible = true;
    },
    handleCataOk() {
      this.cata_visible = false;
    },
    getCatagory(userId) {
      request({
        url: "/catagory/list",
        method: "post",
        data: { userId: userId },
      }).then((res) => {
        this.catagory = res.data.data;
      });
    },
    showAdd() {
      this.is_add = true;
    },
    hideAdd() {
      this.is_add = false;
    },
    // 添加文集
    onSearch() {
      if (this.add_cata) {
        let catagory = {
          catagoryName: this.add_cata,
          catagoryUserId: this.userInfo.userId,
        };
        request({
          url: "/catagory/save",
          method: "post",
          data: catagory,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("添加成功");
            this.is_add = false;
            this.getCatagory(this.userInfo.userId);
          }
        });
      }
    },
    // 获取栏目信息
    getChannels() {
      request({
        url: "/channel/list",
        method: "post",
      }).then((res) => {
        this.channels = res.data.data;
      });
    },
    // 跳转草稿箱
    handleToDraft() {
      this.$router.push({ path: "/blog/draft" });
    },
    // 上传封面
    setavatar(url) {
      if (url) {
        this.$message.success("上传成功");
        // console.log(url);
        this.blog.img = url;
      } else {
        this.$message.error("出现未知错误！");
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        this.$message.error("请上传图片文件! (jpg/pbg/webp)", 3);
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.info("限制上传图片大小为2MB", 3);
      }
      return isJpgOrPng && isLt2M;
    },
    // 将图片上传，返回地址替换到md中
    imgAdd(pos, $file) {
      let file = new FormData();
      if (this.beforeUpload(file)) {
        file.append("file", $file);
        request({
          url: "/api/upload",
          method: "post",
          data: file,
        }).then((res) => {
          if (res.data.data) {
            // console.log(res);
            this.$refs.md.$img2Url(pos, res.data.data);
          } else {
            this.$message.error("图片上传出错");
            // console.log(res);
          }
        });
      } else {
        // console.log(pos);
        // console.log($file);
        this.$refs.md.$refs.toolbar_left.$imgDelByFilename($file.name);
      }
    },
    updateTags(tags) {
      this.blog.tags = tags.join();
    },
    saveBlog(isDraft) {
      if (this.checkContent !== 0) {
        this.$message.warning(this.checkContent);
      } else {
        const blog = {
          blogTitle: this.blog.title,
          blogAuthorId: this.userInfo.userId,
          blogChannelId: this.blog.selectedChannel,
          blogCatagoryId: this.blog.selectedCatagory,
          blogContent: this.blog.content,
          blogTags: this.blog.tags,
          blogAvatar: this.blog.img,
          blogStatus: isDraft,
          blogDescription:
            this.blog.content.substring(0, 60).replaceAll("\n", "") + "...",
        };
        request({
          url: "/blog/save",
          method: "post",
          data: blog,
        }).then((res) => {
          if (res.data.data) {
            if (isDraft) {
              this.$message.success("保存成功");
            } else {
              this.$message.success("发布成功");
            }
            this.blog = {
              title: "",
              content: "",
              selectedChannel: 6,
              selectedCatagory: "",
              img: "/article.png",
              tags: "default",
            };
          } else {
            this.$message.error("请求错误");
          }
        });
      }
    },
    // 编辑文章
    getBlog() {
      this.loading = true;
      request({
        url: "/blog/get",
        method: "post",
        data: { blogId: this.$route.params.blogId },
      }).then((res) => {
        if (res.data.data) {
          if (res.data.data.blogAuthorId == this.userInfo.userId) {
            const data = res.data.data;
            this.editId = data.blogId;
            this.blog.title = data.blogTitle;
            this.blog.content = data.blogContent;
            this.blog.selectedChannel = parseInt(data.blogChannelId);
            this.blog.selectedCatagory = parseInt(data.blogCatagoryId);
            this.blog.img = data.blogAvatar;
            this.blog.tags = data.blogTags;
            this.loading = false;
          } else {
            this.$router.push({ path: "/blog/edit" });
            this.loading = false;
          }
        } else {
          this.$router.push({ path: "/blog/edit" });
          this.loading = false;
        }
      });
    },
    editBlog(status) {
      if (this.checkContent !== 0) {
        this.$message.warning(this.checkContent);
      } else {
        this.$message.loading("保存中，请稍等...", 0);
        const blog = {
          blogId: this.editId,
          blogTitle: this.blog.title,
          blogAuthorId: this.userInfo.userId,
          blogChannelId: this.blog.selectedChannel,
          blogCatagoryId: this.blog.selectedCatagory,
          blogContent: this.blog.content,
          blogTags: this.blog.tags,
          blogAvatar: this.blog.img,
          blogStatus: status,
          blogDescription:
            this.blog.content.substring(0, 60).replaceAll("\n", "") + "...",
        };
        request({
          url: "/blog/update",
          method: "post",
          data: blog,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("保存成功");
            this.$router.push({ path: "/" });
          } else {
            this.$message.error("发生未知错误");
          }
        });
      }
    },
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.params != from.params) {
        this.blog = {
          // id: "",
          title: "",
          content: "",
          selectedChannel: 6,
          selectedCatagory: "",
          img: "/article.png",
          tags: "default",
          // description: "",
        };
        this.editId = "";
        this.channels = [];
        this.catagory = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-title {
  height: 64px;
  font-size: 36px;
  border: none;
  font-weight: 520;
}
.ant-radio-button-wrapper {
  margin-right: 12px;
  /* border: none; */
}
.blog-editor {
  z-index: 1000 !important;
}
.draft-btn {
  float: right;
  margin-top: 10px;
}

.add_modal {
  height: 256px;
}
.add_catagory_btn {
  width: 352px;
}
.copyright-hint {
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #99a2aa;
}
.submit-btns {
  margin-top: 40px;
}

.ant-upload-preview {
  position: relative;
  // margin: 0 auto;
  width: 100%;
  max-width: 300px;
  border-radius: 5%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 300px;
    height: 100%;
    border-radius: 5%;
    overflow: hidden;
  }
}
</style>
