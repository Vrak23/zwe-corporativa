import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tab: number = 1;
  activeServiceTab = 1;
  selectedConstitution: string = '';
  openFaqIndex: number | null = 0;
  activeClientSlide: number = 0;
  pauseMarquee: boolean = false;

  setConstitution(type: string) {
    this.selectedConstitution = type;
  }

  toggleFaqItem(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  nextSlide() {
    this.activeClientSlide = (this.activeClientSlide + 1) % 8;
  }

  prevSlide() {
    this.activeClientSlide = (this.activeClientSlide - 1 + 8) % 8;
  }

  getQuoteUrl(): string {
    const activeTabObj = this.servicesTabs.find(s => s.id === this.tab);
    const serviceName = activeTabObj ? activeTabObj.title : 'Servicios Contables';
    const text = `Hola *ZWE Corporativa*. Deseo cotizar el servicio de *${serviceName}*.`;
    return `https://api.whatsapp.com/send/?phone=51918663597&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }

  features = [
    {
      icon: 'fa-solid fa-award',
      title: 'Experiencia y Especialización',
      desc: 'Contamos con un equipo multidisciplinario altamente capacitado, con amplia experiencia en consultoría y servicios de outsourcing, brindando soluciones estratégicas adaptadas a las necesidades de cada empresa.'
    },
    {
      icon: 'fa-solid fa-sliders',
      title: 'Soluciones Personalizadas',
      desc: 'Analizamos cada organización de manera integral para diseñar estrategias a medida, optimizando procesos, recursos y resultados, garantizando eficiencia y crecimiento sostenible.'
    },
    {
      icon: 'fa-solid fa-chart-pie',
      title: 'Optimización de Costos y Recursos',
      desc: 'Ayudamos a las empresas a reducir gastos operativos y mejorar su productividad mediante la externalización inteligente de procesos, permitiendo que nuestros clientes se enfoquen en su actividad principal.'
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Compromiso, Confianza y Resultados',
      desc: 'Trabajamos con altos estándares de calidad, transparencia y cumplimiento, estableciendo relaciones a largo plazo basadas en resultados medibles y la satisfacción de nuestros clientes.'
    }
  ];

  servicesTabs = [
    {
      id: 1,
      title: 'Selección de Personal',
      icon: 'fa-solid fa-user-check',
      tagline: 'Atracción y evaluación del talento idóneo para tus puestos clave',
      badge: 'Servicio Principal',
      image: 'tercerizacion_personal.png',
      subtitle: 'Nos encargamos de la búsqueda, selección, filtros psicotécnicos y evaluación por competencias del personal que tu empresa necesita:',
      bullets: [
        'Reclutamiento y selección de personal calificado',
        'Evaluación psicológica, psicotécnica y por competencias',
        'Verificación de antecedentes y referencias laborales',
        'Presentación de terna final de candidatos finalistas',
        'Garantía de reposición durante el periodo de prueba'
      ],
      link: '/servicio-de-seleccion-de-personal'
    },
    {
      id: 2,
      title: 'Administración de Planillas',
      icon: 'fa-solid fa-money-check-dollar',
      tagline: 'Cálculo exacto y puntual de todas tus obligaciones laborales',
      badge: 'Especializado',
      image: 'administracion_planillas.png',
      subtitle: 'Gestionamos el proceso de nóminas y las obligaciones relacionadas con tus trabajadores, manteniendo la información organizada y actualizada:',
      bullets: [
        'Elaboración integral de planillas y boletas',
        'Cálculo de remuneraciones y beneficios sociales',
        'Cálculo de vacaciones, gratificaciones y CTS',
        'Liquidaciones de beneficios sociales y constancias',
        'Declaración oportuna en PLAME, altas y bajas en T-Registro'
      ],
      link: '/administracion-de-planillas'
    },
    {
      id: 3,
      title: 'Asesoría Laboral para Empresas',
      icon: 'fa-solid fa-people-roof',
      tagline: 'Cumplimiento normativo estricto y prevención ante SUNAFIL',
      badge: 'Gestión 360°',
      image: 'gestion_personal.png',
      subtitle: 'Diseñamos estrategias laborales que garantizan el cumplimiento de las leyes de trabajo en Perú:',
      bullets: [
        'Auditoría y diagnóstico preventivo de cumplimiento laboral',
        'Elaboración y registro de contratos de trabajo y adendas',
        'Implementación del Reglamento Interno de Trabajo (RIT)',
        'Control y custodia de legajos digitales',
        'Atención y respuesta inmediata a inspecciones de SUNAFIL'
      ],
      link: '/asesoria-laboral'
    },
    {
      id: 4,
      title: 'Gestión y Asesoría Administrativa',
      icon: 'fa-solid fa-clipboard-list',
      tagline: 'Procesos ordenados y eficientes para optimizar tu tiempo',
      badge: 'Eficiencia Operativa',
      image: 'soporte_administrativo.png',
      subtitle: 'Asumimos procesos administrativos que permiten a tu empresa trabajar de manera más ordenada y eficiente:',
      bullets: [
        'Diagnóstico integral de procesos y circuitos administrativos',
        'Diseño de manuales de organización y funciones (MOF)',
        'Optimización del flujo de facturación y cobranzas',
        'Estandarización y digitalización del archivo documentario',
        'Capacitación al personal en buenas prácticas administrativas'
      ],
      link: '/asesoria-administrativa'
    }
  ];

  constitutionTypes = [
    {
      type: 'SAC',
      name: 'Sociedad Anónima Cerrada',
      desc: 'Es la más usada en Perú. Pueden participar de 2 a 20 socios, tiene una infraestructura flexible y acceso fácil a créditos bancarios.',
      time: '2 semanas',
      badge: 'Más Popular'
    },
    {
      type: 'EIRL',
      name: 'Empresa Individual de Resp. Ltda.',
      desc: 'Es una forma de negocio que combina las ventajas de ser un empresario individual con las de tener una empresa formal con patrimonio propio.',
      time: '2 semanas',
      badge: 'Unipersonal'
    },
    {
      type: 'SRL',
      name: 'Sociedad Comercial de Resp. Ltda.',
      desc: 'La SRL es ideal para empresas familiares o pequeñas sociedades que buscan un mayor control sobre la entrada de nuevos socios.',
      time: '2 semanas',
      badge: 'Familiar'
    },
    {
      type: 'SACS',
      name: 'Soc. Anónima Cerrada Simplificada',
      desc: 'Una opción moderna e ideal para emprendedores, requiere de 2 a 20 socios, con un proceso 100% digital y sumamente rápido.',
      time: '4 días',
      badge: 'Rápido'
    }
  ];

  clientLogos = [
    'Cliente1.webp', 'cliente2.webp', 'Cliente3.webp', 'Cliente4.webp', 'Cliente5.webp',
    'Cliente6.webp', 'Cliente7.webp', 'Cliente8.webp', 'Cliente9.webp', 'Cliente10.webp',
    'Cliente11.webp', 'Cliente12.webp', 'Cliente13.webp', 'Cliente14.webp', 'Cliente15.webp',
    'Cliente16.webp', 'Cliente17.webp', 'Cliente18.webp', 'Cliente19.webp', 'Cliente20.webp',
    'Cliente21.webp', 'Cliente22.webp', 'Cliente23.webp', 'Cliente24.webp', 'Cliente25.webp',
    'Cliente26.webp', 'Cliente27.webp', 'Cliente28.webp', 'Cliente29.webp', 'Cliente30.webp',
    'Cliente32.webp', 'Cliente33.webp'
  ];

  faqs = [
    {
      q: '¿Qué tipo de empresas pueden contratar sus servicios?',
      a: 'Brindamos servicios a empresas de todos los sectores económicos (PYMES, corporaciones, comercios, empresas de servicios, manufactura, retail y tecnología), adaptando nuestras soluciones a la medida de cada organización.',
      isOpen: true
    },
    {
      q: '¿Cuáles son los beneficios del outsourcing contable?',
      a: 'El outsourcing permite reducir gastos operativos y costos de planilla, mejorar la productividad, contar con especialistas actualizados ante las normativas cambiantes de SUNAT y enfocar los esfuerzos en las actividades estratégicas de tu negocio.',
      isOpen: false
    },
    {
      q: '¿Cómo es el proceso de inicio de trabajo con ZWE Corporativa?',
      a: 'Primero realizamos un diagnóstico integral gratuito para conocer la situación fiscal y operativa de tu empresa. Luego diseñamos una propuesta personalizada y, tras su aprobación, iniciamos la implementación con acompañamiento continuo.',
      isOpen: false
    },
    {
      q: '¿Ofrecen soluciones adaptadas a las necesidades de mi empresa?',
      a: 'Totalmente. Diseñamos planes y estrategias a la medida de cada cliente, garantizando reportes oportunos, optimización tributaria y total transparencia en cada proceso.',
      isOpen: false
    }
  ];

  blogPosts = [
    {
      title: 'El impacto del nuevo valor de la UIT en su planilla y las multas de SUNAFIL',
      date: 'Feb 7, 2026',
      desc: 'Con el inicio del año fiscal y la actualización del valor de la UIT, las reglas cambian tanto para las escalas salariales como para las sanciones laborales...',
      image: 'Sunafil.webp',
      link: '/blog'
    },
    {
      title: 'Más allá de la supervivencia: 5 Estrategias para blindar el Flujo de Caja este año',
      date: 'Feb 7, 2026',
      desc: 'En un entorno económico volátil, el efectivo es el rey. Muchas empresas rentables quiebran no por falta de ventas, sino por mala gestión del flujo de caja...',
      image: 'Caja.webp',
      link: '/blog'
    },
    {
      title: 'El Desafío del SIRE: Por qué no debes aceptar la «Propuesta Automática» de SUNAT',
      date: 'Feb 7, 2026',
      desc: 'La implementación del Sistema Integrado de Registros Electrónicos exige una revisión minuciosa antes de validar la propuesta generada por SUNAT...',
      image: 'SIS.webp',
      link: '/blog'
    },
    {
      title: 'Declaración Anual del Impuesto a la Renta: Cierre fiscal sin contingencias con SUNAT',
      date: 'Ene 31, 2026',
      desc: 'La campaña de la Declaración Jurada Anual del IR es el hito más crítico del calendario fiscal. Conoce cómo prepararte y deducir correctamente tus gastos...',
      image: 'Noticia1.webp',
      link: '/blog'
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
