import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Campeonatos } from './components/campeonatos/campeonatos';


export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'campeonatos', component: Campeonatos}
 
];