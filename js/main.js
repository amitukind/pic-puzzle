var config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('tiger', 'images/Tiger.png');
  this.load.image('bl', 'images/reveal_bottomleft.png');
  this.load.image('br', 'images/reveal_bottomright.png');
  this.load.image('tl', 'images/reveal_topleft.png');
  this.load.image('tr', 'images/reveal_topright.png');
}

function create() {
  this.cameras.main.backgroundColor.setTo(255,255,255);
  this.add.image(270, 480, 'tiger');
  this.add.image(270-50, 480+50, 'tl');
  this.add.image(270+50, 480+50, 'tr');
  this.add.image(270+50, 480-50, 'bl');
  this.add.image(270-50, 480-50, 'br');

}

function update() { }
