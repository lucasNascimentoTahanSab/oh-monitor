let thumbInitialPosition = null;
let mouseInitialPosition = null;
let boxLeft = null;
let boxRight = null;
let thumbLeft = null;
let thumbRight = null;
let thumb = null;
let box = null;
let track = null;

export default function drag(event, thumbRef, boxRef, trackRef) {
  event.preventDefault();

  if (!thumbRef) { return; }
  if (!boxRef) { return; }

  thumb = thumbRef?.current;
  box = boxRef?.current;
  track = trackRef?.current;

  setMouseInitialPosition(event);
  setThumbBoundaries();
  setThumbInitialPosition();
  setBoxBoundaries();

  window.addEventListener('mousemove', handleResizerMouseMove);
  window.addEventListener('mouseup', handleResizerMouseUp);
}

function handleResizerMouseUp() {
  window.removeEventListener('mousemove', handleResizerMouseMove);
}

function handleResizerMouseMove(event) {
  event.preventDefault();

  const newThumbLeft = getThumbOriginalLeft() + getMouseShift(event);
  const ajustedThumbLeft = getAdjustedThumbLeft(newThumbLeft);
  const newTrackWidth = ajustedThumbLeft + (thumbLeft - thumbInitialPosition);

  thumb.style.left = `${ajustedThumbLeft}px`;
  track.style.width = `${newTrackWidth}px`;
}

function getAdjustedThumbLeft(newThumbLeft) {
  return newThumbLeft > (boxRight - boxLeft) ? boxRight - boxLeft
    : newThumbLeft < (thumbInitialPosition - thumbLeft) ? thumbInitialPosition - thumbLeft
      : newThumbLeft;
}

function getMouseShift(event) {
  return event.pageX - mouseInitialPosition;
}

function getThumbOriginalLeft() {
  return thumbInitialPosition;
}

function setBoxBoundaries() {
  const boxBoundaries = box.getBoundingClientRect();

  boxLeft = boxBoundaries.left - (thumbLeft - thumbInitialPosition);
  boxRight = boxBoundaries.right - (thumbRight - thumbInitialPosition);
}

function setThumbInitialPosition() {
  thumbInitialPosition = thumbLeft + ((thumbLeft - thumbRight) / 2);
}

function setThumbBoundaries() {
  const thumbBoundaries = thumb.getBoundingClientRect();

  thumbLeft = thumbBoundaries.left;
  thumbRight = thumbBoundaries.right;
}

function setMouseInitialPosition(event) {
  mouseInitialPosition = event.pageX;
}