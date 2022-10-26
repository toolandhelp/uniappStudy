# 跨平台APP

## 支持的平台
```
Android:8+

IOS:10+

微信小程序

钉钉小程序

H5 App
```

## 添加项目

- 下载并且安装“HBuilder X”
- 打开“HBuilder X”->文件->打开目录
- 选中当前项目

## H5 APP 运行
- “HBuilder X”运行->运行到浏览器->Chrome

## 钉钉小程序运行
- 安装钉钉小程序开发工具
- “HBuilder X”运行->钉钉小程序
- 小程序开发工具主界面->打开项目
- 选择文件夹"/platformApp/unpackage/dist/dev/mp-alipay"
- 项目类型：钉钉：企业内部应用->完成

## 微信小程序运行
- 安装钉钉小程序开发工具
- “微信开发者工具”->设置->安全->开启服务端口
- “HBuilder X”运行->运行到小程序模拟器->微信开发者工具

## 代码规范
1. 禁止使用var定义变量
1. 尽量使用const定义变量，其次使用let
1. import文件禁止使用绝对路径，只能使用相对路径
1. Vue只使用组合式API（composition api）进行编写代码
1. 编写标准方法必须写方法注释，如有有用的入参和出参必须带上参数注释
1. 变量名和方法名小写字母开头，后续每个单词首字母大写
1. Class名和组件名大写字母开头，后续每个单词首字母大写
1. css中选择器名称全部小写，单词用横杠(-)分隔
1. 尽量使用双引号("")定义字符串变量
1. Vue中如果暴露的绑定变量和方法比较少则可以使用“setup script”，其他情况禁止使用
1. 使用项目中已经封装好的方法，禁止调用uniapp原生的请求接口、跳转页面、缓存等方法
1. 除了Vue文件名称用首字母大写开头，其他文件名都需小写开头，后续每个单词首字母大写
1. 如果用来uniapp的组件只使用组件中提供的事件（自己写的事件会造成多端不兼容的问题）

## 插件使用规范
1. 优先使用uniapp官方提供的组件
1. 官方无对应组件时可在插件市场找寻单独的独立插件进行使用，禁止使用全家桶组件包

## IDE使用规范
1. “Visual Studio Code”作为编写代码工具
1. “HBuilder X”和其他小程序等开发工具作为运行工具
1. 除了极少部分只能用“HBuilder X”编写代码以外，优先且只用“Visual Studio Code”编写代码
1. “Visual Studio Code”关闭Vue文件校验：File->Preferences->Settings->User->search->vetur.validation.template->关闭
