import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  confirmar = signal('');
  error = signal('');
  cargando = signal(false);

  registrarse() {
    if (!this.username() || !this.password()) {
      this.error.set('Completa todos los campos.');
      return;
    }
    if (this.password() !== this.confirmar()) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }
    this.error.set('');
    this.cargando.set(true);

    this.authService.register(this.username(), this.password()).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.username, res.rol);
        this.router.navigate(['/catalogo']);
      },
      error: () => {
        this.error.set('El usuario ya existe o hubo un error.');
        this.cargando.set(false);
      }
    });
  }
}