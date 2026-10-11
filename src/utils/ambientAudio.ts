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
  // Progression: Ebmaj9 -> Cm9 -> Fm9 -> Bb7sus4 -> Abmaj7
  private chordProgression = [
    // Ebmaj9: Eb3 (155.56), G3 (196.00), Bb3 (233.08), D4 (293.66), F4 (349.23), G4 (392.00)
    [155.56, 233.08, 293.66, 349.23, 392.00],
    // Cm9: C3 (130.81), G3 (196.00), Bb3 (233.08), Eb4 (311.13), D4 (293.66)
    [130.81, 196.00, 233.08, 293.66, 311.13],
    // Fm9: F2 (87.31), C3 (130.81), Ab3 (207.65), C4 (261.63), Eb4 (311.13), G4 (392.00)
    [130.81, 207.65, 261.63, 311.13, 392.00],
    // Bb7sus: Bb2 (116.54), F3 (174.61), Ab3 (207.65), Eb4 (311.13), F4 (349.23)
    [116.54, 174.61, 207.65, 311.13, 349.23],
    // Abmaj7: Ab2 (103.83), Eb3 (155.56), G3 (196.00), C4 (261.63), Eb4 (311.13)
    [103.83, 155.56, 196.00, 261.63, 311.13]
  ];

  private melodyNotes = [
    392.00, 349.23, 293.66, 311.13, 392.00, 466.16, 523.25, 466.16, 392.00, 349.23
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, time: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.08) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(500, time + duration);

    // Soft gentle envelope
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private scheduleNextMeasure() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const chord = this.chordProgression[this.currentStep % this.chordProgression.length];

    // Play chord with delicate arpeggiation
    chord.forEach((note, index) => {
      const stagger = index * 0.14;
      this.playTone(note, now + stagger, 3.8, 'sine', 0.07);
      // Subtle overtone for warm Rhodes/chime character
      this.playTone(note * 2, now + stagger, 2.2, 'triangle', 0.02);
    });

    // Occasional gentle high chime melody note
    const melNote = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
    this.playTone(melNote, now + 1.2, 3.0, 'sine', 0.04);

    this.currentStep++;
    // Next chord in ~3.8 seconds
    this.timerId = window.setTimeout(() => {
      this.scheduleNextMeasure();
    }, 3800);
  }

  public start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextMeasure();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMute(): boolean {
    this.init();
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
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !this.isMuted;
  }
}

export const ambientSound = new AmbientSoundtrack();
