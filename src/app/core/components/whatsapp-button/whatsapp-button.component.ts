import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="whatsapp-float-wrap">
      <div class="whatsapp-bubble" *ngIf="isOpen" role="dialog" aria-label="Asesoría por WhatsApp">
        <div class="bubble-header">
          <div class="bubble-brand">
            <span class="bubble-dot" aria-hidden="true"></span>
            <div>
              <strong>ZWE Corporativa</strong>
              <small>Asesoría en línea</small>
            </div>
          </div>
          <button type="button" (click)="isOpen = false" aria-label="Cerrar chat">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="bubble-body">
          <p>¡Hola! ¿En qué podemos ayudarte hoy con la contabilidad, tributación o planillas de tu empresa?</p>
        </div>
        <div class="bubble-footer">
          <a [href]="whatsappUrl" target="_blank" rel="noopener" class="bubble-btn" (click)="isOpen = false">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Iniciar chat ahora
          </a>
        </div>
      </div>

      <button type="button"
              class="whatsapp-btn"
              (click)="toggleBubble()"
              [attr.aria-expanded]="isOpen"
              aria-label="Chatear por WhatsApp con un asesor">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
        <span class="whatsapp-badge" *ngIf="!isOpen" aria-hidden="true">1</span>
      </button>
    </div>
  `,
  styles: [`
    .whatsapp-float-wrap {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9995;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;

      @media (max-width: 480px) {
        bottom: 16px;
        right: 16px;
        gap: 10px;
      }
    }

    .whatsapp-btn {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: #051a57;
      color: #fcbb07;
      border: 1px solid rgba(252, 187, 7, 0.35);
      box-shadow: 0 12px 28px -6px rgba(5, 26, 87, 0.45);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.65rem;
      position: relative;
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        background: #25d366;
        color: #ffffff;
        border-color: #25d366;
        box-shadow: 0 14px 32px -6px rgba(37, 211, 102, 0.5);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .whatsapp-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #10b981;
      color: #ffffff;
      font-family: var(--font-mono, monospace);
      font-size: 0.7rem;
      font-weight: 700;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #fafaf8;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .whatsapp-bubble {
      background: #ffffff;
      width: 310px;
      border-radius: 16px;
      border: 1px solid rgba(5, 26, 87, 0.14);
      box-shadow: 0 24px 48px -12px rgba(5, 26, 87, 0.24);
      overflow: hidden;
      transform-origin: bottom right;
      animation: bubbleIn 0.24s cubic-bezier(0.16, 1, 0.3, 1);

      @media (max-width: 480px) {
        width: calc(100vw - 32px);
        max-width: 310px;
      }
    }

    .bubble-header {
      background: #051a57;
      color: #ffffff;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        transition: background-color 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.18);
        }
      }
    }

    .bubble-brand {
      display: flex;
      align-items: center;
      gap: 10px;

      strong {
        display: block;
        font-size: 0.9rem;
        line-height: 1.2;
      }

      small {
        display: block;
        font-family: var(--font-mono, monospace);
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .bubble-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
      flex-shrink: 0;
    }

    .bubble-body {
      padding: 16px;
      font-size: 0.875rem;
      line-height: 1.55;
      color: #334155;
      background: #fafaf8;

      p {
        margin: 0;
      }
    }

    .bubble-footer {
      padding: 12px 16px 16px;
      background: #fafaf8;
    }

    .bubble-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #25d366;
      color: #ffffff;
      padding: 11px 16px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.875rem;
      text-decoration: none;
      transition: background-color 0.2s ease, transform 0.2s ease;

      &:hover {
        background: #1ebc59;
        transform: translateY(-1px);
      }
    }

    @keyframes bubbleIn {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class WhatsappButtonComponent {
  isOpen = false;
  whatsappUrl = 'https://wa.me/51918663597?text=Hola,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20contabilidad%20y%20asesor%C3%ADa.';

  @HostListener('document:keydown.escape')
  onEscape() {
    this.isOpen = false;
  }

  toggleBubble() {
    this.isOpen = !this.isOpen;
  }
}
