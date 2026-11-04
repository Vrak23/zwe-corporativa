import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  Inject, 
  PLATFORM_ID 
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  tab = 1;
  isBrowser: boolean;

  // Estados del reproductor de video (inicia en silencio para garantizar reproducción automática según políticas del navegador)
  isMuted = true;
  volume = 0.5;
  isVolumeOpen = false;

  private observer: IntersectionObserver | null = null;
  private isIntersecting = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.videoRef) return;

    const video = this.videoRef.nativeElement;
    video.muted = this.isMuted;
    video.volume = this.volume;

    // Iniciar reproducción segura en silencio
    this.startPlayback(video);

    // Observador para auto-play y pausa inteligente al hacer scroll
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isIntersecting = true;
            this.startPlayback(video);
          } else {
            this.isIntersecting = false;
            video.pause();
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    this.observer.observe(video);
  }

  private startPlayback(video: HTMLVideoElement): void {
    if (!video) return;
    video.muted = this.isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // En caso de que el navegador exija que esté explícitamente silenciado
        video.muted = true;
        this.isMuted = true;
        video.play().catch(() => {});
      });
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  toggleMute(): void {
    if (!this.videoRef) return;
    const video = this.videoRef.nativeElement;
    const nextMuted = !this.isMuted;
    video.muted = nextMuted;
    this.isMuted = nextMuted;
    if (!nextMuted) {
      if (video.volume === 0 || this.volume === 0) {
        this.volume = 0.5;
        video.volume = 0.5;
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  }

  handleVolumeChange(event: Event): void {
    if (!this.videoRef) return;
    const input = event.target as HTMLInputElement;
    const newVol = parseFloat(input.value);
    const video = this.videoRef.nativeElement;
    video.volume = newVol;
    this.volume = newVol;

    if (newVol === 0) {
      video.muted = true;
      this.isMuted = true;
    } else {
      video.muted = false;
      this.isMuted = false;
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  }
}
