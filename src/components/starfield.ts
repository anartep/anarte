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

const PALETTE = ['#38d6f4', '#38d6f4', '#8eeaff', '#ffffff', '#d4abff', '#38d6f4', '#ffe05c'];
const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];

function sparkPath(ctx: CanvasRenderingContext2D, r: number) {
  const k = r * 0.2;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(k, -k, r, 0);
  ctx.quadraticCurveTo(k, k, 0, r);
  ctx.quadraticCurveTo(-k, k, -r, 0);
  ctx.quadraticCurveTo(-k, -k, 0, -r);
  ctx.closePath();
}

export class StarField {
  private ctx: CanvasRenderingContext2D;
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

  constructor(private canvas: HTMLCanvasElement, private host: HTMLElement, private reduced = false) {
    this.ctx = canvas.getContext('2d')!;
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
    const n = Math.min(3, Math.floor(dist / 14));
    for (let i = 0; i < n; i++) this.spawnTrail(x, y, 0.6);
  };
  private onLeave = () => { this.mouse.active = false; this.mouse.x = this.mouse.y = -9999; };
  private onDown = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    this.burst(e.clientX - r.left, e.clientY - r.top);
  };

  burst(x: number, y: number) {
    const n = this.reduced ? 6 : 22;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.3;
      const sp = 60 + Math.random() * 220;
      this.trail.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size: 3 + Math.random() * 7, rot: Math.random() * 6,
        vr: (Math.random() - 0.5) * 6, phase: 0, color: pick(PALETTE), kind: Math.random() < 0.8 ? 'spark' : 'dot',
        life: 0, maxLife: 0.9 + Math.random() * 0.8, alpha: 1,
      });
    }
    if (!this.running) this.draw(0);
  }

  private spawnTrail(x: number, y: number, s = 1) {
    this.trail.push({
      x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 30, vy: 20 + Math.random() * 50, size: (2 + Math.random() * 5) * s,
      rot: Math.random() * 6, vr: (Math.random() - 0.5) * 4, phase: 0, color: pick(PALETTE), kind: 'spark',
      life: 0, maxLife: 0.7 + Math.random() * 0.6, alpha: 1,
    });
  }

  private makeStar(initial: boolean): Star {
    const big = Math.random() < 0.16;
    const kind: Kind = Math.random() < 0.55 ? 'spark' : 'dot';
    const size = kind === 'dot' ? 0.8 + Math.random() * 2 : big ? 7 + Math.random() * 9 : 2.5 + Math.random() * 4.5;
    const depth = size / 16;
    return {
      x: Math.random() * this.w,
      y: initial ? Math.random() * this.h : -20 - Math.random() * 80,
      vx: -6 - Math.random() * 10 * (0.5 + depth),
      vy: 14 + Math.random() * 26 + depth * 40,
      size, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.8,
      phase: Math.random() * Math.PI * 2, color: pick(PALETTE), kind, alpha: 0.55 + Math.random() * 0.45,
    };
  }

  resize() {
    const r = this.host.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    const target = Math.min(170, Math.round((this.w * this.h) / (this.w < 700 ? 6500 : 8500)));
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
      p.life! += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.96; p.vy = p.vy * 0.96 + 30 * dt; p.rot += p.vr * dt;
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
    const { ctx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);

    for (const m of this.meteors) {
      const n = Math.hypot(m.vx, m.vy);
      const tx = m.x - (m.vx / n) * m.len, ty = m.y - (m.vy / n) * m.len;
      const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
      g.addColorStop(0, 'rgba(220,250,255,0.95)');
      g.addColorStop(1, 'rgba(56,214,244,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.save(); ctx.translate(m.x, m.y); ctx.fillStyle = '#fff'; sparkPath(ctx, 5); ctx.fill(); ctx.restore();
    }

    const drawOne = (s: Star, a: number) => {
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      ctx.fillStyle = s.color;
      if (s.kind === 'dot') {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rot * 0.15); sparkPath(ctx, s.size); ctx.fill(); ctx.restore();
      }
    };
    for (const s of this.stars) {
      const tw = 0.65 + 0.35 * Math.sin(time * 2.2 + s.phase);
      if (s.size > 8) { ctx.shadowColor = s.color; ctx.shadowBlur = 12; } else ctx.shadowBlur = 0;
      drawOne(s, s.alpha * tw);
    }
    ctx.shadowBlur = 0;
    for (const p of this.trail) drawOne(p, 1 - p.life! / p.maxLife!);
    ctx.globalAlpha = 1;
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
