javascript: (function () {
  var isDrawing = false;
  var drawingElement = document.querySelector("#jam-body .jam-drawing-element");
  var iframe = document
    .querySelector(".docs-texteventtarget-iframe")
    .contentWindow.document.querySelector("body");
  var drawingButton = document.querySelector("#drawingButton");
  var previousButtonStyles = getPreviousStyles(drawingButton);
  var previousDrawingElementStyles = getPreviousStyles(drawingElement);

  alert(
    "To draw with just your mouse and keyboard: \n\n 1) click the drawing button, \n\n 2) click the canvas, and \n\n 3) hit a letter on the keyboard to toggle drawing on/off (spacebar/ctrl/cmd won't work)."
  );
  pointOutDrawingButtonAndDrawingElement();

  var clientX;
  var clientY;
  document.addEventListener("mousemove", function (event) {
    clientX = event.clientX;
    clientY = event.clientY;
  });

  iframe.addEventListener("keyup", function () {
    debounce(() => {
      isDrawing = !isDrawing;
      console.log(
        "keyup isDrawing",
        isDrawing,
        isDrawing ? "pointerdown" : "pointerup"
      );
      drawingElement.dispatchEvent(
        new PointerEvent(isDrawing ? "pointerdown" : "pointerup", {
          clientX: clientX,
          clientY: clientY,
        })
      );
    })();
  });

  drawingElement.addEventListener("mousemove", function (event) {
    event.preventDefault();
    if (isDrawing) {
      drawingElement.dispatchEvent(
        new PointerEvent("pointermove", { clientX: clientX, clientY: clientY })
      );
    }
  });

  function pointOutDrawingButtonAndDrawingElement() {
    drawingButton.style.outline = "3px solid black";
    drawingButton.style.background = "red";
    drawingButton.style.transform = "scale(2)";
    drawingButton.style.transition = "0.3s";

    setTimeout(() => {
      drawingButton.style.outline = previousButtonStyles.outline;
      drawingButton.style.background = previousButtonStyles.background;
      drawingButton.style.transform = previousButtonStyles.transform;
      drawingButton.style.transition = previousButtonStyles.transition;
    }, 3000);

    drawingButton.addEventListener("click", function () {
      drawingButton.style.outline = previousButtonStyles.outline;
      drawingButton.style.background = previousButtonStyles.background;
      drawingButton.style.transform = previousButtonStyles.transform;
      drawingButton.style.transition = previousButtonStyles.transition;
      console.log("Now click the canvas.");

      drawingElement.style.outline = "3px solid black";
      drawingElement.style.background = "red";
      drawingElement.style.transform = "scale(2)";
      drawingElement.style.transition = "0.3s";
      setTimeout(() => {
        drawingElement.style.outline = previousDrawingElementStyles.outline;
        drawingElement.style.background =
          previousDrawingElementStyles.background;
        drawingElement.style.transform = previousDrawingElementStyles.transform;
        drawingElement.style.transition =
          previousDrawingElementStyles.transition;
      }, 3000);
    });

    drawingElement.addEventListener("click", function () {
      drawingElement.style.outline = previousDrawingElementStyles.outline;
      drawingElement.style.background = previousDrawingElementStyles.background;
      drawingElement.style.transform = previousDrawingElementStyles.transform;
      drawingElement.style.transition = previousDrawingElementStyles.transition;
      console.log("Now type any letter to toggle drawing on/off.");

      isDrawing = false;
    });
  }

  function getPreviousStyles(
    element,
    stylesIUse = ["outline", "background", "transform", "transition"]
  ) {
    var previousStyles = {};
    stylesIUse.forEach((styleProperty) => {
      previousStyles[styleProperty] = element.style[styleProperty];
    });
    return previousStyles;
  }

  function debounce(theFunction, timeout = 100) {
    /**
     * usage:
     * const doSomethingDebounced = debounce(() => doSomething());
     * doSomethingDebounced();
     */
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        theFunction.apply(this, args);
      }, timeout);
    };
  }
})();
