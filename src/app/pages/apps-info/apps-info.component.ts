import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apps-info',
  standalone: true,
  templateUrl: './apps-info.component.html'
})
export class AppsInfoComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {}
  ngAfterViewInit() {
    this.route.queryParams.subscribe(p => {
      const el = p['section'] ? document.getElementById(`section${p['section']}`) : null;
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
    });
  }
}
