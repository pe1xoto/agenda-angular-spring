import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa } from '../model/pessoa.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  pessoas: WritableSignal<Pessoa[]> = signal<Pessoa[]>([]);
  pessoaSelecionada: Pessoa = new Pessoa();
  mensagem = signal<string>('');
  carregando = signal<boolean>(false);

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.carregando.set(true);
    this.pessoaService.listar().subscribe({
      next: (pessoas) => {
        this.pessoas.set(pessoas);
        this.carregando.set(false);
      },
      error: (err) => {
        this.mensagem.set('Erro ao carregar pessoas');
        console.error(err);
        this.carregando.set(false);
      }
    });
  }

  adicionar(): void {
    this.carregando.set(true);
    this.pessoaService.criar(this.pessoaSelecionada).subscribe({
      next: () => {
        this.mensagem.set(`${this.pessoaSelecionada.nome} adicionado(a) com sucesso!`);
        this.limpar();
        this.carregarPessoas();
      },
      error: (err) => {
        this.mensagem.set('Erro ao adicionar pessoa');
        console.error(err);
        this.carregando.set(false);
      }
    });
  }

  atualizar(): void {
    if (this.pessoaSelecionada.id) {
      this.carregando.set(true);
      this.pessoaService.atualizar(this.pessoaSelecionada.id, this.pessoaSelecionada).subscribe({
        next: () => {
          this.mensagem.set(`${this.pessoaSelecionada.nome} atualizado(a) com sucesso!`);
          this.limpar();
          this.carregarPessoas();
        },
        error: (err) => {
          this.mensagem.set('Erro ao atualizar pessoa');
          console.error(err);
          this.carregando.set(false);
        }
      });
    }
  }

  remover(): void {
    if (this.pessoaSelecionada.id && confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.carregando.set(true);
      this.pessoaService.remover(this.pessoaSelecionada.id).subscribe({
        next: () => {
          this.mensagem.set('Pessoa excluída com sucesso');
          this.limpar();
          this.carregarPessoas();
        },
        error: (err) => {
          this.mensagem.set('Erro ao remover pessoa');
          console.error(err);
          this.carregando.set(false);
        }
      });
    }
  }

  carregarDados(pessoa: Pessoa): void {
    this.pessoaSelecionada = new Pessoa(
      pessoa.id,
      pessoa.nome,
      pessoa.cpfCnpj,
      pessoa.telefone,
      pessoa.email,
      pessoa.funcao,
      pessoa.login,
      pessoa.senha,
      pessoa.perfil
    );
  }

  limpar(): void {
    this.pessoaSelecionada = {} as Pessoa;
    this.carregando.set(false);
  }
}