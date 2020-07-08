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
var puzzle = ["TIGER", "TSIPGDER"]; //Puzzle Answer and Random Answers

var answerRow = [];
var answer = "";
var win = null;
var textOffset = { x: -13, y: -20 };

function preload() {
  console.log(this)

  //Placeholders
  this.load.image("top_placeholder", "images/TopPH.jpg");
  this.load.image("left_placeholder", "images/SidePH.jpg");
  this.load.image("right_placeholder", "images/SidePH.jpg");
  this.load.image("down_placeholder", "images/DownPH.jpg");

  //Background
  this.load.image("background", "images/bg.jpg");


  this.load.image("bl", "images/reveal_bottomleft.png");
  this.load.image("br", "images/reveal_bottomright.png");
  this.load.image("tl", "images/reveal_topleft.png");
  this.load.image("tr", "images/reveal_topright.png");

  this.load.image("tiger", "images/Tiger.png");

  this.load.image("blank_rectangle", "images/brect.png");
  this.load.image("filled_rectangle", "images/frect.png");

  this.load.image("win", "images/win.png");
}

function create() {

  this.cameras.main.backgroundColor.setTo(255, 255, 255);

  createStage(this);

  var tiger = this.add.image(270, 480 - 100, "tiger").setDisplaySize(350, 350).setAlpha(0);

  var tiles = [];
  tiles.push(
    this.add.image(270 - 87.5, 480 - 87.5 - 100, "tl").setDisplaySize(175, 175)
  );
  tiles.push(
    this.add.image(270 + 87.5, 480 - 87.5 - 100, "tr").setDisplaySize(175, 175)
  );
  tiles.push(
    this.add.image(270 - 87.5, 480 + 87.5 - 100, "bl").setDisplaySize(175, 175)
  );
  tiles.push(
    this.add.image(270 + 87.5, 480 + 87.5 - 100, "br").setDisplaySize(175, 175)
  );

  tiles.forEach((tile, i) => {
    tile.setScale(0);
    tile.setInteractive();
    this.tweens.add({
      targets: tile,
      duration: 100,
      delay: 500 + 100 * i,
      scale: 0.515,
      onComplete: function () {
        tiger.alpha = this.duration === 900 ? 1 : 0;

      },
    });
    console.log(tile)
  });



  for (let i = 0; i < 5; i++) {
    let blankBox = this.add.image(140 + 65 * i, 600, "blank_rectangle").setDisplaySize(60, 60);
    blankBox.tint = 0x008000;
    answerRow.push(
      blankBox
    )
  }

  var textStyle = {
    font: "bold 40px Arial",
    fill: "#fff",
    boundsAlignH: "center",
    boundsAlignV: "middle",
    align: "center",
  };

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      var option = this.add.image(240 - 65 + 65 * j, 670 + 65 * i, "filled_rectangle").setDisplaySize(60, 60);
      var optionText = this.add.text(240 - 65 + 65 * j + textOffset.x, 670 + 65 * i + textOffset.y, puzzle[1].charAt(j + (i * 4)), textStyle);
      option.optionText = optionText;
      option.character = puzzle[1].charAt(j + (i * 4));
      option.setInteractive();
    }
  }
  win = this.add.image(270, 960 + 90, "win");
  this.input.on("gameobjectdown", onObjectClicked);
}

//function to create and animate the essential scene objects.
function createStage(scene) {

  //Adding Placeholders
  scene.add.image(270, 45, "top_placeholder");
  scene.add.image(45, 480 - 100, "right_placeholder");
  scene.add.image(540 - 45, 480 - 100, "left_placeholder");
  scene.add.image(270, 960 - 90, "down_placeholder");

  //Adding and Animating grey background
  scene.tweens.add({
    targets: scene.add.image(-350, 480 - 100, "background").setDisplaySize(350, 350),
    duration: 500,
    delay: 0,
    x: 270,
    angle: 0,
    repeat: 0,
    yoyo: false,
  });

}
var counter = 0;
function update() { }
function onObjectClicked(pointer, gameObject) {
  if (gameObject.optionText) {
    console.log(gameObject.optionText)
    this.scene.tweens.add({
      targets: gameObject.optionText,
      duration: 200,
      x: answerRow[counter].x + textOffset.x,
      y: answerRow[counter++].y + textOffset.y,

      onUpdate: function () {

        gameObject.optionText.setColor("#008000");
      }

    });
    answer += gameObject.optionText._text;
    if (counter == 5) {
      if (answer === puzzle[0]) {
        win.scale = 0;
        this.scene.tweens.add({
          targets: win,
          duration: 800,
          delay: 0,
          y: 650,
          scale: 1,
          repeat: 0,
          yoyo: true,
          onComplete: function () {
            answer = "";
            counter = 0;
            this.parent.scene.scene.restart();
          }
        });
      }
      else {
        answer = "";
        counter = 0;
        this.scene.scene.restart();
      }
    }

  }
  else
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
