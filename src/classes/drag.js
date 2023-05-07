let childInitialLeft = null;
let childInitialTop = null;
let mouseInitialX = null;
let mouseInitialY = null;
let deltaX = null;
let deltaY = null;
let parent = null;
let child = null;

export default function dragScreen(event, current, screen) {
  event.preventDefault();

  if (!current) { return; }

  parent = current;
  child = screen;

  setChildInitialPosition();
  setMouseInitialPosition(event);

  parent.addEventListener('mousemove', handleScreenDraggerMouseMove);
  parent.addEventListener('mouseup', handleScreenDraggerMouseUp);
  parent.addEventListener('mouseleave', handleScreenDraggerMouseUp);
}

function handleScreenDraggerMouseUp() {
  parent.removeEventListener('mousemove', handleScreenDraggerMouseMove);
}

function handleScreenDraggerMouseMove(event) {
  event.preventDefault();

  deltaY = event.pageY - mouseInitialY;
  deltaX = event.pageX - mouseInitialX;

  updateChildPosition(childInitialLeft + deltaX, childInitialTop + deltaY);
}

function updateChildPosition(x, y) {
  child.style.transform = `translate(${x}px,${y}px)`;
}

function setChildInitialPosition() {
  const translate = child.style.transform.includes('translate') ? child.style.transform.replace('translate', '').replace('(', '').replace(')', '') : '';
  const translateProperties = translate.includes(',') ? translate.split(',') : ['0px', '0px'];

  childInitialLeft = translateProperties[0].includes('px') ? parseInt(translateProperties[0].replace('px', '')) : 0;
  childInitialTop = translateProperties[1].includes('px') ? parseInt(translateProperties[1].replace('px', '')) : 0;
}

function setMouseInitialPosition(event) {
  mouseInitialX = event.pageX;
  mouseInitialY = event.pageY;
}