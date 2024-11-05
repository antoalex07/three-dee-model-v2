import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';

const Model2 = () => {

    const earthRef = useRef(null);

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);

        if(earthRef.current) {
            earthRef.current.appendChild(renderer.domElement)
        }

        const fov = 75;
        const aspect = width / height;
        const near = 0.1;
        const far = 10;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        return () => {
            if(earthRef.current) {
                earthRef.current.removeChild(renderer.domElement);
            }
        }

    }, [])

    return (
        <div ref={earthRef}>

        </div>
    )
}

export default Model2