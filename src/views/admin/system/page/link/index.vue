<template>
  <div>
    <a-button class="add-btn" type="primary" @click="showModal">
      <a-icon type="plus" />添加链接
    </a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="linkId"
      :loading="loading"
      :pagination="{ defaultPageSize: 6 }"
    >
      <span slot="action" slot-scope="record">
        <a @click="showEdit(record)">修改</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确认删除？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteLink(record)"
        >
          <a>删除</a>
        </a-popconfirm>
      </span>
    </a-table>

    <a-modal
      title="添加链接"
      :visible="visible"
      @ok="handleAdd"
      @cancel="visible = false"
    >
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <a-form-item label="链接名称">
          <a-input v-model="addName"></a-input>
        </a-form-item>
        <a-form-item label="url">
          <a-input v-model="addUrl"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      title="修改链接"
      :visible="visible2"
      @ok="handleEdit"
      @cancel="visible2 = false"
    >
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
        <a-form-item label="链接名称">
          <a-input v-model="editName"></a-input>
        </a-form-item>
        <a-form-item label="url">
          <a-input v-model="editUrl"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import request from "@/utils/request";

const columns = [
  {
    title: "#",
    dataIndex: "linkId",
    key: "linkId",
  },
  {
    title: "链接名称",
    dataIndex: "linkName",
    key: "linkName",
    width: "20%",
  },
  {
    title: "Url",
    dataIndex: "linkUrl",
    key: "linkUrl",
    ellipsis: true,
    width: "60%",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
      loading: true,
      data: [],
      columns,
      visible: false,
      visible2: false,
      addName: "",
      addUrl: "",
      editId: "",
      editName: "",
      editUrl: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      request({
        url: "/link",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    showModal() {
      this.visible = true;
    },
    showEdit(record) {
      this.editId = record.linkId;
      this.editName = record.linkName;
      this.editUrl = record.linkUrl;
      this.visible2 = true;
    },
    handleEdit() {
      if (this.editUrl && this.editName && this.editId) {
        const link = {
          linkId: this.editId,
          linkName: this.editName,
          linkUrl: this.editUrl,
        };
        this.$message.loading("请稍等...", 0);
        request({
          url: "/link/update",
          method: "post",
          data: link,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("修改成功");
            this.visible2 = false;
            this.getList();
          } else {
            this.$message.error("操作失败");
            this.visible = false;
          }
        });
      } else {
        this.$message.info("请输入内容");
      }
    },
    deleteLink(link) {
      request({
        url: "/link/delete",
        method: "post",
        data: link,
      }).then((res) => {
        if (res.data.data) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    handleAdd() {
      if (this.addName && this.addUrl) {
        const link = {
          linkName: this.addName,
          linkUrl: this.addUrl,
        };
        this.$message.loading("请稍等...", 0);
        request({
          url: "/link/save",
          method: "post",
          data: link,
        }).then((res) => {
          if (res.data.data) {
            this.$message.success("添加成功");
            this.visible = false;
            this.getList();
          } else {
            this.$message.error("操作失败");
            this.visible = false;
          }
        });
      } else {
        this.$message.info("请输入内容");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.add-btn {
  margin-top: -10px;
  margin-bottom: 15px;
  border-radius: 0;
}
</style>
