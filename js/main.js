var config = {
  type: Phaser.AUTO,

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    width: 540,
    height: 960,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("tiger", "images/Tiger.png");
  this.load.image("bl", "images/reveal_bottomleft.png");
  this.load.image("br", "images/reveal_bottomright.png");
  this.load.image("tl", "images/reveal_topleft.png");
  this.load.image("tr", "images/reveal_topright.png");
}

function create() {
  this.cameras.main.backgroundColor.setTo(255, 255, 255);
  this.add.image(270, 480, "tiger").setDisplaySize(350, 350);
  var tl = this.add
    .image(270 - 87.5, 480 - 87.5, "tl")
    .setDisplaySize(175, 175);
  var tr = this.add
    .image(270 + 87.5, 480 - 87.5, "tr")
    .setDisplaySize(175, 175);
  var bl = this.add
    .image(270 - 87.5, 480 + 87.5, "bl")
    .setDisplaySize(175, 175);
  var br = this.add
    .image(270 + 87.5, 480 + 87.5, "br")
    .setDisplaySize(175, 175);
  tl.setInteractive();
  tr.setInteractive();
  bl.setInteractive();
  br.setInteractive();

  this.input.on("gameobjectdown", onObjectClicked);
}

function update() {}
function onObjectClicked(pointer, gameObject) {
  console.log(gameObject);
  this.scene.tweens.add({
    targets: gameObject,
    duration: 200,
    delay: 0,
    scale: 0,
    angle: 45,
    repeat: 0,
    yoyo: false,
  });
}
