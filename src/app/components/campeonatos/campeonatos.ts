import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TimeService } from '../../services/time'; 
import { Time } from '../../../Models/time.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-campeonatos',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './campeonatos.html',
  styleUrl: './campeonatos.css',
})
export class Campeonatos implements OnInit {
  displayedColumns: string[] = [
    'pos',
    'time',
    'vitorias',
    'empates',
    'derrotas',
    'golsMarcados',
    'golsSofridos',
    'pontos',
  ];

  dataSource: Time[] = [];

  constructor(
    private timeService: TimeService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    // IMPORTANTE: Use o seu serviço, não o this.http direto
    this.timeService.getTimes().subscribe({
      next: (dados: Time[]) => {
        // Lógica de Ordenação
        this.dataSource = dados.sort((a, b) => {
          if (b.pontos !== a.pontos) return b.pontos - a.pontos;
          if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
          
          const saldoA = (a.golsMarcados || 0) - (a.golsSofridos || 0);
          const saldoB = (b.golsMarcados || 0) - (b.golsSofridos || 0);
          return saldoB - saldoA;
        });

        console.log('Tabela ordenada com sucesso!');
        this.cdr.detectChanges(); // Garante que o Angular Material perceba a mudança
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar tabela', err.message);
      }
    });
  }
}