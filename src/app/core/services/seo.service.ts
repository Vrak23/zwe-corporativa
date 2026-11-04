import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly baseUrl = 'https://www.zwecorporativa.com';

  private readonly pageData: Record<string, SeoMetadata> = {
    '/': {
      title: 'ZWE Corporativa | Especialistas en Contabilidad & Outsourcing en Lima, Perú',
      description: 'Firma contable y consultora empresarial en Lima, Perú. Especialistas en contabilidad, asesoría tributaria, laboral, financiera, planillas y outsourcing corporativo.',
      keywords: 'estudio contable lima, asesoría contable peru, outsourcing contable, asesoria tributaria sunat, gestion de planillas, tercerizacion de personal'
    },
    '/nosotros': {
      title: 'Nosotros | ZWE Corporativa - Trayectoria y Consultoría Empresarial',
      description: 'Conoce más sobre ZWE Corporativa, equipo de profesionales multidisciplinarios comprometidos con el crecimiento ordenado y rentable de tu negocio.',
      keywords: 'quienes somos zwe corporativa, estudio contable lince, consultores tributarios lima'
    },
    '/servicios': {
      title: 'Servicios Contables, Tributarios y Outsourcing | ZWE Corporativa',
      description: 'Portafolio integral de soluciones: contabilidad general, auditoría tributaria, asesoría laboral, gestión de planillas y outsourcing empresarial.',
      keywords: 'servicios contables lima, tercerizacion laboral peru, planeamiento tributario'
    },
    '/contacto': {
      title: 'Contacto y Asesoría Gratuita | ZWE Corporativa',
      description: 'Comunícate con nuestro equipo corporativo para una consulta personalizada sin compromiso. Central: +51 918 663 597.',
      keywords: 'contacto zwe corporativa, cotizar servicio contable, asesoria gratis lima'
    },
    '/blog': {
      title: 'Blog y Novedades Tributarias | ZWE Corporativa',
      description: 'Artículos, guías y novedades sobre normas tributarias SUNAT, legislación laboral, beneficios sociales y finanzas empresariales en Perú.',
      keywords: 'noticias sunat, articulos contables peru, calculo de gratificaciones, plame'
    },
    '/asesoria-contable': {
      title: 'Asesoría Contable para Empresas | ZWE Corporativa',
      description: 'Elaboración de estados financieros, libros electrónicos PLE/SIRE y soporte contable confiable para tu empresa en Perú.'
    },
    '/asesoria-tributaria': {
      title: 'Asesoría Tributaria y Fiscalización SUNAT | ZWE Corporativa',
      description: 'Defensa ante fiscalizaciones SUNAT, auditoría preventiva, planeamiento y liquidación de impuestos para empresas.'
    },
    '/outsourcing-contable': {
      title: 'Outsourcing Contable en Lima | ZWE Corporativa',
      description: 'Externaliza tu departamento de contabilidad con nuestros especialistas y reduce costos operativos con total cumplimiento normativo.'
    },
    '/administracion-de-planillas': {
      title: 'Administración de Planillas y Nóminas | ZWE Corporativa',
      description: 'Cálculo de planillas de sueldos, boletas de pago, T-Registro, PLAME, liquidación de CTS, gratificaciones y vacaciones.'
    },
    '/tercerizacion-de-personal': {
      title: 'Tercerización de Personal y Reclutamiento | ZWE Corporativa',
      description: 'Búsqueda, selección y administración formal de personal calificado y operativo adaptado a las necesidades de tu empresa.'
    },
    '/constitucion-de-empresas': {
      title: 'Constitución de Empresas en Perú | ZWE Corporativa',
      description: 'Asesoría legal y contable paso a paso para formalizar tu empresa (SAC, EIRL, SRL) en SUNARP y tramitar tu RUC en SUNAT.'
    }
  };

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.initRouterListener();
  }

  private initRouterListener(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const cleanUrl = event.urlAfterRedirects.split('?')[0].split('#')[0];
        this.updateMetaTags(cleanUrl);
      });
  }

  public updateMetaTags(path: string): void {
    const meta = this.pageData[path] || {
      title: 'ZWE Corporativa | Especialistas en Contabilidad & Outsourcing',
      description: 'Firma consultora especializada en asesoría contable, tributaria, laboral y outsourcing empresarial en Lima, Perú.'
    };

    // Actualizar Título
    this.titleService.setTitle(meta.title);

    // Actualizar Meta Descripción
    this.metaService.updateTag({ name: 'description', content: meta.description });
    this.metaService.updateTag({ name: 'title', content: meta.title });

    if (meta.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: meta.keywords });
    }

    // Actualizar Open Graph
    this.metaService.updateTag({ property: 'og:title', content: meta.title });
    this.metaService.updateTag({ property: 'og:description', content: meta.description });
    const fullUrl = `${this.baseUrl}${path === '/' ? '' : path}`;
    this.metaService.updateTag({ property: 'og:url', content: fullUrl });

    // Actualizar Twitter Card
    this.metaService.updateTag({ name: 'twitter:title', content: meta.title });
    this.metaService.updateTag({ name: 'twitter:description', content: meta.description });

    // Actualizar Canonical Link
    this.updateCanonicalUrl(fullUrl);
  }

  private updateCanonicalUrl(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }
}
