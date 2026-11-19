import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavServiceItem {
  title: string;
  shortDesc: string;
  link: string;
  icon: string;
  group: 'finanzas' | 'gestion';
}

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

  services: NavServiceItem[] = [
    {
      title: 'Asesoría y Contabilidad Integral',
      shortDesc: 'Estados financieros, SIRE y libros electrónicos',
      link: '/asesoria-contable',
      icon: 'fa-solid fa-calculator',
      group: 'finanzas'
    },
    {
      title: 'Asesoría Tributaria',
      shortDesc: 'Planeamiento fiscal y defensa ante SUNAT',
      link: '/asesoria-tributaria',
      icon: 'fa-solid fa-file-invoice-dollar',
      group: 'finanzas'
    },
    {
      title: 'Asesoría Financiera Empresarial',
      shortDesc: 'Flujo de caja, costos y rentabilidad',
      link: '/asesoria-financiera-empresarial',
      icon: 'fa-solid fa-chart-line',
      group: 'finanzas'
    },
    {
      title: 'Asesoría Legal Corporativa',
      shortDesc: 'Contratos comerciales y blindaje societario',
      link: '/asesoria-legal-corporativa',
      icon: 'fa-solid fa-scale-balanced',
      group: 'finanzas'
    },
    {
      title: 'Constitución de Empresas',
      shortDesc: 'Formalización SAC, EIRL, SRL y SACS',
      link: '/constitucion-de-empresas',
      icon: 'fa-solid fa-building',
      group: 'finanzas'
    },
    {
      title: 'Administración de Planillas',
      shortDesc: 'Boletas, CTS, gratificaciones y PLAME',
      link: '/administracion-de-planillas',
      icon: 'fa-solid fa-money-check-dollar',
      group: 'gestion'
    },
    {
      title: 'Asesoría Laboral para Empresas',
      shortDesc: 'Contratos laborales y prevención SUNAFIL',
      link: '/asesoria-laboral',
      icon: 'fa-solid fa-people-roof',
      group: 'gestion'
    },
    {
      title: 'Selección de Personal',
      shortDesc: 'Reclutamiento y evaluación por competencias',
      link: '/servicio-de-seleccion-de-personal',
      icon: 'fa-solid fa-user-check',
      group: 'gestion'
    },
    {
      title: 'Gestión Administrativa',
      shortDesc: 'Flujos operativos, MOF y control documental',
      link: '/asesoria-administrativa',
      icon: 'fa-solid fa-clipboard-list',
      group: 'gestion'
    }
  ];

  constructor(private elRef: ElementRef<HTMLElement>) {}

  get finanzasServices(): NavServiceItem[] {
    return this.services.filter(s => s.group === 'finanzas');
  }

  get gestionServices(): NavServiceItem[] {
    return this.services.filter(s => s.group === 'gestion');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 28;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.isServicesDropdownOpen = false;
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.isServicesDropdownOpen = false;
    }
  }

  toggleServicesDropdown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
  }

  openServicesDropdown() {
    this.isServicesDropdownOpen = true;
  }

  closeServicesDropdown() {
    this.isServicesDropdownOpen = false;
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
