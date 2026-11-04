import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

  formData = {
    nombre:   '',
    correo:   '',
    telefono: '',
    ruc:      '',
    servicio: '',
    mensaje:  '',
    _gotcha:  ''
  };

  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  submitForm() {
    if (!this.formData.nombre || !this.formData.correo || !this.formData.telefono || !this.formData.servicio || !this.formData.mensaje) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    // Honeypot check
    if (this.formData._gotcha) {
      this.isSuccess = true;
      this.successMessage = '¡Tu mensaje ha sido enviado exitosamente!';
      this.resetForm();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.isSuccess = false;

    const payload = {
      'Nombre': this.formData.nombre,
      'Correo': this.formData.correo,
      'Teléfono': this.formData.telefono,
      'RUC / DNI': this.formData.ruc || 'No especificado',
      'Servicio de Interés': this.formData.servicio,
      'Mensaje': this.formData.mensaje,
      '_subject': `Nuevo Contacto Web: ${this.formData.servicio} - ${this.formData.nombre}`,
      '_template': 'table',
      '_captcha': 'false'
    };

    const apiUrl = 'https://formsubmit.co/ajax/ventas@zwecorporativa.com';

    this.http.post<{ success: string | boolean; message?: string }>(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res && (res.success === 'true' || res.success === true)) {
          this.isSuccess = true;
          this.successMessage = '¡Tu mensaje ha sido enviado exitosamente! Nos comunicaremos contigo a la brevedad.';
          this.resetForm();
        } else {
          this.errorMessage = res.message || 'Ocurrió un error al enviar el formulario.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Form submit error:', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'No se pudo enviar el mensaje en este momento. Puedes escribirnos directamente a ventas@zwecorporativa.com o por WhatsApp (+51 918 663 597).';
        }
      }
    });
  }

  resetForm() {
    this.formData = {
      nombre:   '',
      correo:   '',
      telefono: '',
      ruc:      '',
      servicio: '',
      mensaje:  '',
      _gotcha:  ''
    };
  }
}
