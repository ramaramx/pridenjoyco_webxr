var keeptooltip = false;
var largeview = false;

/**
 * Handles interaction with the component
 * such as hover, click, mouse-enter and leave.
 */
AFRAME.registerComponent("enable-interaction", {
  schema: {
    // Type will be inferred to be boolean.
    meshname: { default: [] },
    lookangle: { default: 0 },
    lookposition: { type: "vec3" }
  },

  init: function() {
    //var camera = document.querySelector('a-entity[camera]').components.camera.camera;
    var sceneEl = document.querySelector("a-scene");
    var camera = document.getElementById("kameraRig");

    var el = this.el;
    var meshname = this.data.meshname;
    var infotext = this.data.infotext;
    var mainnode = [];
    var lookposition = this.data.lookposition;
    var lookangle = this.data.lookangle;

    var infoEntity;

    camera.addEventListener("animationcomplete__rotateCamera", function(e) {
    });

    this.el.addEventListener("model-loaded", () => {
      const obj = el.getObject3D("mesh");
      obj.traverse(node => {
          console.log(node.name);
        if (meshname.includes(node.name)) {
          mainnode.push(node);
          //mainnode = node;
        }
      });
    });

    this.el.addEventListener("mouseenter", function() {
        mainnode.forEach(highlightMesh);
    });

    this.el.addEventListener("mouseleave", function() {
        mainnode.forEach(unHighlightMesh);
    });

    this.el.addEventListener("mousedown", function() {
      openInfobar(infotext);
      //var bbox = new THREE.Box3().setFromObject(mainnode);
      var worldPosition = new THREE.Vector3();
      camera.object3D.getWorldPosition(worldPosition);
      // console.log("worldPosition.x: " + worldPosition.x);
      // console.log("worldPosition.y: " + worldPosition.y);
      // console.log("worldPosition.z: "  + worldPosition.z);
      // console.log("lookPosition.x: " + lookposition.x);
      // console.log("lookPosition.z: " + lookposition.z);
      // console.dir(camera.object3D);
      //overlayOn();
      keeptooltip = true;

      var end = lookangle - camera.children[0].getAttribute('rotation').y;
      var start = camera.getAttribute('rotation').y;

      var shortest_angle = ((((end - start) % 360) + 540) % 360) - 180;
      var endRotation = start + (shortest_angle * 1.0) % 360;

      if (
        worldPosition.x == lookposition.x &&
        worldPosition.z == lookposition.z
      ) {
        //if (realangle )
        if (start != end) {
          camera.removeAttribute("animation");
          camera.setAttribute("animation__rotateCamera", {
            property: "rotation",
            dur: 500,
            easing: "easeInOutQuad",
            to: { y: endRotation }
          });
          camera.components.animation.beginAnimation();
        }
      } else {
        camera.setAttribute("animation", {
          property: "position",
          dur: 2000,
          easing: "easeInOutQuad",
          from: worldPosition.x + " " + worldPosition.y + " " + worldPosition.z,
          to: lookposition.x + " " + worldPosition.y + " " + lookposition.z,
          startEvents: "movecamera"
        });
        camera.setAttribute("animation__rotateCamera", {
          property: "rotation",
          dur: 2000,
          easing: "easeInOutQuad",
          to: { y: endRotation }
        });
        camera.components.animation.beginAnimation();
      }
    });

  }
});


function highlightMesh(item, index) {
    if (item.material.type === "MeshStandardMaterial")
    {
      item.material.color.set("#94FFA3");
    }
    else {
      item.material.uniforms.highlightcolor.value.x = 1.0;
     item.material.uniforms.highlightcolor.value.y = 1.0;
      item.material.uniforms.highlightcolor.value.z = 0.0;
    }
}

function unHighlightMesh(item, index) {
    if (item.material.type === "MeshStandardMaterial")
    {
      item.material.color.set("#fff");
    }
    else {
      item.material.uniforms.highlightcolor.value.x = 1.0;
     item.material.uniforms.highlightcolor.value.y = 1.0;
      item.material.uniforms.highlightcolor.value.z = 0.0;
    }
}


function closeInfobar() {
  var infobar = document.querySelector('.infobar');
  var body = document.querySelector('body');
  if (infobar.classList.contains('infobar--open')) {
    infobar.classList.remove('infobar--open')
    body.classList.remove('infobar-open')
  }
}

function openInfobar(info) {
  var infobar = document.querySelector('.infobar');
  var body = document.querySelector('body');
  if (!infobar.classList.contains('infobar--open')) {
    infobar.classList.add('infobar--open');
    body.classList.add('infobar-open')
  }
}

// to log position & vertical rotation
document.addEventListener('keydown', logKey);
function logKey(e) {
  if(e.code === 'KeyP') {
    var worldPosition = new THREE.Vector3();
    var camera = document.getElementById("kameraRig");
    camera.object3D.getWorldPosition(worldPosition);
    alert('lookangle: ' + ((camera.object3D.rotation.y * (180 / Math.PI) + camera.children[0].object3D.rotation.y * (180 / Math.PI))%360).toFixed(2) + '; lookposition:' + worldPosition.x.toFixed(2) + ' 1 ' + worldPosition.z.toFixed(2) )
  }
  if(e.code === 'KeyO') {
    var worldPosition = new THREE.Vector3();
    var camera = document.getElementById("kameraRig");
    camera.object3D.getWorldPosition(worldPosition);
    console.log('rotation', (camera.children[0].object3D.rotation.x * (180 / Math.PI)).toFixed(4), (camera.children[0].object3D.rotation.y * (180 / Math.PI)).toFixed(4), (camera.children[0].object3D.rotation.z * (180 / Math.PI)).toFixed(4));
}
}

// check for hash changes in order to move to the artwork.
window.addEventListener("hashchange", function() {
  var artworkID = location.hash.substring(1); // remove #
  var artwork = document.querySelector("[artid='"+ artworkID +"']")
  if (artwork) {
    artwork.dispatchEvent(new Event('mousedown'));
  }
});