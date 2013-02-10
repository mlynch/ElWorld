var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

// Find the right method, call on correct element
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

document.getElementById('full-click').onclick = function(event) {
  launchFullScreen(document.documentElement);
  event.preventDefault();
}

function init() {

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 500;

  scene = new THREE.Scene();

  geometry = new THREE.CubeGeometry( 200, 200, 200 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  // Launch fullscreen for browsers that support it!
  launchFullScreen(renderer.domElement);
}

function animate() {

  // note: three.js includes requestAnimationFrame shim
  requestAnimationFrame( animate );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  camera.position.z += 5;

  renderer.render( scene, camera );

}

function plane(width, height) {

	return function(u, v) {
		var x = (u-0.5) * width;
		var y = (v+0.5) * height;
		var z = 0;

		return new THREE.Vector3(x, y, z);
	};
}
