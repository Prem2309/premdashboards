/**
 * Three.js WebGL Interactive Background
 * Prem Panchal — Data Science & Technology Portfolio
 * 
 * Renders a subtle, futuristic 3D constellation & data grid with camera parallax.
 */

(function () {
  'use strict';

  // Fallback check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Skipping 3D background initialization.');
    return;
  }

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 40;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Mouse Interaction Coordinates
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  // 1. Particle Constellation Network
  const particleCount = 280;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x3b82f6); // Tech blue
  const color2 = new THREE.Color(0x06b6d4); // Cyan
  const color3 = new THREE.Color(0x6366f1); // Indigo

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 120;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 60;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Gradient mix of colors
    const mixedColor = color1.clone().lerp(i % 2 === 0 ? color2 : color3, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular particle texture generator
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
    gradient.addColorStop(0.7, 'rgba(37, 99, 235, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  const particleMaterial = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    map: createCircleTexture(),
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // 2. Floating 3D Geometric Data Nodes
  const polyGroup = new THREE.Group();

  const icoGeom = new THREE.IcosahedronGeometry(4, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const icoMesh = new THREE.Mesh(icoGeom, icoMat);
  icoMesh.position.set(-25, 10, -10);
  polyGroup.add(icoMesh);

  const octGeom = new THREE.OctahedronGeometry(5, 0);
  const octMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const octMesh = new THREE.Mesh(octGeom, octMat);
  octMesh.position.set(28, -8, -15);
  polyGroup.add(octMesh);

  const torusGeom = new THREE.TorusGeometry(3.5, 0.2, 8, 32);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  const torusMesh = new THREE.Mesh(torusGeom, torusMat);
  torusMesh.position.set(18, 15, -8);
  polyGroup.add(torusMesh);

  scene.add(polyGroup);

  // Event Listeners
  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('mousemove', onDocumentMouseMove, { passive: true });
  window.addEventListener('resize', onWindowResize);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth camera mouse follow
    targetX = mouseX * 0.4;
    targetY = mouseY * 0.4;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (-targetY - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    // Particle rotation
    particleSystem.rotation.y = elapsedTime * 0.025;
    particleSystem.rotation.x = elapsedTime * 0.012;

    // Geometric polyhedra rotation
    icoMesh.rotation.x += 0.004;
    icoMesh.rotation.y += 0.005;

    octMesh.rotation.y -= 0.005;
    octMesh.rotation.z += 0.003;

    torusMesh.rotation.x += 0.006;
    torusMesh.rotation.y += 0.004;

    renderer.render(scene, camera);
  }

  animate();
})();
