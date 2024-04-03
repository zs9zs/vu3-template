<script setup>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import ChannelEdit from "./components/ChannelIEdit.vue";

import { ElMessage, ElMessageBox } from "element-plus";
const dialog = ref();

const channelList = [
  {
    cate_name: "分类1",
    cate_alias: "分类别名1",
  },
  {
    cate_name: "分类2",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类3",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类4",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类5",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类6",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类7",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类8",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类9",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类10",
    cate_alias: "分类别名",
  },
  {
    cate_name: "分类11",
    cate_alias: "分类别名",
  },
];
const loading = ref(false);

const onAddChannel = () => {
  dialog.value.open();
  loading.value = true;
  loading.value = false;
};

const onEditChannel = (row) => {
  loading.value = true;
  loading.value = false;
  console.log(row);
  dialog.value.open(row);
};
const onDelChannel = async (row) => {
  await ElMessageBox.confirm("你确认删除该分类信息吗？", "温馨提示", {
    type: "warning",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  });
  loading.value = true;
  // await artDelChannelService(row.id)
  loading.value = false;
  console.log("zslog_del", row);
  ElMessage({ type: "success", message: "删除成功" });
};
const onSuccess = () => {
  console.log("接受回显");
};
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>

  <!-- 弹窗 -->
  <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
</template>

<style lang="scss" scoped></style>
