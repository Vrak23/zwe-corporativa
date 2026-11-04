import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { BlogService, BlogPost } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  selectedCategory: string = 'all';
  categories: string[] = ['Laboral', 'Finanzas', 'Tributario', 'Contabilidad'];
  posts: BlogPost[] = [];
  isLoading: boolean = false;

  constructor(
    private scrollAnimation: ScrollAnimationService,
    public blogService: BlogService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // 1. Mostrar inmediatamente los posts cacheados para carga instantánea
    this.posts = this.blogService.getCachedPosts();
    
    // 2. Obtener los posts más actualizados de Supabase
    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    try {
      const data = await this.blogService.getPosts();
      this.ngZone.run(() => {
        this.posts = data;
        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.scrollAnimation.refresh();
        }, 100);
      });
    } catch (err) {
      console.warn('Error al cargar posts:', err);
      this.ngZone.run(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }
  }

  get filteredPosts(): BlogPost[] {
    if (this.selectedCategory === 'all') {
      return this.posts;
    }
    return this.posts.filter(p => p.category.toLowerCase() === this.selectedCategory.toLowerCase());
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.scrollAnimation.refresh();
    }, 50);
  }

  openPostLink(post: BlogPost): void {
    if (post.link && post.link.trim()) {
      let url = post.link.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
