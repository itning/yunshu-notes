<template>
  <div>
    <h5><img src="../assets/small.png" alt="logo"></h5>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>笔记本</span>
        </template>
        <el-menu-item-group>
          <template slot="title">笔记本</template>
          <el-menu-item index="1-1">笔记本A
            <el-tooltip class="item" effect="dark" content="修改笔记本" placement="bottom">
              <a href="" class="edit_note_book"><i class="el-icon-edit"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除笔记本" placement="bottom">
              <a href="" class="del_note_book"><i class="el-icon-delete"></i></a>
            </el-tooltip>
          </el-menu-item>
          <el-menu-item index="1-2">笔记本B
            <el-tooltip class="item" effect="dark" content="修改笔记本" placement="bottom">
              <a href="" class="edit_note_book"><i class="el-icon-edit"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除笔记本" placement="bottom">
              <a href="" class="del_note_book"><i class="el-icon-delete"></i></a>
            </el-tooltip>
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
  </div>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .edit_note_book {
    position: absolute;
    right: 10%;
  }

  .del_note_book {
    position: absolute;
    right: 0;
  }
</style>
