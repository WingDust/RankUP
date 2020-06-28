[TOC]
## 问题
  - **Date: 2020 年 01 月 21 日**			<span style="float:right">Electron</span>
    - **对于 electron 的无边框窗口的<big><u>拖动</u></big>探索**
      - 我对 [electron-drag][1] 和 较新的 [electron-drag-ex][2] 想进行尝试，但是它的内部依赖模块 [node-bindings or bindings][3] 中的报出的**Cannot read property 'indexOf' of undefined** In Issue 中 [不理解的解决方案][4]
      - 尝试其它方法 [electorn-drag-drop][5] 或者官方的麻烦的方法
      - <span style="color:green">已解决</span>

  - **Date: 2020 年 01 月 24 日**
    - **对于滑块使用尝试《海上钢琴师》的淡红色**

  - **Date: 2020 年 01 月 27 日**
    - **对使用 spwan 传回的数据进行转化**
    - **对于定水神针的界面，可以通过附着在鼠标（隐藏鼠标）点穿式 + 透明式窗口实现**

  - **Date: 2020 年 01 月 28 日，19:01:17**
    - **通过另一种方法实现   [点我跳转](#altTabsolut)**
    - **对于出现的标题可变化，如 VSCode 当有多个标签页时，切换时会对标题进行改变 (  - <span style="color:red">我需要动态的显示，标识窗口</span>)**
    - **解决方案 Date: 2020 年 01 月 29 日 00:58:53**
      - 实现工具：pywin32
      - 查询窗口时对 窗口的句柄和标题进行 key-value 式保存 传输整体的数据 只对 value 进行列式显示然后对触发操作时，用保存的句柄执行查询 检察窗口是否存在 如果存在再对它的当时检查出来的与保存在 js 中的标题进行比较，当不同时，更新保存的标题，vue 会自动帮助我更新页面，**-_-#**

  - **Date: 2020 年 01 月 29 日 00:59:41**
    - **开始使用 pywin32 中 win32ui.createWindowFormhandle 来使用 pycwnd 借鉴于 Raymond chen 的 isaltTabwindow 的方法去对检测窗口是否为 alt-Tab 列表中的 使用 python 对它的代码进行尝试**
    - 使用 pywin32 来调用 win32 的底层的 API 在实现查找 alt-Tab 列表中的窗口有诸多的困难，它对有一些的 API 方法支持使用较麻烦，可能需要多种变通
      - 对此过程中寻找到资料进行总结
      - 使用 pywin32 中的 EnumWindows+IsWindow+IswindowEnabled+IsWindowVisible 来实现得查找到当前可见窗口标题会出现一些如：Program Manager 工具窗口之类 等一些实际不可见，但是它能通过 IsWindowVisible 下面是方法源码
      ```python
      '''
      @description: 得到当前所有可见窗口的标题
      @param {None}
      @return: list
      '''
      def GetAllWindowTitle():

              titles = set()
              def foo(hwnd, mouse):
                  nonlocal titles
                  if IsWindow(hwnd)and IsWindowEnabled(hwnd) and IsWindowVisible(hwnd):
                  titles.add(GetWindowText(hwnd))
              EnumWindows(foo, 0)
              lt = [t for t in titles if t]
              lt.sort()
              for t in lt:
                  # print(t)
                  # print(win32gui.GetWindowRect(win32gui.FindWindow(None,t)))
                  # print(win32gui.IsIconic(win32gui.FindWindow(None,t)))
              return lt
       ```

      - 经过搜索有一些资料 it's worth to reference
          - Microsoft 借鉴于 Raymond chen 的判断窗口是否为 alt-Tab 列表中的窗口的[技术博客][6] 或使用
          - 对上方 Raymond chen 的 [衍生][7]、[C#相关这种][8] 下面是衍生出的重要借鉴代码<span id="solut"></span>
          ```C
              BOOL IsAltTabWindow(HWND hwnd)
              {
                  TITLEBARINFO ti;
                  HWND hwndTry, hwndWalk = NULL;

                  if(!IsWindowVisible(hwnd))
                      return FALSE;

                  hwndTry = GetAncestor(hwnd, GA_ROOTOWNER);
                  while(hwndTry != hwndWalk)
                  {
                      hwndWalk = hwndTry;
                      hwndTry = GetLastActivePopup(hwndWalk);
                      if(IsWindowVisible(hwndTry))
                          break;
                  }
                  if(hwndWalk != hwnd)
                      return FALSE;

                  // the following removes some task tray programs and "Program Manager"
                  ti.cbSize = sizeof(ti);
                  GetTitleBarInfo(hwnd, &ti);
                  if(ti.rgstate[0] & STATE_SYSTEM_INVISIBLE)
                      return FALSE;

                  // Tool windows should not be displayed either, these do not appear in the
                  // task bar.
                  if(GetWindowLong(hwnd, GWL_EXSTYLE) & WS_EX_TOOLWINDOW)
                      return FALSE;

                  return TRUE;
              }
          ```
      - 如果想通过`pywin32`使用 `GetLastActivePopup` 方法 需要使用 win32ui 模块中的`win32ui.createWindowFormhandle`来建立一个`PyCWnd`对象来调用`PyCWnd.GetLastActivePopup()` , 通过`PyCWnd`对象，可调用`PyCwnd.GetToplevelParent()` 思路上与 win32API `GetAncestor()` 类似暂未尝试
      - 对[衍生](#solut) 出的代码中的 `GetTitleBarInfo` 中的学习注意 <span style="color:red">指向 TITLEBARINFO 结构的指针以接收信息。请注意，在调用此函数之前，必须将 cbSize 成员设置为 sizeof(TITLEBARINFO)</span>

  - **Date: 2020 年 01 月 29 日 07:30:01**  <span id="altTabsolut">新方法</span>
    - **使用 node-ffi 来调用 win32 的 API**
      - <span style="color:orange">已否决</span>

  - **Date: 2020 年 02 月 03 日 23:21:24**
    - **只来控制自己，的窗口显示**
    - **新想法**
      - **原本是正文与自文设置，正文占主要的区域，自文占副的区域，原设计是双方都支持 vim 式操作**
      - **正文只有一个，自文可以有多个理论上不限数量**
      - **在原思想上设计上支持 vim 操作 +markdown 语法，可以支持图片**
      - **现在对正文与自文之间添加一个区域 为树 ，正文与自文会对树添加枝引入，而树是可以旋转的**

  - **Date: 2020 年 02 月 04 日 06:06:43**
    - **如果将 vimwasm.js 这个的代码直接搬到 vue 组件中这样能**
    - **滑块的颜色深度与背景的颜色深度，滑块相对地较深一些，背景应该偏灰一些**

  - **Date:  2020 年 02 月 10 日  01:05:04**
    - **写一个已经设定快捷键参数的带函数参数的函数来调用，之后我直接传函数参数来使用**

  - **Date:  2020 年 02 月 18 日 星期二 22:15:02**	<span style="float:right">Electron</span>
    -  **对于 `electron-rebuild` 每次安装依赖后都应该运行 `npx electron-rebuild`**

  - **Date:  2020 年 02 月 19 日 星期三 16:33:00**	<span style="float:right">Electron</span>
    -  **我使用 `npm` `yarn` 来安装 `electron` 在运行启动时都会出现 `"throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')"`经过 writer2 和 writerCopy 中 `node_modules/electron` 的对比 它都会缺少文件<<big>path.txt</big>  和 文件夹 <big>dist</big> 和 <big>node_modules/electron/node_modules/@types</big> 在我使用的 `@vue/devtools`包 它在 `node_modules/@vue/devtools`目录下所使用的 `electron` 也有这个问题 根据查询，解决为**
      -  新建 `path.txt` 并写 `electron.exe`
      -  根据所安装的 `electron` 的版本 去下载压缩包
     `// 例如我安装的是 electron@8.0.1 我使用的是 win10 平台 去官网下载 **electron-v8.0.1-win32-x64.zip**`
      - &nbsp; 新建 `dist` 文件夹 将压缩包解压到这个文件夹
    - **对于要使用 node 的原生模块所出现的问题**
    - &nbsp; 问题
      - &nbsp; 在使用 `elelctron-drag` 时对它使用的 node 原生模块 `win-mouse` 我遇到了
      ```js
      Error: The module '/path/to/native/module.node'
      was compiled against a different Node.js version using
      NODE_MODULE_VERSION $XYZ. This version of Node.js requires
      NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
      the module (for instance, using `npm rebuild` or `npm install`).
      ```
  - &nbsp; 资料
    - &nbsp;[参考资料](https://blog.csdn.net/cut001/article/details/68922780)
    - &nbsp;[对于官方所说的参考](https://www.electronjs.org/docs/tutorial/using-native-node-modules)
    - &nbsp;[又是另一种新参考方法在 Win10 上的 Arm](https://www.electronjs.org/docs/tutorial/windows-arm)
  - &nbsp; 关于在使用 `vuex` 中的 `state` 它其中的变量与在我使用对在入口文件中给予赋值，在组件的 `created` hook 方法中 它的值并未改变，直到 `mounted` hook 方法中它值才改变 <span style="color:red;">错误</span>


<--! 它不能使用 Markdown 语法在内部 -->
<details>
  <summary style="outline:0"> Atom 分屏 </summary>
[reference]
[Atom 编辑器折腾记_(8) 分屏操作](https://blog.csdn.net/crper/article/details/45841569?utm_source=tuicool)
[具体分屏操作，可看本教程初识 Atom(7) —— 分屏](https://github.com/kaivin/atom/blob/master/menuBar.md)
[atom 使用有感](https://my.oschina.net/u/1433890/blog/517227)
</details>

  - [reference]
    1. [Atom 编辑器折腾记_(8) 分屏操作](https://blog.csdn.net/crper/article/details/45841569?utm_source=tuicool)
    2. [具体分屏操作，可看本教程初识 Atom(7) —— 分屏](https://github.com/kaivin/atom/blob/master/menuBar.md)
    3. [atom 使用有感](https://my.oschina.net/u/1433890/blog/517227)

  - &nbsp;`electron` 实现文件拖拽 	<span style="float:right">Electron</span>
   - &nbsp; 问题
      - &nbsp; 在 windows 平台上，以管理员身份运行 `electron` 在文件拖拽上会出现 `🚫` 这个符号
      - reference
        - [electron 在 windows 无法拖放文件，出现禁止标志的问题](https://www.jianshu.com/p/50e3d37d8ccd)

  - &nbsp; **`chokidar` 使用**
    - &nbsp;[reference]
      1. [NPM 酷库：chokidar 监视文件变化](https://segmentfault.com/a/1190000012855435)

      2. [监听文件变化插件 chokidar 的使用教程](https://blog.csdn.net/qq_26582705/article/details/82559019)

  - &nbsp; **js 根据文件后缀来判断文件是图片、视频 **
    - &nbsp;[reference]
      1. [js 根据后缀判断文件是图片还是视频](https://blog.csdn.net/u014643351/article/details/99303871)

  - &nbsp; **想法**
    -   &nbsp; 使用全排列，对左手的字母键作全排列取前 35 个或者 36 个 作为按键

  -  &nbsp;**启动 elecron 遇到 `get http://localhost:8080/sockjs-node/info?t=1462183700002 net::ERR_CONNECTION_REFUSED
  [WDS] Disconnected!` **
    - [vue/cli3 项目运行报错 sockjs-node/info 解决方案](https://www.jianshu.com/p/147083b647ef)

  - &nbsp;**有多次失误操作 如因为处理时间的延时而导致多次的点击了这个操作，而造成数据的混乱。**

  - &nbsp;**查找到的数据，我得把它分成一一个小部分来加载**

  - &nbsp;**Async/await 异步递归，它会新产生一个函数栈，我现在想到只能保用判断它的最后一次执行来执行回调来 得知它是否执行完，不知道 web worker 是否会有效**
  - &nbsp; 对于文件下的文件名被重命名，或者是层级的变化
    - &nbsp; 对于本地的文件监控不去实现，而当使用软件时，操作而实现一些回调而改变它的名字
    - &nbsp; 分成纵览模式，与中心模式


## **可能性**
  - &nbsp; 实现无限滚动
    - &nbsp;[reference]
      - &nbsp; [如何实现无限滚动](https://segmentfault.com/a/1190000004974824)

  - &nbsp; D3.js
    - &nbsp; [官网：](https://d3js.org/)

  - &nbsp; 实现可穿透的窗口——[electron-transparency-mouse-fix](https://github.com/toonvanvr/electron-transparency-mouse-fix)


  - &nbsp; 对英文输入无效，只管中文输入

[1]:https://github.com/kapetan/electron-drag
[2]:https://github.com/linqingwudiv1/electron-drag-ex
[3]:https://github.com/TooTallNate/node-bindings
[4]:https://github.com/TooTallNate/node-bindings/issues/61
[5]:https://github.com/electron-utils/electron-drag-drop

[6]:https://devblogs.microsoft.com/oldnewthing/20071008-00/?p=24863
[7]:https://stackoverflow.com/questions/7277366/why-does-enumwindows-return-more-windows-than-i-expected
[8]:https://stackoverflow.com/questions/210504/enumerate-windows-like-alt-tab-does
<div style='display:none'>markdown <small>小号字体</small> 可以这样写注释</div>
