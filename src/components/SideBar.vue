<template>
  <el-aside width="200px" v-if="show" v-loading="loading">
    <el-menu :default-openeds="['1']" :default-active="active">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>&nbsp;笔记本</template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item @click="setNote(n.id)" v-for="(n,index) in note_books" :key="n.id" :index="index.toString()">
            {{n.name}}
            <a @click.stop="delNoteBook(n.id)" style="float: right;"><i class="el-icon-delete"></i></a>
            <a @click.stop="upNoteBook(n.id)" style="float: right;"><i class="el-icon-edit"></i></a>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="/new_note">
        <el-menu-item index="/new_note">
          <i class="el-icon-edit"></i>
          <span slot="title">新建笔记</span>
        </el-menu-item>
      </router-link>
      <el-menu-item @click="newNoteBook" index="/new_note_book">
        <i class="el-icon-plus"></i>
        <span slot="title">新建笔记本</span>
      </el-menu-item>
      <el-menu-item index="/trash">
        <i class="el-icon-delete"></i>
        <span slot="title">废纸篓</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  import bus from '../assets/eventBus';
  import {NOTE_BOOK} from "../api";

  export default {
    name: "SideBar",
    data() {
      return {
        loading: true,
        active: '',
        show: true,
        note_books: []
      }
    },
    methods: {
      getNoteBookList(first = false) {
        this.loading = true;
        this.$axios.get(NOTE_BOOK().getNoteBook).then(resp => {
          this.note_books = resp.data;
          if (first && resp.data.length !== 0) {
            this.setNote(resp.data[0].id);
          } else {
            this.setNote(0);
          }
        }).catch(error => {
          this.$message({
            showClose: true,
            type: 'error',
            duration: 0,
            message: '获取笔记本信息失败!'
          });
        }).then(() => {
          this.loading = false;
        });
      },
      delNoteBook(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(NOTE_BOOK().delNoteBook + id).then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(error => {
            this.$message({
              showClose: true,
              type: 'error',
              duration: 0,
              message: '删除失败!'
            });
          }).then(() => {
            this.getNoteBookList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      upNoteBook(id) {
        this.$prompt('请输入新的笔记本名称', '修改笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.note_books.filter(n => {
            return n.id === id
          })[0].name
        }).then(({value}) => {
          if (value !== '' && value != null) {
            this.$axios.patch(NOTE_BOOK().upNoteBook + id + '/' + value).then(resp => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            }).catch(error => {
              this.$message({
                showClose: true,
                type: 'error',
                duration: 0,
                message: '更新失败!'
              });
            }).then(() => {
              this.getNoteBookList();
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      newNoteBook() {
        this.$prompt('请输入新的笔记本名称', '新增笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          if (value !== '' && value != null) {
            this.$axios.post(NOTE_BOOK().newNoteBook, {name: value}).then(resp => {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            }).catch(error => {
              this.$message({
                showClose: true,
                type: 'error',
                duration: 0,
                message: '添加失败!'
              });
            }).then(() => {
              this.getNoteBookList();
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      setNote(id) {
        bus.$emit('noteId', id);
      }
    },
    mounted() {
      this.getNoteBookList(true);
      this.active = this.$route.path === '/' ? "0" : this.$route.path;
      this.$route.path === '/login' ? this.show = false : this.show = true;
    }
  }
</script>

<style scoped>

</style>
