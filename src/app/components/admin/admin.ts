import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  loginData = { email: '', password: '' };
  

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
   if (this.auth.isLoggedIn()){
    console.log("Usuário já logado, redirecionando para gestão...");
    this.router.navigate(['/gestao']);
   }
  }

  onSubmit() {
  

    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login feito com sucesso! Token recebido:', res.token);
        this.router.navigate(['/gestao']);
      },
      error: (err) => {
        console.error('Erro detalhado do servidor:', err);
        alert('Erro ao logar! Verifique se o backend está rodando.');
      }
    });
  }
}