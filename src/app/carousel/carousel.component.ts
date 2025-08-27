import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

// Shape returned by the PHP API (new format)
interface CarouselItem {
  id: number;
  url: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  /** Use either `category` OR `exclude`. If `exclude` has values, it wins. */
  @Input() category?: string;          // e.g. 'ai'
  @Input() exclude?: string[];         // e.g. ['ai', 'vid']
  @Input() limit = 50;

  images: CarouselItem[] = [];
  loaded: boolean[] = [];
  lightboxIndex: number | null = null;
  zoomed = false;

  @ViewChild('scrollEl') scrollEl?: ElementRef<HTMLDivElement>;

  constructor(private api: ApiService) {}

  /** Normalize API response to [{id,url}] even if backend still returns string[] */
  private normalizeResponse(resp: any[]): CarouselItem[] {
    if (!Array.isArray(resp)) return [];
    // If first item is a string, convert strings -> {id,url}
    if (typeof resp[0] === 'string') {
      return (resp as string[]).map((u, i) => ({ id: i, url: u }));
    }
    // Otherwise assume it's already {id,url}
    return resp as CarouselItem[];
  }

  ngOnInit() {
    const handle = (resp: any[]) => {
      const items = this.normalizeResponse(resp);
      this.images = items;
      this.loaded = Array(items.length).fill(false);
      console.log('Carousel items:', items); // temp debug
    };

    if (this.exclude?.length) {
      this.api.getCarouselExcluding(this.exclude, this.limit).subscribe(handle);
    } else {
      const cat = this.category ?? 'ai';
      this.api.getCarousel(cat, this.limit).subscribe(handle);
    }
  }

  ngOnDestroy(): void {}

  onLoad(i: number) {
    this.loaded[i] = true;
  }

  open(i: number) {
    this.lightboxIndex = i;
    this.zoomed = false;
  }

  close() {
    this.lightboxIndex = null;
    this.zoomed = false;
  }

  next() {
    if (this.images.length) {
      this.lightboxIndex = ((this.lightboxIndex ?? 0) + 1) % this.images.length;
      this.zoomed = false;
    }
  }

  prev() {
    if (this.images.length) {
      this.lightboxIndex = ((this.lightboxIndex ?? 0) - 1 + this.images.length) % this.images.length;
      this.zoomed = false;
    }
  }

  toggleZoom(e?: MouseEvent) {
    if (e) e.stopPropagation();
    this.zoomed = !this.zoomed;
  }

  scroll(offset: number) {
    this.scrollEl?.nativeElement.scrollBy({ left: offset, behavior: 'smooth' });
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.lightboxIndex === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }
}
