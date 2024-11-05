import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const Model3 = () => {

    const ref = useRef(null);

    useEffect(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);

        if(ref.current) {
            ref.current.appendChild(renderer.domElement);
        }

        const fov = 75;
        const aspect = width / height;
        const near = 0.1;
        const far = 10;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0x00ff00,
        //     // flatShading: true
        // })

        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        const loader = new GLTFLoader();
        const gltf = loader.load('./Chair.glb');
        scene.add(gltf.scene);
        // renderer.render(scene, camera);

        function animate() {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            if(ref.current){
                ref.current.removeChild(renderer.domElement);
            }
        }
    }, [])

  return (
    <div ref={ref} style={{width: '100%', height: '100%'}}></div>
  )
}

export default Model3