import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
  isServicesDropdownOpen = false;
  isMobileServicesOpen = false;

  services = [
    { title: 'Asesoría y Contabilidad Integral', link: '/servicios/asesoria-contable', icon: 'fa-solid fa-calculator' },
    { title: 'Asesoría Tributaria', link: '/servicios/asesoria-tributaria', icon: 'fa-solid fa-file-invoice-dollar' },
    { title: 'Asesoría Financiera Empresarial', link: '/servicios/asesoria-financiera-empresarial', icon: 'fa-solid fa-chart-line' },
    { title: 'Asesoría Legal Corporativa', link: '/servicios/asesoria-legal-corporativa', icon: 'fa-solid fa-scale-balanced' },
    { title: 'Constitución de Empresas', link: '/servicios/constitucion-de-empresas', icon: 'fa-solid fa-building' },
    { title: 'Administración de Planillas y Nóminas', link: '/servicios/administracion-de-planillas', icon: 'fa-solid fa-money-check-dollar' },
    { title: 'Asesoría Laboral para Empresas', link: '/servicios/asesoria-laboral', icon: 'fa-solid fa-people-roof' },
    { title: 'Servicio de Selección de Personal', link: '/servicios/servicio-de-seleccion-de-personal', icon: 'fa-solid fa-user-check' },
    { title: 'Gestión y Asesoría Administrativa', link: '/servicios/asesoria-administrativa', icon: 'fa-solid fa-clipboard-list' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isMobileServicesOpen = false;
  }

  toggleMobileServices() {
    this.isMobileServicesOpen = !this.isMobileServicesOpen;
  }
}
