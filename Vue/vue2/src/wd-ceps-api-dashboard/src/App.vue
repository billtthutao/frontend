<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo">
        <img :src="logo" alt="logo" />
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="[currentPath]"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="menu in menuList" :key="menu.key">
          <router-link :to="menu.key">{{ menu.title }}</router-link>
        </a-menu-item>
      </a-menu>
      <div class="user-info">
        <a-icon type="user" />
        <span>{{ userEmail }}</span>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>{{
          menuList.find((menu) => menu.key === currentPath).title
        }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '550px' }">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      &copy; Copyright 2021 - IBM CEPS - All Rights Reserved
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Logo from "./assets/images/logo.png";
import menuList from "./config/menuListConfig";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  mounted() {
    this.getUser()
  },
  computed: {
    currentPath() {
      return this.$route.path === "/" ? "/home" : this.$route.path;
    },
    ...mapGetters({
      userEmail: "userEmail",
    }),
  },
  data() {
    return {
      logo: Logo,
      menuList: menuList,
    };
  },
  methods: {
    ...mapActions(["getUser"]),
  },
};
</script>

<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
