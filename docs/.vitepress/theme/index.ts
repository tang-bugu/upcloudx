import { theme } from 'ant-design-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { computed, h } from 'vue';
import { ConfigProvider } from 'ant-design-vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Antd);
  },
  Layout() {
    const { isDark } = useData();
    const antdTheme = computed(() => ({
      algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }));
    return h(ConfigProvider, { theme: antdTheme.value }, () =>
      h(DefaultTheme.Layout),
    );
  },
};
