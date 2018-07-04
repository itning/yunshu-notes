<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>&nbsp;笔记本</template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="2-1">笔记本1
            <a href="" style="float: right"><i class="el-icon-edit"></i></a>
            <a href="" style="float: right"><i class="el-icon-delete"></i></a>
          </el-menu-item>
          <el-menu-item index="2-2">笔记本2
            <a href="" style="float: right"><i class="el-icon-edit"></i></a>
            <a href="" style="float: right"><i class="el-icon-delete"></i></a>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-edit"></i>
        <span slot="title">新建笔记</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-delete"></i>
        <span slot="title">废纸篓</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "SideBar"
  }
</script>

<style scoped>

</style>
