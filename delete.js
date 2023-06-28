import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, model, currentColor;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.rotation.y = 45 / 180 * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas').appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  const light = new THREE.AmbientLight(0x404040, 100);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const loader = new GLTFLoader();
  loader.load('./assets/one/scene.gltf', function (gltf) {
    model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
    animate();
  });

  document.querySelectorAll('.color-button').forEach(function (button) {
    button.addEventListener('click', function () {
      const color = button.style.backgroundColor;
      changeColor(color);
    });
  });
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function changeColor(color) {
  if (model) {
    model.traverse(function (child) {
      if (child.isMesh) {
        child.material.color = new THREE.Color(color);
      }
    });
    currentColor = color;
  }
}

init();
