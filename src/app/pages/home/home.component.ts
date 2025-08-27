import {
  Component, AfterViewInit, OnDestroy, Inject, NgZone, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CarouselComponent } from '../../carousel/carousel.component';

declare global {
  interface Window {
    HexDemo?: { init: () => void; destroy: () => void };
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, RouterLink],  // ? RouterLink available in this template
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // if you have one
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private initTimeoutId: any;
  private navSub?: Subscription;
  private pageShowHandler?: (e: PageTransitionEvent) => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private router: Router
  ) {}

  private reInitIfHomePresent() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!document.querySelector('.hexagon-line')) return;

    this.ngZone.runOutsideAngular(() => {
      window.HexDemo?.destroy?.();
      setTimeout(() => window.HexDemo?.init?.(), 0);
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.initTimeoutId = setTimeout(() => window.HexDemo?.init?.(), 0);
    });

    this.navSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.reInitIfHomePresent());

    this.pageShowHandler = (e: PageTransitionEvent) => {
      // @ts-ignore
      if (e.persisted) this.reInitIfHomePresent();
    };
    window.addEventListener('pageshow', this.pageShowHandler as any);
  }

  ngOnDestroy(): void {
    if (this.initTimeoutId) clearTimeout(this.initTimeoutId);
    this.navSub?.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      window.HexDemo?.destroy?.();
      if (this.pageShowHandler) window.removeEventListener('pageshow', this.pageShowHandler as any);
    }
  }
}
