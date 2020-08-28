<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><a href="/"><img src="../assets/logo.png" alt=""></a></div>
          <div class="layout-nav">
            <MenuItem name="1"
                      to="https://blog.rhyland.top">
              <Icon type="md-exit"></Icon>
              主站
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem><a href="https://blog.rhyland.top">首页</a></BreadcrumbItem>
          <BreadcrumbItem>Minecraft 客户端</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu
                      ref="menu"
                      :active-name="activeName"
                      theme="light" width="auto"
                      @on-select="menuSelected"
                      :open-names="['1']">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Java Edition
                  </template>
                  <MenuItem v-for="(version, index) in versions"
                            :name="version.to"
                            :to="version.to"
                            :key="index">{{ version.name }}</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2018-2020 &copy; Rhyland Technology | Designed by TaurusXin</Footer>
    </Layout>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      activeName: '',
      logo: require('../assets/logo.png'),
      versions: {}
    }
  },
  methods: {
    menuSelected: function(name) {
    }
  },
  created() {
    let that = this
    axios.get('/static/versions.json').then(response => {
      that.versions = response.data
    }).finally(function () {
      that.activeName = that.$route.path
    })
  },
  watch:{
  $route(to,from){
    this.activeName = to.path
  }
}
}
</script>

<style scoped type="less">
  .layout{
    margin: 15px 15px;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    border-radius: 3px;
    float: left;
    position: relative;
    top: 8px;
    left: 20px;
    line-height: 100%;
  }
  .layout-nav{
    float: right;
  }
  .layout-footer-center{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    text-align: center;
  }
</style>