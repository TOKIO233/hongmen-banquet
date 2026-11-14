// 配音与剧情逐句校验。
const voiceLines = {
  "10": {
    "text": "这一次，我要夺回属于我的一切！孙砸，帮我想想怎么干刘邦？",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837957336105.mp3"
  },
  "11": {
    "text": "爷爷，你干脆捧杀刘邦，封他做关中王！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837624781987.mp3"
  },
  "12": {
    "text": "那你干脆让项羽给刘邦搬个龙椅来呗，还送货上门，包安装！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838027322475.mp3"
  },
  "13": {
    "text": "这么搞，咱爷爷有活着的风险吗......",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837628657664.mp3"
  },
  "14": {
    "text": "嗝～爷爷，待会刘邦敬酒的时候，你直接给他使绊子，让他把酒泼项羽脸上，项羽他包生气的～",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838027322491.mp3"
  },
  "17": {
    "text": "就按G孙说的来！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837624783875.mp3"
  },
  "18": {
    "text": "将军，您也得体谅沛公的难处！您在巨鹿不过是九死一生，沛公在关中，可是一句句家人们没少喊啊！我这有金嗓子你要不？",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838027324507.mp3"
  },
  "19": {
    "text": "天大的冤枉啊！将军负责打江山，我负责喊家人们，呃，替将军守！江！山！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838026801200.mp3"
  },
  "21": {
    "text": "坏了，上次就是这个项伯替刘邦挡剑，你们三个娃，赶紧想想办法把他支开！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838026802176.mp3"
  },
  "22": {
    "text": "这还不简单？让他去巡营呗～等他回来，刘邦都凉透了……唔爷爷，这肘子好吃！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837621018644.mp3"
  },
  "23": {
    "text": "项伯是项羽他亲叔，不让他搂席还把他调走，项羽能同意啊？干脆给他下泻药！蹿了就没力气跑了！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838027325467.mp3"
  },
  "24": {
    "text": "臣妾要告发项贵妃私通，秽乱后宫，罪不容诛！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838036984874.mp3"
  },
  "25": {
    "text": "宫规森严，G贵人不得信口雌黄！你既说项贵妃私通，那奸夫是谁？",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838030012538.mp3"
  },
  "28": {
    "text": "……你们仨能靠点谱吗？我选1。",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838036984890.mp3"
  },
  "29": {
    "text": "亚父好意，伯心领了！但今日宴上暗流涌动，我身为叔父，岂能离羽儿左右！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838041316393.mp3"
  },
  "30": {
    "text": "接着奏乐接着舞！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837713889384.mp3"
  },
  "34": {
    "text": "坏了！上次就是这个张良出去，摇来樊哙，才让刘邦逃过一劫！你们快想想办法！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881837624784915.mp3"
  },
  "35": {
    "text": "爷爷别慌！我有办法！樊哙这人贪吃，咱们给他上烤野猪，猪腿管够！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838036985994.mp3"
  },
  "36": {
    "text": "你脑子里除了吃还有别的吗？爷爷，张良这种老登，最吃酒桌文化这一套！咱们给他轮番敬酒，保证灌倒他！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838041317593.mp3"
  },
  "37": {
    "text": "张良被灌倒了，樊哙还在啊。依我看，直接把樊哙骗去隔壁，再把张良绑起来，双管齐下。",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838030015514.mp3"
  },
  "38": {
    "text": "G贵人，你好狠的心呐！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838041317625.mp3"
  },
  "40": {
    "text": "那就双管齐下！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838036986042.mp3"
  },
  "41": {
    "text": "子房啊～久仰大名，真是年轻有为！这杯我敬你！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838041039898.mp3"
  },
  "42": {
    "text": "亚父客气了，在下不胜酒力……",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838036986890.mp3"
  },
  "43": {
    "text": "不喝就是不给亚父面子！哈哈哈！感情深，一口闷，我干了，你随意！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838041041930.mp3"
  },
  "44": {
    "text": "嗝……不是我跟你吹啊！刘邦这个人，没、没我根本不行！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838036986906.mp3"
  },
  "46": {
    "text": "上一世，樊哙这人贪吃，一个猪腿不够，这次给他十头！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881838048796732.mp3"
  },
  "26": {
    "text": "关中王刘邦！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881841641127946.mp3"
  },
  "32": {
    "text": "我来！",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881841676548378.mp3"
  },
  "15": {
    "text": "要不然你就暗戳戳讽刺刘邦，劝项羽别计较了？",
    "src": "/spark/app/app_17j0zzk6e9p/runtime/api/v1/storage/object/bucket_aadk7aofpxyqw/1881841687177403.mp3"
  }
};
