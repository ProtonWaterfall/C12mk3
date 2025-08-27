import { Component, OnDestroy, effect, signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type Opt = { value: string; label: string; desc?: string };

const LS_KEY = 'promptBuilderV2';
const URL_KEY = 'p'; // query param name for shareable state

@Component({
  selector: 'app-prompt-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prompt-builder.component.html',
  styleUrls: ['./prompt-builder.component.scss']
})
export class PromptBuilderComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form: FormGroup;

  // ===== Option libraries (with concise descriptions) =====
  subjects: Opt[] = [
    { value: 'person', label: 'Person', desc: 'Human subject; works for portraiture.' },
    { value: 'portrait', label: 'Portrait', desc: 'Head/shoulders focus; facial detail.' },
    { value: 'landscape', label: 'Landscape', desc: 'Natural scenery; wide compositions.' },
    { value: 'cityscape', label: 'Cityscape', desc: 'Urban scenes; architecture, streets.' },
    { value: 'animal', label: 'Animal', desc: 'Wildlife or pets; fur/feather detail.' },
    { value: 'object', label: 'Object', desc: 'Single product or item; studio look.' },
    { value: 'abstract', label: 'Abstract', desc: 'Non-literal; shapes, texture, color.' },
    { value: 'sci-fi scene', label: 'Sci-Fi Scene', desc: 'Futuristic tech, space, neon.' },
    { value: 'fantasy scene', label: 'Fantasy Scene', desc: 'Mythic worlds; magic, creatures.' }
  ];

  viewpoints: Opt[] = [
    { value: 'close-up', label: 'Close-up', desc: 'Tight crop; detail emphasis.' },
    { value: 'macro', label: 'Macro', desc: 'Extreme close; tiny subjects.' },
    { value: 'aerial', label: 'Aerial', desc: 'Top-down / drone perspective.' },
    { value: 'low angle (worm’s-eye)', label: 'Low Angle', desc: 'Subject feels powerful.' },
    { value: 'high angle', label: 'High Angle', desc: 'Overview; subject feels small.' },
    { value: 'over-the-shoulder', label: 'Over-shoulder', desc: 'Context behind a character.' },
    { value: 'isometric', label: 'Isometric', desc: 'Game-like 3D without vanishing point.' },
    { value: 'panoramic', label: 'Panoramic', desc: 'Ultra-wide field of view.' }
  ];

  framings: Opt[] = [
    { value: 'portrait framing', label: 'Portrait', desc: 'Tall aspect; faces, people.' },
    { value: 'full-body framing', label: 'Full Body', desc: 'Head-to-toe subject in frame.' },
    { value: 'wide shot', label: 'Wide Shot', desc: 'Environment + subject context.' },
    { value: 'widescreen composition', label: 'Widescreen', desc: 'Cinematic 2.35:1 feel.' },
    { value: 'rule-of-thirds', label: 'Rule of Thirds', desc: 'Balanced, pleasing placement.' },
    { value: 'symmetrical composition', label: 'Symmetrical', desc: 'Mirrored/centered balance.' },
    { value: 'centered composition', label: 'Centered', desc: 'Subject dead center.' }
  ];

  styles: Opt[] = [
    { value: 'photorealistic', label: 'Photorealistic', desc: 'Looks like a real photo.' },
    { value: 'cinematic', label: 'Cinematic', desc: 'Movie still: dramatic light/grade.' },
    { value: 'digital painting', label: 'Digital Painting', desc: 'Painterly, blended strokes.' },
    { value: 'oil painting', label: 'Oil Painting', desc: 'Thick texture, classic look.' },
    { value: 'watercolor', label: 'Watercolor', desc: 'Translucent washes; paper grain.' },
    { value: 'pencil sketch', label: 'Pencil Sketch', desc: 'Graphite lines, shading.' },
    { value: 'line art', label: 'Line Art', desc: 'Clean outlines; minimal shading.' },
    { value: 'matte painting', label: 'Matte Painting', desc: 'Epic, seamless environments.' },
    { value: 'vector art', label: 'Vector Art', desc: 'Crisp, flat shapes; scalable.' },
    { value: 'pixel art', label: 'Pixel Art', desc: 'Retro, blocky pixels.' },
    { value: '3D render', label: '3D Render', desc: 'CGI lighting & materials.' },
    { value: 'low poly', label: 'Low Poly', desc: 'Faceted, stylized geometry.' },
    { value: 'surrealism', label: 'Surrealism', desc: 'Dreamlike, illogical scenes.' },
    { value: 'fantasy art', label: 'Fantasy Art', desc: 'Magic, creatures, epic worlds.' },
    { value: 'sci-fi', label: 'Sci-Fi', desc: 'Hi-tech, spaceships, neon.' },
    { value: 'noir', label: 'Noir', desc: 'Moody, shadowy, vintage crime.' },
    { value: 'chiaroscuro', label: 'Chiaroscuro', desc: 'Bold light/dark contrast.' }
  ];

  lights: Opt[] = [
    { value: 'golden hour light', label: 'Golden Hour', desc: 'Warm, low sun; long shadows.' },
    { value: 'soft natural light', label: 'Soft Natural', desc: 'Diffuse, flattering.' },
    { value: 'overcast diffuse light', label: 'Overcast', desc: 'Shadow-free, even tone.' },
    { value: 'night scene', label: 'Night', desc: 'Dark ambient; practical lights.' },
    { value: 'studio softbox lighting', label: 'Studio Softbox', desc: 'Clean product/portrait.' },
    { value: 'rim lighting', label: 'Rim Light', desc: 'Glowing edge separation.' },
    { value: 'backlit glow', label: 'Backlit', desc: 'Silhouettes, halos, depth.' },
    { value: 'high contrast lighting', label: 'High Contrast', desc: 'Punchy highlights/shadows.' }
  ];

  moods: Opt[] = [
    { value: 'mysterious', label: 'Mysterious', desc: 'Enigmatic, hidden details.' },
    { value: 'ominous', label: 'Ominous', desc: 'Threatening, foreboding.' },
    { value: 'serene', label: 'Serene', desc: 'Calm, peaceful, soft.' },
    { value: 'romantic', label: 'Romantic', desc: 'Tender, intimate vibe.' },
    { value: 'whimsical', label: 'Whimsical', desc: 'Playful, imaginative.' },
    { value: 'epic', label: 'Epic', desc: 'Grand, larger-than-life.' },
    { value: 'gritty', label: 'Gritty', desc: 'Raw, textured realism.' }
  ];

  palettes: Opt[] = [
    { value: 'monochrome', label: 'Monochrome', desc: 'Single hue; tonal depth.' },
    { value: 'pastel palette', label: 'Pastel', desc: 'Light, soft colors.' },
    { value: 'muted/desaturated palette', label: 'Muted', desc: 'Low saturation, subtle.' },
    { value: 'vibrant/high-saturation palette', label: 'Vibrant', desc: 'Bold, punchy colors.' },
    { value: 'teal–orange cinematic grade', label: 'Teal–Orange', desc: 'Popular film grade.' },
    { value: 'sepia tone', label: 'Sepia', desc: 'Warm vintage brown tone.' },
    { value: 'neon cyberpunk palette', label: 'Neon/Cyberpunk', desc: 'Electric, high contrast.' },
    { value: 'black & white', label: 'Black & White', desc: 'Timeless, shape & light.' }
  ];

  textures: Opt[] = [
    { value: 'hyper-detailed textures', label: 'Hyper-detailed', desc: 'Micro-detail everywhere.' },
    { value: 'minimalist surfaces', label: 'Minimalist', desc: 'Simple, clean surfaces.' },
    { value: 'film grain', label: 'Film Grain', desc: 'Analog texture, mood.' },
    { value: 'soft focus', label: 'Soft Focus', desc: 'Gentle blur, dreamy.' },
    { value: 'gritty rough textures', label: 'Gritty/Rough', desc: 'Scuffed, weathered feel.' },
    { value: 'glossy reflective surfaces', label: 'Glossy', desc: 'Shiny, reflective.' },
    { value: 'hand-drawn imperfections', label: 'Hand-drawn', desc: 'Organic, human marks.' }
  ];

  effects: Opt[] = [
    { value: 'shallow depth of field with bokeh', label: 'Bokeh', desc: 'Blurred lights/shapes.' },
    { value: 'motion blur', label: 'Motion Blur', desc: 'Speed, dynamic action.' },
    { value: 'subtle bloom', label: 'Bloom', desc: 'Soft glow halos.' },
    { value: 'cinematic lens flare', label: 'Lens Flare', desc: 'Directional light streaks.' },
    { value: 'double exposure', label: 'Double Exposure', desc: 'Two images, one frame.' },
    { value: 'floating particles/dust', label: 'Particles', desc: 'Atmospheric specks.' },
    { value: 'fog', label: 'Fog', desc: 'Depth, mystery, softness.' },
    { value: 'rain', label: 'Rain', desc: 'Streaks, droplets, mood.' },
    { value: 'snow', label: 'Snow', desc: 'Flurries; bright scatter.' },
    { value: 'lightning', label: 'Lightning', desc: 'Flash, energy, drama.' }
  ];

  qualityOpts: Opt[] = [
    { value: 'high resolution', label: 'High Resolution', desc: 'Large output, crisp detail.' },
    { value: 'sharp focus', label: 'Sharp Focus', desc: 'Edge clarity; no blur.' },
    { value: 'clean edges', label: 'Clean Edges', desc: 'No artifacts or fringing.' },
    { value: 'balanced composition', label: 'Balanced Composition', desc: 'Well-weighted framing.' }
  ];

  // ===== Reactive state =====
  prompt = signal('');
  wordCount = computed(() => (this.prompt()?.trim() ? this.prompt()!.trim().split(/\s+/).length : 0));

  // Undo/Redo stacks
  private history: any[] = [];
  private future: any[] = [];
  private historyThrottle?: any;

  constructor() {
    this.form = this.fb.group({
      subjectNoun: [''],
      subjectDetail: [''],
      sceneContext: [''],
      viewpoint: [[]],
      framing: [[]],
      styles: [[]],
      lighting: [[]],
      mood: [[]],
      palette: [[]],
      texture: [[]],
      effects: [[]],
      quality: [[]],
      negativePrompts: [''],
      customNotes: ['']
    });

    // 1) Load from URL (priority) or localStorage on init
    const urlState = this.route.snapshot.queryParamMap.get(URL_KEY);
    if (urlState) {
      this.safePatch(decodeState(urlState));
    } else {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) this.safePatch(JSON.parse(saved));
    }

    // 2) Compose + autosave + push to history + update URL on changes
    this.form.valueChanges.subscribe(() => {
      this.compose();
      this.autosave();
      this.pushHistoryDebounced();
      this.updateUrlDebounced();
    });

    // Initial compose
    this.compose();

    // Keyboard shortcuts for undo/redo
    window.addEventListener('keydown', this.keyHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.keyHandler);
    clearTimeout(this.historyThrottle);
  }

  // ===== Compose prompt =====
  private listToPhrase(arr: string[] | undefined, joiner = ', '): string {
    return (arr && arr.length) ? arr.join(joiner) : '';
  }

  compose(): void {
    const v = this.form.value;
    const parts: string[] = [];

    const subjectBits = [v.subjectNoun?.trim(), v.subjectDetail?.trim()].filter(Boolean);
    if (subjectBits.length) parts.push(subjectBits.join(' — '));
    if (v.sceneContext?.trim()) parts.push(v.sceneContext.trim());

    const compBits = [this.listToPhrase(v.viewpoint), this.listToPhrase(v.framing)].filter(Boolean);
    if (compBits.length) parts.push(compBits.join(', '));

    const stylePhrase = this.listToPhrase(v.styles);
    if (stylePhrase) parts.push(stylePhrase);

    const lightMood = [this.listToPhrase(v.lighting), this.listToPhrase(v.mood)].filter(Boolean).join(', ');
    if (lightMood) parts.push(lightMood);

    const palette = this.listToPhrase(v.palette);
    if (palette) parts.push(palette);

    const texture = this.listToPhrase(v.texture);
    if (texture) parts.push(texture);

    const fx = this.listToPhrase(v.effects);
    if (fx) parts.push(fx);

    const q = this.listToPhrase(v.quality);
    if (q) parts.push(q);

    if (v.customNotes?.trim()) parts.push(v.customNotes.trim());

    const full = (parts.filter(Boolean).join('. ') + '.').replace(/\.\./g, '.');

    const neg = v.negativePrompts?.trim();
    this.prompt.set(neg ? `${full} --no ${neg}` : full);
  }

  // ===== Autosave & URL sync =====
  autosave(): void {
    localStorage.setItem(LS_KEY, JSON.stringify(this.form.getRawValue()));
  }

  private updateUrlDebounced = (() => {
    let timer: any;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const encoded = encodeState(this.form.getRawValue());
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { [URL_KEY]: encoded },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }, 300);
    };
  })();

  // ===== History (Undo/Redo) =====
  private pushHistoryDebounced(): void {
    clearTimeout(this.historyThrottle);
    this.historyThrottle = setTimeout(() => {
      const snap = this.form.getRawValue();
      if (!this.history.length || JSON.stringify(this.history[this.history.length - 1]) !== JSON.stringify(snap)) {
        this.history.push(snap);
        // Clear redo stack after a new action
        this.future = [];
      }
    }, 200);
  }

  undo(): void {
    if (this.history.length < 2) return;
    const current = this.history.pop()!;
    this.future.push(current);
    const prev = this.history[this.history.length - 1];
    this.safePatch(prev);
  }

  redo(): void {
    if (!this.future.length) return;
    const next = this.future.pop()!;
    this.history.push(next);
    this.safePatch(next);
  }

  private keyHandler = (e: KeyboardEvent) => {
    const z = (e.key.toLowerCase() === 'z');
    const y = (e.key.toLowerCase() === 'y');
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && z) { e.preventDefault(); this.undo(); }
    if ((e.ctrlKey || e.metaKey) && (y || (z && e.shiftKey))) { e.preventDefault(); this.redo(); }
  };

  // ===== Presets =====
  applyPreset(kind: 'portrait' | 'product' | 'space'): void {
    const base = this.blankValue();
    if (kind === 'portrait') Object.assign(base, {
      subjectNoun: 'portrait of a person',
      subjectDetail: 'natural skin texture, catchlights in the eyes',
      sceneContext: 'studio backdrop',
      framing: ['portrait framing'],
      styles: ['photorealistic', 'cinematic'],
      lighting: ['soft natural light', 'rim lighting'],
      mood: ['serene'],
      palette: ['muted/desaturated palette'],
      texture: ['clean edges'],
      quality: ['high resolution', 'sharp focus']
    });
    if (kind === 'product') Object.assign(base, {
      subjectNoun: 'premium wristwatch product shot',
      subjectDetail: 'brushed metal, sapphire crystal, engraved bezel',
      sceneContext: 'on seamless backdrop',
      viewpoint: ['close-up'],
      framing: ['centered composition'],
      styles: ['3D render', 'photorealistic'],
      lighting: ['studio softbox lighting', 'backlit glow'],
      palette: ['black & white'],
      texture: ['glossy reflective surfaces'],
      effects: ['subtle bloom'],
      quality: ['high resolution', 'clean edges', 'balanced composition']
    });
    if (kind === 'space') Object.assign(base, {
      subjectNoun: 'lone astronaut on alien ridge',
      subjectDetail: 'reflective visor, worn suit',
      sceneContext: 'two moons on horizon, bioluminescent flora',
      viewpoint: ['low angle (worm’s-eye)'],
      framing: ['widescreen composition', 'wide shot'],
      styles: ['cinematic', 'sci-fi', 'digital painting'],
      lighting: ['backlit glow', 'high contrast lighting'],
      mood: ['epic', 'mysterious'],
      palette: ['teal–orange cinematic grade'],
      effects: ['fog', 'floating particles/dust'],
      quality: ['high resolution', 'sharp focus']
    });

    this.safePatch(base);
    this.pushHistoryDebounced();
  }

  // ===== Utilities =====
  safePatch(v: any) {
    this.form.patchValue(v || {}, { emitEvent: true });
    // seed history with current state if empty
    const snap = this.form.getRawValue();
    if (!this.history.length) this.history.push(snap);
    this.compose();
    this.autosave();
  }

  blankValue() {
    return {
      subjectNoun: '',
      subjectDetail: '',
      sceneContext: '',
      viewpoint: [],
      framing: [],
      styles: [],
      lighting: [],
      mood: [],
      palette: [],
      texture: [],
      effects: [],
      quality: [],
      negativePrompts: '',
      customNotes: ''
    };
  }

  async copyPrompt(): Promise<void> {
    await navigator.clipboard.writeText(this.prompt());
    alert('Prompt copied.');
  }

  async copyShareLink(): Promise<void> {
    const encoded = encodeState(this.form.getRawValue());
    const url = new URL(window.location.href);
    url.searchParams.set(URL_KEY, encoded);
    await navigator.clipboard.writeText(url.toString());
    alert('Sharable link copied.');
  }

  reset(): void {
    this.form.reset(this.blankValue());
    this.history = [];
    this.future = [];
    this.pushHistoryDebounced();
    this.compose();
    this.autosave();
    this.updateUrlDebounced();
  }
}

// ===== Small helpers for URL encoding/decoding =====
function encodeState(obj: any): string {
  const json = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(json))); // base64
}
function decodeState(s: string): any {
  try {
    const json = decodeURIComponent(escape(atob(s)));
    return JSON.parse(json);
  } catch {
    return {};
  }
}
