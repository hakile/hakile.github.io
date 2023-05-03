class IntroScene extends Phaser.Scene {
    constructor(){
        super("IntroScene");
    }
    preload(){
    }
    create(){
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0xFFF7F7, 1);
        this.graphics.fillRect(-25, -25, 850, 850);

        this.startText = this.add.text(0, 0, "Click to start", {font: "40px Courier New", color: "#000000"})
        this.startText.x = 400 - (0.5 * this.startText.width);
        this.startText.y = 225 - (0.5 * this.startText.height);
        this.input.once('pointerdown', function () {
            console.log("Start Scene1");
            this.scene.start('Scene1');
        }, this);
    }
}

class Scene1 extends Phaser.Scene {
    constructor(){
        super("Scene1")
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("cover", "cover.png");
        this.load.audio("music", "graysedit.mp3");
    }
    create(){
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xF9CB9C, 1);
        this.graphics.fillRect(-25, -25, 850, 500);

        this.coverImg = this.add.sprite(400, 225, 'cover');
        this.coverImg.displayWidth = 300;
        this.coverImg.displayHeight = 300;

        this.sound.pauseOnBlur = false;
        this.muzic = this.sound.add('music', { loop: true });
        this.muzic.play();
        
        this.input.once('pointerdown', function () {
            console.log("Fading audio");
            this.tweens.add({
                targets: this.muzic,
                volume: 0,
                duration: 500
            });
            this.tweens.add({
                targets: this.coverImg,
                y: -150,
                duration: 500,
                ease: 'Cubic.In'
            });
            this.time.addEvent({
                delay: 500,
                callback: ()=>{
                    console.log("Transition Scene1 to Scene2");
                    this.scene.start('Scene2');
                }
            });
        }, this);
    }
    update(){}
}

class Scene2 extends Phaser.Scene {
    constructor(){
        super("Scene2")
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("bedazzle", "dazzlebart.png");
        this.load.image("logotype", "logotype.png");
        this.load.image("screenfade", "screenfade.png");
        this.load.audio("recording", "New_Recording.mp3");
    }
    create(){
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0x0000FF, 1);
        this.graphics.fillRect(-25, -25, 850, 500);

        this.graphics.fillStyle(0xFF00FF, 1);
        this.graphics.fillTriangle(655, 30, 750, 130, 620, 150);

        this.guy = this.add.sprite(800, 450, 'bedazzle').setOrigin(1, 1);

        this.logo = this.add.sprite(140, 105, 'logotype');
        this.logo.displayWidth = 300;
        this.logo.displayHeight = 168.75;
        this.logo.rotation = -0.196;

        this.screenfade = this.add.sprite(400, 225, 'screenfade');
        this.screenfade.alpha = 0;

        this.sound.pauseOnBlur = false;
        this.kbsound = this.sound.add('recording', { loop: true });
        this.kbsound.play();

        this.input.once('pointerdown', function () {
            console.log("Fading audio");
            this.tweens.add({
                targets: this.kbsound,
                volume: 0,
                duration: 250
            });
            this.time.addEvent({
                delay: 250,
                callback: ()=>{
                    console.log("Fading to black");
                    this.tweens.add({
                        targets: this.screenfade,
                        alpha: 1,
                        duration: 500
                    });
                }
            });
            this.time.addEvent({
                delay: 750,
                callback: ()=>{
                    console.log("Transition Scene2 to Scene3");
                    this.scene.start('Scene3');
                }
            });
        }, this);
    }
}

class Scene3 extends Phaser.Scene {
    constructor(){
        super("Scene3")
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("screenfade", "screenfade.png");
    }
    create(){
        this.graphics = this.add.graphics();

        this.graphics.fillStyle(0xFFFFFF, 1);
        this.graphics.fillRect(75, 75, 125, 125);

        this.screenfade = this.add.sprite(400, 225, 'screenfade');

        this.mltext = this.add.text(400, -1000, 
`The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.

The 20 meter pacer test will begin in 30 seconds. Line up at the start.

The running speed starts slowly but gets faster each minute after you hear this signal.

A single lap should be completed every time you hear this sound.

Remember to run in a straight line and run as long as possible.

The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start.

On your mark.

Get ready!

Start.
`
        , {font: "20px Times New Roman", color: "#FFFFFF"});
        this.mltext.setWordWrapWidth(350);

        this.tweens.add({
            targets: this.mltext,
            y: 20,
            duration: 2500,
            ease: 'Bounce.Out'
        });

        this.time.addEvent({
            delay: 2500,
            callback: ()=>{
                this.tweens.add({
                    targets: this.mltext,
                    y: 430 - this.mltext.height,
                    duration: 3750,
                    ease: 'Cubic.InOut'
                })
            }
        });

        this.tweens.add({
            targets: this.screenfade,
            alpha: 0,
            duration: 500
        });

        this.input.once('pointerdown', function () {
            console.log("Cinematic finished");
            this.graphics.clear();
            this.graphics.fillStyle(0x404040, 1);
            this.graphics.fillRect(75, 75, 125, 125);
            this.endText = this.add.text(20, 0, "Cinematic finished!", {font: "20px Arial", color: "#FFFFFF"});
            this.endText.y = 580 - this.endText.height;
            this.mltext.setStyle({color: "#404040"});
            this.tweens.add({
                targets: this.endText,
                y: 430 - this.endText.height,
                duration: 625,
                ease: 'Back.out'
            });
        }, this);
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    backgroundColor: 0x000000,
    scene: [ IntroScene, Scene1, Scene2, Scene3 ],
}

let game = new Phaser.Game(config);