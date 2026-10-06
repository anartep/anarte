/**
 * Falling-stars canvas: 4-point sparkles + dots drifting down, shooting stars,
 * a sparkle trail that follows the pointer and a burst on click.
 */
type Kind = 'spark' | 'dot';
interface Star {
  x: number; y: number; vx: number; vy: number; size: number; rot: number; vr: number;
  phase: number; color: string; kind: Kind; life?: number; maxLife?: number; alpha: number;
}
interface Meteor { x: number; y: number; vx: number; vy: number; life: number; len: number }

const PALETTE = ['#38d6f4', '#38d6f4', '#8eeaff', '#ffffff', '#d4abff', '#38d6f4'];
const BURST = ['#38d6f4', '#8eeaff', '#ffffff', '#38d6f4', '#d4abff'];
const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];

// same 4-point sparkle as the SVG icon used across the site (24×24, centred at 12,12)
const SPARK = new Path2D('M12 0c.6 5.6 1.7 9.6 3.1 10.9 1.4 1.3 4.9 2.2 8.9 1.1-4 .9-7.5 1.8-8.9 3.1C13.7 16.4 12.6 19.4 12 24c-.6-4.6-1.7-7.6-3.1-8.9C7.5 13.8 4 12.9 0 12c4 1.1 7.5.2 8.9-1.1C10.3 9.6 11.4 5.6 12 0Z');
function drawSpark(ctx: CanvasRenderingContext2D, r: number) {
  const k = r / 12;
  ctx.scale(k, k);
  ctx.translate(-12, -12);
  ctx.fill(SPARK);
}

export class StarField {
  private ctx: CanvasRenderingContext2D;
  private fx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private trail: Star[] = [];
  private meteors: Meteor[] = [];
  private w = 0; private h = 0; private dpr = 1;
  private raf = 0; private last = 0; private running = false;
  private mouse = { x: -9999, y: -9999, active: false, lastX: 0, lastY: 0 };
  private nextMeteor = 2.5;
  private ro: ResizeObserver;
  private io: IntersectionObserver;
  private visible = true;

