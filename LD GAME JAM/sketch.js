let playerimage;
let bulletpic;
let potpic;
let waterpic;
let droplets = [];
let dropsheet;
let flysheet;
let flies = [];
let goliathsheet;
let goliaths1 = [];
let goliaths2 = [];
let ammopic;
let petalsheet;
let petals = [];
let flowerpic;
let stempic;

let instructions;
let winpic;
let losepic;

let beats;

function preload() {
    
    playerimage = loadImage("Images/Player.png");
    bulletpic = loadImage("Images/Bullet.png");
    potpic = loadImage("Images/Pot.png");
    ammopic = loadImage("Images/Ammo.png");
    flowerpic = loadImage("Images/Flower.png");
    stempic = loadImage("Images/Stem.png");
    
    dropsheet = loadImage("Images/dropletsheet.png");
    flysheet = loadImage("Images/Flies.png");
    goliathsheet = loadImage("Images/Goliath.png");
    petalsheet = loadImage("Images/Petals.png");
    
    instructions = loadImage("Images/Instructions.png");
    winpic = loadImage("Images/win.png");
    losepic = loadImage("Images/lose.png");
    
    beats = loadSound('beats.wav');

}




const bigx = 1200;
const bigy = 1200;
let screenpos;



let player;
let flower;
let can;
let bullets = [];
let enemies = [];
let g;
let ammo;
let carryingwater = false;

function setup() {
    createCanvas(windowWidth-32, windowHeight-32);
    textSize(30);
    frameRate(30);
    
    ammo = new Ammo(createVector(bigx/2, bigy/2 + 50), 100);
    
    screenpos = createVector(bigx/2 - width/2, bigy/2 - height/2);
    player = new Player();
    flower = new Flower();
    can = new Can();
    
    g = new Goliath(-1);

    for (let i=0; i<5; i++) {
        enemies.push(new Enemy);
    }
    
    for (let i=0; i<4; i++) {
        droplets[i] = dropsheet.get(32*i, 0, 32, 32);
    }
    for (let i=0; i<2; i++) {
        flies[i] = flysheet.get(12*i, 0, 12, 12);
    }
    for (let i=0; i<2; i++) {
        goliaths1[i] = goliathsheet.get(0, 32*i, 64, 32);
    }
    for (let i=0; i<2; i++) {
        goliaths2[i] = goliathsheet.get(64, 32*i, 64, 32);
    }
    for (let i=0; i<2; i++) {
        petals[i] = petalsheet.get(32*i, 0, 32, 32);
    }
}

function draw() {
    if (frameCount < 950) {
        cutscenes();
    } else if (flower.imgpos < -200) {
        win();
    } else if (flower.hp <= 0) {
        lose();
    } else {
    background(50);
    
    if (frameCount == 1000) {
        beats.loop();
    }    
        
    screenpos = createVector(player.pos.x-width/2, player.pos.y-height/2);
    
    flower.show();
    flower.update(enemies);
    can.show();
    can.hydrate(flower);
    carryWater();
    
    player.update(plyrMovement());
    player.show();
    if (ammo) {
        ammo.show();
        ammo.collect(player.pos);
    }
    
    g.update();
    g.show();
    for (let e=enemies.length-1; e > 0; e--) {
        enemies[e].update(p5.Vector.add(flower.pos, createVector(0, flower.imgpos)));
        enemies[e].show();
        
        if (enemies[e].hp <= 0) {
            enemies[e] = new Enemy();
        }
    }
    
    for (let i=bullets.length-1; i > 0; i--) {
        bullets[i].update();
        bullets[i].show();
        
        if (bullets[i].hit(enemies) || g.hit(bullets[i])) {
            bullets.splice(i, 1);
        }
    }
    
    if (frameCount % 1200 == 0) {
        enemies.push(new Enemy());
    }
    if (frameCount % 40 == 0) {
        flower.grow();
    }
    fill(200);
        textSize(40);
    text(`Ammo: ${floor(player.ammo)}`, 10, 30);
    }
}

function carryWater() {
    
    if (mouseIsPressed) {
        if (dist(can.pos.x, can.pos.y, player.pos.x, player.pos.y)<64){
            can.pos = player.pos.copy();
            can.pos.sub(player.dir.copy().mult(32).rotate(-PI/2));
            carryingwater = true;
        } else if (carryingwater){
            can.resetting = true;
            carryingwater = false;
        } else {
        carryingwater = false;
        }
    }
}

function mousePressed() {
    
    if (player.ammo >= 1) {
        if (!carryingwater) {
            bullets.push(new Bullet(player.pos.copy().add(player.dir.copy().mult(16).rotate(PI/2)), player.dir.copy().mult(5)));
            player.ammo --;
        }
    } else {
        fill(255, 0, 0);
    }
    
}

function plyrMovement() {
    
    let d = [0, 0];
    
    //W
    if (keyIsDown(87)) {
        d[1] = -1;
    //S
    } else if (keyIsDown(83)) {
        d[1] = 1;
    }
    //A
    if (keyIsDown(65)) {
        d[0] = -1;
    //D
    } else if (keyIsDown(68)) {
        d[0] = 1;
    }
    return d;
}

//CAMERA BASED STUFF
function screenTranslate(realx, realy) {
    let scry = screenpos.y;
    let scrx = screenpos.x;
    
    translate(realx-scrx, realy-scry);
}

function withinScreen(x, y) {
    return x > screenpos.x && x < screenpos.x+width && y > screenpos.y && y < screenpos.y+height
} 




function win() {
    clear();
    background(100);
    image(winpic, 0, 0, width, height);
    noLoop();
}

function lose(dehydration) {
    clear();
    background(100);
    image(losepic, 0, 0, width, height);
    fill(255, 50, 50);

    noLoop();
}

function cutscenes() {
    background(100, 40);
    if (frameCount < 9750) {
        image(instructions, 0, 0, width, height);
    }
}