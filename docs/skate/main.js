title = `Skate 4`;

description = `
`;

characters = [
// SKATEBOARD
`
llrrll
lrrrrl
 rrrr 
 rrrr 
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

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH / 2, G.HEIGHT / 2),
    };
  }

  color('black');
  char("a", player.pos)
}
