import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-hexagon-hero',
  standalone: true,
  templateUrl: './hexagon-hero.component.html',
  styleUrls: ['./hexagon-hero.component.scss']
})
export class HexagonHeroComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement as HTMLElement;
    container.innerHTML = '';

    const hexCount = 50;
    for (let i = 0; i < hexCount; i++) {
      const hex = document.createElement('div');
      hex.className = 'hex show';
      container.appendChild(hex);
    }
  }
}
