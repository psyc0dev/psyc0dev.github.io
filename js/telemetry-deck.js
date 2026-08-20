/**
 * Altitude / psyc0dev — Telemetry Operations Deck
 * Real-time 60FPS dual-channel oscillograph, distributed node topology laser network,
 * live deterministic eBPF kernel syslog stream, and dynamic KPI monitors.
 * Built with vanilla Canvas 2D & requestAnimationFrame (Zero external dependencies).
 */

class TelemetryOperationsDeck {
  constructor(canvasId = 'telemetry-oscilloscope-canvas', topologyCanvasId = 'telemetry-topology-canvas') {
    this.oscCanvas = document.getElementById(canvasId);
    this.topCanvas = document.getElementById(topologyCanvasId);
    this.streamLogEl = document.getElementById('telemetry-stream-log');

    this.isPlaying = true;
    this.speedMultiplier = 1;
    this.activeFilter = 'ALL';
    this.activeNodeIndex = 0;

    this.nodes = [
      { id: 'SYS-01', name: 'Synapse WebGL', x: 0.2, y: 0.35, ping: '0.42ms', cpu: '11.4%', state: 'GPU SHADERS', stack: 'WebGL2 / GLSL', packets: 482100 },
      { id: 'SYS-02', name: 'Aether Protocol', x: 0.5, y: 0.25, ping: '0.78ms', cpu: '18.9%', state: 'RAFT LEADER', stack: 'Rust / Tokio', packets: 924300 },
      { id: 'SYS-03', name: 'Hyperion Daemon', x: 0.8, y: 0.45, ping: '0.94ms', cpu: '14.2%', state: 'eBPF PROBES', stack: 'Go / Linux C', packets: 651200 },
      { id: 'SYS-04', name: 'Altitude Design', x: 0.45, y: 0.75, ping: '0.51ms', cpu: '6.8%', state: 'DETERMINISTIC', stack: 'CSS / Tokens', packets: 389400 }
    ];

    this.packetsInFlight = [];
    this.time = 0;
    this.logHistory = [];
    this.logInterval = null;

    this.init();
  }

  init() {
    this.initCanvases();
    this.bindEvents();
    this.startOscilloscope();
    this.startKernelStream();
    this.startKpiFluctuations();
  }

  initCanvases() {
    const resizeCanvas = (canvas) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };

    if (this.oscCanvas) resizeCanvas(this.oscCanvas);
    if (this.topCanvas) resizeCanvas(this.topCanvas);

