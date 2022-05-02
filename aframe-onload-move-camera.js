/**
 * Alternative to a-link
 */
 AFRAME.registerComponent("onload-move-camera", {
    schema: {
      to: { default: '' }
    },
  
    init: function() {
      var el = this.el;
      var cameraPosition = getUrlValue('pos');
      var cameraRotation = getUrlValue('rot');
      if (cameraPosition) {
        cameraPosition = cameraPosition.split(',');
        if (cameraPosition.length === 3) {
          el.setAttribute('position', {x: cameraPosition[0], y: cameraPosition[1], z: cameraPosition[2]});
        }
      }
      if (cameraRotation) {
        el.setAttribute('rotation', {y: cameraRotation});
      }
    }
  });
  
  
  /**
   * Extract the value of the url parameter with regular expressions
   * @param key - key from the url you want to extract
   * @param url - (current address by default)
   * @returns {any} - value for the key
   */
  function getUrlValue(key, url)  {
    if (typeof(url) === 'undefined')
      url = window.location.href;
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
  }