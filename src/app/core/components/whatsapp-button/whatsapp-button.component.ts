import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="whatsapp-float-wrap">
      <div class="whatsapp-bubble" *ngIf="isOpen">
        <div class="bubble-header">
          <strong>ZWE Corporativa</strong>
          <button (click)="isOpen = false" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="bubble-body">
          <p>¡Hola! 👋 ¿En qué podemos ayudarte con la contabilidad o gestión de tu empresa?</p>
        </div>
        <a [href]="whatsappUrl" target="_blank" rel="noopener" class="bubble-btn" (click)="isOpen = false">
          <i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp
        </a>
      </div>
      <button class="whatsapp-btn" (click)="toggleBubble()" aria-label="Chatear por WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="whatsapp-badge">1</span>
      </button>
    </div>
  `,
  styles: [`
    .whatsapp-float-wrap {
      position: fixed;
      bottom: 25px;
      right: 25px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;

      @media (max-width: 480px) {
        bottom: 15px;
        right: 15px;
        gap: 8px;
      }
    }

    .whatsapp-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #25d366;
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      position: relative;
      transition: all 0.3s ease;

      @media (max-width: 480px) {
        width: 50px;
        height: 50px;
        font-size: 1.6rem;
      }

      &:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
      }
    }

    .whatsapp-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #ff3b30;
      color: #fff;
      font-size: 0.7rem;
      font-weight: bold;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .whatsapp-bubble {
      background: #ffffff;
      width: 290px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
      overflow: hidden;
      animation: fadeIn 0.3s ease;

      @media (max-width: 480px) {
        width: calc(100vw - 30px);
        max-width: 290px;
      }
    }

    .bubble-header {
      background: #075e54;
      color: #ffffff;
      padding: 0.75rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 0.9rem;
      }
    }

    .bubble-body {
      padding: 1rem;
      font-size: 0.9rem;
      color: #333333;
      background: #f0f2f5;
    }

    .bubble-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: #25d366;
      color: #ffffff;
      padding: 0.7rem;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: center;
      text-decoration: none;

      &:hover {
        background: #1ebc59;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WhatsappButtonComponent {
  isOpen = false;
  whatsappUrl = 'https://wa.me/51918663597?text=Hola,%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20contabilidad%20y%20asesor%C3%ADa.';

  toggleBubble() {
    this.isOpen = !this.isOpen;
  }
}
