import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  image?: string;
  desc: string;
  fullDesc?: string;
  tagline?: string;
  includes?: string[];
  benefits?: string[];
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  selectedService: ServiceItem | null = null;

  allServices: ServiceItem[] = [
    { 
      id: 'asesoria-contable',
      title: 'Asesoría y Contabilidad Integral', 
      category: 'Contabilidad & SIRE',
      icon: 'fa-solid fa-calculator', 
      image: 'asesoria contable.jpg',
      tagline: 'Información financiera confiable, ordenada y oportuna para la toma de decisiones.',
      desc: 'Llevamos la contabilidad completa de tu empresa, libros electrónicos SIRE y cumplimiento estricto con las normativas contables.',
      fullDesc: 'Ofrecemos un servicio contable integral y outsourcing especializado adaptado al régimen de tu empresa. Registramos todas tus operaciones comerciales con exactitud técnica, emitimos estados financieros mensuales y te brindamos el análisis gerencial necesario para evaluar la salud económica real de tu negocio.',
      includes: [
        'Registro y procesamiento de comprobantes de compras, ventas y bancos.',
        'Elaboración y emisión de Estados Financieros (Balance General, Estado de Resultados).',
        'Validación y presentación de Libros Contables Electrónicos (PLE / SIRE).',
        'Conciliaciones bancarias y control de cuentas por cobrar/pagar.',
        'Asesoramiento permanente en consultas y contingencias contables.'
      ],
      benefits: [
        'Cero observaciones en fiscalizaciones contables.',
        'Reportes claros y comprensibles para la gerencia.',
        'Estados financieros al día para solicitar créditos bancarios.',
        'Tranquilidad de trabajar con contadores colegiados.'
      ]
    },
    { 
      id: 'asesoria-tributaria',
      title: 'Asesoría Tributaria', 
      category: 'Tributación & SUNAT',
      icon: 'fa-solid fa-file-invoice-dollar', 
      image: 'asesoria tributaria.jpg',
      tagline: 'Planificación fiscal estratégica y blindaje ante fiscalizaciones de SUNAT.',
      desc: 'Optimizamos tu carga tributaria dentro del marco legal, evitando multas, inconsistencias y pagos indebidos.',
      fullDesc: 'Supervisamos el correcto cálculo y pago de los impuestos mensuales y anuales (IGV, Impuesto a la Renta, Detracciones, Retenciones). Asumimos la defensa técnica ante cartas inductivas, esquelas de citación y auditorías de SUNAT.',
      includes: [
        'Determinación y liquidación mensual de tributos (PDT 621, Plame, Detracciones).',
        'Elaboración y presentación de la Declaración Jurada Anual de Renta.',
        'Atención y descargo de cartas inductivas, esquelas y fiscalizaciones SUNAT.',
        'Planificación tributaria preventiva para optimizar el escudo fiscal.',
        'Auditoría y revisión de comprobantes de pago bajo normativa SIRE.'
      ],
      benefits: [
        'Eliminación de contingencias y multas tributarias costosas.',
        'Aprovechamiento legítimo de beneficios y deducciones fiscales.',
        'Acompañamiento profesional durante auditorías de SUNAT.',
        'Actualización permanente sobre cambios en la legislación tributaria.'
      ]
    },
    { 
      id: 'asesoria-financiera-empresarial',
      title: 'Asesoría Financiera Empresarial', 
      category: 'Finanzas & Rentabilidad',
      icon: 'fa-solid fa-chart-line', 
      image: 'asesoria financiera.jpg',
      tagline: 'Evaluación de rentabilidad, control de flujo de caja y proyecciones estratégicas.',
      desc: 'Te ayudamos a ordenar tus números, optimizar el uso del efectivo y aumentar la rentabilidad de cada línea de negocio.',
      fullDesc: 'Transformamos los datos contables en información financiera accionable. Desarrollamos presupuestos maestros, flujos de caja proyectados y análisis de puntos de equilibrio para que tomes decisiones de inversión y financiamiento con base sólida.',
      includes: [
        'Elaboración y control del Flujo de Caja (Cash Flow) proyectado.',
        'Determinación de costos, márgenes de contribución y punto de equilibrio.',
        'Análisis de ratios financieros (liquidez, solvencia, rentabilidad y rotación).',
        'Estructuración de expedientes financieros para créditos bancarios.',
        'Valorización de proyectos y evaluación de inversiones.'
      ],
      benefits: [
        'Visibilidad total sobre la liquidez futura de tu empresa.',
        'Identificación clara de productos o servicios no rentables.',
        'Mejores condiciones en financiamientos con la banca.',
        'Maximización del rendimiento sobre el capital invertido.'
      ]
    },
    { 
      id: 'asesoria-legal-corporativa',
      title: 'Asesoría Legal Corporativa', 
      category: 'Blindaje Legal',
      icon: 'fa-solid fa-scale-balanced', 
      image: 'asesoria legal.jpg',
      tagline: 'Seguridad jurídica y respaldo legal especializado para tus operaciones comerciales.',
      desc: 'Redacción y revisión de contratos comerciales, actas societarias y blindaje legal integral ante terceros.',
      fullDesc: 'Acompañamos a tu empresa en todos sus aspectos legales, corporativos y societarios. Protegemos tus intereses comerciales mediante contratos blindados, asesoría en juntas de accionistas, aumentos de capital y defensa preventiva ante contingencias comerciales o administrativas.',
      includes: [
        'Redacción y revisión de contratos comerciales, civiles y de confidencialidad.',
        'Elaboración de actas de Junta General de Accionistas y Directorio.',
        'Aumentos de capital, modificación de estatutos y cambios societarios.',
        'Registro de marcas y propiedad intelectual ante INDECOPI.',
        'Absolución de consultas legales y corporativas diarias.'
      ],
      benefits: [
        'Protección blindada del patrimonio de la empresa y socios.',
        'Contratos claros que evitan litigios y penalidades futuras.',
        'Cumplimiento estricto de la Ley General de Sociedades.',
        'Respaldo de abogados corporativos con amplia trayectoria.'
      ]
    },
    { 
      id: 'constitucion-de-empresas',
      title: 'Constitución de Empresas', 
      category: 'Formalización & Societario',
      icon: 'fa-solid fa-building', 
      image: 'constitucion de empresas.jpg',
      tagline: 'Formaliza tu empresa en Perú de manera rápida, segura y 100% asesorada.',
      desc: 'Constitución de empresas SAC, EIRL, SRL y SACS con asesoría legal, notarial y tributaria integral.',
      fullDesc: 'Te guiamos paso a paso en el proceso de formalización de tu nuevo negocio. Nos encargamos de la reserva de nombre, elaboración del acto constitutivo (minuta), firma en notaría, inscripción en Registros Públicos (SUNARP) y activación del RUC.',
      includes: [
        'Búsqueda y reserva de nombre societario ante SUNARP.',
        'Elaboración del pacto social y estatuto a medida.',
        'Coordinación y gestión notarial de la Escritura Pública.',
        'Inscripción registral en SUNARP y obtención de la partida electrónica.',
        'Tramitación del RUC, Clave SOL y elección del régimen tributario.'
      ],
      benefits: [
        'Proceso rápido en plazos récord (modalidad presencial o digital SACS).',
        'Asesoría para elegir la estructura societaria más conveniente.',
        'Apertura de cuentas bancarias comerciales sin complicaciones.',
        'Tu empresa 100% formal y lista para facturar desde el primer día.'
      ]
    },
    { 
      id: 'administracion-de-planillas',
      title: 'Administración de Planillas y Nóminas', 
      category: 'Planillas & Nóminas',
      icon: 'fa-solid fa-money-check-dollar', 
      image: 'administracion de planillas.jpg',
      tagline: 'Cálculo exacto, confidencial y puntual de sueldos y beneficios de ley.',
      desc: 'Elaboración de planillas, emisión de boletas, cálculo de CTS, gratificaciones, vacaciones y liquidaciones.',
      fullDesc: 'Terceriza el cálculo de tu nómina con nosotros para garantizar total exactitud en las remuneraciones y aportes de ley (AFP, ONP, EsSalud). Emitimos reportes por centro de costos y generamos los archivos para el pago masivo bancario.',
      includes: [
        'Cálculo mensual y quincenal de sueldos, horas extras y comisiones.',
        'Cálculo de Gratificaciones de Julio y Diciembre con bonificación extraordinaria.',
        'Cálculo y depósito de Compensación por Tiempo de Servicios (CTS).',
        'Elaboración de Liquidaciones de Beneficios Sociales (LBS) y constancias.',
        'Declaración y envío de PLAME y T-Registro ante SUNAT.'
      ],
      benefits: [
        'Puntualidad garantizada en el pago a tus colaboradores.',
        'Cero errores en retenciones de AFP / ONP y renta de quinta categoría.',
        'Ahorro en software de planillas y personal especializado interno.',
        'Absoluta confidencialidad en los salarios de tu organización.'
      ]
    },
    { 
      id: 'asesoria-laboral',
      title: 'Asesoría Laboral para Empresas', 
      category: 'Gestión Laboral',
      icon: 'fa-solid fa-people-roof', 
      image: 'asesoria laboral.jpg',
      tagline: 'Cumplimiento normativo estricto y prevención de contingencias ante SUNAFIL.',
      desc: 'Asesoramiento legal y laboral para prevenir multas de SUNAFIL, gestionar contratos y estructurar relaciones de trabajo.',
      fullDesc: 'Diseñamos estrategias laborales que garantizan el cumplimiento de las leyes de trabajo en Perú, protegiendo a la empresa frente a inspecciones de SUNAFIL y demandas laborales. Te orientamos en la correcta contratación, desvinculación y políticas de recursos humanos.',
      includes: [
        'Auditoría y diagnóstico preventivo de cumplimiento laboral.',
        'Elaboración y registro de contratos de trabajo (plazo fijo, indeterminado, locación).',
        'Asesoramiento en desvinculaciones, renuncias y cartas de preaviso/despido.',
        'Implementación de Reglamento Interno de Trabajo (RIT).',
        'Atención y respuesta a requerimientos e inspecciones de SUNAFIL.'
      ],
      benefits: [
        'Prevención total de multas severas impuestas por SUNAFIL.',
        'Relaciones laborales claras, armónicas y documentadas.',
        'Correcta tipificación del personal (evitando desnaturalizaciones).',
        'Soporte legal inmediato ante cualquier conflicto laboral.'
      ]
    },
    { 
      id: 'servicio-de-seleccion-de-personal',
      title: 'Servicio de Selección de Personal', 
      category: 'Atracción de Talento',
      icon: 'fa-solid fa-user-check', 
      image: 'servicio de seleccion de personal.jpg',
      tagline: 'Atracción y evaluación del mejor talento humano para tus puestos clave.',
      desc: 'Procesos de reclutamiento ágiles con evaluación por competencias para incorporar colaboradores idóneos.',
      fullDesc: 'Encontramos al candidato ideal para cubrir las vacantes operativas, administrativas y de confianza en tu organización. Diseñamos perfiles de puesto, publicamos en bolsas de empleo estratégicas y aplicamos filtros psicotécnicos y laborales rigurosos.',
      includes: [
        'Levantamiento y definición del perfil de puesto y competencias.',
        'Reclutamiento en múltiples canales y bolsas de trabajo especializadas.',
        'Evaluación psicológica, psicotécnica y entrevista por competencias.',
        'Verificación de referencias laborales, antecedentes y grados académicos.',
        'Presentación de terna final de candidatos finalistas con informe psicolaboral.'
      ],
      benefits: [
        'Reducción de los tiempos promedio de contratación.',
        'Contratación de personal calificado y alineado a la cultura empresarial.',
        'Garantía de reposición en caso de desvinculación durante el periodo de prueba.',
        'Ahorro en costos de publicación y horas de entrevistas internas.'
      ]
    },
    { 
      id: 'asesoria-administrativa',
      title: 'Gestión y Asesoría Administrativa', 
      category: 'Gestión & Procesos',
      icon: 'fa-solid fa-clipboard-list', 
      image: 'asesoria administrativa.jpg',
      tagline: 'Reingeniería de procesos, soporte operativo y metodologías de trabajo ágiles.',
      desc: 'Optimizamos los flujos de trabajo administrativos, control documental, facturación y estructura operativa.',
      fullDesc: 'Brindamos consultoría integral en organización y soporte operativo para empresas. Analizamos cada área operativa de tu negocio para eliminar cuellos de botella, automatizar tareas repetitivas, ordenar la facturación/cobranzas y estructurar manuales que reduzcan costos.',
      includes: [
        'Diagnóstico integral de procesos y circuitos administrativos.',
        'Diseño e implementación de manuales de organización y funciones (MOF).',
        'Optimización del flujo de facturación, cobranzas y compras.',
        'Estandarización y digitalización del archivo documentario.',
        'Capacitación al personal en buenas prácticas administrativas.'
      ],
      benefits: [
        'Ahorro de hasta un 30% en tiempos operativos internos.',
        'Control estricto de documentos y trazabilidad de información.',
        'Estructura empresarial escalable y lista para crecer.',
        'Reducción de errores humanos en la facturación y cobranza.'
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.checkCurrentRoute();
    });

    this.route.params.subscribe(() => {
      this.checkCurrentRoute();
    });
  }

  private checkCurrentRoute(): void {
    const currentUrl = this.router.url.replace(/^\//, '').split('?')[0];
    
    // Check if on /servicios or on a specific service route
    if (!currentUrl || currentUrl === 'servicios') {
      this.selectedService = null;
      return;
    }

    const slug = currentUrl.startsWith('servicios/') 
      ? currentUrl.replace('servicios/', '') 
      : currentUrl;

    const matched = this.allServices.find(s => s.id === slug || s.id === slug.replace('/', ''));
    if (matched) {
      this.selectedService = matched;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.selectedService = null;
    }
  }

  selectService(service: ServiceItem): void {
    this.selectedService = service;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectServiceById(id: string): void {
    const found = this.allServices.find(s => s.id === id);
    if (found) {
      this.selectedService = found;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get otherServices(): ServiceItem[] {
    if (!this.selectedService) {
      return this.allServices.slice(0, 6);
    }
    return this.allServices.filter(s => s.id !== this.selectedService?.id).slice(0, 5);
  }

  getServiceWhatsAppUrl(serviceTitle: string): string {
    const text = `Hola *ZWE Corporativa*, deseo cotizar y recibir información detallada sobre el servicio de *${serviceTitle}*.`;
    return `https://api.whatsapp.com/send/?phone=51918663597&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
  }
}