    window.addEventListener('resize', () => {
      if (this.oscCanvas) resizeCanvas(this.oscCanvas);
      if (this.topCanvas) resizeCanvas(this.topCanvas);
    });
  }

  bindEvents() {
    // Stream mode selector buttons
    document.querySelectorAll('.telemetry-stream-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.telemetry-stream-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter || 'ALL';
        this.injectLog(`[SYSTEM] Switched telemetry filter to: ${this.activeFilter}`, 'accent');
      });
    });

    // Play/Pause button
    const toggleBtn = document.getElementById('telemetry-toggle-play');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        toggleBtn.innerHTML = this.isPlaying 
          ? `<i data-lucide="pause" style="width: 13px; height: 13px;"></i><span>Pause Stream</span>` 
          : `<i data-lucide="play" style="width: 13px; height: 13px;"></i><span>Resume Stream</span>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }

    // Load Spike Simulation button
    const injectBtn = document.getElementById('telemetry-inject-spike');
    if (injectBtn) {
      injectBtn.addEventListener('click', () => {
        this.triggerPacketBurst();
        this.injectLog(`[INJECT_SPIKE] Simulating 100,000 synthetic state sync frames...`, 'danger');
        this.injectLog(`[EBPF_PROBE] Tracepoint socket_read: 0x7FFF8A4C -> Latency spike absorbed (p99: 1.42ms)`, 'accent');
      });
    }

    // Interactive Node Click on Topology Canvas
    if (this.topCanvas) {
      this.topCanvas.addEventListener('click', (e) => {
        const rect = this.topCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.nodes.forEach((node, idx) => {
          const nx = node.x * rect.width;
          const ny = node.y * rect.height;
          const dist = Math.hypot(mouseX - nx, mouseY - ny);
          if (dist < 28) {
            this.activeNodeIndex = idx;
            this.updateNodeInspector(node);
            this.sendPacket(idx, (idx + 1) % this.nodes.length);
            this.injectLog(`[TOPOLOGY] Probed node ${node.id} (${node.name}): Status ${node.state} // RTT: ${node.ping}`, 'accent');
          }
        });
      });
    }
  }

  updateNodeInspector(node) {
    const inspectEl = document.getElementById('telemetry-node-inspector');
    if (!inspectEl) return;
    inspectEl.innerHTML = `
      <div style="color: var(--color-voltage-blue); font-weight: 600; font-size: 13px;">${node.id} — ${node.name}</div>
      <div style="font-size: 11px; color: var(--color-fog); margin-top: 4px; line-height: 1.6;">
        <div>SYSTEM STACK: <span style="color: var(--color-bone); font-weight: 500;">${node.stack}</span></div>
        <div>RUNTIME STATUS: <span style="color: var(--color-bone);">${node.state}</span></div>
        <div>ROUNDTRIP: <span style="color: var(--color-voltage-blue);">${node.ping}</span></div>
        <div>TOTAL OPS: <span style="color: var(--color-bone);">${node.packets.toLocaleString()} frames</span></div>
      </div>
    `;
  }

  sendPacket(fromIdx, toIdx) {
    this.packetsInFlight.push({
      from: fromIdx,
      to: toIdx,
      progress: 0,
      speed: 0.02 + Math.random() * 0.015
    });
  }

  triggerPacketBurst() {
    for (let i = 0; i < 8; i++) {
      const from = Math.floor(Math.random() * this.nodes.length);
      let to = Math.floor(Math.random() * this.nodes.length);
      if (to === from) to = (from + 1) % this.nodes.length;
      this.sendPacket(from, to);
    }
  }

  startOscilloscope() {
    const render = () => {
      requestAnimationFrame(render);
      if (!this.isPlaying) return;

      this.time += 0.035;

      // 1. Draw Oscilloscope Waveforms
      if (this.oscCanvas) {
        const ctx = this.oscCanvas.getContext('2d');
        const rect = this.oscCanvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        ctx.clearRect(0, 0, w, h);

        // Draw Subtle Grid
        ctx.strokeStyle = 'rgba(38, 38, 38, 0.6)';
        ctx.lineWidth = 1;
        const gridStep = 24;
        ctx.beginPath();
        for (let x = 0; x < w; x += gridStep) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let y = 0; y < h; y += gridStep) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();

        // Channel A: Voltage Blue Waveform (Packet Latency)
        ctx.strokeStyle = '#2b7fff';
        ctx.lineWidth = 1.75;
        ctx.shadowColor = 'rgba(43, 127, 255, 0.45)';
        ctx.shadowBlur = 8;
        ctx.beginPath();

        const midY = h * 0.45;
        for (let x = 0; x < w; x += 2) {
          const angle = (x * 0.02) + this.time;
          const harmonic = Math.sin(angle * 2.2) * 0.35 + Math.cos(angle * 0.8) * 0.4;
          const jitter = (Math.sin(x * 0.15 + this.time * 4) * 3.5);
          const y = midY + Math.sin(angle) * 22 * harmonic + jitter;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Channel B: Fog Waveform (Ring Buffer Saturation)
        ctx.strokeStyle = 'rgba(164, 161, 155, 0.4)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        const midY2 = h * 0.75;
        for (let x = 0; x < w; x += 3) {
          const angle = (x * 0.015) - (this.time * 0.7);
          const y = midY2 + Math.sin(angle) * 14;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 2. Draw Distributed Topology Canvas
      if (this.topCanvas) {
        const ctx = this.topCanvas.getContext('2d');
        const rect = this.topCanvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        ctx.clearRect(0, 0, w, h);

        // Draw Interconnection Network Lines
        ctx.strokeStyle = 'rgba(50, 50, 50, 0.8)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        for (let i = 0; i < this.nodes.length; i++) {
          for (let j = i + 1; j < this.nodes.length; j++) {
            ctx.beginPath();
            ctx.moveTo(this.nodes[i].x * w, this.nodes[i].y * h);
            ctx.lineTo(this.nodes[j].x * w, this.nodes[j].y * h);
            ctx.stroke();
          }
        }
        ctx.setLineDash([]);

        // Periodically spawn random packets
        if (Math.random() < 0.035) {
          const from = Math.floor(Math.random() * this.nodes.length);
          let to = Math.floor(Math.random() * this.nodes.length);
          if (to === from) to = (from + 1) % this.nodes.length;
          this.sendPacket(from, to);
        }

        // Draw and update packets in flight
        for (let i = this.packetsInFlight.length - 1; i >= 0; i--) {
          const p = this.packetsInFlight[i];
          p.progress += p.speed;

          const fromNode = this.nodes[p.from];
          const toNode = this.nodes[p.to];
          const curX = (fromNode.x + (toNode.x - fromNode.x) * p.progress) * w;
          const curY = (fromNode.y + (toNode.y - fromNode.y) * p.progress) * h;

          ctx.fillStyle = '#2b7fff';
          ctx.shadowColor = '#2b7fff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(curX, curY, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          if (p.progress >= 1) {
            this.packetsInFlight.splice(i, 1);
            toNode.packets += 12;
          }
        }

        // Draw Nodes
        this.nodes.forEach((node, idx) => {
          const nx = node.x * w;
          const ny = node.y * h;
          const isActive = idx === this.activeNodeIndex;

          // Pulse Aura
          const pulse = Math.sin(this.time * 3 + idx) * 3;
          ctx.fillStyle = isActive ? 'rgba(43, 127, 255, 0.2)' : 'rgba(38, 38, 38, 0.5)';
          ctx.beginPath();
          ctx.arc(nx, ny, 16 + pulse, 0, Math.PI * 2);
          ctx.fill();

          // Node Circle
          ctx.fillStyle = isActive ? '#2b7fff' : '#1f1f1f';
          ctx.strokeStyle = isActive ? '#eeeeee' : '#323232';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(nx, ny, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Node Text Label
          ctx.fillStyle = isActive ? '#eeeeee' : '#a4a19b';
          ctx.font = '10px "Fira Code", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.id, nx, ny + 20);
        });
      }
    };

    render();
  }

  startKernelStream() {
    const templates = [
      { text: '[EBPF] probe_sock_read: fd=14 len=1420 rtt=0.64ms ok', type: 'accent', cat: 'EBPF' },
      { text: '[RAFT] term=4842 committed index=942084 node=N2 consensus=sync', type: 'bone', cat: 'RAFT' },
      { text: '[MEM] ring_buffer alloc 0x7FFF942A offset=0x40 saturation=14.2%', type: 'dim', cat: 'MEM' },
      { text: '[NET] websocket binary frame emitted -> N3 (Tokyo -> VA) 1.1ms', type: 'dim', cat: 'SYS' },
      { text: '[KERNEL] zero-copy tcp packet pass-through: CPU cycle: 420ns', type: 'accent', cat: 'EBPF' },
      { text: '[CONSENSUS] lock-free memory ring queue flushed: 0 dropped', type: 'bone', cat: 'RAFT' },
      { text: '[PROBE] syscall trace: clock_gettime(CLOCK_MONOTONIC_RAW) ok', type: 'dim', cat: 'SYS' }
    ];

    setInterval(() => {
      if (!this.isPlaying) return;
      const t = templates[Math.floor(Math.random() * templates.length)];
      if (this.activeFilter === 'ALL' || t.cat === this.activeFilter) {
        const timeStr = new Date().toISOString().substring(11, 23);
        this.injectLog(`<span style="color: var(--color-smoke);">${timeStr}</span> ${t.text}`, t.type);
      }
    }, 450);
  }

  injectLog(htmlText, styleClass = '') {
    if (!this.streamLogEl) return;
    const line = document.createElement('div');
    line.className = `stream-log-line ${styleClass}`;
    line.innerHTML = htmlText;
    this.streamLogEl.appendChild(line);

    // Keep max 60 lines
    while (this.streamLogEl.children.length > 60) {
      this.streamLogEl.removeChild(this.streamLogEl.firstChild);
    }
    this.streamLogEl.scrollTop = this.streamLogEl.scrollHeight;
  }

  startKpiFluctuations() {
    const p99El = document.getElementById('telemetry-kpi-latency');
    const throughputEl = document.getElementById('telemetry-kpi-throughput');
    const saturationEl = document.getElementById('telemetry-kpi-saturation');

    setInterval(() => {
      if (!this.isPlaying) return;
      if (p99El) {
        const lat = (0.76 + Math.random() * 0.12).toFixed(2);
        p99El.textContent = `${lat}ms`;
      }
      if (throughputEl) {
        const tp = (1.42 + (Math.random() * 0.14 - 0.07)).toFixed(2);
        throughputEl.textContent = `${tp}M ops/s`;
      }
      if (saturationEl) {
        const sat = (14.0 + Math.random() * 1.8).toFixed(1);
        saturationEl.textContent = `${sat}%`;
      }
    }, 1200);
  }
}

window.TelemetryOperationsDeck = TelemetryOperationsDeck;
