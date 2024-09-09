<template>
  <div id="app">
    <Particles
      id="tsparticles"
      :options="options"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
    />
    <el-button @click="handleLogin">登录</el-button>
  </div>
</template>

<script setup>
// tsparticles-slim 轻量版 只加载tsparticles 核心功能
// import { loadFull } from  "tsparticles"; 完整版
import { loadSlim } from "tsparticles-slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const handleLogin = () => {
  localStorage.setItem("token", "yhx");
};

// 粒子库 options 配置
const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
</script>
