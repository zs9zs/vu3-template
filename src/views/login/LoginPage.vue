<script setup>
/**
 * 一、注册功能
 *    1、用户名非空，长度校验5-10位
 *    2、密码非空，长度校验6-15位
 *    3、再次输入密码，非空，长度校验6-15位
 *    4、再次输入密码需要自定义校验规则，和密码框值一致
 *    校验相关：
 *    el-form => :model="ruleForm" 绑定的整个form的数据对象{xxx，xxx，xxx}
 *    el-form => :rules="rules" 绑定的整个rules规则对象{xxx，xxx，xxx}
 *    表单元素 =>v-model="ruleForm,xxx" 给表单元素绑定form的子属性
 *    el-model-item-props配置生效的是哪个校验规则
 * 二、登录功能
 *    1、用户名不能为空，用户名必须是5-10位的字符，失去焦点 和 修改内容时触发校验
 *    2、密码不能为空，密码必须是6-15位的字符，失去焦点 和 修改内容时触发校验
 */
import { User, Lock } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const isRegister = ref(false);
//整个用于提交的form数据对象
const formModel = ref({
  username: "",
  password: "",
  repassword: "",
});
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "用户名必须是5-10位的字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15位的非空字符",
      trigger: "blur",
    },
  ],
  repassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      pattern: /^\S{6,15}$/,
      message: "密码必须是6-15的非空字符",
      trigger: "blur",
    },
    {
      /**
       * 自定义校验 =>自己写逻辑校验（校验函数）
       * rule 当前校验相关的信息
       * value 当前校验表单元素目前的表单值
       * callback 无论成功还是失败，都需要callback回调
       *          callback() 校验成功
       *          callback(new Error(错误信息)) 校验失败
       */
      validator: (rule, value, callback) => {
        //判度value和当前form中收集的password是否一致
        if (value !== formModel.value.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 注册前预校验
const form = ref();
const register = async () => {
  await form.value.validate();
  ElMessage.success("注册成功");
};

// 登录前预校验
const login = async () => {
  await form.value.validate();
  console.log("zslog_formModel", formModel.value, formModel.value.password);
  if (
    formModel.value.username === "admin" &&
    formModel.value.password === "123456"
  ) {
    ElMessage.success("登录成功");
    router.push(`/layout`);
  } else {
    ElMessage.error("用户名或密码错误");
  }
  userStore.setToken("zslog");
};

// 登录/注册切换重置
watch(isRegister, () => {
  formModel.value = {
    username: "",
    password: "",
    repassword: "",
  };
});
</script>

<template>
  <!-- el-row表示一行，一行分成24份 -->
  <el-row class="login-page">
    <!-- el-col表示列：span="12" 代表在一行中占12份（50%） -->
    <el-col :span="12" class="bg"></el-col>
    <!-- span="6" 表示在一行中占6份（25%） -->
    <!-- offset="3" 表示在一行中，左侧margin份数 -->
    <el-col :span="6" :offset="3" class="form">
      <!-- el-form 整个表单组件 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formModel"
        :rules="rules"
        v-if="isRegister"
      >
        <!-- el-form-item 表单的一行（一个表单域）, 表单域彼此独立 互不影响 -->
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <!-- el-input表单元素（输入框） -->
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formModel"
        :rules="rules"
        v-else
      >
        <el-form-item>
          <h1>登录（admin 123456）</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url("@/assets/logo2.png") no-repeat 60% center / 240px auto,
      url("@/assets/login_bg.jpg") no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
