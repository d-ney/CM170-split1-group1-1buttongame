title = `Skate 4`;

description = `
    [HOLD] to
  perform tricks!
`;

characters = [
// SKATEBOARD TOP
`
lrrrrl
lrrrrl
 rrrr 
 rrrr 
 rrrr 
 rrrr
`,

`
 rrrr 
 rrrr 
 rrrr 
 rrrr 
lrrrrl
lrrrrl
`,

`
bbbbbb
bbbbbb
bbbbbb
bbbbbb
 bbbb
  bb
`,

`
llyr
llyr
  yr
  yr
  yr
  yr
`,

`
  yr
  yr
  yr
  yr
llyr
llyr
`,

`
lrrl
 rr
 rr
`,
`
 rr
 rr
lrrl
`,

`
  ryll
  ryll
  ry
  ry
  ry
  ry
`,

`
  ry
  ry
  ry
  ry
  ryll
  ryll
`,
`
lyyyyl
lyyyyl
 yyyy 
 yyyy 
 yyyy 
 yyyy
`,

`
 yyyy 
 yyyy 
 yyyy 
 yyyy 
lyyyyl
lyyyyl
`
];

const G = {
  WIDTH: 100,
  HEIGHT: 100,

  JUMP_HEIGHT: 6.2,
  SPEED: 1,
  RAMP_COOLDOWN: 200
};

options = {
  theme: 'simple',
  isPlayingBgm: true,
  seed:1124, //4,7,9,11,65, 1124
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/** @typedef {{pos: Vector, cooldown: number, inAir: boolean, airTime: number}} Player */
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

let tempTicks;
let rightSideUp;
let upsideDown;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5 + 20),
      cooldown: G.RAMP_COOLDOWN,
      inAir: false,
      airTime: G.JUMP_HEIGHT * 10
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
    tempTicks = 0;
    rightSideUp = false;
    upsideDown = false;
  }
  player.cooldown --;
  Pit.cooldown --;
  text("Pit: " + Pit.cooldown.toString(), 4, 30);

  if(Ramps.length == 0)
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

  if(input.isJustPressed) {
    player.inAir = true;
    if (char("f", player.pos).isColliding.char.c) {
      addScore(10);
    }
  }
  if(player.inAir) {
    player.airTime--;
  }

  if(player.airTime <= 0) {
    player.inAir = false;
    player.airTime = G.JUMP_HEIGHT * 10;
  }


  // Drawing double sprites
  player.pos = vec(input.pos.x, player.pos.y);
  playerSprite.pos = vec(input.pos.x, player.pos.y + 2);
  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  playerSprite.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
  color('black');
  if(!player.inAir) {
    if(char("f", player.pos).isColliding.rect.black)
      end("Try again!");
    char("g", playerSprite.pos);
    rightSideUp = false;
    upsideDown = false;
    tempTicks = 0;
  }
  else {
    jumpAnimation();
  }

  function jumpAnimation(){
    playerSprite.pos = vec(input.pos.x, player.pos.y + 6);
    console.log(tempTicks);
    tempTicks += 0.4;
    if(tempTicks > 10){
      tempTicks = 0;
      rightSideUp = !rightSideUp;
      upsideDown = !upsideDown
    }
    else if (tempTicks < 5 && !upsideDown){
      char("a", vec(player.pos.x, player.pos.y)); 
      char("b", playerSprite.pos);
    }else if(tempTicks < 5 && upsideDown){
      char("j", vec(player.pos.x, player.pos.y)); 
      char("k", playerSprite.pos);
    }else if (tempTicks < 10 && !rightSideUp){
      char("d", vec(player.pos.x, player.pos.y)); 
      char("e", playerSprite.pos);
    }else if (tempTicks < 10){
      char("h", vec(player.pos.x, player.pos.y)); 
      char("i", playerSprite.pos);
    }
  }

  // if(char("a", player.pos).isColliding.rect.black)
  //   end("Try again!");


}

