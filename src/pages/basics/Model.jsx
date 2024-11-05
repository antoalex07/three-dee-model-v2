import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Correct import

const Model = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);

    renderer.setClearColor(0x000000, 0)

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const fov = 75;
    const aspect = width / height;
    const near = 0.1;
    const far = 10;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    // Set up OrbitControls with the camera and renderer
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: adds inertia to controls
    controls.dampingFactor = 0.05; // Optional: the damping factor
    controls.minDistance = 1; // Optional: set a minimum distance for zoom
    controls.maxDistance = 5; // Optional: set a maximum distance for zoom

    const geometry = new THREE.IcosahedronGeometry(1.0, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.scale.setScalar(1.001);
    mesh.add(wireMesh);

    const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
    scene.add(hemiLight);

    function animate(t = 0) {
      requestAnimationFrame(animate);
      mesh.rotation.y = t * 0.0001;

      // Update controls on each frame
      controls.update(); // Necessary when enableDamping is true

      renderer.render(scene, camera);
    }
    animate();

    // Clean up the renderer and controls when the component unmounts
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose(); // Properly dispose controls
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default Model;
