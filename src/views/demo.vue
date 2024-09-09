<script setup>
import { ref, nextTick, computed, reactive, watch } from "vue";
/**
 * 一、响应式
 */
// 1、ref() 基本类型响应式
// ref() 接收参数，并将其包裹在一个带有.value属性的ref对象中返回，模板中使用ref不需要附加.value
const count = ref(0); // count 的值 { value: 0 }；count.value的值 0
count.value++; // count.value的值 1
function increment() {
  count.value++;
  increment2();
}
// ref会使它的值具有深层响应性。改变嵌套对象或数组或JavaScript内置的数据结果的变化也会被检测到
// 非原始值将通过 reactive() 转换为响应式代理
// 也可以通过 shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况
const obj = ref({
  nested: { count: 0 },
  arr: ["foo", "bar"],
});
function mutateDeeply() {
  obj.value.nested.count++;
  obj.value.arr.push("baz");
}
// 当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次
// 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API
async function increment2() {
  count.value++;
  await nextTick();
  // 现在 DOM 已经更新了
}

/**
 * 二、计算属性
 */
const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});
// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});
// 可写计算属性
const firstName = ref("John");
const lastName = ref("Doe");
const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});

/**
 * watch
 * 监视数据的变化
 * 只能监视以下四种数据
 * 1、ref 定义的数据
 * 2、reactive 定义的数据
 *    默认开启深度监视，且无法解除
 * 3、函数返回一个值
 * 4、一个包含上述内容的数组
 *
 * 解除监视
 * const stopWatch = watch(sum, (n,l) => { stopWatch() })
 *
 * let person = reactive({ name: 'zs', age: 18, car: { c1: 'c1', c2: 'c2'}})
 * 只想监视对象中的某个属性（基本属性）
 * watch(() => {return person.name}, (new,old) => {})
 * 只想监视对象中的某个属性（基本对象）
 * watch(persion.car, (new,old) => {}) // 改c1/c2可以监视到  改整个car监视不到
 * watch(() => persion.car, (new,old) => {}) // 改c1/c2监视不到  改整个car可以监视到
 * watch(() => persion.car, (new,old) => {}, {deep: true}) // 改c1/c2/car可以监视到
 * 只想监视name和c1
 * watch([() => persion.name, () => persion.car.c1], (new,old) => {}, {deep: true})
 * 只想监视name和car里面的所有属性
 * watch([() => persion.name, persion.car], (new,old) => {}, {deep: true})
 */

/**
 * 三、事件
 * 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为，而 @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为
 * .capture、.once 和 .passive 修饰符与原生 addEventListener 事件相对应
 * .passive 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。
 * 请勿同时使用 .passive 和 .prevent，因为 .passive 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 .prevent 会被忽略，并且浏览器会抛出警告
 */

