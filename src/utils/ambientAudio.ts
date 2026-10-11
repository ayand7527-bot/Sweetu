/**
 * Royalty-free ambient procedural audio engine using Web Audio API.
 * Synthesizes an emotional, calm, soothing acoustic music-box & electric piano
 * chord progression (Ebmaj9, Cm9, Fm9, Bb7sus) with soft bell harmonics.
 * Completely local, zero dependencies, no network requests, 100% royalty-free.
 */

class AmbientSoundtrack {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentStep: number = 0;

  // Chord notes in frequencies (Hz)
  private chordProgression = [
    // Ebmaj9
    [155.56, 233.08, 293.66, 349.23, 392.00],
    // Cm9
    [130.81, 196.00, 233.08, 293.66, 311.13],
    // Fm9
    [130.81, 207.65, 261.63, 311.13, 392.00],
    // Bb7sus
    [116.54, 174.61, 207.65, 311.13, 349.23],
    // Abmaj7
    [103.83, 155.56, 196.00, 261.63, 311.13],
  ];

  private melodyNotes = [
    392.00, 349.23, 293.66, 311.13, 392.00, 466.16, 523.25, 466.16, 392.00, 349.23,
  ];

  public init(): boolean {
    try {
      if (typeof window === 'undefined') return false;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioCtx) return false;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {
          // Autoplay policy or user gesture requirement, silently handle
        });
      }
      return true;
    } catch {
      return false;
    }
  }

  private playTone(
    freq: number,
    time: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.08
  ) {
    try {
      if (!this.ctx || !this.masterGain) return;

      const currentTime = this.ctx.currentTime;
      // Ensure time is always strictly in the future
      const startTime = Math.max(time, currentTime + 0.01);
      const attackTime = startTime + 0.08;
      const stopTime = startTime + duration;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, startTime);
      filter.frequency.exponentialRampToValueAtTime(500, stopTime);

      // Soft gentle envelope - safe non-zero values for exponential ramps
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, attackTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(stopTime);
    } catch {
      // Ignore oscillator cleanup errors safely
    }
  }

  private scheduleNextMeasure() {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;
      const chord = this.chordProgression[this.currentStep % this.chordProgression.length];

      // Play chord with delicate arpeggiation
      chord.forEach((note, index) => {
        const stagger = index * 0.14;
        this.playTone(note, now + stagger, 3.8, 'sine', 0.07);
        this.playTone(note * 2, now + stagger, 2.2, 'triangle', 0.02);
      });

      // Occasional gentle high chime melody note
      const melNote = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
      this.playTone(melNote, now + 1.2, 3.0, 'sine', 0.04);

      this.currentStep++;
    } catch {
      // Recover gracefully
    }

    if (this.isPlaying) {
      this.timerId = window.setTimeout(() => {
        this.scheduleNextMeasure();
      }, 3800);
    }
  }

  public start() {
    try {
      const ok = this.init();
      if (!ok) return;
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.scheduleNextMeasure();
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMute(): boolean {
    try {
      const ok = this.init();
      if (!ok) return false;

      if (!this.isPlaying) {
        this.start();
        this.isMuted = false;
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        }
        return true;
      }

      this.isMuted = !this.isMuted;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime);
      }
      return !this.isMuted;
    } catch {
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !this.isMuted;
  }
}

export const ambientSound = new AmbientSoundtrack();
