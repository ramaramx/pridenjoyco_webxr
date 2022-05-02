const JUMP_KEY = ' ';

AFRAME.registerComponent('jump', {
  schema: {
    height: {
     type: 'number',
    },
    interval: {
     type: 'number'
    },
    timingFunction: {
     type: 'string'
    },
  },
  init: function() {
    document.addEventListener('keydown', e => {
      if (e.key != JUMP_KEY) return;

      const upInterval = setInterval(() => this.el.object3D.position.y += this.data.height / this.data.interval, 10);
     
      setTimeout(() => {
        
        clearInterval(upInterval);
        
        const downInterval = setInterval(() => this.el.object3D.position.y -= this.data.height / this.data.interval, 0);
       
        setTimeout(() => clearInterval(downInterval), this.data.interval / 2);

      }, this.data.interval / 2);
    });
  },
});