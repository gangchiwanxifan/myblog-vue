<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" :form="form">
          <a-form-item label="昵称">
            <a-input
              placeholder="请输入您的昵称!"
              v-decorator="[
                'nickname',
                {
                  initialValue: userInfo.nickname,
                  rules: [{ required: true, message: '昵称不许为空！' }],
                  validateTrigger: ['change', 'blur'],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group
              v-decorator="[
                'sex',
                {
                  initialValue: userInfo.sex ? userInfo.sex : 3,
                },
              ]"
            >
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 女 </a-radio>
              <a-radio :value="3"> 保密 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="个人简介">
            <a-textarea
              rows="4"
              placeholder="请输入个人简介..."
              v-decorator="[
                'introduction',
                {
                  initialValue: userInfo.introduction,
                },
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit"
              >更新基本信息</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>

      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(img)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="img" onerror="this.src='/avatar.png'" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal
      :preStyle="{ borderRadius: '50%' }"
      ref="modal"
      @ok="setavatar"
    />
  </div>
</template>

<script>
import AvatarModal from "@/components/AvatarModal";
import request from "@/utils/request";

export default {
  components: {
    AvatarModal,
  },
  data() {
    this.form = this.$form.createForm(this);
    return {
      userInfo: {},
      img: "/avatar.jpg",
    };
  },
  mounted() {
    this.userInfo = this.$store.state.user.userInfo;
    this.img = this.$store.state.user.userInfo.avatar
      ? this.$store.state.user.userInfo.avatar
      : "/avatar.jpg";
  },
  methods: {
    setavatar(url) {
      let user = {
        id: this.userInfo.id,
        avatar: url,
      };
      console.log(user);
      request({
        url: "/user/update",
        method: "post",
        data: user,
      }).then((res) => {
        let user = res.data.data;
        this.$store.dispatch("fetchUserInfo", user.id);
        this.$message.success("上传成功");
        this.img = url;
      });
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let user = {
            id: this.userInfo.id,
            ...values,
          };
          request({
            url: "/user/update",
            method: "post",
            data: user,
          }).then((res) => {
            let user = res.data.data;
            this.$store.dispatch("fetchUserInfo", user.id);
            this.$message.success("更新成功");
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
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
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
