var canvas,
  ctx,
  flag = false,
  prevX = 0,
  prevY = 0,
  currX = 0,
  currY = 0,
  dot_flag = false;
var toggle = false;

var drawingWidth = 2;
var erasingWidth = 14;

var x = "black";
var y = drawingWidth;

function setup() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  $("#instructions").on("mouseover", function () {
    $(this).text("Hit spacebar to toggle.");
  });

  $("canvas")
    .on("mousemove", function (e) {
      findxy("move", e);
    })
    .on("mouseout", function (e) {
      findxy("out", e);
      $("#instructions")
        .text("Mouse your cursor over this canvas:")
        .css("font-weight", "normal");
    })
    .on("mouseover", function (e) {
      canvas.focus();
      $("#instructions").text("Hit spacebar to toggle.");
    })
    .on("keyup", function (e) {
      if (hitToggleKey(e)) {
        toggle = !toggle;
      }
      toggleDrawing(e);
    });

  $(".color")
    .on("mouseover", function () {
      $(this).focus();
    })
    .on("keyup", function (e) {
      if (hitToggleKey(e)) {
        color(e.target);
      }
    })
    .on("click", function (e) {
      color(e.target);
    });

  $("#clear")
    .on("mouseover", function () {
      $(this).focus();
    })
    .on("keyup", function (e) {
      if (hitToggleKey(e)) {
        erase();
      }
    })
    .on("click", function (e) {
      erase();
    });

  $("#download")
    .on("mouseover", function () {
      $(this).focus();
    })
    .on("keyup", function (e) {
      if (hitToggleKey(e)) {
        download();
      }
    })
    .on("click", function () {
      download();
    });
}

function hitToggleKey(e) {
  var keyCode = e.which || event.keyCode;
  var hitCommand = keyCode === 224;
  var hitEnter = keyCode === 13;
  var hitControl = keyCode === 17;
  var hitSpacebar = keyCode === 32;
  return hitCommand || hitEnter || hitControl || hitSpacebar;
}

function toggleDrawing(e) {
  if (toggle) {
    findxy("down", e);
    $("#instructions").text("Move mouse to draw.").css("font-weight", "bold");
  } else {
    findxy("up", e);
    $("#instructions")
      .text("Hit spacebar to toggle.")
      .css("font-weight", "normal");
  }
}

function color(e) {
  x = e.id;
  var isClearing = x == "white";
  y = isClearing ? erasingWidth : drawingWidth;
  $("#instructions").css("border-color", x);
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

function erase() {
  ctx.clearRect(0, 0, w, h);
  document.getElementById("canvasimg").style.display = "none";

  // you don't need to draw white if you already cleared the board:
  x = x === "white" ? "black" : x;
  y = drawingWidth;
  $("#instructions").css("border-color", x);
}

function download() {
  var fileName = "drawing-" + getTimestampString() + ".png";
  var link = document.getElementById("download-helper-link");
  link.setAttribute("download", fileName);
  link.setAttribute(
    "href",
    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
  link.click();
}

function findxy(res, e) {
  if (res == "down") {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == "up" || res == "out") {
    flag = false;
  }
  if (res == "move") {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw();
    }
  }
}

function getTimestampString() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    year + "_" + month + "_" + day + "_" + hour + "_" + minute + "_" + second
  );
}
