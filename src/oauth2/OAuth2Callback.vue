<script lang="ts" setup>
import { onMounted, ref } from 'vue';

defineOptions({ name: 'OAuth2Callback' });

const props = defineProps<{
  authStore: {
    getAccessToken: () => string;
    handleOAuth2Callback: (code: string, state: string) => Promise<void>;
    startOAuth2Flow: () => void;
  };
}>();

const loading = ref(true);
const error = ref('');

onMounted(async () => {
  const existingToken = props.authStore.getAccessToken();
  if (existingToken) {
    loading.value = false;
    // token 已存在，handleOAuth2Callback 内部会处理跳转
    return;
  }

  const url = new URL(window.location.href);
  const code = url.searchParams.get('code') ?? '';
  const state = url.searchParams.get('state') ?? '';

  if (!code) {
    error.value = '缺少授权码参数';
    loading.value = false;
    setTimeout(() => props.authStore.startOAuth2Flow(), 3000);
    return;
  }
  try {
    await props.authStore.handleOAuth2Callback(code, state);
  } catch (error_: any) {
    error.value = error_.message || 'OAuth2认证失败';
  } finally {
    loading.value = false;
  }
});

function handleRetry() {
  props.authStore.startOAuth2Flow();
}
</script>

<template>
  <div class="cb">
    <div class="cb__bg">
      <div class="cb__orb cb__orb--1"></div>
      <div class="cb__orb cb__orb--2"></div>
      <div class="cb__orb cb__orb--3"></div>
    </div>
    <div class="cb__card">
      <template v-if="loading">
        <div class="cb__iw">
          <div class="cb__spinner"></div>
          <!-- 盾牌锁图标 -->
          <svg class="cb__ic cb__ic--load" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="9" y="11" width="6" height="5" rx="1" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 11V9a2 2 0 0 1 4 0" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="cb__t">安全认证中</h2>
        <p class="cb__d">正在与授权服务器建立安全连接，请稍候...</p>
        <div class="cb__pg"><div class="cb__pgb"></div></div>
      </template>
      <template v-else-if="error">
        <div class="cb__iw cb__iw--err">
          <!-- 盾牌关闭图标 -->
          <svg class="cb__ic cb__ic--err" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 9l6 6M15 9l-6 6" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 class="cb__t cb__t--err">认证失败</h2>
        <p class="cb__d">{{ error }}</p>
        <button type="button" class="cb__btn" @click="handleRetry">
          <!-- 刷新图标 -->
          <svg class="cb__bic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 4v6h6M23 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          重新登录
        </button>
      </template>
      <template v-else>
        <div class="cb__iw cb__iw--ok">
          <!-- 盾牌勾选图标 -->
          <svg class="cb__ic cb__ic--ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="cb__t cb__t--ok">认证成功</h2>
        <p class="cb__d">身份验证已完成，正在跳转...</p>
        <div class="cb__dots">
          <span class="cb__dot"></span>
          <span class="cb__dot"></span>
          <span class="cb__dot"></span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@keyframes orb-float-1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,30px) scale(1.1)} }
@keyframes orb-float-2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,-40px) scale(1.15)} }
@keyframes orb-float-3 { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,-30px) scale(1.2)} }
@keyframes card-enter { from{opacity:0;transform:translateY(24px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes success-pop { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
@keyframes icon-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
@keyframes spin-ring { to{transform:rotate(360deg)} }
@keyframes progress-slide { 0%{transform:translateX(-100%)} 100%{transform:translateX(350%)} }
@keyframes dot-bounce { 0%,80%,100%{opacity:0.4;transform:scale(0.6)} 40%{opacity:1;transform:scale(1)} }

.cb { position:relative;display:flex;align-items:center;justify-content:center;min-height:100vh;overflow:hidden;background:#0f1117; }
.cb__bg { position:absolute;inset:0;pointer-events:none; }
.cb__orb { position:absolute;border-radius:50%;opacity:0.35;filter:blur(100px); }
.cb__orb--1 { top:-10%;left:-5%;width:500px;height:500px;background:radial-gradient(circle,rgba(99,102,241,.3) 0%,transparent 70%);animation:orb-float-1 8s ease-in-out infinite; }
.cb__orb--2 { right:-10%;bottom:-15%;width:600px;height:600px;background:radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%);animation:orb-float-2 10s ease-in-out infinite; }
.cb__orb--3 { top:40%;left:50%;width:300px;height:300px;background:radial-gradient(circle,rgba(34,197,94,.15) 0%,transparent 70%);animation:orb-float-3 12s ease-in-out infinite; }
.cb__card { position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;width:100%;max-width:380px;padding:48px 36px;background:#1a1d27;border:1px solid rgba(255,255,255,.08);border-radius:24px;box-shadow:0 1px 3px rgba(0,0,0,.4),0 8px 32px rgba(99,102,241,.06);animation:card-enter .6s cubic-bezier(.16,1,.3,1) both; }
.cb__iw { position:relative;display:flex;align-items:center;justify-content:center;width:80px;height:80px;margin-bottom:28px;background:rgba(99,102,241,.08);border-radius:50%; }
.cb__iw--err { background:rgba(239,68,68,.08); }
.cb__iw--ok { background:rgba(34,197,94,.08);animation:success-pop .5s cubic-bezier(.34,1.56,.64,1) .2s both; }
.cb__ic { width:36px;height:36px; }
.cb__ic--load { color:#6366f1;animation:icon-pulse 2s ease-in-out infinite; }
.cb__ic--err { color:#ef4444; }
.cb__ic--ok { color:#22c55e; }
.cb__spinner { position:absolute;inset:-4px;border:2px solid transparent;border-top-color:#6366f1;border-right-color:rgba(99,102,241,.3);border-radius:50%;animation:spin-ring 1.2s linear infinite; }
.cb__t { margin:0 0 8px;font-size:20px;font-weight:600;color:#f1f5f9;letter-spacing:-.01em; }
.cb__t--err { color:#ef4444; }
.cb__t--ok { color:#22c55e; }
.cb__d { margin:0 0 24px;font-size:14px;line-height:1.6;color:#94a3b8;text-align:center; }
.cb__pg { width:100%;height:3px;overflow:hidden;background:rgba(255,255,255,.08);border-radius:2px; }
.cb__pgb { width:40%;height:100%;background:linear-gradient(90deg,#6366f1,rgba(99,102,241,.6));border-radius:2px;animation:progress-slide 1.5s ease-in-out infinite; }
.cb__btn { display:inline-flex;gap:8px;align-items:center;padding:10px 24px;font-size:14px;font-weight:500;color:#ef4444;cursor:pointer;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:12px;transition:all .2s ease; }
.cb__btn:hover { background:rgba(239,68,68,.14);border-color:rgba(239,68,68,.35);transform:translateY(-1px); }
.cb__bic { width:16px;height:16px; }
.cb__dots { display:flex;gap:6px; }
.cb__dot { width:6px;height:6px;background:#22c55e;border-radius:50%;animation:dot-bounce 1.4s ease-in-out infinite; }
.cb__dot:nth-child(2) { animation-delay:.16s; }
.cb__dot:nth-child(3) { animation-delay:.32s; }
@media (max-width:480px) { .cb__card { padding:36px 24px;margin:0 16px; } }
</style>
