import { Router, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Campeonatos } from './components/campeonatos/campeonatos';
import { Admin } from './components/admin/admin';
import { Gestao } from './components/gestao/gestao';
import { inject } from '@angular/core';
import { AuthService } from './services/auth';


export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'campeonatos', component: Campeonatos},
    {path: 'admin', component: Admin},
    {path: 'gestao', 
  component: Gestao,
   canActivate: [() => {
    const token = localStorage.getItem('token');
    if (token) return true;
    
    // Se não tiver token, mandamos para /admin
    return inject(Router).createUrlTree(['/admin']); 
  }]
 
  }
]; 