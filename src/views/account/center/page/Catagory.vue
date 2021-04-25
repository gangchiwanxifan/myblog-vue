<template>
  <div class="page-container">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <a-spin :spinning="loading" size="large">
        <div class="page-catagory-main">
          <div class="page-catagory-left">
            <a-menu
              mode="inline"
              :style="{ border: '0', width: '100%' }"
              :selectedKeys="selectedKeys"
            >
              <a-menu-item
                v-for="item in catagory"
                :key="item.catagoryId"
                @click="updateMenu(item.catagoryId)"
              >
                <a-icon type="book" /> {{ item.catagoryName }}
              </a-menu-item>
            </a-menu>
            <a-button class="add-catagory-btn" @click="showCreate">
              <a-icon type="plus" />新建文集
            </a-button>
          </div>
          <div class="page-catagory-right">
            <div v-if="currentCatagory">
              <div class="catagory-info">
                <div class="catagory-info-left">
                  <img src="/catagory.png" alt="" />
                </div>
                <div class="catagory-info-right">
                  <div class="edit-btn-group">
                    <a-space>
                      <a-button @click="showEdit()">编辑信息</a-button>
                      <a-button @click="showDeleteConfirm" type="danger">
                        <a-icon type="delete" />
                      </a-button>
                    </a-space>
                  </div>
                  <div class="title">{{ currentCatagory.catagoryName }}</div>
                  <div class="description">
                    {{ currentCatagory.catagoryDescription }}
                  </div>
                </div>
                <div class="clear"></div>
              </div>
              <a-divider></a-divider>
              <a-list item-layout="horizontal" :data-source="data">
                <a-list-item slot="renderItem" slot-scope="item">
                  <img
                    style="margin-right: 20px"
                    width="160"
                    alt="logo"
                    :src="item.blogAvatar"
                  />
                  <a-list-item-meta>
                    <div slot="description">
                      <div>{{ item.blogDescription.slice(0, 20) }}</div>
                      <div>最后修改时间：{{ item.updateTime }}</div>
                    </div>
                    <a
                      slot="title"
                      @click="$router.push({ path: `/blog/${item.blogId}` })"
                      :style="{
                        color: '#000',
                        fontSize: '17px',
                        fontWeight: '500',
                      }"
                    >
                      {{ item.blogTitle }}
                    </a>
                  </a-list-item-meta>
                  <a-button
                    @click="$router.push({ path: `/blog/edit/${item.blogId}` })"
                    >编辑
                  </a-button>
                  <a-divider type="vertical"></a-divider>
                  <a-button type="danger" @click="showDeleteBlog(item.blogId)"
                    >删除
                  </a-button>
                </a-list-item>
              </a-list>
            </div>
            <div v-else class="no-data" />
          </div>
        </div>
      </a-spin>
    </a-card>
    <!-- 弹出对话框 -->
    <a-modal
      v-model="visible"
      :title="modalTitle"
      ok-text="确认"
      cancel-text="取消"
      @ok="handleOk"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="文集名称">
          <a-input v-model="name" placeholder="请输入名称..."></a-input>
        </a-form-item>
        <a-form-item label="文集描述">
          <a-textarea
            v-model="description"
            placeholder="请输入描述..."
            :rows="4"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  mounted() {
    // this.getList();
    this.getCatagory(this.$store.state.user.userInfo.userId);
  },
  data() {
    this.$message.config({
      maxCount: 1,
    });
    return {
      data: [],
      selectedKeys: [],
      catagory: [],
      loading: true,
      modalType: 0,
      visible: false,
      name: "",
      description: "",
    };
  },
  computed: {
    modalTitle() {
      if (this.modalType == 0) {
        return "新建文集";
      } else if (this.modalType == 1) {
        return "编辑信息";
      } else {
        return "error";
      }
    },
    homeId() {
      return this.$route.params.userId;
    },
    userId() {
      return this.$store.state.user.userInfo.userId;
    },
    currentCatagory: function () {
      if (this.catagory) {
        const catagory = this.catagory.find(
          (catagory) => catagory.catagoryId == this.selectedKeys
        );
        return catagory;
      } else {
        return {};
      }
    },
  },
  watch: {
    selectedKeys() {
      if (this.selectedKeys) {
        this.getList(...this.selectedKeys);
      }
    },
    catagory(val, oldVal) {
      if (this.catagory && val.length != oldVal.length) {
        this.selectedKeys = [this.catagory[0].catagoryId];
      }
    },
    homeId: function () {
      this.$router.go(0);
    },
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    showEdit() {
      this.modalType = 1;
      this.name = this.currentCatagory.catagoryName;
      this.description = this.currentCatagory.catagoryDescription;
      this.visible = true;
    },
    showCreate() {
      this.modalType = 0;
      this.name = "";
      this.description = "";
      this.visible = true;
    },
    handleOk() {
      if (this.modalType == 1) {
        this.updateCatagory();
      } else if (this.modalType == 0) {
        this.createCatagory();
      }
    },
    showDeleteConfirm() {
      var _this = this;
      this.$confirm({
        title: "确定删除该文集?",
        // content: 'Some descriptions',
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.deleteCatagory();
        },
      });
    },
    getCatagory(userId) {
      this.loading = true;
      request({
        url: "/catagory/list",
        method: "post",
        data: { userId: userId },
      }).then((res) => {
        this.catagory = res.data.data;
        this.loading = false;
      });
    },
    getList(blogCatagoryId) {
      this.loading = true;
      // const userId = this.$store.state.user.userInfo.userId;
      request({
        url: "blog/list/user",
        method: "post",
        data: { blogCatagoryId: blogCatagoryId },
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    updateCatagory() {
      if (this.name) {
        const catagory = {
          catagoryId: this.currentCatagory.catagoryId,
          catagoryName: this.name,
          catagoryDescription: this.description,
        };
        this.$message.loading("信息更新中，请稍等...", 0);
        request({
          url: "/catagory/update",
          method: "post",
          data: catagory,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("更新成功", 1);
            this.getCatagory(this.userId);
            this.visible = false;
          }
        });
      } else {
        this.$message.warning("请输入名称！", 1);
      }
    },
    createCatagory() {
      if (this.name) {
        const catagory = {
          catagoryName: this.name,
          catagoryDescription: this.description,
          catagoryUserId: this.userId,
        };
        this.$message.loading("信息更新中，请稍等...", 0);
        request({
          url: "/catagory/save",
          method: "post",
          data: catagory,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("新建成功", 1);
            this.getCatagory(this.userId);
            this.visible = false;
          }
        });
      } else {
        this.$message.warning("请输入名称！", 1);
      }
    },
    deleteCatagory() {
      this.$message.loading("正在删除", 0);
      request({
        url: "/catagory/delete",
        method: "post",
        data: { catagoryId: this.currentCatagory.catagoryId },
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("删除成功", 1);
          this.getCatagory(this.userId);
        } else {
          this.$message.error("发生未知错误", 1);
        }
      });
    },
    showDeleteBlog(blogId) {
      const _this = this;
      this.$confirm({
        title: "确定删除该文章?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.$message.loading("删除中，请稍等...", 0);
          request({
            url: "/blog/delete",
            method: "post",
            data: { blogId: blogId },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("删除成功");
              _this.loading = true;
              _this.getList(_this.currentCatagory.catagoryId);
            } else {
              _this.$message.error("删除失败");
            }
          });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  .page-catagory-main {
    min-height: 60vh;
    width: 100%;
    display: flex;
    height: 100%;
    // flex-wrap: wrap;
    .no-data {
      margin: 20px auto;
      width: 100%;
      height: 350px;
      background: url(/no-data2.png) no-repeat center top #fff;
      border-radius: 12px;
    }
    .page-catagory-left {
      border-right: 1px solid #e8e8e8;
      width: 210px;
      .add-catagory-btn {
        margin: 0 4px;
        width: 200px;
        text-align: left;
        border: 0;
        padding: 0 20px;
        background-color: #f4f5f7;
      }
    }
    .page-catagory-right {
      flex: 1 1;
      padding: 8px 40px;
      .catagory-info {
        // padding-bottom: 20px;
        .clear {
          clear: both;
          margin: 0;
          padding: 0;
        }
        .catagory-info-left {
          float: left;
          img {
            width: 110px;
          }
        }
        .catagory-info-right {
          float: right;
          width: calc(100% - 130px);
          .edit-btn-group {
            float: right;
          }
          .title {
            max-width: 660px;
            font-size: 18px;
            color: #212121;
            letter-spacing: 0;
            line-height: 18px;
            margin-top: 8px;
            // text-overflow: ellipsis;
            // overflow: hidden;
            // white-space: nowrap;
          }
          .description {
            margin-top: 10px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
