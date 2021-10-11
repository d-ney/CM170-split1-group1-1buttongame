title = `Skate 4`;

description = `
    [HOLD] to
  perform tricks!
`;

characters = [
// SKATEBOARD TOP
`
llrrll
lrrrrl
 rLLr 
 rrrr 
 rrrr 
 rrrr
`,

`
 rrrr 
 rrrr 
 rrrr 
 rLLr 
lrrrrl
llrrll
`
];

const G = {
  WIDTH: 100,
  HEIGHT: 100,

  JUMP_HEIGHT: 4,
};

options = {
  theme: 'simple',
  isPlayingBgm: true,
  seed:1124, //4,7,9,11,65, 1124
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/** @typedef {{pos: Vector}} Player */
/** @type { Player } */
let player;

/** @typedef {{pos: Vector}} PlayerSprite */
/** @type { PlayerSprite } */
let playerSprite;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5 + 20),
    };
    playerSprite = {
      pos: vec(player.pos.x, player.pos.y + 6)
    }
  }

  // Drawing double sprites
  player.pos = vec(input.pos.x, player.pos.y);
  playerSprite.pos = vec(input.pos.x, player.pos.y + 6);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  playerSprite.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  color('black');
  char("a", player.pos);
  char("b", playerSprite.pos);
}

