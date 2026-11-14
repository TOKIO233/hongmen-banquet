import React from 'react';
import gameHtml from './game/index.html?raw';
import assets from './game/asset-map.js?raw';
import story from './game/story.js?raw';
import matting from './game/matting.js?raw';
import voice from './game/voice-lines.js?raw';
import poses from './game/pose-map.js?raw';
import game from './game/game.js?raw';

const scripts: Record<string, string> = {
  'asset-map.js': assets,
  'story.js': story,
  'matting.js': matting,
  'voice-lines.js': voice,
  'pose-map.js': poses,
  'game.js': game,
};
const gameDocument: string = gameHtml.replace(
  /<script src="([^"?]+)(?:\?[^\"]*)?"><\/script>/g,
  (_match: string, name: string) => `<script>${scripts[name] || ''}</script>`,
);

const RoutesComponent = () => (
  <iframe
    title="重生鸿门宴"
    srcDoc={gameDocument}
    style={{ width: '100vw', height: '100dvh', border: 0, display: 'block' }}
  />
);

export default RoutesComponent;
