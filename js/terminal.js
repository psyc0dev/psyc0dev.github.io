/**
 * Altitude / psyc0dev — Terminal Workstation Engine
 * Financial editorial register with Voltage Blue (#2b7fff) accents,
 * real-time inline ghost suggestions, and Tab-completion.
 */

class DeveloperTerminal {
  constructor(containerId = 'developer-terminal') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.historyEl = this.container.querySelector('.terminal-history');
    this.inputEl = this.container.querySelector('.terminal-input');
    this.ghostHintEl = this.container.querySelector('.terminal-ghost-hint');
    this.mainPaneEl = this.container.querySelector('.terminal-main-pane');

    this.commandHistory = [];
    this.historyIndex = -1;
    this.activeSuggestion = '';

    this.suggestList = [
      'help',
      'neofetch',
      'projects',
      'workflows',
      'skills',
      'contact',
      'clear',
      'date',
      'echo',
      'sudo',
      'cat',
      'cat DESIGN.md',
      'cat README.md'
    ];

    this.commands = {
      help: {
        desc: 'List all available platform commands',
        action: () => this.cmdHelp()
      },
      neofetch: {
        desc: 'Display system telemetry & editorial design tokens',
        action: () => this.cmdNeofetch()
      },
      projects: {
        desc: 'List featured open-source repositories and systems',
        action: () => this.cmdProjects()
      },
      workflows: {
        desc: 'Inspect automated orchestration pipelines',
        action: () => this.cmdWorkflows()
      },
      skills: {
        desc: 'Display technical stack and architecture matrix',
        action: () => this.cmdSkills()
      },
      contact: {
        desc: 'Get direct dispatch channels and email endpoint',
        action: () => this.cmdContact()
      },
      clear: {
        desc: 'Clear the terminal history buffer',
        action: () => this.cmdClear()
      },
      date: {
        desc: 'Print current UTC server timestamp',
        action: () => `<span class="dim">[TIMESTAMP]</span> ${new Date().toUTCString()}`
      },
      echo: {
        desc: 'Print given text to console',
        action: (args) => args.join(' ') || '<span class="dim">(empty)</span>'
      },
      sudo: {
        desc: 'Execute with elevated privileges',
        action: () => `<span class="danger">[PERMISSION DENIED] User 'guest' is not in the sudoers file. Incident reported to psyc0dev.</span>`
      },
      cat: {
        desc: 'Inspect file contents (e.g., cat DESIGN.md)',
        action: (args) => {
          const file = (args[0] || '').toLowerCase();
          if (file === 'design.md' || file === 'design') {
            return `<span class="accent"># Altitude — Style Reference</span>\nMidnight financial editorial — darkened trading floor printed on bone-white serif stock.\nPalette: Carbon (#181818), Bone (#eeeeee), Voltage Blue (#2b7fff).`;
          }
          if (file === 'readme.md' || file === 'readme') {
            return `<span class="accent"># psyc0dev Portfolio v2.0</span>\nCreative Technologist & Systems Engineer.\nCrafted with Three.js, GSAP & Lucide.`;
          }
          return `<span class="danger">cat: ${args[0] || 'file'}: No such file or directory. Try 'cat DESIGN.md'</span>`;
        }
      }
    };

