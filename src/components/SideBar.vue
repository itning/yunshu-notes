<template>
  <el-aside width="200px" v-if="show" v-loading="loading">
    <el-menu :default-openeds="['1']" :default-active="active">
      <el-submenu index="1" v-if="noteBookListNotNull">
        <template slot="title"><i class="el-icon-document"></i>&nbsp;笔记本</template>
        <el-menu-item-group>
          <template slot="title"></template>
          <router-link to="/note" v-for="(n,index) in note_books" :key="n.id">
            <el-menu-item @click="setNote(n.id)" :index="index.toString()">
              {{n.name}}
              <a @click.stop.prevent="delNoteBook(n.id)" style="float: right;"><i class="el-icon-delete"></i></a>
              <a @click.stop.prevent="upNoteBook(n.id)" style="float: right;"><i class="el-icon-edit"></i></a>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="/new_note" v-if="noteBookListNotNull">
        <el-menu-item index="/new_note">
          <i class="el-icon-edit"></i>
          <span slot="title">新建笔记</span>
        </el-menu-item>
      </router-link>
      <el-menu-item @click="newNoteBook" index="/new_note_book">
        <i class="el-icon-plus"></i>
        <span slot="title">新建笔记本</span>
      </el-menu-item>
      <router-link to="/trash" v-if="noteBookListNotNull">
        <el-menu-item index="/trash">
          <i class="el-icon-delete"></i>
          <span slot="title">废纸篓</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
  import {NOTE_BOOK} from "../api";

  export default {
    name: "SideBar",
    data() {
      return {
        noteBookListNotNull: true,
        loading: true,
        active: '',
        show: true,
        note_books: []
      }
    },
    methods: {
      getNoteBookList(first = false) {
        this.loading = true;
        this.$http.get(NOTE_BOOK().getNoteBook, {credentials: true}).then(response => {
          console.log(response);
          this.note_books = response.body.dataList;
          if (first && response.body.dataList.length !== 0) {
            this.setNote(response.body.dataList[0].id);
          } else {
            this.noteBookListNotNull = false;
            this.setNote(0);
          }
          this.loading = false;
        }, response => {
          this.$message({
            showClose: true,
            type: 'error',
            message: '请先登录!'
          });
          this.show = false;
          this.loading = false;
          this.$router.push({path: '/login'});
        });
      },
      delNoteBook(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(NOTE_BOOK().delNoteBook + id, {credentials: true}).then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getNoteBookList();
          }, error => {
            this.getNoteBookList();
            this.$message({
              showClose: true,
              type: 'error',
              duration: 0,
              message: '删除失败!'
            });
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
            this.$http.patch(NOTE_BOOK().upNoteBook + id + '/' + value, {credentials: true}).then(resp => {
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
            message: '取消修改'
          });
        });
      },
      newNoteBook() {
        this.$prompt('请输入新的笔记本名称', '新增笔记本', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          if (value !== '' && value != null) {
            this.$http.post(NOTE_BOOK().newNoteBook, {name: value}, {credentials: true}).then(resp => {
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
            message: '取消添加'
          });
        });
      },
      setNote(id) {
        this.$emit('noteId', id);
      }
    },
    mounted() {
      if (this.$route.path !== '/login') {
        this.getNoteBookList(true);
        this.active = this.$route.path === '/note' ? "0" : this.$route.path;
        this.$route.path === '/login' ? this.show = false : this.show = true;
      } else {
        this.loading = false;
        this.show = false;
      }
    }
  }
</script>

<style scoped>

</style>
