import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminBlogComponent } from './pages/admin-blog/admin-blog.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'ZWE Corporativa | Especialistas en Contabilidad & Outsourcing en Lima, Perú'
  },
  { 
    path: 'nosotros', 
    component: NosotrosComponent,
    title: 'Nosotros | ZWE Corporativa - Firma Contable y Consultoría'
  },
  { 
    path: 'blog', 
    component: BlogComponent,
    title: 'Blog y Novedades Tributarias | ZWE Corporativa'
  },
  { 
    path: 'contacto', 
    component: ContactoComponent,
    title: 'Contacto y Asesoría Contable Gratuita | ZWE Corporativa'
  },
  { 
    path: 'admin-blog', 
    component: AdminBlogComponent,
    title: 'Administración del Blog | ZWE Corporativa'
  },
  { 
    path: 'servicios', 
    component: ServiciosComponent,
    title: 'Servicios Contables, Tributarios y Outsourcing | ZWE Corporativa'
  },
  { 
    path: 'servicios/:slug', 
    component: ServiciosComponent,
    title: 'Servicios Especializados | ZWE Corporativa'
  },

  // Direct service routes matching WordPress permalinks
  { path: 'asesoria-administrativa', component: ServiciosComponent, title: 'Asesoría Administrativa | ZWE Corporativa' },
  { path: 'asesoria-contable', component: ServiciosComponent, title: 'Asesoría Contable para Empresas | ZWE Corporativa' },
  { path: 'asesoria-legal-corporativa', component: ServiciosComponent, title: 'Asesoría Legal Corporativa | ZWE Corporativa' },
  { path: 'asesoria-laboral', component: ServiciosComponent, title: 'Asesoría Laboral Empresarial | ZWE Corporativa' },
  { path: 'asesoria-financiera-empresarial', component: ServiciosComponent, title: 'Asesoría Financiera Empresarial | ZWE Corporativa' },
  { path: 'asesoria-tributaria', component: ServiciosComponent, title: 'Asesoría Tributaria y Fiscalización SUNAT | ZWE Corporativa' },
  { path: 'administracion-de-planillas', component: ServiciosComponent, title: 'Administración de Planillas y Nóminas | ZWE Corporativa' },
  { path: 'constitucion-de-empresas', component: ServiciosComponent, title: 'Constitución de Empresas en Perú | ZWE Corporativa' },
  { path: 'gestion-integral-del-personal', component: ServiciosComponent, title: 'Gestión Integral del Personal | ZWE Corporativa' },
  { path: 'outsourcing-contable', component: ServiciosComponent, title: 'Outsourcing Contable en Lima | ZWE Corporativa' },
  { path: 'outsourcing-laboral', component: ServiciosComponent, title: 'Outsourcing Laboral para Empresas | ZWE Corporativa' },
  { path: 'servicio-de-seleccion-de-personal', component: ServiciosComponent, title: 'Selección y Reclutamiento de Personal | ZWE Corporativa' },
  { path: 'soporte-administrativo', component: ServiciosComponent, title: 'Soporte Administrativo Empresarial | ZWE Corporativa' },
  { path: 'tercerizacion-y-outsourcing', component: ServiciosComponent, title: 'Tercerización y Outsourcing Integral | ZWE Corporativa' },
  { path: 'tercerizacion-de-personal', component: ServiciosComponent, title: 'Tercerización de Personal en Perú | ZWE Corporativa' },

  { path: '**', redirectTo: '' }
];
