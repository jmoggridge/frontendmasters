const popmotion = require('popmotion');
const ball = document.querySelector('.ball');
console.log(ball);

popmotion.animate({
  from: '-50px',
  to: '50px',
  repeat: Infinity,
  repeatType: 'mirror',
  type: 'spring',
  onUpdate(update) {
    console.log(update);
    ball.style.left = update;
  }
});
