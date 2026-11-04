import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../core/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  // Autenticación simple y segura por sesión
  isAuthenticated = false;
  pinInput = '';
  loginError = '';
  readonly ADMIN_PIN = 'zwe2026';

  // Lista de noticias y estado
  posts: BlogPost[] = [];
  isLoading = false;
  isSaving = false;
  isUploading = false;
  searchQuery = '';
  selectedCategoryFilter = 'all';

  categories: string[] = ['Laboral', 'Finanzas', 'Tributario', 'Contabilidad'];

  // Notificaciones
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  // Modal Crear / Editar
  isModalOpen = false;
  isEditing = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  postForm: {
    id?: number;
    title: string;
    category: string;
    date: string;
    desc: string;
    image: string;
    link: string;
  } = this.getEmptyForm();

  // Modal Eliminar
  isDeleteModalOpen = false;
  postToDelete: BlogPost | null = null;
  isDeleting = false;

  constructor(
    public blogService: BlogService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    const sessionAuth = sessionStorage.getItem('zwe_admin_auth');
    if (sessionAuth === 'true') {
      this.isAuthenticated = true;
      this.loadPosts();
    }
  }

  // --- Login ---
  login(): void {
    if (this.pinInput.trim() === this.ADMIN_PIN) {
      this.isAuthenticated = true;
      this.loginError = '';
      sessionStorage.setItem('zwe_admin_auth', 'true');
      this.loadPosts();
    } else {
      this.loginError = 'Contraseña incorrecta. Inténtalo de nuevo.';
      this.cdr.detectChanges();
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.pinInput = '';
    sessionStorage.removeItem('zwe_admin_auth');
    this.cdr.detectChanges();
  }

  // --- Cargar Posts ---
  async loadPosts(): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.posts = await this.blogService.getPosts();
    } catch (err: any) {
      this.showToast('Error al cargar noticias: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  get filteredPosts(): BlogPost[] {
    return this.posts.filter(p => {
      const matchCat = this.selectedCategoryFilter === 'all' || p.category.toLowerCase() === this.selectedCategoryFilter.toLowerCase();
      const matchSearch = !this.searchQuery || 
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        p.desc.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  // --- Modal Crear / Editar ---
  openCreateModal(): void {
    this.isEditing = false;
    this.postForm = this.getEmptyForm();
    this.selectedFile = null;
    this.imagePreview = null;
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  openEditModal(post: BlogPost): void {
    this.isEditing = true;
    this.postForm = {
      id: post.id,
      title: post.title,
      category: post.category,
      date: post.date,
      desc: post.desc,
      image: post.image,
      link: post.link || ''
    };
    this.selectedFile = null;
    this.imagePreview = this.blogService.getImageUrl(post.image);
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedFile = null;
    this.imagePreview = null;
    this.cdr.detectChanges();
  }

  getEmptyForm() {
    return {
      title: '',
      category: 'Laboral',
      date: this.getTodayFormatted(),
      desc: '',
      image: '',
      link: ''
    };
  }

  getTodayFormatted(): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = meses[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  // --- Manejo de Imagen ---
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.selectedFile = file;

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.ngZone.run(() => {
          this.imagePreview = e.target?.result as string;
          this.cdr.detectChanges();
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // --- Guardar Noticia ---
  async savePost(): Promise<void> {
    if (!this.postForm.title.trim() || !this.postForm.desc.trim() || !this.postForm.category) {
      this.showToast('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    this.isSaving = true;
    this.cdr.detectChanges();

    try {
      let finalImageUrl = this.postForm.image;

      // Si subió un archivo nuevo, subir a Supabase Storage
      if (this.selectedFile) {
        this.isUploading = true;
        this.cdr.detectChanges();
        finalImageUrl = await this.blogService.uploadImage(this.selectedFile);
        this.isUploading = false;
        this.cdr.detectChanges();
      }

      // Si es nuevo y no tiene imagen, asignar una por defecto
      if (!finalImageUrl) {
        finalImageUrl = 'Noticia1.webp';
      }

      if (this.isEditing && this.postForm.id) {
        await this.blogService.updatePost(this.postForm.id, {
          title: this.postForm.title.trim(),
          category: this.postForm.category,
          date: this.postForm.date.trim(),
          desc: this.postForm.desc.trim(),
          image: finalImageUrl,
          link: this.postForm.link.trim()
        });
        this.showToast('¡Noticia actualizada exitosamente!', 'success');
      } else {
        await this.blogService.addPost({
          title: this.postForm.title.trim(),
          category: this.postForm.category,
          date: this.postForm.date.trim(),
          desc: this.postForm.desc.trim(),
          image: finalImageUrl,
          link: this.postForm.link.trim()
        });
        this.showToast('¡Nueva noticia publicada con éxito!', 'success');
      }

      this.closeModal();
      await this.loadPosts();
    } catch (err: any) {
      this.showToast('Error al guardar: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      this.isSaving = false;
      this.isUploading = false;
      this.cdr.detectChanges();
    }
  }

  // --- Eliminar Noticia ---
  confirmDelete(post: BlogPost): void {
    this.postToDelete = post;
    this.isDeleteModalOpen = true;
    this.cdr.detectChanges();
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.postToDelete = null;
    this.cdr.detectChanges();
  }

  async deletePost(): Promise<void> {
    if (!this.postToDelete || !this.postToDelete.id) return;

    this.isDeleting = true;
    this.cdr.detectChanges();
    try {
      await this.blogService.deletePost(this.postToDelete.id);
      this.showToast('Noticia eliminada correctamente.', 'success');
      this.closeDeleteModal();
      await this.loadPosts();
    } catch (err: any) {
      this.showToast('Error al eliminar: ' + (err.message || 'Error desconocido'), 'error');
    } finally {
      this.isDeleting = false;
      this.cdr.detectChanges();
    }
  }

  // --- Toast ---
  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    this.ngZone.run(() => {
      this.toastMessage = message;
      this.toastType = type;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.ngZone.run(() => {
          this.toastMessage = '';
          this.cdr.detectChanges();
        });
      }, 4000);
    });
  }
}
