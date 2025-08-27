import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hex-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hex-test.component.html',
  styleUrls: ['./hex-test.component.scss']
})
export class HexTestComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.createHexagons();
    window.addEventListener('resize', () => this.createHexagons());
  }

  createHexagons(): void {
    const container = document.getElementById('container')!;
    const placeholder = document.getElementById('placeholder')!;
    const overlay = document.getElementById('overlay')!;

    container.innerHTML = '';
    placeholder.style.display = 'block';

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const hexWidth = 100;
    const hexHeight = hexWidth * 0.75;
    const hexPerRow = Math.floor(viewportWidth / hexWidth);
    const rows = Math.floor(viewportHeight / hexHeight);

    let count = Math.floor(rows * hexPerRow * 0.6);
    count = Math.floor(count / hexPerRow) * hexPerRow;

    for (let i = 0; i < count; i++) {
      const hex = this.renderer.createElement('div');
      this.renderer.addClass(hex, i % 2 === 0 ? 'hex' : 'hex-alt');
      this.renderer.appendChild(container, hex);

      setTimeout(() => {
        this.renderer.addClass(hex, 'show');
      }, i * 30);
    }

    placeholder.style.display = 'none';

    setTimeout(() => {
      overlay.classList.add('show');
      this.applyGlowEffect();
      this.startRobotAnimation();
    }, count * 30);
  }

  applyGlowEffect(): void {
    const hexes = document.querySelectorAll('.hex, .hex-alt');
    hexes.forEach((hex) => {
      setTimeout(() => hex.classList.add('glow'), Math.random() * 2000);
    });
  }

  startRobotAnimation(): void {
    const container = document.getElementById('container')!;
    const hexes = container.querySelectorAll('.hex, .hex-alt');
    if (!hexes.length) return;

    setInterval(() => {
      container.querySelectorAll('img.robot').forEach((img) => img.remove());

      const randomHex = hexes[Math.floor(Math.random() * hexes.length)] as HTMLElement;
      const img = document.createElement('img');
      img.src = Math.random() < 0.5 ? 'assets/robolft.png' : 'assets/roborgt.png';
      img.alt = 'Robot';
      img.classList.add('robot');

      randomHex.style.position = 'relative';
      randomHex.appendChild(img);

      setTimeout(() => {
        img.classList.add('fade-out');
        setTimeout(() => img.remove(), 1000);
      }, 2000);
    }, 3000);
  }
}

