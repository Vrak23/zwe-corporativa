import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { WhatsappButtonComponent } from './core/components/whatsapp-button/whatsapp-button.component';
import { ScrollAnimationService } from './core/services/scroll-animation.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  title = 'ZWE Corporativa';

  constructor(
    private scrollAnimation: ScrollAnimationService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Services auto-hook into router events
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollAnimation.refresh();
    }, 100);
  }
}
