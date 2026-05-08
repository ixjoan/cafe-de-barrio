import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal('');
  cargando = signal(false);

  ingresar() {
    if (!this.username() || !this.password()) {
      this.error.set('Completa todos los campos.');
      return;
    }
    this.error.set('');
    this.cargando.set(true);

    this.authService.login(this.username(), this.password()).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.username, res.rol);
        if (res.rol === 'ADMIN') {
          this.router.navigate(['/admin/productos']);
        } else {
          this.router.navigate(['/catalogo']);
        }
      },
      error: () => {
        this.error.set('Usuario o contraseña incorrectos.');
        this.cargando.set(false);
      }
    });
  }
}