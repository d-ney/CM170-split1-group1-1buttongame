// The title of the game to be displayed on the title screen
title  =  "proto";

// The description, which is also displayed on the title screen
description  =  `
`;

// The array of custom sprites
characters  = [
`
 l     l
  l   l
   lll
   lll
  l   l
 l     l
 
 
 `

];

//Game parameters
const G = {
	WIDTH: 300,
	HEIGHT: 150,
	POLE_SPEED: 0.5,
	MIN_POLE_HEIGHT: 5,
	MAX_POLE_HEIGHT: 40,
	POLE_COOLDOWN: 180,
	ROPE_SPEED_FACTOR: 2
};

// Game runtime options
// Refer to the official documentation for all available options
options  = {
	theme: "crt",
	viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

//////////STRUCTS///////////////

/**
* @typedef {{
	* pos: Vector,
	* speed: number,
	* length: number,
	* }} pole
	*/
	
	/**
	* @type  { pole [] }
	*/
	let poles;


	/**
 * @typedef {{
	 * pos: Vector,
	 * isFiring: boolean
	 * }} Player
	 */
	
	/**
	 * @type { Player }
	 */
	let player;

	/**
 * @typedef {{
	 * pos: Vector,
	 * size: number
	 * }} rope
	 */
	let rope;

		/**
 * @typedef {{
		 * pos: Vector,
		 * }} grapple
		 */
		let grapple;


	

// The game loop function
function  update() {
	// The init function
	if (!ticks) {

		var offset = 0;

		poles = times(6, () => {
			// Random number generator function
			// rnd( min, max )
			const posX = rnd(offset, offset + 25);
			const posY = rnd(0, 0);
			// An object of type Pole with appropriate properties

			offset += 65;
			return {
				// Creates a Vector
				pos: vec(posX, posY),
				// More RNG
				speed: G.POLE_SPEED,
				length: rndi(G.MIN_POLE_HEIGHT, G.MAX_POLE_HEIGHT),
				cooldown: G.POLE_COOLDOWN
			};
		});

		player = {
            pos: vec( 20 , G.HEIGHT - 10),
            isFiring: false
        };

		rope = {
			pos: player.pos,
			size: 5
		}

		grapple = {
			pos: vec( 20 , G.HEIGHT - 10)
		}

		var is_reeling = false;

	}

	//draw upper bounding box
	color("blue");
	rect(0, 0,  G.WIDTH, 5 );

	// Update poles' positions
    poles.forEach((p) => {
		
        p.pos.x -= p.speed;

		if (p.pos.x < 0) {p.pos.x = G.WIDTH + rndi(30, 80); p.length = (rndi(G.MIN_POLE_HEIGHT, G.MAX_POLE_HEIGHT));}
        // Choose a color to draw
        color("green");

        rect(p.pos.x, p.pos.y, 20, p.length);
		console.log(p.pos);


    });


	//update player position

	var first_hit = true;

	//drawing grapple

		if(input.isPressed){

			color("black");
			if(char("a", grapple.pos).isColliding.rect.green)
			 {
				is_reeling = true;
				line(rope.pos.x, rope.pos.y, grapple.pos.x, grapple.pos.y, 2);
			
				// 	color("black");
			// 	//char("a", grapple.pos);
			 	play("hit");
			// 	console.log("hit");
			// 	//player.pos.x += (G.ROPE_SPEED_FACTOR * 5);
				poles.forEach(p => {
					p.pos.x -= (G.ROPE_SPEED_FACTOR);
				});
				 player.pos.x += (G.ROPE_SPEED_FACTOR);
				 player.pos.y -= (G.ROPE_SPEED_FACTOR);
				 rope.pos.x += (G.ROPE_SPEED_FACTOR);
				 rope.pos.y -= (G.ROPE_SPEED_FACTOR);
				 
				 grapple.pos.x -= G.ROPE_SPEED_FACTOR + G.POLE_SPEED;
			// 	 //rope.pos = player.pos;
			// 	 first_hit = false;
			// 	//char("a", player.pos.x + rope.size, player.pos.y - rope.size).isColliding.rect.light_black
			 } else if (char(("a"), grapple.pos).isColliding.rect.blue)
			 {
				grapple.pos.x = player.pos.x;
				grapple.pos.y = player.pos.y;
				rope.size = G.ROPE_SPEED_FACTOR;
			 }

			 if(!is_reeling){
				color("black");
				//line(rope.pos.x, rope.pos.y, player.pos.x + rope.size, player.pos.y - rope.size, 2);
				rope.size += G.ROPE_SPEED_FACTOR * 2;
				grapple.pos.x += G.ROPE_SPEED_FACTOR * 2;
				grapple.pos.y -= G.ROPE_SPEED_FACTOR * 2;
				grapple.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
				console.log(grapple.pos);
			}



		
		}

		if(!input.isPressed){
			rope.size = G.ROPE_SPEED_FACTOR;
		grapple.pos.x = player.pos.x;
		grapple.pos.y = player.pos.y;
		is_reeling = false;
}
		color("cyan");

	if(player.pos.y < G.HEIGHT)
		player.pos.y += 2;
	if(player.pos.x > 20)
		player.pos.x -= 2;
	
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	box(player.pos, 5);

}