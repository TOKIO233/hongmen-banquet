// Create display-only transparent masks for the supplied white-background portraits.
const portraitCache = new Map();
function transparentPortrait(name, fullBody = false) {
  if (fullBody) return Promise.resolve('fullbody-cutout/' + name + '.png');
  const cacheKey = (fullBody ? "fullbody/" : "characters/") + name;
  if (portraitCache.has(cacheKey)) return portraitCache.get(cacheKey);
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 800 / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d', {willReadFrequently:true}); ctx.drawImage(img, 0, 0, w, h);
      const pixels = ctx.getImageData(0,0,w,h), d = pixels.data, seen = new Uint8Array(w*h), queue = new Int32Array(w*h);
      let head=0, tail=0;
      function push(i) { if (seen[i]) return; const k=i*4, min=Math.min(d[k],d[k+1],d[k+2]), max=Math.max(d[k],d[k+1],d[k+2]); if(min < 218 || max-min > 28) return; seen[i]=1; queue[tail++]=i; }
      for(let x=0;x<w;x++){push(x);push((h-1)*w+x)}
      for(let y=0;y<h;y++){push(y*w);push(y*w+w-1)}
      // 刘邦双脚与衣摆围出的白底未连到画布边缘，额外从空隙里取背景种子。
      if (fullBody && name === "liubang") push(Math.floor(h * .955) * w + Math.floor(w * .5));
      while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0; if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}
      for(let n=0;n<tail;n++){const k=queue[n]*4; d[k+3]=0}
      ctx.putImageData(pixels,0,0); resolve(canvas.toDataURL('image/png'));
    };
    img.onerror=reject; img.src=(fullBody?'fullbody/':'characters/')+name+'.png';
  });
  portraitCache.set(cacheKey,promise);return promise;
}
// 各图片透明区域不同，用实际人物范围计算统一的头顶和脚底。
const portraitBounds={deepseek_new:[.96,.025],deepseek:[.92956,.03867],xiangzhuang:[.94751,.01727],kimi:[.95511,.02901],liubang:[.97721,.01693],fankuai:[.95925,.02555],fanzeng:[.97069,.01466],zhangliang:[.96409,.01381],glm:[.96754,.01727],xiangyu:[.96940,.01302],xiangbo:[.94544,.01934]};
const standingBounds={"deepseek_new": [0.96, 0.025], "deepseek": [0.9558, 0.02555], "xiangzhuang": [0.95649, 0.01519], "kimi": [0.97721, 0.01727], "liubang": [0.98242, 0.01107], "fanzeng": [0.98438, 0.00781], "zhangliang": [0.98619, 0.00829], "glm": [0.98688, 0.00967], "xiangyu": [0.97526, 0.01107], "fanzeng_urgent": [0.97238, 0.01015], "xiangbo": [0.96133, 0.01381]};
// 新姿态沿用同角色的画布定位，确保舞台上尺寸一致。
Object.entries({fanzeng_toast:'fanzeng',fanzeng_irritated:'fanzeng',fanzeng_triumphant:'fanzeng',xiangyu_angry:'xiangyu',xiangbo_nervous:'xiangbo',liubang_alarm:'liubang',liubang_smug:'liubang',zhangliang_drunk:'zhangliang',kimi_reproach:'kimi',kimi_theatrical:'kimi',glm_accuse:'glm',deepseek_idea:'deepseek_new',deepseek_ready:'deepseek_new'}).forEach(([pose,base])=>standingBounds[pose]=standingBounds[base]);
function mountPortraits(root) {
  root.querySelectorAll('[data-portrait]').forEach(el => {
    if (el.dataset.fullbody === 'true') {
      const [height,bottom]=standingBounds[el.dataset.pose] || portraitBounds[el.dataset.portrait];
      el.style.height = `${100 / height}%`;
      el.style.bottom = `${-100 * bottom / height}%`;
    }
    (standingBounds[el.dataset.pose] ? Promise.resolve('standing-poses/'+el.dataset.pose+'.png') : transparentPortrait(el.dataset.portrait, el.dataset.fullbody === 'true')).then(src => {if(el.isConnected) el.src=src}).catch(() => {el.style.display='none'});
  });
}
