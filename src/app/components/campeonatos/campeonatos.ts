import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Adicionado ChangeDetectorRef
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { TimeService } from '../../services/time'; 
import { Time } from '../../../Models/time.model';

@Component({
  selector: 'app-campeonatos',
  standalone: true,
  imports: [MatTableModule, NgClass],
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

  // Adicionamos o cdr no construtor
  constructor(
    private timeService: TimeService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.timeService.getTimes().subscribe({
      next: (dados: Time[]) => {
        this.dataSource = dados;
        // Forçamos o Angular a verificar as mudanças para evitar o erro NG0100
        this.cdr.detectChanges(); 
        console.log('Dados vindos do MySQL:', dados);
      },
      error: (err: any) => console.error('Erro ao conectar na API:', err)
    });
  }
}