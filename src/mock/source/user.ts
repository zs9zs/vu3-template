import { MockMethod } from "vite-plugin-mock";
import { Random } from "mockjs";

export default [
  {
    url: "/api/getUserInfo", // 注意，这里只能是string格式
    method: "get",
    response: () => {
      return {
        menusList: [
          {
            id: "1",
            title: "南辰",
            subMenuList: [
              {
                id: "11",
                title: "南",
                path: "/user/nan",
              },
              {
                id: "12",
                title: "小",
                path: "/user/xiao",
              },
              {
                id: "13",
                title: "辰",
                path: "/user/chen",
              },
            ],
          },
          {
            id: "2",
            title: "希",
            subMenuList: [
              {
                id: "21",
                title: "玩游戏",
                path: "/user/play",
              },
            ],
          },
        ],
      };
    },
  },
  {
    url: "/api/getRandom",
    method: "get",
    response: () => {
      return {
        "list|1-10": [
          {
            // 属性 id 是一个自增数，起始值1，每次增1
            "id|+1": 1,
            image: Random.image("200x10", "#50B347", "#FFF", "Mock.js"),
          },
        ],
      };
    },
  },
] as MockMethod[]; // 这里其实就是定义数据格式的，不了解的同学可以参考typescript的官方文档
