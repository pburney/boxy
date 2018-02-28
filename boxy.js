/**
 * This is the main code for Boxy 0.1
 *
 * The cool box dragging app
 *
 * @author  Paul Burney <pburney@gmail.com>
 */

// We'll just have one global object to not pollute the namespace too much
// We're going old school here a bit, get ready for a blast from the past!
const CC = window.CC || {};

// These variables are going to be used throughout so we want to just have one reference for them
CC.canvas = document.getElementById('boxy');
CC.context = CC.canvas.getContext('2d');
CC.defaultSideLength = 25;
CC.possibleColors = ['red','orange','yellow','black','white','gray','blue','purple','cyan','magenta'];

// Currently, and this is ugly, we are only supporting one box and keeping its coordinates and the cursor coordinates in the state
CC.boxCoordinates = {
  topLeft: {x: 0, y: 0},
  topRight: {x: 0, y: 0},
  bottomLeft: {x: 0, y: 0},
  bottomRight: {x: 0, y: 0}
};

CC.cursorCoordinates = {
  x: 0,
  y: 0
};

CC.boxSideLength = 0;
CC.isBoxClicked = false;

// We are going to use this interval to call the render method repeatedly while dragging
CC.renderInterval = null;

// This is the time in milliseconds that we re-render our canvas. Smaller is better but requires more resources
CC.renderTimestep = 10;

/**
 * This method adds a box of a given side length to the center of the canvas
 *
 * @param int sideLength The length of the side of the box we are adding
 */
CC.addBox = function(sideLength) {
  CC.boxSideLength = !sideLength ? CC.defaultSideLength : sideLength;
  CC.setBoxCoordinatesRelativeToPoint(CC.getCenter());
  CC.changeColor();
  CC.renderBox();
};

/**
 * This method returns the center of the canvas for use in placing boxes
 *
 * @return point a point object with an x and y property
 */
CC.getCenter = function() {
  const width = CC.canvas.offsetWidth;
  const height = CC.canvas.offsetHeight;
  let center = {x: Math.round(width/2), y: Math.round(height/2)};
  return center;
};

/**
 * This method is similar to the above, but we use a general window event to get the mouse coordinates
 *
 * @param JSEvent event the standard DOM Event
 */
CC.setCursorCoordinates = function(event) {
  CC.cursorCoordinates.x = event.pageX - event.target.offsetLeft;
  CC.cursorCoordinates.y = event.pageY - event.target.offsetTop;
};

/**
 * This is a collision detection function the sets the isBoxClicked state if the box is being clicked
 */
CC.setIsBoxClicked = function() {
  // If the both the x and y click coordinates are in the box coordinates, we are clicked
  CC.isBoxClicked = (
    CC.cursorCoordinates.x >= CC.boxCoordinates.topLeft.x &&
    CC.cursorCoordinates.x <= CC.boxCoordinates.bottomRight.x &&
    CC.cursorCoordinates.y >= CC.boxCoordinates.topLeft.y &&
    CC.cursorCoordinates.y <= CC.boxCoordinates.bottomRight.y
  );
};

/**
 * We first set the state to see if the box has been clicked. If so, we can start our drag operation
 *
 * @return void
 */
CC.checkDrag = function() {
  CC.setIsBoxClicked();
  if (CC.isBoxClicked) {
    CC.startDrag();
  }
};

/**
 * Theis method starts the drag operation using a setInterval to re-render the box at the cursor
 *
 * @return void
 */
CC.startDrag = function() {
  // We do it once first to avoid the user's perceived delay
  CC.renderBoxAtCursor();
  CC.renderInterval = window.setInterval(
    CC.renderBoxAtCursor,
    CC.renderTimestep
  );
};

/**
 * We only stop the drag if the box had been clicked in the first place. We also clear the interval to stop
 * automatically updating the canvas. Color change adds pizazz
 *
 * @return void
 */
CC.stopDrag = function() {
  if (CC.isBoxClicked) {
    window.clearInterval(CC.renderInterval);
    CC.isBoxClicked = false;
    CC.changeColor();
  }
  CC.renderBox();
};

/**
 * This is the main function that renders the box on the page
 *
 * @return void
 */
CC.renderBox = function() {
  CC.context.clearRect(0, 0, CC.canvas.width, CC.canvas.height);
  CC.context.fillRect(CC.boxCoordinates.topLeft.x, CC.boxCoordinates.topLeft.y, CC.boxSideLength, CC.boxSideLength);
};

/**
 * This method renders the box at the cursor
 *
 * @return void
 */
CC.renderBoxAtCursor = function() {
  CC.setBoxCoordinatesRelativeToPoint(CC.cursorCoordinates);
  CC.renderBox();
};

/**
 * This method adds some pizzazz to box rendering
 *
 * @return void
 */
CC.changeColor = function() {
  let randomIndex = Math.floor(Math.random() * Math.floor(CC.possibleColors.length));
  CC.context.fillStyle = CC.possibleColors[randomIndex];
};

/**
 * This method takes a given point (typically the cursor position or the center of the canvas) and sets the position of the box around it
 *
 * @param object point an object with an x and y property
 */
CC.setBoxCoordinatesRelativeToPoint = function(point) {
  let leftPosition = Math.round(point.x - CC.boxSideLength/2);
  let topPosition = Math.round(point.y - CC.boxSideLength/2);

  CC.boxCoordinates.topLeft = {x: leftPosition, y: topPosition};
  CC.boxCoordinates.topRight = {x: leftPosition + CC.boxSideLength, y: topPosition};
  CC.boxCoordinates.bottomLeft = {x: leftPosition, y: topPosition + CC.boxSideLength};
  CC.boxCoordinates.bottomRight = {x: leftPosition + CC.boxSideLength, y: topPosition + CC.boxSideLength};
};


// Page init code - don't have a nice event management system here, but we're the only thing happening now so we'll just do things on window load
window.onload = function() {

  document.getElementById('js-add').onclick = function() {
    CC.addBox(40);
  };

  let myBoxy = document.getElementById('boxy');

  myBoxy.onmousedown = function(event) {
    CC.checkDrag(event);
  };

  myBoxy.onmousemove = function(event) {
    CC.setCursorCoordinates(event);
  };

  // We want to account for the case that if the user releases the mouse button outside of the canvas we still turn off the dragging
  document.onmouseup = function() {
    CC.stopDrag();
  };

};
