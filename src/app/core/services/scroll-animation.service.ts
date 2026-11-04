import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.initObserver();

      // Reset scroll to top and refresh animations on route navigation
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
          }
          setTimeout(() => {
            this.refresh();
          }, 50);
        });
    }
  }

  /**
   * Initializes the IntersectionObserver
   */
  private initObserver(): void {
    if (!('IntersectionObserver' in window)) {
      // Fallback for very old browsers: reveal everything immediately
      document.querySelectorAll('.reveal-on-scroll, [data-reveal]').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed for performance
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      }
    );
  }

  /**
   * Scans the DOM and attaches observer to all reveal elements
   */
  public refresh(): void {
    if (!this.isBrowser || !this.observer) return;

    this.ngZone.runOutsideAngular(() => {
      const elements = document.querySelectorAll(
        '.reveal-on-scroll:not(.is-revealed), .reveal-up:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed), .reveal-zoom:not(.is-revealed), .reveal-fade:not(.is-revealed), [data-reveal]:not(.is-revealed)'
      );

      elements.forEach(el => {
        // If element is already in initial viewport, check if it should be immediately revealed or observed
        this.observer?.observe(el);
      });
    });
  }
}
