"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { useRef } from "react"

function AnimatedStars() {
  const groupRef = useRef<any>(null)

  // 매 프레임마다 그룹을 서서히 회전시킵니다.
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Stars 
        radius={100}       // 별들이 생성될 반경
        depth={50}         // 별들의 깊이감
        count={15000}       // 별 개수 7500개
        factor={5.2}       // 별 크기 조절
        saturation={0.4}   // 별 발광 정도
        fade              // 서서히 사라지는 효과
        speed={1}         // 기본 애니메이션 속도
      />
    </group>
  )
}

export default function Starfield() {
  return (
    <Canvas
      style={{
        position: "fixed",       // fixed로 전체 화면 고정
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent", // 배경 투명 처리
      }}
      gl={{ alpha: true }} // 캔버스의 알파 채널 활성화: 투 보장
      camera={{ position: [0, 0, 1] }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <AnimatedStars />
    </Canvas>
  )
}
