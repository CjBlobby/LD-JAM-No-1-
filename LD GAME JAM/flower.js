class Flower {
    
    constructor() {
        this.pos = createVector(bigx/2, 2*bigy/3);
        
        this.hp = 6;
        this.water = 100;
        
        this.petals = [];
        for (let p=0; p<6; p++) {
            this.petals.push(new Petal(p, this, 32));
        }
        this.size = 32;
        this.imgpos = 0;
    }
    
    show() {
        for (let p of this.petals) {
            p.show();
        }
        
            push();
            screenTranslate(this.pos.x, this.pos.y);
            
            //STEM
            image(stempic, -32, this.imgpos, 64, 128 - this.imgpos);
            
            //HEAD
            imageMode(CENTER);
            image(flowerpic, 0, this.imgpos, this.size*2, this.size*2);
            
            imageMode(CORNER);
            //POT
            image(potpic, -100, 128);
            //WATER METER
            fill(0, 0, 255);
            rect(-50, 136, this.water, 24);
            fill(0, 100, 255);
            textSize(20);
            text("WATER", -40, 154);
        
            text("<=Kill Goliaths=>\n\t   for ammo", -74, 240);
            
            pop();
    }
    
    update(enemies) {
        
        for (let e of enemies) {
            //BASIC COLLISION
            if (e.pos.x >this.pos.x-32 && e.pos.x <this.pos.x+32 &&
               e.pos.y >this.pos.y+this.imgpos-32 && e.pos.y <this.pos.y+this.imgpos+32) {
                this.hp -= 0.004;
            }
        }
        
        if (this.hp < this.petals.length-1) {
            this.petals.splice(0, 1);
        }
        this.water -= 0.05;
        
        if (this.water < 0) {
            lose(true);
        }
    }
    
    grow() {
        this.size += 0.5;
        this.imgpos --;
        for (let p=0; p<this.hp; p++) {
            this.petals[p] = new Petal(p, this, this.size);
        }
    }
    
}

class Petal {
    
    constructor(n, flower, size) {
        this.pos = flower.pos.copy();
        this.pos.sub(createVector(0,-flower.imgpos));
        let ang = map(n, 0, 6, 0, TWO_PI);
        this.direction = createVector(0, 5*size/4).rotate(ang);
        this.pos.add(this.direction);
        this.size = size;
        this.img = floor(random(2));
    }
    
    show() {
    
            push();
            fill(255, 0, 0);
            screenTranslate(this.pos.x, this.pos.y);
            rotate(this.direction.heading()+PI/2);
            image(petals[this.img], -16, -20, this.size, this.size);
            pop();
        }           
    
    
}

class Can {
    
    constructor() {
        
        this.pos = createVector(random(bigx), random(bigy));
        this.animationcount = 0;
        this.resetting = false;
        
    }
    
    show() {
        
        push();
        screenTranslate(this.pos.x, this.pos.y);
        image(droplets[floor(this.animationcount)], -20, -20, 40, 40);//droplets[floor(this.animationcount)], 0, 0);
        pop();
        this.animationcount += 0.1;
        
        if (this.animationcount >= 2 && !this.resetting) {
            this.animationcount = 0;
        }
        if (this.resetting && this.animationcount >= 4) {
            can = new Can();
        }
        
    }
    
    
    hydrate(flower) {
        let dsq = (this.pos.x - flower.pos.x)**2 + (this.pos.y - flower.pos.y-flower.imgpos)**2
        if (dsq < (flower.size)**2) {
            flower.water = 100;
            this.resetting = true;
            if (this.animationcount>3.8) {
                for (let e of enemies) {
                    e.vel.setMag(10);
                }
            }
        }
    }
    
}




