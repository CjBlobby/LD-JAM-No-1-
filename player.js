class Player {
    
    constructor() {
        this.pos = createVector(bigx/2, bigy/2);
        
        this.dir = createVector();
        this.speed = 4;
        this.ammo = 0;
    }
    
    update(direction) {
        let mpos = createVector(mouseX+screenpos.x, mouseY+screenpos.y);
        this.dir = p5.Vector.sub(mpos, this.pos).normalize().rotate(-PI/2);
        
        this.move(direction);
    }
    
    show() {
        push();
        
        screenTranslate(this.pos.x, this.pos.y);
        rotate(this.dir.heading()-PI);
        
        image(playerimage, -16, -16, 32, 32);
        
        pop();
        
        fill(0, 0, 255);
        this.toTarget(can.pos);
        fill(0, 255, 0);
        this.toTarget(flower.pos.copy().add(createVector(0, flower.imgpos)));
        
    }
    
    move(direction) {

        this.pos.x += direction[0]*this.speed;
        this.pos.y += direction[1]*this.speed;
        
    }
    
    toTarget(target) {
        let dirto = p5.Vector.sub(target, this.pos).normalize().rotate(-PI/2).mult(16);
        push();
        
        screenTranslate(this.pos.x, this.pos.y);
        rotate(dirto.heading());

        triangle(-16, 48, 0, 56, 16, 48);
        
        pop();
    }
    
    
}

class Bullet {
    
    constructor(pos, dir) {
        
        this.pos = pos;
        
        this.dir = dir.rotate(PI/2);
        
    }
    
    update() {
        this.pos.add(this.dir.copy().mult(2));
    }
    
    show() {
        
            push();
            
            screenTranslate(this.pos.x, this.pos.y);
            rotate(this.dir.heading()+PI/2);
            image(bulletpic, -2, 0);
            
            pop();
    }
    
    hit(enemies) {
        
        if (!withinScreen(this.pos.x, this.pos.y)) {
            return true;
        }
        
        //HIT CIRCULAR enemies
        for (let e of enemies) {
            let dsq = (this.pos.x - e.pos.x)**2 + (this.pos.y - e.pos.y)**2;
            if (dsq < e.r**2) {
                e.hp --;
                return true;
            }
        }

        
        return false;
    }
    
    
}


class Ammo {
    
    constructor(pos, amount) {
        this.pos = pos;
        this.amount = amount;
    }
    
    show() {
        
        push();
        screenTranslate(this.pos.x, this.pos.y);
        image(ammopic, -16, -16);
        
        pop();
    }
    
    collect(pos) {
        
        if (pos.x > this.pos.x-20 && pos.x < this.pos.x+20 &&
           pos.y > this.pos.y-20 && pos.y < this.pos.y+20) {
            player.ammo = this.amount;
            ammo = null;
        }
        
        
    }
}



