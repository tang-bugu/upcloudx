import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h, watchEffect } from 'vue';

export default {
  extends: DefaultTheme,
  Layout() {
    const { isDark } = useData();
    watchEffect(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark.value);
      }
    });
    return h(DefaultTheme.Layout);
  },
};
