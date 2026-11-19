import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChildren('serviceTabBtn') serviceTabBtns!: QueryList<ElementRef<HTMLButtonElement>>;

  tab: number = 1;
  openFaqIndex: number | null = 0;
  pauseMarquee: boolean = false;
  userPausedMarquee: boolean = false;

  heroWords: string[] = ['outsourcing', 'tributación', 'planillas', 'consultoría'];
  heroWordIndex: number = 0;
  private heroWordTimer: ReturnType<typeof setInterval> | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        this.heroWordTimer = setInterval(() => {
          this.heroWordIndex = (this.heroWordIndex + 1) % this.heroWords.length;
        }, 3200);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.heroWordTimer) {
      clearInterval(this.heroWordTimer);
      this.heroWordTimer = null;
    }
  }

  get currentHeroWord(): string {
    return this.heroWords[this.heroWordIndex];
  }

  toggleFaqItem(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  toggleMarqueePlayback(): void {
    this.userPausedMarquee = !this.userPausedMarquee;
  }

  get isMarqueePaused(): boolean {
    return this.pauseMarquee || this.userPausedMarquee;
  }

  get activeServiceTab() {
    return this.servicesTabs.find(s => s.id === this.tab) || this.servicesTabs[0];
  }

  selectServiceTab(id: number, targetEl?: EventTarget | null): void {
    this.tab = id;
    if (this.isBrowser && targetEl instanceof HTMLElement) {
      targetEl.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' } as ScrollIntoViewOptions);
    }
  }

  onServiceTabKeydown(event: KeyboardEvent, currentIndex: number): void {
    const count = this.servicesTabs.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % count;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const targetTab = this.servicesTabs[nextIndex];
      const btn = this.serviceTabBtns?.get(nextIndex)?.nativeElement;
      this.selectServiceTab(targetTab.id, btn);
      btn?.focus();
    }
  }

  getQuoteUrl(serviceTitle?: string): string {
    const serviceName = serviceTitle || this.activeServiceTab.title;
    const text = `Hola *ZWE Corporativa*. Deseo cotizar el servicio de *${serviceName}*.`;
    return `https://api.whatsapp.com/send/?phone=51918663597&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }

  getConstitutionQuoteUrl(type: string, name: string): string {
    const text = `Hola *ZWE Corporativa*. Estoy interesado en constituir una empresa bajo la modalidad *${type} (${name})*.`;
    return `https://api.whatsapp.com/send/?phone=51918663597&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }

  heroMetrics = [
    { value: '+15 años', label: 'Trayectoria en Lima, Perú' },
    { value: '+150', label: 'Empresas y PYMES asesoradas' },
    { value: '9 áreas', label: 'Consultoría y outsourcing integral' },
    { value: '100%', label: 'Cumplimiento SUNAT y SUNAFIL' },
    { value: '24h', label: 'Respuesta ejecutiva directa' }
  ];

  features = [
    {
      index: '01',
      title: 'Experiencia y Especialización',
      desc: 'Equipo multidisciplinario de contadores públicos colegiados y abogados corporativos con más de 15 años diseñando estrategias adaptadas a la realidad operativa de cada empresa.',
      image: '/assets/images/home/diferencial-team.webp'
    },
    {
      index: '02',
      title: 'Soluciones Personalizadas',
      desc: 'Analizamos tu régimen tributario, flujo financiero y estructura laboral antes de proponer un plan. Cero paquetes genéricos: cada proceso responde a tus metas.',
      image: '/assets/images/services/cards/asesoria contable.jpg'
    },
    {
      index: '03',
      title: 'Optimización de Costos y Recursos',
      desc: 'Reduce gastos fijos de infraestructura y software especializado externalizando contabilidad, nóminas y procesos administrativos con trazabilidad total.',
      image: '/assets/images/services/cards/asesoria financiera.jpg'
    },
    {
      index: '04',
      title: 'Compromiso, Confianza y Resultados',
      desc: 'Reportes gerenciales puntuales, auditoría preventiva continua ante SUNAT y SUNAFIL, y relaciones a largo plazo basadas en indicadores reales.',
      image: '/assets/images/home/pilar-laboral.webp'
    }
  ];

  servicesTabs = [
    {
      id: 1,
      roman: 'I',
      title: 'Selección de Personal',
      icon: 'fa-solid fa-user-check',
      tagline: 'Atracción y evaluación del talento idóneo para tus puestos clave',
      badge: 'Talento Humano',
      image: '/assets/images/home/pilar-seleccion.webp',
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
      roman: 'II',
      title: 'Administración de Planillas',
      icon: 'fa-solid fa-money-check-dollar',
      tagline: 'Cálculo exacto y puntual de todas tus obligaciones laborales',
      badge: 'Nóminas & PLAME',
      image: '/assets/images/services/cards/administracion de planillas.jpg',
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
      roman: 'III',
      title: 'Asesoría Laboral para Empresas',
      icon: 'fa-solid fa-people-roof',
      tagline: 'Cumplimiento normativo estricto y prevención ante SUNAFIL',
      badge: 'Blindaje Laboral',
      image: '/assets/images/services/cards/asesoria laboral.jpg',
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
      roman: 'IV',
      title: 'Gestión y Asesoría Administrativa',
      icon: 'fa-solid fa-clipboard-list',
      tagline: 'Procesos ordenados y eficientes para optimizar tu tiempo',
      badge: 'Eficiencia Operativa',
      image: '/assets/images/home/pilar-administrativa.webp',
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

  impactMetrics = [
    {
      value: '+15',
      unit: 'años',
      label: 'De trayectoria consultiva respaldando PYMES y corporaciones en Perú.'
    },
    {
      value: '+150',
      unit: 'clientes',
      label: 'Empresas activas en comercio, servicios, industria, retail y tecnología.'
    },
    {
      value: '100%',
      unit: 'cumplimiento',
      label: 'Auditoría preventiva continua frente a normativas SUNAT (SIRE) y SUNAFIL.'
    },
    {
      value: '9',
      unit: 'especialidades',
      label: 'Contabilidad, tributación, finanzas, legal, planillas y selección integradas.'
    }
  ];

  constitutionTypes = [
    {
      index: '01',
      type: 'SAC',
      name: 'Sociedad Anónima Cerrada',
      desc: 'La estructura más usada en Perú. De 2 a 20 accionistas, gestión ágil y alta credibilidad ante banca y proveedores.',
      time: '2 semanas',
      badge: 'Más Popular',
      featured: true,
      highlights: ['De 2 a 20 accionistas', 'Sin directorio obligatorio', 'Ideal para crecer y licitar']
    },
    {
      index: '02',
      type: 'EIRL',
      name: 'Empresa Individual de Resp. Ltda.',
      desc: 'Diseñada para un único titular que desea formalizarse protegiendo su patrimonio personal con personería jurídica propia.',
      time: '2 semanas',
      badge: 'Unipersonal',
      featured: false,
      highlights: ['1 único titular', 'Patrimonio separado', 'Titular-gerente ágil']
    },
    {
      index: '03',
      type: 'SRL',
      name: 'Sociedad Comercial de Resp. Ltda.',
      desc: 'Recomendada para negocios familiares o sociedades cerradas que priorizan control sobre el ingreso de nuevos socios.',
      time: '2 semanas',
      badge: 'Familiar',
      featured: false,
      highlights: ['De 2 a 20 participacionistas', 'Control de transferencia', 'Estructura societaria sólida']
    },
    {
      index: '04',
      type: 'SACS',
      name: 'Soc. Anónima Cerrada Simplificada',
      desc: 'Alternativa moderna 100% digital ante SUNARP para emprendedores que necesitan iniciar operaciones en tiempo récord.',
      time: '4 días',
      badge: 'Proceso Rápido',
      featured: false,
      highlights: ['Trámite 100% digital', 'Menor costo notarial', 'Lista para facturar rápido']
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
      a: 'Brindamos servicios a empresas de todos los sectores económicos (PYMES, corporaciones, comercios, empresas de servicios, manufactura, retail y tecnología), adaptando nuestras soluciones a la medida de cada organización.'
    },
    {
      q: '¿Cuáles son los beneficios del outsourcing contable?',
      a: 'El outsourcing permite reducir gastos operativos y costos de planilla, mejorar la productividad, contar con especialistas actualizados ante las normativas cambiantes de SUNAT y enfocar los esfuerzos en las actividades estratégicas de tu negocio.'
    },
    {
      q: '¿Cómo es el proceso de inicio de trabajo con ZWE Corporativa?',
      a: 'Primero realizamos un diagnóstico integral gratuito para conocer la situación fiscal y operativa de tu empresa. Luego diseñamos una propuesta personalizada y, tras su aprobación, iniciamos la implementación con acompañamiento continuo.'
    },
    {
      q: '¿Ofrecen soluciones adaptadas a las necesidades de mi empresa?',
      a: 'Totalmente. Diseñamos planes y estrategias a la medida de cada cliente, garantizando reportes oportunos, optimización tributaria y total transparencia en cada proceso.'
    }
  ];
}
