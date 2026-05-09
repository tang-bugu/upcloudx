import type { PluginOption } from 'vite';

const preauthLoadingHtml = `<!-- Pre-Auth Loading Screen -->
<style>
#__preauth-loading__{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;overflow:hidden}
.preauth-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(99,130,200,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,130,200,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,black 20%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,black 20%,transparent 70%)}
.preauth-card{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:340px;padding:48px 40px 40px;background:rgba(255,255,255,.85);border:1px solid rgba(99,130,200,.12);border-radius:20px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 1px 3px rgba(0,0,0,.04),0 8px 32px rgba(99,130,200,.08);animation:preauth-fade-in .6s cubic-bezier(.16,1,.3,1);overflow:hidden}
.preauth-glow{position:absolute;top:-60%;left:50%;transform:translateX(-50%);width:200%;height:200px;background:radial-gradient(ellipse at center,rgba(96,165,250,.1) 0%,rgba(167,139,250,.05) 40%,transparent 70%);pointer-events:none}
@keyframes preauth-fade-in{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.preauth-spinner{position:relative;width:72px;height:72px;margin-bottom:28px}
.preauth-pulse-ring{position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(96,165,250,.18);animation:preauth-pulse 2.4s ease-out infinite}
.preauth-pulse-ring--delay{animation-delay:1.2s}
@keyframes preauth-pulse{0%{transform:scale(.85);opacity:.6}100%{transform:scale(1.4);opacity:0}}
.preauth-svg{width:100%;height:100%;animation:preauth-rotate 2s linear infinite}
.preauth-arc{animation:preauth-dash 2s ease-in-out infinite;transform-origin:center;filter:drop-shadow(0 0 3px rgba(96,165,250,.25))}
.preauth-arc-inner{animation:preauth-rotate-reverse 8s linear infinite;transform-origin:center}
@keyframes preauth-rotate{to{transform:rotate(360deg)}}
@keyframes preauth-rotate-reverse{to{transform:rotate(-360deg)}}
@keyframes preauth-dash{0%{stroke-dasharray:1 180;stroke-dashoffset:0}50%{stroke-dasharray:60 180;stroke-dashoffset:-30}100%{stroke-dasharray:60 180;stroke-dashoffset:-120}}
.preauth-shield{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;animation:preauth-shield-breathe 2.4s ease-in-out infinite}
@keyframes preauth-shield-breathe{0%,100%{opacity:.85;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}
.preauth-check{stroke-dasharray:20;stroke-dashoffset:20;animation:preauth-check-draw .6s ease .5s forwards}
@keyframes preauth-check-draw{to{stroke-dashoffset:0}}
.preauth-status{margin:0;font-size:15px;font-weight:500;color:#475569;letter-spacing:.5px}
.preauth-dots{display:flex;gap:6px;margin-top:16px}
.preauth-dot{width:5px;height:5px;border-radius:50%;background:rgba(96,165,250,.6);animation:preauth-dot-bounce 1.4s ease-in-out infinite}
.preauth-dot:nth-child(2){animation-delay:.16s}
.preauth-dot:nth-child(3){animation-delay:.32s}
@keyframes preauth-dot-bounce{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1.2)}}
.preauth-error{margin:16px 0 0;font-size:13px;color:#dc2626;line-height:1.6;padding:10px 16px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.12);border-radius:10px;width:100%;box-sizing:border-box;text-align:center;word-break:break-word}
.preauth-retry{margin-top:12px;padding:9px 28px;font-size:13px;font-weight:500;color:#3b82f6;background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.2);border-radius:10px;cursor:pointer;transition:all .25s ease;line-height:1.5;display:inline-flex;align-items:center}
.preauth-retry:hover{background:rgba(96,165,250,.14);border-color:rgba(96,165,250,.35);box-shadow:0 2px 12px rgba(96,165,250,.1);transform:translateY(-1px)}
@media(max-width:480px){.preauth-card{width:290px;padding:40px 28px 32px;border-radius:16px}.preauth-spinner{width:60px;height:60px;margin-bottom:24px}.preauth-status{font-size:14px}}
</style>
<div id="__preauth-loading__">
<div class="preauth-bg-grid"></div>
<div class="preauth-card">
<div class="preauth-glow"></div>
<div class="preauth-spinner">
<div class="preauth-pulse-ring"></div>
<div class="preauth-pulse-ring preauth-pulse-ring--delay"></div>
<svg viewBox="0 0 64 64" class="preauth-svg"><circle cx="32" cy="32" r="28" fill="none" stroke-width="1.5" stroke="rgba(99,179,255,.08)"/><circle cx="32" cy="32" r="28" fill="none" stroke-width="2" stroke="url(#preauth-grad)" stroke-linecap="round" stroke-dasharray="60 120" class="preauth-arc"/><circle cx="32" cy="32" r="20" fill="none" stroke-width="1" stroke="rgba(99,179,255,.06)" stroke-dasharray="3 6" class="preauth-arc-inner"/><defs><linearGradient id="preauth-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="50%" stop-color="#a78bfa"/><stop offset="100%" stop-color="#60a5fa" stop-opacity=".3"/></linearGradient></defs></svg>
<div class="preauth-shield"><svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M12 2L4 5.5V11.5C4 16.19 7.4 20.56 12 22C16.6 20.56 20 16.19 20 11.5V5.5L12 2Z" fill="rgba(96,165,250,.08)" stroke="url(#shield-grad)" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="preauth-check"/><defs><linearGradient id="shield-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient></defs></svg></div>
</div>
<p class="preauth-status">正在验证身份...</p>
<div class="preauth-dots"><span class="preauth-dot"></span><span class="preauth-dot"></span><span class="preauth-dot"></span></div>
<p class="preauth-error" style="display:none"></p>
<button class="preauth-retry" style="display:none"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" style="margin-right:6px;vertical-align:-2px"><path d="M2 8a6 6 0 0 1 10.3-4.2L14 2v4.5h-4.5l1.8-1.8A4.5 4.5 0 1 0 12.5 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>重新认证</button>
</div>
</div>`;

export function vitePreauthLoadingPlugin(): PluginOption {
  return {
    enforce: 'pre',
    name: 'vite:inject-preauth-loading',
    transformIndexHtml: {
      handler(html) {
        const re = /<body\s*>/;
        return re.test(html) ? html.replace(re, `<body>${preauthLoadingHtml}`) : html;
      },
      order: 'pre',
    },
  };
}
