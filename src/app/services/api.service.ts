import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Match the shape returned by PHP
export interface CarouselItem {
  id: number;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  /** Fetch by a single category (default limit 50) */
  getCarousel(category: string, limit = 50) {
    const url = `/api/carousel_api.php?category=${encodeURIComponent(category)}&limit=${limit}`;
    return this.http.get<CarouselItem[]>(url);
  }

  /** Fetch excluding one or more categories (default limit 50) */
  getCarouselExcluding(exclude: string[], limit = 50) {
    const ex = exclude.map(encodeURIComponent).join(',');
    const url = `/api/carousel_api.php?exclude=${ex}&limit=${limit}`;
    return this.http.get<CarouselItem[]>(url);
  }
}
