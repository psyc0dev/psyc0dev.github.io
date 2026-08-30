// WebGL / Three.js 3D Mesh Text Engine for Double Life
const WORD_SYNCED_LYRICS = [
  { time: 2.02, text: "yeah", isAdlib: false },
  { time: 5.97, text: "yeah", isAdlib: false },
  { time: 8.27, text: "hey,", isAdlib: false },
  { time: 8.72, text: "what are you", isAdlib: false },
  { time: 9.17, text: "hiding?", isAdlib: false },
  { time: 10.27, text: "what you doin'", isAdlib: false },
  { time: 10.97, text: "when you're gone?", isAdlib: false },
  { time: 12.17, text: "nothing wrong", isAdlib: false },
  { time: 12.97, text: "being private", isAdlib: false },
  { time: 14.37, text: "make sure", isAdlib: false },
  { time: 14.77, text: "it ain't wrong", isAdlib: false },
  { time: 16.07, text: "your life", isAdlib: false },
  { time: 16.77, text: "double-sided", isAdlib: false },
  { time: 18.27, text: "two-faced", isAdlib: false },
  { time: 18.87, text: "like coins", isAdlib: false },
  { time: 20.17, text: "what side", isAdlib: false },
  { time: 20.82, text: "do i get?", isAdlib: false },
  { time: 22.07, text: "which side", isAdlib: false },
  { time: 22.72, text: "are you on?", isAdlib: false },
  { time: 23.47, text: "so", isAdlib: false },
  { time: 23.67, text: "what have you done?", isAdlib: false },
  { time: 26.32, text: "some of your dirt", isAdlib: false },
  { time: 27.47, text: "has come to light", isAdlib: false },
  { time: 29.72, text: "why were you speedin'", isAdlib: false },
  { time: 30.87, text: "up that hill", isAdlib: false },
  { time: 31.67, text: "until the brakes", isAdlib: false },
  { time: 32.57, text: "come off?", isAdlib: false },
  { time: 34.47, text: "and someone saw you", isAdlib: false },
  { time: 35.72, text: "in a fight", isAdlib: false },
  { time: 37.47, text: "am i right?", isAdlib: false },
  { time: 40.97, text: "it doesn't matter", isAdlib: false },
  { time: 42.42, text: "to you", isAdlib: false },
  { time: 43.37, text: "if you get heads", isAdlib: false },
  { time: 44.47, text: "or tails", isAdlib: false },
  { time: 45.77, text: "you just don't like", isAdlib: false },
  { time: 47.07, text: "to flip", isAdlib: false },
  { time: 47.87, text: "all the time", isAdlib: false },
  { time: 48.97, text: "but if you spin it,", isAdlib: false },
  { time: 50.37, text: "then you get", isAdlib: false },
  { time: 51.42, text: "to see both sides", isAdlib: false },
  { time: 53.32, text: "oh,", isAdlib: false },
  { time: 54.02, text: "the thrill of the", isAdlib: false },
  { time: 55.12, text: "double life", isAdlib: false },
  { time: 57.17, text: "lie detector time", isAdlib: false },
  { time: 60.27, text: "do you feel bad", isAdlib: false },
  { time: 61.62, text: "when you lie?", isAdlib: false },
  { time: 64.52, text: "the look on your face", isAdlib: false },
  { time: 65.77, text: "says the best life", isAdlib: false },
  { time: 68.32, text: "and then come home", isAdlib: false },
  { time: 69.32, text: "like it's fine", isAdlib: false },
  { time: 71.07, text: "am i right?", isAdlib: false },
  { time: 73.07, text: "so", isAdlib: false },
  { time: 73.62, text: "what have you done?", isAdlib: false },
  { time: 76.22, text: "some of your dirt", isAdlib: false },
  { time: 77.32, text: "has come to light", isAdlib: false },
  { time: 79.67, text: "why were you speedin'", isAdlib: false },
  { time: 80.82, text: "up that hill", isAdlib: false },
  { time: 81.87, text: "until the brakes", isAdlib: false },
  { time: 82.42, text: "come off?", isAdlib: false },
  { time: 84.47, text: "and someone saw you", isAdlib: false },
  { time: 85.72, text: "in a fight", isAdlib: false },
  { time: 87.47, text: "am i right?", isAdlib: false },
  { time: 90.97, text: "it doesn't matter", isAdlib: false },
  { time: 92.42, text: "to you", isAdlib: false },
  { time: 93.37, text: "if you get heads", isAdlib: false },
  { time: 94.47, text: "or tails", isAdlib: false },
  { time: 95.77, text: "you just don't like", isAdlib: false },
  { time: 97.07, text: "to flip", isAdlib: false },
  { time: 97.87, text: "all the time", isAdlib: false },
  { time: 98.97, text: "but if you spin it,", isAdlib: false },
  { time: 100.37, text: "then you get", isAdlib: false },
  { time: 101.42, text: "to see both sides", isAdlib: false },
  { time: 103.32, text: "oh,", isAdlib: false },
  { time: 104.02, text: "the thrill of the", isAdlib: false },
  { time: 105.12, text: "double life", isAdlib: false },
  { time: 106.17, text: "who will you be", isAdlib: false },
  { time: 107.37, text: "tonight?", isAdlib: false },
  { time: 108.07, text: "that's the question", isAdlib: false },
  { time: 109.67, text: "who will Gru be", isAdlib: false },
  { time: 111.07, text: "tonight?", isAdlib: false },
  { time: 112.07, text: "that's the question", isAdlib: false },
  { time: 117.57, text: "i know you heard", isAdlib: false },
  { time: 118.82, text: "the rumors", isAdlib: false },
  { time: 119.77, text: "you must get over", isAdlib: false },
  { time: 121.17, text: "to it right away", isAdlib: false },
  { time: 125.72, text: "if anyone can do it,", isAdlib: false },
  { time: 127.72, text: "you gotta get there soon,", isAdlib: false },
  { time: 129.52, text: "it's not okay", isAdlib: false },
  { time: 131.77, text: "you got cars to drive,", isAdlib: false },
  { time: 133.42, text: "plenty jets to fly", isAdlib: false },
  { time: 135.27, text: "when will you arrive?", isAdlib: false },
  { time: 136.97, text: "you're running out of time", isAdlib: false },
  { time: 139.32, text: "don't you see that", isAdlib: false },
  { time: 140.67, text: "everything is on the line?", isAdlib: false },
  { time: 143.47, text: "so i'm sorry,", isAdlib: false },
  { time: 144.82, text: "but you have to", isAdlib: false },
  { time: 145.67, text: "choose a side", isAdlib: false },
  { time: 147.32, text: "you'll never know", isAdlib: false },
  { time: 148.72, text: "when it's your time to go", isAdlib: false },
  { time: 151.77, text: "and where you end up", isAdlib: false },
  { time: 153.17, text: "in life, that's code", isAdlib: false },
  { time: 155.77, text: "you can't ignore,", isAdlib: false },
  { time: 157.02, text: "you're spinning your life", isAdlib: false },
  { time: 159.32, text: "your watch is broken", isAdlib: false },
  { time: 160.77, text: "'cause you spent all your time", isAdlib: false },
  { time: 163.37, text: "it's now or never,", isAdlib: false },
  { time: 165.02, text: "on this, everything rides", isAdlib: false },
  { time: 167.42, text: "before the spinning stops,", isAdlib: false },
  { time: 169.52, text: "you must pick a side", isAdlib: false },
  { time: 173.67, text: "who will you be", isAdlib: false },
  { time: 175.17, text: "tonight?", isAdlib: false },
  { time: 176.17, text: "that's the question", isAdlib: false },
  { time: 177.72, text: "who will Gru be", isAdlib: false },
  { time: 179.17, text: "tonight?", isAdlib: false },
  { time: 180.17, text: "that's the question", isAdlib: false },
  { time: 181.67, text: "who will you be", isAdlib: false },
  { time: 183.17, text: "tonight?", isAdlib: false },
  { time: 184.17, text: "that's the question", isAdlib: false },
  { time: 186.12, text: "who will Gru be tonight?", isAdlib: false },
  { time: 188.32, text: "that's the question", isAdlib: false },
];

