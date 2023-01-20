const ws = new WebSocket('ws://localhost:7777');

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.lineWidth = 5;
context.fill = 5;
context.lineCap = 'round';

let isMouseDown = false;

const draw = (x, y, type) => {
  if (type === 'mousedown') {
    context.beginPath();
    context.moveTo(x, y);
  } else if (type === 'mousemove') {
    context.lineTo(x, y);
    context.stroke();
  } else {
    context.closePath();
  }
}

const sendMessage = (x, y, type) => {
  const messageBody = {x, y, type};
  ws.send(JSON.stringify(messageBody));
}

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  draw(e.offsetX, e.offsetY, e.type);
  sendMessage(e.offsetX, e.offsetY, e.type);
})

canvas.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    draw(e.offsetX, e.offsetY, e.type);
    sendMessage(e.offsetX, e.offsetY, e.type);
  }
})

canvas.addEventListener('mouseup', (e) => {
  isMouseDown = false;
  draw(e.offsetX, e.offsetY, e.type);
  sendMessage(e.offsetX, e.offsetY, e.type);
})

ws.onmessage = (message) => {
  const messageBody = JSON.parse(message.data);
  draw(messageBody.x, messageBody.y, messageBody.type);
}
