import { Routes } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pessoas', pathMatch: 'full' },
  { path: 'pessoas', component: PessoaComponent },
  // Adicione outras rotas conforme necessário
];