/**
 * Three.js Interactive 3D Component Visuals
 * Prem Panchal — Data Science & Technology Portfolio
 * 
 * Renders dedicated interactive 3D WebGL scenes for:
 * 1. Hero Core Tech Node
 * 2. About Me Holographic Workstation
 * 3. 3D Technology Ecosystem Graph
 * 4. Stock Market 3D Candlestick & Trend System
 * 5. Student Management 3D Database Network
 * 6. Meesho E-Commerce 3D Visual
 * 7. Login Page 3D Authentication Visual
 * 8. Business Analyst 3D Analytics & Reports Visual
 * 9. Green Intern 3D Climate-Tech Eco-Sphere
 * 10. Beyond Academics Collaboration Network
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js is required for 3D component visuals.');
    return;
  }

  // Helper to initialize a lightweight canvas scene
  function createMiniScene(canvasId, setupFn) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const width = canvas.clientWidth || 300;
    const height = canvas.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const updateFn = setupFn(scene, camera, renderer) || function () {};

    function onResize() {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight || 200;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize);

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(canvas);

    function loop(time) {
      requestAnimationFrame(loop);
      if (isVisible) {
        updateFn(time * 0.001);
        renderer.render(scene, camera);
      }
    }
    requestAnimationFrame(loop);
  }

  // =========================================================================
  // 1. Hero 3D Mini Node: Dual Orbital Rings & Pulsing Core
  // =========================================================================
  createMiniScene('hero-mini-canvas', function (scene, camera) {
    camera.position.z = 12;

    const group = new THREE.Group();

    // Central Sphere Core
    const coreGeom = new THREE.SphereGeometry(2, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    group.add(coreMesh);

    // Inner Icosahedron
    const innerGeom = new THREE.IcosahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerMesh);

    // Orbital Ring 1
    const ring1Geom = new THREE.TorusGeometry(3.5, 0.08, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Orbital Ring 2
    const ring2Geom = new THREE.TorusGeometry(4.2, 0.08, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    scene.add(group);

    return function (t) {
      group.rotation.y = t * 0.4;
      group.rotation.x = Math.sin(t * 0.3) * 0.2;
      ring1.rotation.z = t * 0.6;
      ring2.rotation.x = -t * 0.5;
      innerMesh.rotation.y = -t * 0.8;
    };
  });

  // =========================================================================
  // 2. About Me Holographic Workstation
  // =========================================================================
  createMiniScene('about-3d-canvas', function (scene, camera) {
    camera.position.z = 14;

    const group = new THREE.Group();

    // Data grid plane
    const grid = new THREE.GridHelper(10, 10, 0x38bdf8, 0x1e3a8a);
    grid.rotation.x = Math.PI / 4;
    grid.position.y = -2;
    group.add(grid);

    // Floating 3D Data Bars
    const barMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.7 });
    const bars = [];
    for (let i = 0; i < 5; i++) {
      const h = 1.5 + Math.random() * 2.5;
      const barGeom = new THREE.BoxGeometry(0.8, h, 0.8);
      const bar = new THREE.Mesh(barGeom, barMat);
      bar.position.set((i - 2) * 1.5, -2 + h / 2, (Math.random() - 0.5) * 2);
      group.add(bar);
      bars.push({ mesh: bar, baseH: h, speed: 1 + Math.random() });
    }

    scene.add(group);

    return function (t) {
      group.rotation.y = t * 0.3;
      bars.forEach((b, idx) => {
        const scaleY = 1 + 0.3 * Math.sin(t * b.speed + idx);
        b.mesh.scale.y = scaleY;
      });
    };
  });

  // =========================================================================
  // 3. 3D Technology Ecosystem: Central Core Connected to 4 Categories
  // =========================================================================
  createMiniScene('skills-3d-canvas', function (scene, camera) {
    camera.position.z = 16;

    const group = new THREE.Group();

    // Central Node (Data & Tech)
    const centerGeom = new THREE.DodecahedronGeometry(1.8, 0);
    const centerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.9 });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    group.add(centerMesh);

    // 4 Category Nodes
    const categories = [
      { name: 'Programming & Data', color: 0x3b82f6, pos: [-6, 2.5, 0] },
      { name: 'Web Development', color: 0x06b6d4, pos: [6, 2.5, 0] },
      { name: 'Database Management', color: 0x10b981, pos: [-4.5, -3, 1] },
      { name: 'Tools & Tech', color: 0xa855f7, pos: [4.5, -3, 1] }
    ];

    const lines = [];

    categories.forEach(cat => {
      // Node Mesh
      const nodeGeom = new THREE.OctahedronGeometry(1.2, 0);
      const nodeMat = new THREE.MeshBasicMaterial({ color: cat.color, wireframe: true, transparent: true, opacity: 0.85 });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(...cat.pos);
      group.add(nodeMesh);

      // Connecting Line
      const lineMat = new THREE.LineBasicMaterial({ color: cat.color, transparent: true, opacity: 0.4 });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...cat.pos)];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeom, lineMat);
      group.add(line);

      lines.push({ node: nodeMesh, line: line, origPos: cat.pos });
    });

    scene.add(group);

    return function (t) {
      centerMesh.rotation.x = t * 0.5;
      centerMesh.rotation.y = t * 0.7;

      lines.forEach((item, index) => {
        item.node.rotation.x = t * 0.8;
        item.node.rotation.y = t * 0.5;
        // Floating motion
        const floatY = Math.sin(t * 1.5 + index) * 0.3;
        item.node.position.y = item.origPos[1] + floatY;

        // Update line geometry
        const pts = [new THREE.Vector3(0, 0, 0), item.node.position];
        item.line.geometry.setFromPoints(pts);
      });

      group.rotation.y = Math.sin(t * 0.25) * 0.2;
    };
  });

  // =========================================================================
  // 4. Project 1: Stock Market 3D Candlestick & Analytics Chart
  // =========================================================================
  createMiniScene('project-stock-canvas', function (scene, camera) {
    camera.position.z = 13;

    const group = new THREE.Group();

    // 7 Candlestick bars
    const candleCount = 7;
    const candles = [];
    for (let i = 0; i < candleCount; i++) {
      const isGreen = i % 2 === 0;
      const height = 1.2 + Math.random() * 2.2;
      const barGeom = new THREE.BoxGeometry(0.5, height, 0.5);
      const barMat = new THREE.MeshBasicMaterial({
        color: isGreen ? 0x10b981 : 0xef4444,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      const bar = new THREE.Mesh(barGeom, barMat);
      const x = (i - 3) * 1.1;
      const y = (Math.random() - 0.5) * 1.5;
      bar.position.set(x, y, 0);
      group.add(bar);

      // Wick line
      const wickGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y - height / 2 - 0.6, 0),
        new THREE.Vector3(x, y + height / 2 + 0.6, 0)
      ]);
      const wickMat = new THREE.LineBasicMaterial({
        color: isGreen ? 0x34d399 : 0xf87171,
        transparent: true,
        opacity: 0.7
      });
      const wick = new THREE.Line(wickGeom, wickMat);
      group.add(wick);

      candles.push(bar);
    }

    // Trend Curve Ribbon
    const curvePoints = [];
    for (let i = 0; i < candleCount; i++) {
      curvePoints.push(new THREE.Vector3((i - 3) * 1.1, Math.sin(i * 0.8) * 1.2, 0.4));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeom = new THREE.TubeGeometry(curve, 32, 0.08, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });
    const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
    group.add(tubeMesh);

    scene.add(group);

    return function (t) {
      group.rotation.y = Math.sin(t * 0.5) * 0.35;
      group.rotation.x = Math.cos(t * 0.4) * 0.15;
    };
  });

  // =========================================================================
  // 5. Project 2: Student Management 3D Database Network
  // =========================================================================
  createMiniScene('project-student-canvas', function (scene, camera) {
    camera.position.z = 13;

    const group = new THREE.Group();

    // Database Cylinder Stack
    for (let i = 0; i < 3; i++) {
      const cylGeom = new THREE.CylinderGeometry(1.8, 1.8, 0.7, 24);
      const cylMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.75
      });
      const cyl = new THREE.Mesh(cylGeom, cylMat);
      cyl.position.set(0, (i - 1) * 1.1, 0);
      group.add(cyl);
    }

    // Connected satellite client nodes
    const satCount = 4;
    const satellites = [];
    for (let i = 0; i < satCount; i++) {
      const satGeom = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const satMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const sat = new THREE.Mesh(satGeom, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 4, Math.sin(angle) * 1.5, Math.sin(angle) * 2);
      group.add(sat);

      // Connecting line
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        sat.position
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.4 });
      const line = new THREE.Line(lineGeom, lineMat);
      group.add(line);

      satellites.push({ mesh: sat, angle: angle });
    }

    scene.add(group);

    return function (t) {
      group.rotation.y = t * 0.4;
      satellites.forEach((sat, i) => {
        sat.mesh.rotation.x = t + i;
        sat.mesh.rotation.y = t * 0.7;
      });
    };
  });

  // =========================================================================
  // 6. Project 3: Meesho E-Commerce 3D Product Interface
  // =========================================================================
  createMiniScene('project-ecommerce-canvas', function (scene, camera) {
    camera.position.z = 13;

    const group = new THREE.Group();

    // 3 Floating Isometric Cards
    const cards = [];
    const colors = [0x06b6d4, 0x3b82f6, 0x8b5cf6];

    for (let i = 0; i < 3; i++) {
      const cardGeom = new THREE.BoxGeometry(2.8, 3.8, 0.15);
      const cardMat = new THREE.MeshBasicMaterial({
        color: colors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.75
      });
      const card = new THREE.Mesh(cardGeom, cardMat);
      card.position.set((i - 1) * 2.2, (1 - i) * 0.5, i * 0.8);
      group.add(card);
      cards.push(card);
    }

    scene.add(group);

    return function (t) {
      group.rotation.y = -0.3 + Math.sin(t * 0.5) * 0.25;
      group.rotation.x = 0.2 + Math.cos(t * 0.4) * 0.15;
      cards.forEach((c, idx) => {
        c.position.y = (1 - idx) * 0.5 + Math.sin(t * 1.2 + idx) * 0.2;
      });
    };
  });

  // =========================================================================
  // 7. Project 4: Facebook & Instagram Login 3D Visual
  // =========================================================================
  createMiniScene('project-login-canvas', function (scene, camera) {
    camera.position.z = 13;

    const group = new THREE.Group();

    // Dual Shield / Auth Planes
    const p1Geom = new THREE.PlaneGeometry(3.5, 4.5);
    const p1Mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.6 });
    const p1 = new THREE.Mesh(p1Geom, p1Mat);
    p1.position.set(-1.2, 0, 0);
    group.add(p1);

    const p2Geom = new THREE.PlaneGeometry(3.5, 4.5);
    const p2Mat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.6 });
    const p2 = new THREE.Mesh(p2Geom, p2Mat);
    p2.position.set(1.2, 0, 0.5);
    group.add(p2);

    // Central Lock Ring
    const lockGeom = new THREE.TorusGeometry(1, 0.15, 12, 32);
    const lockMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    const lock = new THREE.Mesh(lockGeom, lockMat);
    lock.position.set(0, 0, 1);
    group.add(lock);

    scene.add(group);

    return function (t) {
      group.rotation.y = Math.sin(t * 0.6) * 0.3;
      p1.rotation.y = Math.sin(t * 0.8) * 0.15;
      p2.rotation.y = -Math.sin(t * 0.8) * 0.15;
      lock.rotation.z = t * 0.5;
    };
  });

  // =========================================================================
  // 8. Experience: Business Analyst 3D Data Models Visual
  // =========================================================================
  createMiniScene('exp-analytics-canvas', function (scene, camera) {
    camera.position.z = 14;

    const group = new THREE.Group();

    // 3D Analytical Plane with Bar Graph and Surface
    const barMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.75 });
    const bars = [];
    for (let x = -2; x <= 2; x++) {
      for (let z = -1; z <= 1; z++) {
        const h = 1 + Math.random() * 2.5;
        const bGeom = new THREE.BoxGeometry(0.6, h, 0.6);
        const b = new THREE.Mesh(bGeom, barMat);
        b.position.set(x * 1.1, -1.5 + h / 2, z * 1.1);
        group.add(b);
        bars.push({ mesh: b, baseH: h, speed: 1.5 + Math.random() });
      }
    }

    scene.add(group);

    return function (t) {
      group.rotation.y = t * 0.35;
      bars.forEach((b, i) => {
        b.mesh.scale.y = 0.8 + 0.4 * Math.sin(t * b.speed + i);
      });
    };
  });

  // =========================================================================
  // 9. Experience: 1M1B Green Intern 3D Climate-Tech Eco-Sphere
  // =========================================================================
  createMiniScene('exp-green-canvas', function (scene, camera) {
    camera.position.z = 13;

    const group = new THREE.Group();

    // Wireframe Eco-Sphere
    const sphereGeom = new THREE.SphereGeometry(3, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    group.add(sphere);

    // Orbital latitude rings
    const ringGeom = new THREE.TorusGeometry(3.6, 0.06, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    scene.add(group);

    return function (t) {
      sphere.rotation.y = t * 0.4;
      sphere.rotation.x = t * 0.2;
      ring.rotation.z = -t * 0.6;
    };
  });

  // =========================================================================
  // 10. Beyond Academics: Collaboration Network Node
  // =========================================================================
  createMiniScene('leadership-3d-canvas', function (scene, camera) {
    camera.position.z = 13;

    const group = new THREE.Group();

    // Central Dodecahedron
    const coreGeom = new THREE.DodecahedronGeometry(1.8, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // Orbiting particle satellites
    const satGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const sGeom = new THREE.TetrahedronGeometry(0.6, 0);
      const sMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const s = new THREE.Mesh(sGeom, sMat);
      const ang = (i / 5) * Math.PI * 2;
      s.position.set(Math.cos(ang) * 3.5, Math.sin(ang) * 2, Math.sin(ang) * 1.5);
      satGroup.add(s);
    }
    group.add(satGroup);

    scene.add(group);

    return function (t) {
      core.rotation.y = t * 0.5;
      core.rotation.x = t * 0.3;
      satGroup.rotation.y = -t * 0.4;
      satGroup.rotation.z = t * 0.2;
    };
  });

})();
