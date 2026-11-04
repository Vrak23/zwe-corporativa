import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface BlogPost {
  id?: number;
  title: string;
  date: string;
  category: string;
  desc: string;
  image: string;
  link?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private supabaseUrl = 'https://iwsgtqodxbdtwosfmnhj.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3c2d0cW9keGJkdHdvc2ZtbmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjk1MjksImV4cCI6MjEwMzk0NTUyOX0.kvS_0Xopu7UfZaJEqY7SG-dtRvhVGRmbaZdZOnctc1Q';
  private supabase: SupabaseClient;

  // Fallback initial posts if Supabase is offline
  private defaultPosts: BlogPost[] = [
    {
      id: 1,
      title: 'El impacto del nuevo valor de la UIT en su planilla y las multas de SUNAFIL',
      date: '07 Feb, 2026',
      category: 'Laboral',
      desc: 'Con el inicio del año fiscal y la actualización del valor de la Unidad Impositiva Tributaria (UIT), las reglas de juego cambian tanto para las escalas salariales, retenciones de quinta categoría y las sanciones aplicadas por SUNAFIL.',
      image: 'Sunafil.webp'
    },
    {
      id: 2,
      title: 'Más allá de la supervivencia: 5 Estrategias para blindar el Flujo de Caja este año',
      date: '07 Feb, 2026',
      category: 'Finanzas',
      desc: 'En un entorno económico volátil, el efectivo es el rey. Muchas empresas peruanas rentables quiebran no por falta de ventas, sino por falta de liquidez en los momentos clave.',
      image: 'Caja.webp'
    },
    {
      id: 3,
      title: 'El Desafío del SIRE: Por qué no debes aceptar la «Propuesta Automática» de SUNAT sin revisar',
      date: '07 Feb, 2026',
      category: 'Tributario',
      desc: 'La implementación del Sistema Integrado de Registros Electrónicos (SIRE) exige que las empresas comparen minuciosamente sus comprobantes físicos y electrónicos antes de aceptar cualquier propuesta.',
      image: 'SIS.webp'
    },
    {
      id: 4,
      title: 'Declaración Anual del Impuesto a la Renta: Cómo afrontar el cierre fiscal sin contingencias',
      date: '31 Ene, 2026',
      category: 'Contabilidad',
      desc: 'La campaña de la Declaración Jurada Anual del Impuesto a la Renta es el hito más crítico para cualquier empresa. Conoce los gastos deducibles y cómo evitar observaciones.',
      image: 'Noticia1.webp'
    }
  ];

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getCachedPosts(): BlogPost[] {
    return [...this.defaultPosts];
  }

  /**
   * Obtiene todos los posts ordenados de más reciente a más antiguo
   */
  async getPosts(): Promise<BlogPost[]> {
    try {
      // Promise with 5s timeout to prevent hanging
      const fetchPromise = this.supabase
        .from('posts')
        .select('*')
        .or('empresa.eq.zwe,empresa.is.null')
        .order('id', { ascending: false });

      const timeoutPromise = new Promise<{ data: null, error: any }>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout Supabase')), 6000)
      );

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        console.warn('Supabase fetch issue, using fallback:', error);
        return this.defaultPosts;
      }

      if (data && data.length > 0) {
        this.defaultPosts = data;
        return data;
      }

      return this.defaultPosts;
    } catch (err) {
      console.warn('Network error fetching posts, using cached posts:', err);
      return this.defaultPosts;
    }
  }

  /**
   * Agrega un nuevo post
   */
  async addPost(post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost> {
    const { data, error } = await this.supabase
      .from('posts')
      .insert([{ ...post, empresa: 'zwe' }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Actualiza un post existente
   */
  async updatePost(id: number, post: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await this.supabase
      .from('posts')
      .update({ ...post, empresa: 'zwe' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  /**
   * Elimina un post por ID
   */
  async deletePost(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Sube una imagen a Supabase Storage y retorna la URL pública
   */
  async uploadImage(file: File): Promise<string> {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}_${cleanFileName}`;

    const { error } = await this.supabase.storage
      .from('blog-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      throw new Error(`Error al subir imagen: ${error.message}`);
    }

    const { data } = this.supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  /**
   * Resuelve la URL correcta para mostrar la imagen en el template
   */
  getImageUrl(image: string): string {
    if (!image) return '/assets/images/blog/Noticia1.webp';
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
      return image;
    }
    return `/assets/images/blog/${image}`;
  }
}
