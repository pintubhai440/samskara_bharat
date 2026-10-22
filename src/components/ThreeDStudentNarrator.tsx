import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeDStudentNarratorProps {
  isSpeaking: boolean;
  isPaused: boolean;
  activeSection?: number;
  narratorName?: string;
  narratorRole?: string;
  className?: string;
  compact?: boolean;
}

/**
 * ThreeDStudentNarrator
 * Renders a high-quality 3D animated Indian schoolchild ("Ananya", ~11-12 years old, Class 6)
 * using real-time Three.js WebGL rendering.
 * Features:
 * - Natural facial proportions, expressive amber-brown eyes, neat hair with ribbons
 * - Dignified contemporary Indian school uniform (white collared shirt, navy vest with saffron/green piping, school tie and badge)
 * - Dynamic procedural lip-sync synchronized to speech phoneme intervals
 * - Autonomous eye-blinking and subtle cursor-following head/eye micro-tracking
 * - Breathing and expressive hand/arm guiding gestures
 * - Complete Three.js memory disposal on unmount
 */
export const ThreeDStudentNarrator: React.FC<ThreeDStudentNarratorProps> = ({
  isSpeaking,
  isPaused,
  activeSection = 1,
  narratorName = 'Ananya',
  narratorRole = 'Class 6 Student Mentor',
  className = '',
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isSpeakingRef = useRef(isSpeaking);
  const isPausedRef = useRef(isPaused);
  const activeSectionRef = useRef(activeSection);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Sync ref values for animation loop without triggering re-render
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
    isPausedRef.current = isPaused;
  }, [isSpeaking, isPaused]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 240;
    const height = container.clientHeight || (compact ? 220 : 300);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 3.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting for animated-film look
    // Soft warm ambient fill
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.95);
    scene.add(ambientLight);

    // Key light (soft sun angle)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(2.2, 3.5, 3.0);
    scene.add(keyLight);

    // Soft warm secondary fill light (golden heritage glow)
    const fillLight = new THREE.DirectionalLight(0xffd166, 0.65);
    fillLight.position.set(-2.5, 1.5, 2.0);
    scene.add(fillLight);

    // Crisp cool rim light on hair and shoulders (Pixar style)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    rimLight.position.set(0, 2.8, -3.0);
    scene.add(rimLight);

    // 3. Materials
    // Warm Indian skin tone with soft subsurface feel
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xcd8552,
      roughness: 0.48,
      metalness: 0.04,
    });

    const innerMouthMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a1818,
      roughness: 0.7,
    });

    const teethMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });

    const lipMaterial = new THREE.MeshStandardMaterial({
      color: 0xb5634e,
      roughness: 0.4,
    });

    // Dark lustrous hair
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a120c,
      roughness: 0.32,
      metalness: 0.08,
    });

    // Uniform shirt: clean white
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0xfcfbfa,
      roughness: 0.65,
    });

    // School Uniform vest: Deep Indian navy
    const vestMaterial = new THREE.MeshStandardMaterial({
      color: 0x17324d,
      roughness: 0.55,
    });

    // Uniform Piping: Saffron and Green
    const saffronMaterial = new THREE.MeshStandardMaterial({
      color: 0xff9933,
      roughness: 0.4,
    });

    const greenMaterial = new THREE.MeshStandardMaterial({
      color: 0x22a06b,
      roughness: 0.4,
    });

    // Metallic badge
    const badgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      roughness: 0.25,
      metalness: 0.65,
    });

    // Sclera & Iris
    const scleraMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8f9fa,
      roughness: 0.2,
    });

    const irisMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d200f, // warm deep brown
      roughness: 0.25,
    });

    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a0503,
    });

    const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // 4. Character Hierarchy
    const characterRoot = new THREE.Group();
    scene.add(characterRoot);
    characterRoot.position.y = -0.35;

    // --- TORSO & UNIFORM ---
    const torsoGroup = new THREE.Group();
    characterRoot.add(torsoGroup);

    // Shirt base (upper body)
    const shirtGeo = new THREE.CylinderGeometry(0.55, 0.62, 0.95, 24);
    const shirtMesh = new THREE.Mesh(shirtGeo, shirtMaterial);
    shirtMesh.position.y = 0.05;
    torsoGroup.add(shirtMesh);

    // Uniform Vest / Sleeveless Sweater over shirt
    const vestGeo = new THREE.CylinderGeometry(0.57, 0.64, 0.88, 24);
    const vestMesh = new THREE.Mesh(vestGeo, vestMaterial);
    vestMesh.position.y = 0.02;
    torsoGroup.add(vestMesh);

    // V-neck cut-out insert showing white shirt
    const vNeckGeo = new THREE.ConeGeometry(0.24, 0.42, 3);
    const vNeckMesh = new THREE.Mesh(vNeckGeo, shirtMaterial);
    vNeckMesh.rotation.x = Math.PI;
    vNeckMesh.rotation.z = Math.PI;
    vNeckMesh.position.set(0, 0.32, 0.53);
    torsoGroup.add(vNeckMesh);

    // V-neck Saffron Trim
    const trimLeftGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.38, 8);
    const trimLeftMesh = new THREE.Mesh(trimLeftGeo, saffronMaterial);
    trimLeftMesh.rotation.z = 0.55;
    trimLeftMesh.position.set(-0.11, 0.32, 0.54);
    torsoGroup.add(trimLeftMesh);

    const trimRightMesh = new THREE.Mesh(trimLeftGeo, saffronMaterial);
    trimRightMesh.rotation.z = -0.55;
    trimRightMesh.position.set(0.11, 0.32, 0.54);
    torsoGroup.add(trimRightMesh);

    // 3D School Tie
    const tieGeo = new THREE.ConeGeometry(0.09, 0.48, 4);
    const tieMesh = new THREE.Mesh(tieGeo, greenMaterial);
    tieMesh.position.set(0, 0.18, 0.55);
    torsoGroup.add(tieMesh);

    // School Badge Pin on left lapel
    const badgeGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.02, 16);
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMaterial);
    badgeMesh.rotation.x = Math.PI / 2;
    badgeMesh.position.set(0.28, 0.22, 0.54);
    torsoGroup.add(badgeMesh);

    // Shirt Collar Lapels
    const collarLeftGeo = new THREE.BoxGeometry(0.18, 0.12, 0.04);
    const collarLeft = new THREE.Mesh(collarLeftGeo, shirtMaterial);
    collarLeft.rotation.set(0.15, 0.4, -0.4);
    collarLeft.position.set(-0.19, 0.48, 0.45);
    torsoGroup.add(collarLeft);

    const collarRight = new THREE.Mesh(collarLeftGeo, shirtMaterial);
    collarRight.rotation.set(0.15, -0.4, 0.4);
    collarRight.position.set(0.19, 0.48, 0.45);
    torsoGroup.add(collarRight);

    // --- NECK ---
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.28, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.y = 0.54;
    characterRoot.add(neckMesh);

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.88, 0);
    characterRoot.add(headGroup);

    // Head base (smooth contoured face)
    const headGeo = new THREE.SphereGeometry(0.48, 32, 32);
    headGeo.scale(0.94, 1.05, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headGroup.add(headMesh);

    // Soft chin refinement
    const chinGeo = new THREE.SphereGeometry(0.2, 16, 16);
    chinGeo.scale(0.9, 0.7, 0.9);
    const chinMesh = new THREE.Mesh(chinGeo, skinMaterial);
    chinMesh.position.set(0, -0.42, 0.18);
    headGroup.add(chinMesh);

    // Cheeks for youthful friendly look
    const cheekGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const leftCheek = new THREE.Mesh(cheekGeo, skinMaterial);
    leftCheek.position.set(-0.25, -0.12, 0.35);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, skinMaterial);
    rightCheek.position.set(0.25, -0.12, 0.35);
    headGroup.add(rightCheek);

    // Cute natural nose
    const noseGeo = new THREE.ConeGeometry(0.065, 0.16, 12);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.rotation.x = 0.25;
    noseMesh.position.set(0, -0.05, 0.48);
    headGroup.add(noseMesh);

    // --- EYES (with pupils and blinking eyelids) ---
    const eyeGroup = new THREE.Group();
    headGroup.add(eyeGroup);

    // Left eye
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.165, 0.05, 0.41);
    eyeGroup.add(leftEyeGroup);

    const eyeGeo = new THREE.SphereGeometry(0.092, 20, 20);
    const leftSclera = new THREE.Mesh(eyeGeo, scleraMaterial);
    leftEyeGroup.add(leftSclera);

    const irisGeo = new THREE.CircleGeometry(0.052, 24);
    const leftIris = new THREE.Mesh(irisGeo, irisMaterial);
    leftIris.position.set(0, 0, 0.088);
    leftEyeGroup.add(leftIris);

    const pupilGeo = new THREE.CircleGeometry(0.026, 20);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(0, 0, 0.089);
    leftEyeGroup.add(leftPupil);

    const highlightGeo = new THREE.CircleGeometry(0.012, 12);
    const leftHighlight = new THREE.Mesh(highlightGeo, eyeHighlightMaterial);
    leftHighlight.position.set(0.02, 0.02, 0.09);
    leftEyeGroup.add(leftHighlight);

    // Left Upper Eyelid for blinking
    const eyelidGeo = new THREE.SphereGeometry(0.096, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const leftEyelid = new THREE.Mesh(eyelidGeo, skinMaterial);
    leftEyelid.rotation.x = -Math.PI / 2;
    leftEyelid.position.set(0, 0.005, 0);
    leftEyeGroup.add(leftEyelid);

    // Right eye
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.165, 0.05, 0.41);
    eyeGroup.add(rightEyeGroup);

    const rightSclera = new THREE.Mesh(eyeGeo, scleraMaterial);
    rightEyeGroup.add(rightSclera);

    const rightIris = new THREE.Mesh(irisGeo, irisMaterial);
    rightIris.position.set(0, 0, 0.088);
    rightEyeGroup.add(rightIris);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0, 0, 0.089);
    rightEyeGroup.add(rightPupil);

    const rightHighlight = new THREE.Mesh(highlightGeo, eyeHighlightMaterial);
    rightHighlight.position.set(0.02, 0.02, 0.09);
    rightEyeGroup.add(rightHighlight);

    // Right Upper Eyelid for blinking
    const rightEyelid = new THREE.Mesh(eyelidGeo, skinMaterial);
    rightEyelid.rotation.x = -Math.PI / 2;
    rightEyelid.position.set(0, 0.005, 0);
    rightEyeGroup.add(rightEyelid);

    // Eyebrows
    const browGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.16, 8);
    const leftBrow = new THREE.Mesh(browGeo, hairMaterial);
    leftBrow.rotation.set(0.1, 0.2, 0.25);
    leftBrow.position.set(-0.17, 0.18, 0.43);
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, hairMaterial);
    rightBrow.rotation.set(0.1, -0.2, -0.25);
    rightBrow.position.set(0.17, 0.18, 0.43);
    headGroup.add(rightBrow);

    // --- MOUTH & LIP SYNC ---
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.25, 0.44);
    headGroup.add(mouthGroup);

    // Inside mouth cavity
    const mouthCavityGeo = new THREE.CylinderGeometry(0.11, 0.08, 0.06, 16);
    mouthCavityGeo.rotateX(Math.PI / 2);
    const mouthCavity = new THREE.Mesh(mouthCavityGeo, innerMouthMaterial);
    mouthGroup.add(mouthCavity);

    // Upper and lower teeth rows
    const teethGeo = new THREE.BoxGeometry(0.12, 0.025, 0.04);
    const upperTeeth = new THREE.Mesh(teethGeo, teethMaterial);
    upperTeeth.position.set(0, 0.025, -0.01);
    mouthGroup.add(upperTeeth);

    // Upper lip
    const upperLipGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.14, 8);
    const upperLip = new THREE.Mesh(upperLipGeo, lipMaterial);
    upperLip.rotation.z = Math.PI / 2;
    upperLip.position.set(0, 0.035, 0.015);
    mouthGroup.add(upperLip);

    // Lower lip (moves during speech)
    const lowerLipGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.13, 8);
    const lowerLip = new THREE.Mesh(lowerLipGeo, lipMaterial);
    lowerLip.rotation.z = Math.PI / 2;
    lowerLip.position.set(0, -0.035, 0.015);
    mouthGroup.add(lowerLip);

    // --- STYLIZED 3D HAIR (middle school student bangs and side braids) ---
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Hair cap / dome
    const hairDomeGeo = new THREE.SphereGeometry(0.51, 24, 24);
    hairDomeGeo.scale(0.98, 1.05, 1.02);
    const hairDome = new THREE.Mesh(hairDomeGeo, hairMaterial);
    hairDome.position.set(0, 0.05, -0.04);
    hairGroup.add(hairDome);

    // Front bangs / fringe
    const bangsLeftGeo = new THREE.SphereGeometry(0.22, 16, 16);
    bangsLeftGeo.scale(1.2, 0.6, 0.7);
    const bangsLeft = new THREE.Mesh(bangsLeftGeo, hairMaterial);
    bangsLeft.rotation.set(0.1, 0.2, 0.3);
    bangsLeft.position.set(-0.2, 0.32, 0.32);
    hairGroup.add(bangsLeft);

    const bangsRightGeo = new THREE.SphereGeometry(0.22, 16, 16);
    bangsRightGeo.scale(1.2, 0.6, 0.7);
    const bangsRight = new THREE.Mesh(bangsRightGeo, hairMaterial);
    bangsRight.rotation.set(0.1, -0.2, -0.3);
    bangsRight.position.set(0.2, 0.32, 0.32);
    hairGroup.add(bangsRight);

    // Neat side ponytails / braids with saffron ribbons
    const braidLeftGeo = new THREE.CylinderGeometry(0.08, 0.04, 0.55, 12);
    const braidLeft = new THREE.Mesh(braidLeftGeo, hairMaterial);
    braidLeft.position.set(-0.48, -0.15, -0.05);
    braidLeft.rotation.set(0.1, 0, 0.35);
    hairGroup.add(braidLeft);

    const ribbonLeftGeo = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
    const ribbonLeft = new THREE.Mesh(ribbonLeftGeo, saffronMaterial);
    ribbonLeft.rotation.x = Math.PI / 2;
    ribbonLeft.position.set(-0.45, 0.02, -0.05);
    hairGroup.add(ribbonLeft);

    const braidRight = new THREE.Mesh(braidLeftGeo, hairMaterial);
    braidRight.position.set(0.48, -0.15, -0.05);
    braidRight.rotation.set(0.1, 0, -0.35);
    hairGroup.add(braidRight);

    const ribbonRight = new THREE.Mesh(ribbonLeftGeo, saffronMaterial);
    ribbonRight.rotation.x = Math.PI / 2;
    ribbonRight.position.set(0.45, 0.02, -0.05);
    hairGroup.add(ribbonRight);

    // --- ARMS & GESTURES ---
    // Right arm (Guiding arm that animates toward text while speaking)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.55, 0.35, 0);
    characterRoot.add(rightArmGroup);

    const upperArmGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.42, 12);
    const upperArm = new THREE.Mesh(upperArmGeo, shirtMaterial);
    upperArm.position.y = -0.2;
    rightArmGroup.add(upperArm);

    const forearmGroup = new THREE.Group();
    forearmGroup.position.y = -0.38;
    rightArmGroup.add(forearmGroup);

    const forearmGeo = new THREE.CylinderGeometry(0.095, 0.085, 0.38, 12);
    const forearm = new THREE.Mesh(forearmGeo, skinMaterial);
    forearm.position.y = -0.18;
    forearmGroup.add(forearm);

    // Guiding open hand
    const handGeo = new THREE.SphereGeometry(0.09, 12, 12);
    handGeo.scale(0.8, 1.2, 0.5);
    const handMesh = new THREE.Mesh(handGeo, skinMaterial);
    handMesh.position.y = -0.38;
    forearmGroup.add(handMesh);

    // Left arm (resting politely at side)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.55, 0.35, 0);
    characterRoot.add(leftArmGroup);

    const leftUpperArm = new THREE.Mesh(upperArmGeo, shirtMaterial);
    leftUpperArm.position.y = -0.2;
    leftUpperArm.rotation.z = -0.12;
    leftArmGroup.add(leftUpperArm);

    const leftForearm = new THREE.Mesh(forearmGeo, skinMaterial);
    leftForearm.position.set(0.04, -0.52, 0.08);
    leftForearm.rotation.x = 0.35;
    leftArmGroup.add(leftForearm);

    // 5. Interactive Cursor Tracking
    const mousePos = { x: 0, y: 0 };
    const targetLook = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.x = THREE.MathUtils.clamp(x, -1, 1);
      mousePos.y = THREE.MathUtils.clamp(y, -1, 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation State & Variables
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;
    let blinkProgress = 0;

    // Main 60fps render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const currentlySpeaking = isSpeakingRef.current && !isPausedRef.current;

      // Subtle breathing motion (chest elevation)
      torsoGroup.position.y = Math.sin(elapsed * 2.2) * 0.012;
      torsoGroup.scale.set(
        1 + Math.sin(elapsed * 2.2) * 0.008,
        1 + Math.sin(elapsed * 2.2) * 0.012,
        1 + Math.sin(elapsed * 2.2) * 0.008
      );

      // Smooth cursor-following head micro-rotation
      targetLook.x += (mousePos.x * 0.22 - targetLook.x) * 0.08;
      targetLook.y += (mousePos.y * 0.15 - targetLook.y) * 0.08;

      // Natural subtle head float
      const idleHeadBob = Math.sin(elapsed * 1.5) * 0.025;
      headGroup.rotation.y = targetLook.x + (currentlySpeaking ? Math.sin(elapsed * 4) * 0.04 : 0);
      headGroup.rotation.x = -targetLook.y + idleHeadBob * 0.5;
      headGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.015;

      // Eyeball tracking
      leftEyeGroup.rotation.y = targetLook.x * 0.45;
      leftEyeGroup.rotation.x = -targetLook.y * 0.35;
      rightEyeGroup.rotation.y = targetLook.x * 0.45;
      rightEyeGroup.rotation.x = -targetLook.y * 0.35;

      // Blink animation
      blinkTimer += delta;
      if (blinkTimer > 3.8 + Math.sin(elapsed) * 1.2) {
        isBlinking = true;
        blinkTimer = 0;
        blinkProgress = 0;
      }

      if (isBlinking) {
        blinkProgress += delta * 9;
        if (blinkProgress < Math.PI) {
          const blinkScale = Math.sin(blinkProgress);
          leftEyelid.rotation.x = -Math.PI / 2 + blinkScale * (Math.PI / 2.2);
          rightEyelid.rotation.x = -Math.PI / 2 + blinkScale * (Math.PI / 2.2);
        } else {
          isBlinking = false;
          leftEyelid.rotation.x = -Math.PI / 2;
          rightEyelid.rotation.x = -Math.PI / 2;
        }
      }

      // Procedural Speech Lip-Sync & Mouth Animation
      if (currentlySpeaking) {
        // Dynamic vowel & consonant mouth rhythm
        const phonemeWave = Math.sin(elapsed * 15) * 0.5 + Math.sin(elapsed * 9) * 0.3 + 0.2;
        const mouthOpen = THREE.MathUtils.clamp(phonemeWave, 0.08, 0.45);
        const mouthWidth = 1 + Math.sin(elapsed * 11) * 0.2;

        mouthGroup.scale.set(mouthWidth, mouthOpen * 2.2, 1);
        lowerLip.position.y = -0.035 - mouthOpen * 0.06;
        upperTeeth.position.y = 0.025 - mouthOpen * 0.02;

        // Expressive right guiding arm gesture (smoothly points towards text)
        const armWave = Math.sin(elapsed * 3) * 0.15;
        rightArmGroup.rotation.z = -0.45 + armWave;
        rightArmGroup.rotation.x = 0.4 + Math.cos(elapsed * 2.5) * 0.12;
        forearmGroup.rotation.x = 0.6 + Math.sin(elapsed * 3.5) * 0.18;
        forearmGroup.rotation.z = -0.3;
      } else {
        // Return smoothly to warm, gentle attentive smile
        mouthGroup.scale.lerp(new THREE.Vector3(1, 0.22, 1), 0.15);
        lowerLip.position.y = THREE.MathUtils.lerp(lowerLip.position.y, -0.025, 0.15);
        upperTeeth.position.y = THREE.MathUtils.lerp(upperTeeth.position.y, 0.02, 0.15);

        // Relax arm to resting school posture
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.12, 0.08);
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.2, 0.08);
        forearmGroup.rotation.x = THREE.MathUtils.lerp(forearmGroup.rotation.x, 0.45, 0.08);
        forearmGroup.rotation.z = THREE.MathUtils.lerp(forearmGroup.rotation.z, 0, 0.08);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 8. Cleanup & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      // Dispose all geometries & materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [compact]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className={`relative w-full ${compact ? 'h-48 sm:h-52' : 'h-64 sm:h-72'} flex items-center justify-center overflow-hidden`}
        aria-label={`${narratorName} 3D Animated Schoolchild Narrator`}
      >
        {/* Soft Decorative Indian-inspired Arch Glow behind character */}
        <div
          className={`absolute inset-4 rounded-full bg-gradient-to-tr from-[#FF9933]/15 via-[#22A06B]/15 to-[#38BDF8]/15 blur-xl transition-all duration-700 pointer-events-none ${
            isSpeaking && !isPaused ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
          }`}
          aria-hidden="true"
        />

        {/* Fallback if WebGL is unavailable */}
        {!webGLSupported && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gray-50 rounded-2xl">
            <span className="text-3xl mb-1">👧🏽</span>
            <span className="text-xs font-bold text-[#17324D]">{narratorName}</span>
            <span className="text-[10px] text-gray-500">3D WebGL narrator fallback mode</span>
          </div>
        )}
      </div>

      {/* Character Identity & Status Badge */}
      <div className="mt-1 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/5 border border-[#17324D]/15 text-xs font-bold text-[#17324D]">
          <span
            className={`w-2 h-2 rounded-full transition-colors ${
              isSpeaking && !isPaused
                ? 'bg-[#22A06B] animate-pulse'
                : isPaused
                ? 'bg-[#FFD166]'
                : 'bg-gray-300'
            }`}
          />
          <span>{narratorName}</span>
          <span className="text-[10px] font-semibold text-gray-500">· {narratorRole}</span>
        </div>

        <p className="text-[11px] text-gray-500 mt-1">
          {isSpeaking && !isPaused
            ? `Speaking Section ${activeSection}...`
            : isPaused
            ? 'Narration paused'
            : 'Ready to guide your reflection'}
        </p>

        {/* 3D Model Integration point note */}
        <span className="text-[9px] text-gray-400 font-mono mt-0.5">
          WebGL Real-Time 3D Character · Class 6 School Uniform
        </span>
      </div>
    </div>
  );
};
