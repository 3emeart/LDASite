import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css'
})
export class Gestao implements OnInit {
  times: any[] = [];
  novoTime = { id: 0, nome: '', pontos: 0 };
  editando = false;
  colunas: string[] = ['nome', 'pontos', 'acoes'];

  private readonly API_URL = 'http://localhost:5158/api/Times';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarTimes();
  }

  carregarTimes() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (dados) => {
        // Lógica de Ordenação: Maior pontuação primeiro
        // Se empatar em pontos, desempata pelo Saldo de Gols (caso exista no seu banco)
        this.times = dados.sort((a, b) => {
          if (b.pontos !== a.pontos) {
            return b.pontos - a.pontos;
          }
          return (b.saldoGols || 0) - (a.saldoGols || 0);
        });

        console.log("Times carregados e ordenados:", this.times);
        
        // Garante que o Angular perceba a mudança nos dados e atualize a tabela
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erro ao carregar times:", err)
    });
  }

  prepararEdicao(time: any) {
    this.novoTime = { ...time };
    this.editando = true;
  }

  cancelarEdicao() {
    this.novoTime = { id: 0, nome: '', pontos: 0 };
    this.editando = false;
    this.cdr.detectChanges();
  }

  salvar() {
    if (this.editando) {
      // Atualizar time existente (PUT)
      this.http.put(`${this.API_URL}/${this.novoTime.id}`, this.novoTime).subscribe({
        next: () => this.finalizarAcao(),
        error: (err) => console.error("Erro ao editar:", err)
      });
    } else {
      // Adicionar novo time (POST)
      this.http.post(this.API_URL, this.novoTime).subscribe({
        next: () => this.finalizarAcao(),
        error: (err) => console.error("Erro ao salvar:", err)
      });
    }
  }

  private finalizarAcao() {
    this.carregarTimes();
    this.cancelarEdicao();
  }

  excluir(id: number) {
    if (confirm('Deseja realmente excluir este time da várzea?')) {
      this.http.delete(`${this.API_URL}/${id}`).subscribe({
        next: () => this.carregarTimes(),
        error: (err) => console.error("Erro ao excluir:", err)
      });
    }
  }
}