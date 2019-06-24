var IMAGE_TITLES = [
  "001-big-ben",
  "002-sydney-opera-house",
  "003-pyramid",
  "004-pisa",
  "005-torii-gate",
  "006-hat",
  "007-car",
  "008-bike",
  "009-sail",
  "010-igloo",
  "011-headphones",
  "012-hat-1",
  "013-boat",
  "014-hotel",
  "015-polaroid",
  "016-camp",
  "017-postcard",
  "018-notebook",
  "019-sunglasses",
  "020-airplane",
];

var POSITIONS = [
  // 4
  {x: 180, y: 90},
  {x: 140, y: 130},
  {x: 110, y: 170},
  {x: 80, y: 210},
  {x: 60, y: 250},
  {x: 40, y: 290},
  {x: 20, y: 330},
  {x: 70, y: 330},
  {x: 120, y: 330},
  {x: 170, y: 330},
  {x: 220, y: 330},
  {x: 180, y: 290},
  {x: 180, y: 250},
  {x: 180, y: 210},
  {x: 180, y: 170},
  {x: 180, y: 130},
  {x: 175, y: 370},
  {x: 175, y: 410},
  // 0
  {x: 440, y: 100},
  {x: 400, y: 120},
  {x: 370, y: 140},
  {x: 360, y: 180},
  {x: 350, y: 220},
  {x: 350, y: 260},
  {x: 360, y: 300},
  {x: 370, y: 340},
  {x: 380, y: 380},
  {x: 400, y: 410},
  {x: 440, y: 420},
  {x: 480, y: 120},
  {x: 510, y: 140},
  {x: 520, y: 180},
  {x: 540, y: 220},
  {x: 540, y: 260},
  {x: 530, y: 300},
  {x: 520, y: 340},
  {x: 510, y: 380},
  {x: 490, y: 410},
  // 4
  {x: 800, y: 90},
  {x: 760, y: 130},
  {x: 730, y: 170},
  {x: 700, y: 210},
  {x: 680, y: 250},
  {x: 660, y: 290},
  {x: 640, y: 330},
  {x: 690, y: 330},
  {x: 740, y: 330},
  {x: 790, y: 330},
  {x: 840, y: 330},
  {x: 800, y: 290},
  {x: 800, y: 250},
  {x: 800, y: 210},
  {x: 800, y: 170},
  {x: 800, y: 130},
  {x: 795, y: 370},
  {x: 795, y: 410},
];

function getRandomImagePath() {
  var idx = Math.floor(Math.random() * IMAGE_TITLES.length);
  return "img/" + IMAGE_TITLES[idx] + ".svg";
}

function initImage(path, idx, pos) {
  $("<img>", {
    "class": "img img" + idx,
    src: path,
    height: "40px",
    width: "50px",
    border: "1px"
  })
  .css({
    position: "absolute",
    left: pos.x + "px",
    top: pos.y + "px"
  })
  .appendTo(".wrap");
}

function getRandomDistance() {
  return Math.random() * 100;
}

function getRandomScale() {
  return Math.random() * 2 + 1;
}

function makeTranformStr(x, y, s) {
  let transX = " translateX(" + x + "px)";
  let transY = " translateY(" + y + "px)";
  let scale = " scale(" + s + ")";

  return transX + transY + scale;
}

POSITIONS.forEach((pos, idx) => {
  initImage(getRandomImagePath(), idx, pos);
});

var remains = [];

$('img').each(function(idx) {
  let randX = getRandomDistance();
  let randY = getRandomDistance();
  let randS = getRandomScale();

  remains.push({
    x: randX,
    y: randY,
    s: randS
  });

  $(this).css({
    transform: makeTranformStr(randX, randY, randS)
  });
});

printRemain();

function printRemain() {
  for (var i = 0 ; i < remains.length; i++) {
    console.log(remains[i]);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  let toContinue = true;
  while(toContinue) {
    $('img.img0 img.img1').each(idx => {
      if (remains[idx].x > 0) {
        remains[idx].x -= 0.1;
      }
      if (remains[idx].y > 0) {
        remains[idx].y -= 0.1;
      }
      if (remains[idx].s > 0) {
        remains[idx].s -= 0.1;
      }
      let transStr = makeTranformStr(remains[idx].x, remains[idx].y, remains[idx].s);
      console.log("reduce " + $(this).attr('class'));
      console.log(transStr);
      $(this).css({
        transform: transStr
      });
    });
    let i = 0;
    for (; i < remains.length; i++) {
      if (remains[i].x > 0 || remains[i].y > 0 || remains[i].s > 0) {
        console.log("not all zero")
        break;
      }
    }
    if (i == remains.length) {
      console.log("jump out")
      toContinue = false;
    }
    await sleep(10);
  }
}

$('button').click(function() {
  main();
});