<script setup>
import { Delete, Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import ChannelSelect from "./components/ChannelSelect.vue";
import { formatTime } from "@/utils/format";
import ArticleEdit from "./components/ArticleEdit.vue";

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: "",
  state: "",
});

const loading = ref(false);
const articleList = ref([]); //文章列表
const total = ref(0); //总条数
const articleEditRef = ref();

const getArticleList = async () => {
  loading.value = true;
  loading.value = false;
  // const res = await artGetListService(params.value)
  articleList.value = [
    {
      id: 5961,
      title: "新的文章啊",
      pub_date: "2022-07-10 14:53:52.604",
      state: "已发布",
      cate_name: "体育",
    },
    {
      id: 5962,
      title: "新的文章啊",
      pub_date: "2022-07-10 14:54:30.904",
      state: null,
      cate_name: "体育",
    },
  ];
  total.value = 2;
};

getArticleList();

const onEditArticle = (row) => {
  console.log(row);
};
const onDeleteArticle = (row) => {
  console.log(row);
};
const onSizeChange = (size) => {
  params.value.pagenum = 1;
  params.value.pagesize = size;
  getArticleList();
};
const onCurrentChange = (page) => {
  params.value.pagenum = page;
  getArticleList();
};
//搜索逻辑 =>按照最新的条件，重新检索，从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1; // 重置页
  getArticleList();
};
//重置逻辑 =>将筛选条件清空，重新检索，从第一页开始展示
const onReset = () => {
  params.value.pagenum = 1;
  params.value.cate_id = "";
  params.value.state = "";
  getArticleList();
};
// 编辑新增逻辑
const onAddArticle = () => {
  articleEditRef.value.open({});
};
// const onEditArticle = (row) => {
//   articleEditRef.value.open(row);
// };

// 添加修改成功
const onSuccess = (type) => {
  if (type === "add") {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize);
    //  除完以后带小数 向上取整
    params.value.pagenum = lastPage;
  }
  getArticleList();
};
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>

    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- current-page 当前页
    layout 需要包含默认生效的条数
    style 基于flex布局 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>

  <!-- 弹窗 -->
  <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
</template>
