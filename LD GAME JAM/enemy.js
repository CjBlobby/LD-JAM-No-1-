class Enemy {
    
    constructor() {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();
        
        if (floor(random(2)) == 0) {
            if (floor(random(2)) == 0) {
                this.pos.x = 0;
                this.pos.y = random(bigy);
            } else {
                this.pos.x = bigx;
                this.pos.y = random(bigy);
            }
        } else {
            if (floor(random(2)) == 0) {
                this.pos.x = random(bigx);
                this.pos.y = 0;
            } else {
                this.pos.x = random(bigx);
                this.pos.y = bigy;
            }           
        }
        
        this.maxSpeed = 1.5;
        
        this.hp = 1;
        this.r = 12;
    }
    
    update(target) {
        this.seek(target);
        //Jiggling = insect-like
        this.acc.add(p5.Vector.random2D().mult(0.25));
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    seek(target) {
        let des = p5.Vector.sub(target, this.pos).setMag(this.maxSpeed);
        let seek = p5.Vector.sub(des, this.vel).limit(0.05);//<== max-seek
        this.applyForce(seek);
    }
    
    applyForce(force) {
        this.acc.add(force);
    }
    
    show() {
        push();
        fill(55, 0, 0);
        screenTranslate(this.pos.x, this.pos.y);
        image(random(flies), -12, -12, 24, 24);
        pop();
    }
}

class Goliath {
    
    constructor(side) {
        
        this.side = side;
        if (this.side == -1){
            this.pos = createVector(510, 1164);
        } else {
            this.pos = createVector(690, 1164);
        }
        this.dir = [0, -1];
        this.vertical = 1;
        
        this.maxhp = random(10, 20);
        this.hp = this.maxhp;;
        this.speed = 0.25;
        this.ang = -PI/2;
        this.animcount = 0;
            
    }
    
    update() {
        this.pos.x += this.dir[0] * this.speed;
        this.pos.y += this.dir[1] * this.speed;
        this.path();
        
        
        if (this.pos.y < flower.pos.y + flower.imgpos) {
            flower.hp --;
        }
        
        if (this.hp < 0 || this.pos.y < 800) {
            
            ammo = new Ammo(this.pos, this.maxhp * 15);
            
            this.vertical = 1;
            this.maxhp += 5;
            this.hp = this.maxhp;
            this.dir = [0, -1];
            this.ang = -PI/2;
            this.side = -this.side;
            if (this.side == -1){
                this.pos = createVector(510, 1164);
            } else {
                this.pos = createVector(690, 1164);
            }
        }
        this.animcount += 0.02;
        if (this.animcount >= 2) {
            this.animcount = 0;
        }
    }
    
    show() {
        push();
        fill(0);
        screenTranslate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        rotate(this.ang);
        if (this.side > 0) {
            image(goliaths2[floor(this.animcount)], 0, 0, 64, 32);
        } else {
            image(goliaths1[floor(this.animcount)], 0, 0, 64, 32);
        }
        pop()
    }
    
    path() {
        //NO 1- UNDERSIDE OF LID
        if (this.pos.x == 510 && this.pos.y < 970 && this.pos.y > 965) {
            this.dir = [-1, 0];
            this.vertical = 0;
            this.ang = -PI/2;
        }
        if (this.pos.x == 690 && this.pos.y < 970 && this.pos.y > 965) {
            this.dir = [1, 0];
            this.vertical = 0;
            this.ang = 0;
        }
        //NO 2- SIDE OF LID
        if (this.pos.x < 500 && this.pos.y < 970 && this.pos.y > 965) {
            this.dir = [0, -1];
            this.vertical = 1;
            this.ang = -PI/2;
        }
        if (this.pos.x > 700 && this.pos.y < 970 && this.pos.y > 965) {
            this.dir = [0, -1];
            this.vertical = 1;
            this.ang = -PI/2;
        }
        //NO 3- TOP OF LID
        if (this.pos.x < 500 && this.pos.y < 928) {
            this.dir = [1, 0];
            this.vertical = 0;
            this.ang = 0;
        }
        if (this.pos.x > 700 && this.pos.y < 928) {
            this.dir = [-1, 0];
            this.vertical = 0;
            this.ang = PI;
        }
        //NO 4- STEM
        if (this.pos.x > 595 && this.pos.y < 928 && this.pos.x < 605) {
            this.dir = [0, -1];
            this.vertical = 1;
            this.ang = -PI/2;
        }
    }
    
    hit(bullet) {
        let w = 64 - 36*this.vertical;
        let h = 36 + 36*this.vertical;
        
        if (bullet.pos.x > this.pos.x-w/2 && bullet.pos.x < this.pos.x + w/2 &&
           bullet.pos.y > this.pos.y -h/2 && bullet.pos.y < this.pos.y + h/2) {
            this.hp -= 2;
            return true;
            
        }
        return false;
    }
    
}




