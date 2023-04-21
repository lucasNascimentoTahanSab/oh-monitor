let contentInitialHeight = null;
let contentInitialPosition = null;
let mouseInitialPosition = null;
let body = null;

export default function resize(event, current) {
  event.preventDefault();

  if (!current) { return; }

  body = current;

  setContentPosition();
  setContentInitialHeight();
  setContentMousePosition(event);

  window.addEventListener('mousemove', handleResizerMouseMove);
  window.addEventListener('mouseup', handleResizerMouseUp);
}

function handleResizerMouseUp() {
  window.removeEventListener('mousemove', handleResizerMouseMove);
}

function handleResizerMouseMove(event) {
  event.preventDefault();

  body.style.height = `${contentInitialHeight - (event.pageY - mouseInitialPosition)}px`;
  body.style.top = `${contentInitialPosition + (event.pageY - mouseInitialPosition)}px`;
}

function setContentMousePosition(event) {
  mouseInitialPosition = event.pageY;
}

function setContentInitialHeight() {
  contentInitialHeight = body?.offsetHeight;
}

function setContentPosition() {
  const contentBoundaries = body?.getBoundingClientRect();

  contentInitialPosition = contentBoundaries.top;
}