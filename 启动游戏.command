#!/bin/zsh
cd "${0:A:h}/游戏源码" || exit 1
if /usr/bin/curl -fsS http://127.0.0.1:8765/ >/dev/null 2>&1; then
  echo '8765 端口已有服务，请确认打开的是《重生鸿门宴》。'
  open http://127.0.0.1:8765/
else
  echo '正在启动《重生鸿门宴》：http://127.0.0.1:8765/'
  echo '保持此窗口打开；关闭窗口即可停止本地服务。'
  (sleep 1; open http://127.0.0.1:8765/) &
  python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
fi