const QUEUE_DATA = WORD_SYNCED_LYRICS.map(item => ({
  timestampMs: Math.round(item.time * 1000),
  text: item.text,
  isAdlib: !!item.isAdlib
})).sort((a, b) => a.timestampMs - b.timestampMs);

class ThreeKineticEngine {
  constructor() {
    this.canvas = document.getElementById('kinetic-canvas');
    this.audio = document.getElementById('site-audio-element');
    if (!this.canvas || !this.audio || typeof THREE === 'undefined') return;

    this.lyricsQueue = QUEUE_DATA;
    this.currentIdx = 0;
    this.activeParticles = [];
    this.loadedFont = null;

    this.playbackTimeMs = 0;
    this.lastAudioTime = 0;
    this.lastAudioPerf = performance.now();

    this.initThree();
    this.loadFont();
    this.bindEvents();
    this.startLoop();
  }

  initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera (45deg FOV for natural 3D perspective)
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    this.camera.position.set(0, 0, 650);

    // High-performance WebGL Renderer with transparency
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);

    // Lights
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(this.ambientLight);

    // Key directional light for bevel highlights
    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    this.dirLight.position.set(150, 250, 300);
    this.scene.add(this.dirLight);

    // Voltage Blue accent rim light for vibrant edge reflections
    this.bluePointLight = new THREE.PointLight(0x2b7fff, 4.0, 800);
    this.bluePointLight.position.set(0, -50, 180);
    this.scene.add(this.bluePointLight);
  }

  loadFont() {
    const loader = new THREE.FontLoader();
    loader.load(
      'assets/fonts/helvetiker_bold.typeface.json',
      (font) => {
        this.loadedFont = font;
      },
      undefined,
      (err) => {
        console.warn('Local font load fallback:', err);
        // Fallback to CDN if local font fails
        loader.load('https://unpkg.com/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json', (cdnFont) => {
          this.loadedFont = cdnFont;
        });
      }
    );
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    this.audio.addEventListener('seeked', () => this.resync(this.audio.currentTime * 1000));
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  resync(timeMs) {
    this.activeParticles.forEach(p => {
      this.scene.remove(p.mesh);
      if (p.mesh.geometry) p.mesh.geometry.dispose();
      if (Array.isArray(p.mesh.material)) {
        p.mesh.material.forEach(m => m.dispose());
      } else if (p.mesh.material) {
        p.mesh.material.dispose();
      }
    });
    this.activeParticles = [];
    this.currentIdx = 0;

    const now = Date.now();
    for (let i = 0; i < this.lyricsQueue.length; i++) {
      const line = this.lyricsQueue[i];
      const nextStart = i + 1 < this.lyricsQueue.length ? this.lyricsQueue[i + 1].timestampMs : line.timestampMs + 2800;
      const duration = Math.max(1400, Math.min(3600, nextStart - line.timestampMs + 500));

      if (timeMs >= line.timestampMs) {
        const timeSince = timeMs - line.timestampMs;
        if (timeSince < duration) {
          this.spawnParticle(line.text, now - timeSince, duration, line.isAdlib);
        }
        this.currentIdx = i + 1;
      } else {
        break;
      }
    }
  }

  spawnParticle(text, spawnTimeMs, durationMs, isAdlib = false) {
    if (!text || !text.trim() || !this.loadedFont) return;

    // Keep active 3D meshes performant (max 4 on screen)
    while (this.activeParticles.length >= 4) {
      const oldest = this.activeParticles.shift();
      this.scene.remove(oldest.mesh);
      if (oldest.mesh.geometry) oldest.mesh.geometry.dispose();
      if (Array.isArray(oldest.mesh.material)) {
        oldest.mesh.material.forEach(m => m.dispose());
      }
    }

    // Adaptive font size based on screen width (compact & refined)
    const isMobile = window.innerWidth < 640;
    const fontSize = isMobile ? 13 : (text.length > 20 ? 15 : (text.length > 12 ? 17 : 20));
    const extrudeDepth = isMobile ? 2.5 : 3.5;

    // 3D Extruded Geometry with Smooth Bevels
    const geometry = new THREE.TextGeometry(text, {
      font: this.loadedFont,
      size: fontSize,
      height: extrudeDepth,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.7,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 3
    });

    geometry.computeBoundingBox();
    geometry.center(); // Center rotation and positioning around origin

    // Multi-material: Front face is crisp Bone/White, Sides/Bevels have dark metallic depth
    const frontMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.45,
      transparent: true,
      opacity: 0
    });

    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x1a2130,
      roughness: 0.35,
      metalness: 0.8,
      emissive: 0x071530,
      transparent: true,
      opacity: 0
    });

    const mesh = new THREE.Mesh(geometry, [frontMat, sideMat]);

    // Random 3D World Positioning
    const boundsX = isMobile ? 120 : 220;
    const boundsY = isMobile ? 140 : 160;
    const startX = (Math.random() * 2 - 1) * boundsX;
    const startY = (Math.random() * 2 - 1) * boundsY - 20;
    const startZ = (Math.random() * 2 - 1) * 80 - 40;

    const baseRotX = (Math.random() * 2 - 1) * 0.18;
    const baseRotY = (Math.random() * 2 - 1) * 0.25;
    const baseRotZ = (Math.random() * 2 - 1) * 0.08;

    mesh.position.set(startX, startY, startZ);
    mesh.rotation.set(baseRotX, baseRotY, baseRotZ);
    mesh.scale.set(0.1, 0.1, 0.1);

    this.scene.add(mesh);

    this.activeParticles.push({
      mesh,
      spawnTimeMs,
      durationMs,
      startX,
      startY,
      startZ,
      baseRotX,
      baseRotY,
      baseRotZ,
      floatSpeedY: 20 + Math.random() * 15,
      floatSpeedX: (Math.random() - 0.5) * 10,
      frontMat,
      sideMat
    });
  }

  getExactTimeMs() {
    if (this.audio.paused) return this.audio.currentTime * 1000;

    const nowPerf = performance.now();
    if (this.audio.currentTime > 0) {
      if (this.audio.currentTime !== this.lastAudioTime) {
        this.lastAudioTime = this.audio.currentTime;
        this.lastAudioPerf = nowPerf;
      }
      const elapsedSec = (nowPerf - this.lastAudioPerf) / 1000;
      const interpolatedSec = Math.min(this.audio.currentTime + elapsedSec, (this.audio.duration || 190));
      return Math.round(interpolatedSec * 1000);
    }
    return this.audio.currentTime * 1000;
  }

  startLoop() {
    const tick = () => {
      const now = Date.now();

      // Check lyrics timeline if audio is playing
      if (!this.audio.paused) {
        this.playbackTimeMs = this.getExactTimeMs();
        const leadTimeMs = this.playbackTimeMs + 40;

        while (this.currentIdx < this.lyricsQueue.length) {
          const line = this.lyricsQueue[this.currentIdx];
          const nextStart = this.currentIdx + 1 < this.lyricsQueue.length ? this.lyricsQueue[this.currentIdx + 1].timestampMs : line.timestampMs + 2800;
          const duration = Math.max(1400, Math.min(3600, nextStart - line.timestampMs + 500));

          if (leadTimeMs >= line.timestampMs) {
            const timeSince = leadTimeMs - line.timestampMs;
            if (timeSince < duration) {
              this.spawnParticle(line.text, now - timeSince, duration, line.isAdlib);
            }
            this.currentIdx++;
          } else {
            break;
          }
        }
      }

      // Animate active 3D Text Meshes
      for (let i = this.activeParticles.length - 1; i >= 0; i--) {
        const p = this.activeParticles[i];
        const elapsed = now - p.spawnTimeMs;

        if (elapsed >= p.durationMs) {
          this.scene.remove(p.mesh);
          if (p.mesh.geometry) p.mesh.geometry.dispose();
          p.frontMat.dispose();
          p.sideMat.dispose();
          this.activeParticles.splice(i, 1);
          continue;
        }

        const progress = Math.max(0, Math.min(1, elapsed / p.durationMs));
        let alpha = 1;
        let scale = 1;

        if (progress < 0.15) {
          // Entrance cubic-out with scale bounce
          const t = progress / 0.15;
          alpha = 1 - Math.pow(1 - t, 3);
          scale = 0.5 + 0.5 * (1 + 1.8 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2));
        } else if (progress > 0.80) {
          // Exit fade out
          const t = (progress - 0.80) / 0.20;
          alpha = 1 - Math.pow(t, 2);
          scale = 1 - 0.05 * t;
        }

        // Apply smooth 3D transform & floating drift
        const currentY = p.startY + progress * p.floatSpeedY;
        const currentX = p.startX + Math.sin(progress * Math.PI) * p.floatSpeedX;
        const currentZ = p.startZ + progress * 15;

        p.mesh.position.set(currentX, currentY, currentZ);
        p.mesh.rotation.set(
          p.baseRotX + Math.sin(progress * 2) * 0.04,
          p.baseRotY + Math.cos(progress * 2) * 0.05,
          p.baseRotZ
        );
        p.mesh.scale.set(scale, scale, scale);

        // Apply material opacity
        p.frontMat.opacity = Math.max(0, Math.min(1, alpha));
        p.sideMat.opacity = Math.max(0, Math.min(1, alpha * 0.95));
      }

      // Render Three.js Scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.threeKineticEngine = new ThreeKineticEngine();
});
