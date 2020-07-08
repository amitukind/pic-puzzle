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
  this.load.image("bg", "images/bg.jpg");
  this.load.image("bl", "images/reveal_bottomleft.png");
  this.load.image("br", "images/reveal_bottomright.png");
  this.load.image("tl", "images/reveal_topleft.png");
  this.load.image("tr", "images/reveal_topright.png");
  this.load.image("tph", "images/TopPH.jpg");
  this.load.image("sph", "images/SidePH.jpg");
  this.load.image("dph", "images/DownPH.jpg");
  this.load.image("brect", "images/brect.png");
  this.load.image("frect", "images/frect.png");
}

function create() {
  this.cameras.main.backgroundColor.setTo(255, 255, 255);
  this.add.image(270, 45, "tph");
  this.add.image(45, 480 - 100, "sph");
  this.add.image(540 - 45, 480 - 100, "sph");
  this.add.image(270, 960 - 90, "dph");
  var bg = this.add.image(-350, 480 - 100, "bg").setDisplaySize(350, 350);
  var tiger = this.add.image(270, 480 - 100, "tiger").setDisplaySize(350, 350);
  tiger.alpha = 0;
  var tl = this.add
    .image(270 - 87.5, 480 - 87.5 - 100, "tl")
    .setDisplaySize(175, 175);
  var tr = this.add
    .image(270 + 87.5, 480 - 87.5 - 100, "tr")
    .setDisplaySize(175, 175);
  var bl = this.add
    .image(270 - 87.5, 480 + 87.5 - 100, "bl")
    .setDisplaySize(175, 175);
  var br = this.add
    .image(270 + 87.5, 480 + 87.5 - 100, "br")
    .setDisplaySize(175, 175);
  tl.setScale(0);
  tr.setScale(0);
  bl.setScale(0);
  br.setScale(0);

  tl.setInteractive();
  tr.setInteractive();
  bl.setInteractive();
  br.setInteractive();
  this.tweens.add({
    targets: bg,
    duration: 500,
    delay: 0,
    x: 270,
    angle: 0,
    repeat: 0,
    yoyo: false,
  });
  this.tweens.add({
    targets: tl,
    duration: 10,
    delay: 500,
    scale: 0.515,
    angle: 0,
    repeat: 0,
    yoyo: false,
  });
  this.tweens.add({
    targets: tr,
    duration: 100,
    delay: 600,
    scale: 0.515,
    angle: 0,
    repeat: 0,
    yoyo: false,
  });
  this.tweens.add({
    targets: br,
    duration: 100,
    delay: 700,
    scale: 0.515,
    angle: 0,
    repeat: 0,
    yoyo: false,
  });
  this.tweens.add({
    targets: bl,
    duration: 100,
    delay: 800,
    scale: 0.515,
    angle: 0,
    repeat: 0,
    yoyo: false,
    onComplete: function () {
      tiger.alpha = 1;
    },
  });

  var temp = (this.add
    .image(270 - 130, 600, "brect")
    .setDisplaySize(60, 60).tint = 0x008000);
  this.add.image(270 - 65, 600, "brect").setDisplaySize(60, 60).tint = 0x008000;
  this.add.image(270, 600, "brect").setDisplaySize(60, 60).tint = 0x008000;
  this.add.image(270 + 65, 600, "brect").setDisplaySize(60, 60).tint = 0x008000;
  this.add
    .image(270 + 130, 600, "brect")
    .setDisplaySize(60, 60).tint = 0x008000;

  var temp2 = this.add.image(240 - 65, 670, "frect").setDisplaySize(60, 60);
  this.add.image(240, 670, "frect").setDisplaySize(60, 60);
  this.add.image(240 + 65, 670, "frect").setDisplaySize(60, 60);
  this.add.image(240 + 130, 670, "frect").setDisplaySize(60, 60);
  this.add.image(240 - 65, 670 + 65, "frect").setDisplaySize(60, 60);
  this.add.image(240, 670 + 65, "frect").setDisplaySize(60, 60);
  this.add.image(240 + 65, 670 + 65, "frect").setDisplaySize(60, 60);
  this.add.image(240 + 130, 670 + 65, "frect").setDisplaySize(60, 60);
  temp.tint = 0x008000;
  var style = {
    font: "bold 40px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    align: "center",
  };
  this.add.text(240 - 65 - 13, 670 - 20, "T", style);
  this.add.text(240 - 13, 670 - 20, "S", style);
  this.add.text(240 + 65 - 13, 670 - 20, "I", style);
  this.add.text(240 + 130 - 13, 670 - 20, "P", style);
  this.add.text(240 - 65 - 13, 670 + 65 - 20, "G", style);
  this.add.text(240 - 13, 670 + 65 - 20, "D", style);
  this.add.text(240 + 65 - 13, 670 + 65 - 20, "E", style);
  this.add.text(240 + 130 - 13, 670 + 65 - 20, "R", style);
  this.input.on("gameobjectdown", onObjectClicked);
}

function update() {}
function onObjectClicked(pointer, gameObject) {
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
