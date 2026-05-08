import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import DefaultTheme from 'vitepress/theme';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Antd);
  },
};
