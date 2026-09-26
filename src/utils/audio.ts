/**
 * Web Audio API synthesizer for app notifications:
 * - Driver trip incoming ring (express chime)
 * - Order placed chime
 * - Button click feedback
 */

class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playOrderBeep() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5
      osc.frequency.setValueAtTime(1174.66, now + 0.2); // D6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio might be blocked by user interaction policy
    }
  }

  public playPartnerAlert() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      
      // Repeating double chime for incoming driver booking
      const playChime = (timeOffset: number) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(1200, now + timeOffset + 0.15);

        gain.gain.setValueAtTime(0.25, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + timeOffset + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.22);
      };

      playChime(0);
      playChime(0.25);
      playChime(0.5);
    } catch {
      // ignore
    }
  }

  public playSuccessChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.26);
      });
    } catch {
      // ignore
    }
  }
}

export const soundEffects = new SoundEffects();