    this.init();
  }

  init() {
    this.printInitialBanner();
    this.bindEvents();
  }

  updateGhostHint() {
    if (!this.ghostHintEl || !this.inputEl) return;
    const val = this.inputEl.value;

    if (!val || !val.trim()) {
      this.ghostHintEl.textContent = '';
      this.activeSuggestion = '';
      return;
    }

    const valLower = val.toLowerCase();
    const match = this.suggestList.find(cmd => cmd.toLowerCase().startsWith(valLower) && cmd.toLowerCase() !== valLower);

    if (match) {
      this.activeSuggestion = val + match.slice(val.length);
      this.ghostHintEl.textContent = this.activeSuggestion;
    } else {
      this.ghostHintEl.textContent = '';
      this.activeSuggestion = '';
    }
  }

  bindEvents() {
    if (!this.inputEl) return;

    // Real-time input for inline ghost hint
    this.inputEl.addEventListener('input', () => {
      this.updateGhostHint();
    });

    this.inputEl.addEventListener('keydown', (e) => {
      // Tab or ArrowRight completion
      if (e.key === 'Tab' || (e.key === 'ArrowRight' && this.inputEl.selectionStart === this.inputEl.value.length)) {
        if (this.activeSuggestion) {
          e.preventDefault();
          this.inputEl.value = this.activeSuggestion;
          this.updateGhostHint();
          return;
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.autocomplete();
          return;
        }
      }

      if (e.key === 'Enter') {
        const rawCmd = this.inputEl.value.trim();
        this.inputEl.value = '';
        this.updateGhostHint();

        if (rawCmd) {
          this.execute(rawCmd);
          this.commandHistory.push(rawCmd);
          this.historyIndex = this.commandHistory.length;
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.commandHistory.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.commandHistory[this.historyIndex];
          this.updateGhostHint();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.commandHistory[this.historyIndex];
          this.updateGhostHint();
        } else {
          this.historyIndex = this.commandHistory.length;
          this.inputEl.value = '';
          this.updateGhostHint();
        }
      } else if (e.key === 'Escape') {
        if (this.ghostHintEl) this.ghostHintEl.textContent = '';
        this.activeSuggestion = '';
      }
    });

    // Quick command chips
    document.querySelectorAll('.term-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.dataset.cmd || chip.textContent.replace('$', '').trim();
        this.execute(cmd);
        this.commandHistory.push(cmd);
        this.historyIndex = this.commandHistory.length;
        this.inputEl.value = '';
        this.updateGhostHint();
        this.inputEl.focus();
      });
    });

    // Sidebar clickable items
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const cmd = item.dataset.cmd;
        if (cmd) {
          this.execute(cmd);
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.inputEl.value = '';
          this.updateGhostHint();
          this.inputEl.focus();
        }
      });
    });

    // Focus input on main pane click
    if (this.mainPaneEl) {
      this.mainPaneEl.addEventListener('click', () => {
        this.inputEl.focus();
      });
    }
  }

  autocomplete() {
    const current = this.inputEl.value.trim().toLowerCase();
    if (!current) return;
    const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(current));
    if (matches.length === 1) {
      this.inputEl.value = matches[0];
      this.updateGhostHint();
    } else if (matches.length > 1) {
      this.appendEntry(current, `<span class="dim">Matches:</span> ${matches.join(', ')}`);
    }
  }

  execute(rawCmd) {
    const parts = rawCmd.split(' ').filter(Boolean);
    const cmdName = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    if (cmdName === 'clear' || cmdName === 'cls') {
      this.cmdClear();
      return;
    }

    let output = '';
    if (this.commands[cmdName]) {
      output = this.commands[cmdName].action(args);
    } else {
      output = `<span class="danger">command not found: ${cmdName}</span>. Type <span class="accent">'help'</span> for a list of commands.`;
    }

    this.appendEntry(rawCmd, output);
  }

  appendEntry(commandText, outputHTML) {
    if (!this.historyEl) return;

    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = `
      <div style="color: var(--color-fog); font-size: 11px; margin-bottom: 3px;">
        <span style="color: var(--color-voltage-blue);">psyc0dev@altitude</span>:<span style="color: var(--color-fog);">~</span>$ <span style="color: var(--color-bone); font-weight: 500;">${this.escapeHTML(commandText)}</span>
      </div>
      <div class="terminal-output">${outputHTML}</div>
    `;

    this.historyEl.appendChild(entry);
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.historyEl) {
      this.historyEl.scrollTop = this.historyEl.scrollHeight;
    }
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  printInitialBanner() {
    const banner = `<pre class="ascii-art">   ___   __  _______________  __  ______  ____ 
  / _ | / / /_  __/  _/_  __/ / / / / _ \\/ __/ 
 / __ |/ /__ / / _/ /  / /   / /_/ / // / _/   
/_/ |_/____//_/ /___/ /_/    \\____/____/___/   </pre>
<div style="margin-top: 6px; color: var(--color-bone); font-weight: 500;">● Connected to Altitude Workstation (Midnight Editorial Register)</div>
<div class="dim" style="margin-top: 2px;">Surfaces: Carbon #181818 | Bone #eeeeee | Voltage Blue #2b7fff</div>
<div style="margin-top: 4px; color: var(--color-fog);">Type <span class="accent">'help'</span> for commands or start typing for instant inline suggestions (<span class="dim">Tab/→</span> to complete).</div>`;
    
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = `<div class="terminal-output">${banner}</div>`;
    this.historyEl.appendChild(entry);
  }

  cmdClear() {
    if (this.historyEl) {
      this.historyEl.innerHTML = '';
    }
  }

  cmdHelp() {
    let out = `<span class="accent">Available CLI Commands:</span>\n`;
    Object.entries(this.commands).forEach(([name, def]) => {
      out += `  <span style="color: var(--color-bone);">${name.padEnd(12)}</span> <span class="dim">—</span> ${def.desc}\n`;
    });
    return out;
  }

  cmdNeofetch() {
    return `<pre class="ascii-art" style="color: var(--color-voltage-blue);">           /\\            <span style="color: var(--color-bone);">psyc0dev@altitude-core</span>
          /  \\           ------------------------
         / /\\ \\          <span class="accent">OS:</span> Alpine Linux x86_64
        / /  \\ \\         <span class="accent">Role:</span> Creative Technologist & Systems Engineer
       / / /\\ \\ \\        <span class="accent">Core:</span> Rust, TypeScript, eBPF, WebGL2, Go
      / / /  \\ \\ \\       <span class="accent">Style:</span> DESIGN.md (Midnight Financial Editorial)
     /_/_/ /\\ \\_\\_\\      <span class="accent">Typography:</span> Libre Baskerville, Inter, Fira Code
       /  /__\\  \\        <span class="accent">Uptime:</span> 99.99% (Deterministic Compute)
      /__________\\       <span class="accent">Status:</span> Open for Strategic Collaborations</pre>
<div class="dim" style="margin-top: 6px;">Tokens: [■ #181818] [■ #1f1f1f] [■ #262626] [■ #eeeeee] [■ #2b7fff]</div>`;
  }

  cmdProjects() {
    return `
<span class="accent">== FEATURED SYSTEMS ==</span>
1. <span style="color: var(--color-bone);">Synapse WebGL</span> — Procedural GPU compute shaders & neural fields
   <span class="dim">Stack: WebGL2, GLSL, Shaders | Link: <a href="#telemetry-deck" class="accent">#telemetry-deck</a></span>

2. <span style="color: var(--color-bone);">Aether Protocol</span> — Distributed state sync engine with lock-free queues
   <span class="dim">Stack: Rust, Tokio, WebSockets, RocksDB | Link: <a href="#projects" class="accent">#projects</a></span>

3. <span style="color: var(--color-bone);">Altitude Design System</span> — Midnight editorial register with thin borders
   <span class="dim">Stack: Vanilla CSS, GSAP, Libre Baskerville | Link: <a href="#manifesto" class="accent">#manifesto</a></span>

4. <span style="color: var(--color-bone);">Hyperion CLI</span> — eBPF telemetry daemon with zero CPU overhead
   <span class="dim">Stack: Go, Linux eBPF, Prometheus | Link: <a href="#projects" class="accent">#projects</a></span>`;
  }

  cmdWorkflows() {
    return `
<span class="accent">== AUTOMATED WORKFLOWS ==</span>
• <span style="color: var(--color-bone);">CI/CD Orchestration:</span> Continuous static analysis and deterministic binary builds
• <span style="color: var(--color-bone);">eBPF Kernel Probing:</span> Real-time network socket and memory latency tracing
• <span style="color: var(--color-bone);">State Replication:</span> Multi-node consensus with zero message degradation`;
  }

  cmdSkills() {
    return `
<span class="accent">== ARCHITECTURE STACK ==</span>
• <span style="color: var(--color-bone);">Frontend & Graphics:</span> TypeScript, Three.js, WebGL2, GLSL Shaders, GSAP 3, CSS Custom Properties
• <span style="color: var(--color-bone);">Systems & Distributed:</span> Rust (Async/Tokio), Go, RocksDB, Redis, WebSockets, Docker
• <span style="color: var(--color-bone);">Craft Principles:</span> Strict Monochromatic Hierarchy, Sub-5ms Latency, Zero Layout Shift`;
  }

  cmdContact() {
    return `
<span class="accent">== DIRECT DISPATCH ==</span>
• <span style="color: var(--color-bone);">GitHub:</span>    github.com/psyc0dev
• <span style="color: var(--color-bone);">Email:</span>     hello@psyc0.dev
• <span style="color: var(--color-bone);">Terminal:</span>  <span style="color: var(--color-voltage-blue);">npx psyc0dev contact</span>
• <span style="color: var(--color-bone);">Dispatch:</span>  <a href="#dispatch" class="accent">Jump to Contact Form →</a>`;
  }
}

window.DeveloperTerminal = DeveloperTerminal;
