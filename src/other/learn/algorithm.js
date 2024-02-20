/**
 * 1、算法的复杂度分析
 * 2、排序算法，以及他们的区别和优化
 * 3、数组中的双指针、滑动窗口思想
 * 4、利用 Map 和 Set 处理查找表问题
 * 5、链表的各种问题
 * 6、利用递归和迭代法解决二叉树问题
 * 7、栈、队列、DFS、BFS
 * 8、回溯法、贪心算法、动态规划
 */
const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];

function commonFn(arr1, arr2) {
  const arr = arr1.filter((item) => arr2.includes(item));
  return arr;
}

console.log(commonFn(nums1, nums2));