  constructor(private canvas: HTMLCanvasElement, private fxCanvas: HTMLCanvasElement, private host: HTMLElement, private reduced = false) {
    this.ctx = canvas.getContext('2d')!;
    this.fx = fxCanvas.getContext('2d')!;
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.start(); else this.stop();
    });
    this.io.observe(host);
    host.addEventListener('pointermove', this.onMove);
    host.addEventListener('pointerleave', this.onLeave);
    host.addEventListener('pointerdown', this.onDown);
    document.addEventListener('visibilitychange', this.onVis);
    this.resize();
  }

  private onVis = () => (document.hidden ? this.stop() : this.visible && this.start());

  private onMove = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const dist = Math.hypot(x - this.mouse.lastX, y - this.mouse.lastY);
    this.mouse = { x, y, active: true, lastX: x, lastY: y };
    if (this.reduced || e.pointerType === 'touch') return;
    const n = Math.min(2, Math.floor(dist / 22));
    for (let i = 0; i < n; i++) this.spawnTrail(x, y, 0.6);
  };
  private onLeave = () => { this.mouse.active = false; this.mouse.x = this.mouse.y = -9999; };
  private onDown = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    this.burst(e.clientX - r.left, e.clientY - r.top);
  };

  burst(x: number, y: number) {
    const n = this.reduced ? 5 : 11;
    const off = Math.random() * Math.PI;
    for (let i = 0; i < n; i++) {
      const a = off + (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      const sp = 90 + Math.random() * 170;
      this.trail.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: 4 + Math.random() * 5, rot: 0,
        vr: (Math.random() - 0.5) * 3, phase: 1, color: pick(BURST), kind: 'spark',
        life: 0, maxLife: 0.8 + Math.random() * 0.5, alpha: 1,
      });
    }
    // central flash
    this.trail.push({ x, y, vx: 0, vy: 0, size: 16, rot: 0, vr: 0, phase: 2, color: '#ffffff', kind: 'spark', life: 0, maxLife: 0.55, alpha: 1 });
    if (!this.running) this.draw(0);
  }

  private spawnTrail(x: number, y: number, s = 1) {
    this.trail.push({
      x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 24, vy: 18 + Math.random() * 36, size: (2.5 + Math.random() * 3.5) * s,
      rot: 0, vr: (Math.random() - 0.5) * 2, phase: 0, color: pick(BURST), kind: 'spark',
      life: 0, maxLife: 0.7 + Math.random() * 0.6, alpha: 1,
    });
  }

  private makeStar(initial: boolean): Star {
    const r = Math.random();
    const kind: Kind = r < 0.7 ? 'spark' : 'dot';
    const big = kind === 'spark' && Math.random() < 0.12;
    const size = kind === 'dot' ? 0.8 + Math.random() * 1.2 : big ? 6 + Math.random() * 3.5 : 2.5 + Math.random() * 3;
    const depth = size / 10;
    return {
      x: Math.random() * this.w,
      y: initial ? Math.random() * this.h : -20 - Math.random() * 80,
      vx: -4 - Math.random() * 7 * (0.5 + depth),
      vy: 10 + Math.random() * 18 + depth * 26,
      size, rot: (Math.random() - 0.5) * 0.6, vr: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2, color: pick(PALETTE), kind, alpha: 0.6 + Math.random() * 0.4,
    };
  }

  resize() {
    const r = this.host.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
    for (const c of [this.canvas, this.fxCanvas]) {
      c.width = Math.round(this.w * this.dpr);
      c.height = Math.round(this.h * this.dpr);
      c.style.width = `${this.w}px`;
      c.style.height = `${this.h}px`;
    }
    const target = Math.min(48, Math.round((this.w * this.h) / (this.w < 700 ? 16000 : 24000)));
    while (this.stars.length < target) this.stars.push(this.makeStar(true));
    this.stars.length = target;
    if (this.reduced) this.draw(0); else this.start();
  }

  start() {
    if (this.running || this.reduced) return;
    this.running = true;
    this.last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - this.last) / 1000);
      this.last = t;
      this.update(dt);
      this.draw(t / 1000);
      if (this.running) this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() { this.running = false; cancelAnimationFrame(this.raf); }

  private update(dt: number) {
    const { w, h, mouse } = this;
    for (const s of this.stars) {
      s.x += s.vx * dt; s.y += s.vy * dt; s.rot += s.vr * dt;
      if (mouse.active) {
        const dx = s.x - mouse.x, dy = s.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / 130) * 160 * dt;
          s.x += (dx / d) * f; s.y += (dy / d) * f;
        }
      }
      if (s.y > h + 30 || s.x < -40) Object.assign(s, this.makeStar(false), { x: Math.random() * (w + 200) });
    }
    for (const p of this.trail) {
      p.life! += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      const drag = Math.pow(p.phase === 1 ? 0.035 : 0.3, dt);
      p.vx *= drag; p.vy = p.vy * drag + (p.phase === 1 ? 12 : 0) * dt;
    }
    this.trail = this.trail.filter((p) => p.life! < p.maxLife!);

    this.nextMeteor -= dt;
    if (this.nextMeteor <= 0) {
      this.nextMeteor = 3 + Math.random() * 5;
      const sp = 700 + Math.random() * 400;
      this.meteors.push({ x: w * (0.35 + Math.random() * 0.75), y: -20, vx: -sp * 0.72, vy: sp * 0.5, life: 0, len: 120 + Math.random() * 120 });
    }
    for (const m of this.meteors) { m.x += m.vx * dt; m.y += m.vy * dt; m.life += dt; }
    this.meteors = this.meteors.filter((m) => m.x > -300 && m.y < h + 300);
  }

  private draw(time: number) {
    const { ctx, fx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    fx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fx.clearRect(0, 0, this.w, this.h);

    for (const m of this.meteors) {
      const n = Math.hypot(m.vx, m.vy);
      const tx = m.x - (m.vx / n) * m.len, ty = m.y - (m.vy / n) * m.len;
      const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
      g.addColorStop(0, 'rgba(220,250,255,0.95)');
      g.addColorStop(1, 'rgba(56,214,244,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.save(); ctx.translate(m.x, m.y); ctx.fillStyle = '#fff'; drawSpark(ctx, 6); ctx.restore();
    }

    const drawOne = (s: Star, a: number, scale = 1, c: CanvasRenderingContext2D = ctx) => {
      c.globalAlpha = Math.max(0, Math.min(1, a));
      c.fillStyle = s.color;
      if (s.kind === 'dot') {
        c.beginPath(); c.arc(s.x, s.y, s.size * scale, 0, Math.PI * 2); c.fill();
      } else {
        c.save(); c.translate(s.x, s.y); c.rotate(s.rot); drawSpark(c, s.size * scale); c.restore();
      }
    };
    for (const s of this.stars) {
      const tw = 0.6 + 0.4 * Math.sin(time * 1.6 + s.phase);
      if (s.size > 6) { ctx.shadowColor = s.color; ctx.shadowBlur = 10; } else ctx.shadowBlur = 0;
      drawOne(s, s.alpha * tw, 0.9 + 0.1 * tw);
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    // interaction particles live on the front canvas (above the character)
    fx.shadowColor = '#38d6f4'; fx.shadowBlur = 8;
    for (const p of this.trail) {
      const t = p.life! / p.maxLife!;
      if (p.phase === 2) { // flash: grows fast, fades
        drawOne(p, 1 - t, 0.4 + t * 1.6, fx);
        continue;
      }
      const sc = t < 0.18 ? t / 0.18 : 1 - (t - 0.18) / 0.82 * 0.6;
      drawOne(p, 1 - t * t, sc, fx);
    }
    fx.shadowBlur = 0;
    fx.globalAlpha = 1;
  }

  destroy() {
    this.stop();
    this.ro.disconnect();
    this.io.disconnect();
    this.host.removeEventListener('pointermove', this.onMove);
    this.host.removeEventListener('pointerleave', this.onLeave);
    this.host.removeEventListener('pointerdown', this.onDown);
    document.removeEventListener('visibilitychange', this.onVis);
  }
}
