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
`,

`
bbbbbb
bbbbbb
bbbbbb
bbbbbb
 bbbb
  bb
`,

];

const G = {
  WIDTH: 100,
  HEIGHT: 100,

  JUMP_HEIGHT: 4,
  SPEED: 1,
  RAMP_COOLDOWN: 200
};

options = {
  theme: 'simple',
  isPlayingBgm: true,
  seed:1124, //4,7,9,11,65, 1124
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/** @typedef {{pos: Vector, cooldown: number, inAir: boolean}} Player */
/** @type { Player } */
let player;

/** @typedef {{pos: Vector}} PlayerSprite */
/** @type { PlayerSprite } */
let playerSprite;

/** @typedef {{pos: Vector}} Ramp*/
/** @type {Ramp} */
let Ramp;

/**
* @type  { Ramp [] }
*/
let Ramps;

/** @typedef {{pos: Vector, size: number, cooldown: number}} Pit */
/** @type { Pit } */
let Pit;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5 + 20),
      cooldown: G.RAMP_COOLDOWN,
      inAir: false
    };
    playerSprite = {
      pos: vec(player.pos.x, player.pos.y + 6)
    }

    Ramps = times(3, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = 0;
      return{
        pos: vec(posX, posY)
      }
    });

    Pit = {
      pos: vec(0, 0),
      size: rndi (5, 10),
      cooldown: 200
    }
    
  }

  player.cooldown --;
  Pit.cooldown --;

  console.log(Pit.cooldown);
  if(Ramps.length === 0)
  {
    if(player.cooldown <= 0){
      for(var i = 0; i < rndi(3,7); i++)
      {
        Ramps.push({pos: vec(rnd(0, G.WIDTH), 0)});
      }
      player.cooldown = G.RAMP_COOLDOWN;
    }
  }

  if(Pit.cooldown < 0)
  {
    color("black");
    rect(Pit.pos, G.WIDTH, Pit.size);
    Pit.pos.y += G.SPEED;

    if(Pit.pos.y >= G.HEIGHT) {
      Pit.pos = vec(0,0);
      Pit.cooldown = rndi(100, 200);
    }

  }

  Ramps.forEach(r => {
    r.pos.y += G.SPEED;
    char("c", r.pos);
    // if(ramp_cooldown <= 0){
    //   ramp_cooldown = rndi(G.RAMP_COOLDOWN / 2, G.RAMP_COOLDOWN * 2);
    // }
    // else
    //   ramp_cooldown --;

    remove(Ramps, (r) => {
      return r.pos.y > G.HEIGHT;
    });
  });

  if(input.isPressed) {
    player.inAir = true;
  }

  if(input.isJustReleased) {
    player.inAir = false;
  }

  // Drawing double sprites
  player.pos = vec(input.pos.x, player.pos.y);
  playerSprite.pos = vec(input.pos.x, player.pos.y + 6);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  playerSprite.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  color('black');
  char("a", player.pos);
  char("b", playerSprite.pos);

  if(char("a", player.pos).isColliding.rect.black && !player.inAir)
    end("Try again!");


}