/**
 * 四、生命周期
 * 同步调用
 * 1、onBeforeMount 注册一个钩子，在组件被挂载之前被调用
 *    function onBeforeMount(callback: () => void): void
 *    1.1、当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程
 *    1.2、这个钩子在服务器端渲染期间不会被调用
 * 1、onMounted 注册一个回调函数，在组件挂载完成后执行
 *    function onMounted(callback: ()=> void): void
 *    以下情况被视为已挂载
 *    1.1、其所有同步子组件都已经被挂载 (不包含异步组件或 <Suspense> 树内的组件)
 *    1.2、其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中
 *    1.3、这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用，或是在服务端渲染应用中用于确保 DOM 相关代码仅在客户端执行
 *    1.4、这个钩子在服务器端渲染期间不会被调用
 * 1、onBeforeUnmount 注册一个钩子，在组件实例被卸载之前调用
 *    function onBeforeUnmount(callback: () => void): void
 *    1.1、当这个钩子被调用时，组件实例依然还保有全部的功能
 *    1.2、这个钩子在服务器端渲染期间不会被调用
 * 2、onUnmounted 注册一个回调函数，在组件实例被卸载之后调用
 *    function onUnmounted(callback: () => void): void
 *    以下情况下被视为已卸载
 *    1.1、其所有子组件都已经被卸载
 *    1.2、所有相关的响应式作用 (渲染作用以及 setup() 时创建的计算属性和侦听器) 都已经停止
 *    1.3、可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接
 *    1.4、这个钩子在服务器端渲染期间不会被调用
 * 1、onBeforeUpdate 注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用
 *    function onBeforeUpdate(callback: () => void): void
 *    1.1、这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。在这个钩子中更改状态也是安全的
 *    1.2、这个钩子在服务器端渲染期间不会被调用
 * 3、onUpdated 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用
 *    function onUpdated(callback: () => void): void
 *    1.1、父组件的更新钩子将在其子组件的更新钩子之后调用
 *    1.2、这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的，因为多个状态变更可以在同一个渲染周期中批量执行 (考虑到性能因素)。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代
 *    1.3、这个钩子在服务器端渲染期间不会被调用
 *    1.4、不要在 updated 钩子中更改组件的状态，这可能会导致无限的更新循环！
 * 1、onErrorCaptured 注册一个钩子，在捕获了后代组件传递的错误时调用
 *    注册一个钩子，在捕获了后代组件传递的错误时调用
 *    type ErrorCapturedHook = (err: unknown,instance: ComponentPublicInstance | null,info: string) => boolean | void
 *    错误可以从以下几个来源中捕获
 *    组件渲染、事件处理器、生命周期钩子、setup() 函数、侦听器、自定义指令钩子、过渡钩子
 */

/**
 * 五、侦听器
 */
const question = ref("");
const answer = ref("Questions usually contain a question mark. ;-)");
const loading = ref(false);

// 可以直接侦听一个 ref
// watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组
// 不能直接侦听响应式对象的属性值
const x = ref(0);
const y = ref(0);
// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});
// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  },
);
// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
// 深层侦听器
// 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发
// const obj1 = reactive({ count: 0 });

// watch(obj1, (newValue, oldValue) => {
//   // 在嵌套的属性变更时触发
//   // 注意：`newValue` 此处和 `oldValue` 是相等的
//   // 因为它们是同一个对象！
//   console.log("watch", newValue, oldValue);
// });
// obj1.count++;
// 相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调
// 可以给上面这个例子显式地加上 deep 选项，强制转成深层侦听器
// 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
// watch(
//   () => state.someObject,
//   (newValue, oldValue) => {
//     // 注意：`newValue` 此处和 `oldValue` 是相等的
//     // *除非* state.someObject 被整个替换了
//   },
//   { deep: true },
// { immediate: true },
// { once: true }
// )
</script>

<template>
  <!-- 一、响应式 -->
  <!-- 1、ref() -->
  <button @click="increment">
    {{ count }}
  </button>
  <button @click="mutateDeeply">
    {{ obj.nested.count }}
    {{ obj.arr }}
  </button>

  <!-- 二、computed -->
  <div>{{ publishedBooksMessage }}</div>
  <div>{{ fullName }}</div>

  <!-- 三、事件 -->
  <!-- 单击事件将停止传递 -->
  <a @click.stop="doThis"></a>
  <!-- 提交事件将不再重新加载页面 -->
  <form @submit.prevent="onSubmit"></form>
  <!-- 修饰语可以使用链式书写 -->
  <a @click.stop.prevent="doThat"></a>
  <!-- 也可以只有修饰符 -->
  <form @submit.prevent></form>
  <!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
  <!-- 例如：事件处理器不来自子元素 -->
  <div @click.self="doThat">...</div>
  <!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
  <!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
  <div @click.capture="doThis">...</div>
  <!-- 点击事件最多被触发一次 -->
  <a @click.once="doThis"></a>
  <!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
  <!-- 以防其中包含 `event.preventDefault()` -->
  <div @scroll.passive="onScroll">...</div>
  <!-- 按键修饰符 -->
  <!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
  <input @keyup.enter="submit" />
  <!-- 可以直接使用 KeyboardEvent.key 暴露的按键名称作为修饰符，但需要转为 kebab-case 形式 -->
  <input @keyup.page-down="onPageDown" />

  <!-- 五、侦听器 -->
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>

<style lang="scss" scoped></style>
