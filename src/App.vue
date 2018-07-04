<template>
  <div>
    <el-container :style="{ height: clientHeight, border: '1px solid #eee' }">
      <el-header style="text-align: left; font-size: 12px">
        <img src="./assets/logo_w_small.png" alt="logo" style="margin-top: 5px">
        <!--下拉菜单-->
        <el-dropdown>
          <span class="logo_info">舒露 已登陆</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>注销登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input style="float: right;width: auto;line-height: 60px;" placeholder="搜索..." prefix-icon="el-icon-search"
                  v-model="search_key" clearable>
        </el-input>
      </el-header>
      <el-container>
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
        <el-aside width="300px">
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>
          <el-card style="margin-bottom: 5px" shadow="hover">
            <div>
              <a href="">
                <h1>笔记标题笔记标题</h1>
                <h5>创建时间:2016-01-02 18:35:42</h5>
                <h5>修改时间:2016-01-02 18:35:42</h5>
              </a>
              <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </el-card>

        </el-aside>
        <el-main>
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"></quill-editor>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideBar from './components/SideBar'
  import NoteBook from './components/NoteBook'

  export default {
    name: 'App',
    components: {SideBar, NoteBook},
    data() {
      return {
        clientHeight: '600px',
        search_key: '',
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        }
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({quill, html, text}) {
        console.log('editor change!', quill, html, text);
        this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      //设置文档可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight - 20}px`;
      const that = this;
      window.onresize = function temp() {
        that.clientHeight = `${document.documentElement.clientHeight - 20}px`;
      };
    }
  }
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .el-header {
    background-color: #398dee;
  }

  .logo_info {
    color: white;
  }
</style>
