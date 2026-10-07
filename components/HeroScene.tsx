"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import * as THREE from "three";

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<THREE.Group | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const hoverRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 5.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const object = new THREE.Group();
    objectRef.current = object;
    scene.add(object);

    const positions: number[] = [];
    const latitudeRows = 144;
    const pointsAround = 288;
    const radius = 1.42;
    for (let row = 1; row < latitudeRows; row += 1) {
      const latitude = (Math.PI * row) / latitudeRows;
      const rowCount = Math.max(12, Math.round(pointsAround * Math.sin(latitude)));
      for (let column = 0; column < rowCount; column += 1) {
        const longitude = (Math.PI * 2 * column) / rowCount;
        positions.push(
          radius * Math.sin(latitude) * Math.cos(longitude),
          radius * Math.cos(latitude),
          radius * Math.sin(latitude) * Math.sin(longitude),
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(2, 2) },
      uHover: { value: 0 },
      uAspect: { value: 1 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: true,
      blending: THREE.NormalBlending,
      vertexShader: `
        uniform float uTime;
        uniform float uHover;
        uniform float uAspect;
        uniform float uPixelRatio;
        uniform vec2 uPointer;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vWarp;

        void main() {
          vec3 direction = normalize(position);
          float latitude = asin(clamp(direction.y, -1.0, 1.0));
          float longitude = atan(direction.z, direction.x);
          float travelingWave = sin(latitude * 34.0 + sin(longitude * 3.0 + uTime * 0.6) * 1.8 - uTime * 1.15);
          float crossWave = sin(longitude * 7.0 - latitude * 11.0 + uTime * 0.7);
          float radius = 1.42 + travelingWave * 0.13 + crossWave * 0.065;
          vec3 point = direction * radius;

          vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
          vec4 clipPosition = projectionMatrix * viewPosition;
          vec2 screenPosition = clipPosition.xy / clipPosition.w;
          vec2 cursorDelta = screenPosition - uPointer;
          cursorDelta.x *= uAspect;
          float cursorField = exp(-dot(cursorDelta, cursorDelta) * 27.0) * uHover;
          float cursorPulse = 0.5 + 0.5 * sin(uTime * 8.0 - length(cursorDelta) * 55.0);
          point += direction * cursorField * sin(length(cursorDelta) * 65.0 - uTime * 8.0) * 0.18;
          viewPosition = modelViewMatrix * vec4(point, 1.0);
          vec2 cursorTangent = vec2(-cursorDelta.y, cursorDelta.x);
          viewPosition.xy += (cursorTangent * 1.25 + cursorDelta * 0.4) * cursorField;
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = 1.9 * uPixelRatio * (5.3 / max(1.0, -viewPosition.z));

          vec3 top = vec3(1.0, 0.78, 0.24);
          vec3 magenta = vec3(1.0, 0.12, 0.48);
          vec3 violet = vec3(0.34, 0.08, 1.0);
          vec3 ember = vec3(1.0, 0.18, 0.22);
          if (direction.y > 0.15) {
            vColor = mix(magenta, top, smoothstep(0.15, 0.94, direction.y));
          } else {
            vColor = mix(ember, magenta, smoothstep(-0.92, 0.18, direction.y));
          }
          float colorWave = 0.5 + 0.5 * sin(longitude * 5.0 + latitude * 8.0 + uTime * 0.45);
          vColor = mix(vColor, violet, colorWave * 0.76);
          float brightBand = smoothstep(-0.35, 0.82, travelingWave);
          vColor *= 0.12 + brightBand * 0.88;
          vAlpha = 0.96 + 0.04 * (0.5 + 0.5 * sin(latitude * 38.0 + longitude * 4.0 + uTime));
          vWarp = cursorField;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vWarp;

        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          float dotShape = 1.0 - smoothstep(0.28, 0.5, distanceToCenter);
          float glow = 1.0 + vWarp * 0.22;
          gl_FragColor = vec4(vColor * glow, vAlpha * dotShape);
          #include <colorspace_fragment>
        }
      `,
    });
    const mesh = new THREE.Points(geometry, material);
    mesh.frustumCulled = false;
    object.add(mesh);

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 500 ? 5.8 : 5.3;
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = width / height;
      renderer.setSize(width, height, false);
    });
    resizeObserver.observe(host);

    let frame = 0;
    const animate = (time: number) => {
      frame = window.requestAnimationFrame(animate);
      uniforms.uTime.value = time * 0.001;
      uniforms.uPointer.value.set(pointerRef.current.x, pointerRef.current.y);
      uniforms.uHover.value += ((hoverRef.current ? 1 : 0) - uniforms.uHover.value) * 0.12;
      if (!dragRef.current.active) object.rotation.y += 0.001;
      object.rotation.x = Math.sin(time * 0.00042) * 0.08;
      object.position.y = Math.sin(time * 0.0007) * 0.07;
      renderer.render(scene, camera);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.dispose();
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          geometries.add(node.geometry);
          (Array.isArray(node.material) ? node.material : [node.material]).forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.domElement.remove();
      objectRef.current = null;
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: 1 - ((event.clientY - bounds.top) / bounds.height) * 2,
    };
    if (dragRef.current.active && objectRef.current) {
      objectRef.current.rotation.y += (event.clientX - dragRef.current.x) * 0.008;
      objectRef.current.rotation.x += (event.clientY - dragRef.current.y) * 0.008;
      dragRef.current.x = event.clientX;
      dragRef.current.y = event.clientY;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const object = objectRef.current;
    if (!object) return;
    const step = 0.12;
    if (event.key === "ArrowLeft") object.rotation.y -= step;
    else if (event.key === "ArrowRight") object.rotation.y += step;
    else if (event.key === "ArrowUp") object.rotation.x -= step;
    else if (event.key === "ArrowDown") object.rotation.x += step;
    else return;
    event.preventDefault();
  };

  return (
    <div className="relative isolate origin-center min-[1361px]:scale-[1.2]">
      <div
        ref={hostRef}
        data-hide-custom-cursor="true"
        role="group"
        aria-label="Interactive animated 3D mesh. Hover to warp the surface, drag to rotate, or use the arrow keys."
        tabIndex={0}
        onPointerEnter={() => { hoverRef.current = true; }}
        onPointerDown={(event) => {
          dragRef.current = { active: true, x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={() => { dragRef.current.active = false; }}
        onPointerCancel={() => { dragRef.current.active = false; }}
        onPointerLeave={() => { if (!dragRef.current.active) hoverRef.current = false; }}
        onKeyDown={handleKeyDown}
        className="relative h-[360px] cursor-grab touch-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-500 active:cursor-grabbing sm:h-[430px]"
      >
      </div>
    </div>
  );
}