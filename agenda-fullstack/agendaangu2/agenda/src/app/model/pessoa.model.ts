export interface Pessoa {
    id?: number;
    nome: string;
    cpfCnpj: string;
    telefone: string;
    email: string;
    funcao: string;
    login: string;
    senha: string;
    perfil: string;
  }
  
  // OU se preferir usar classe:
  
  export class Pessoa {
    constructor(
      public id?: number,
      public nome: string = '',
      public cpfCnpj: string = '',
      public telefone: string = '',
      public email: string = '',
      public funcao: string = '',
      public login: string = '',
      public senha: string = '',
      public perfil: string = ''
    ) {}
  
    // Remova os getters se estiver usando interface
    // Se usar classe, declare os getters corretamente:
    get cpfFormatado(): string {
      if (!this.cpfCnpj) return '';
      const cleanCpf = this.cpfCnpj.replace(/\D/g, '');
      if (cleanCpf.length === 11) {
        return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      return this.cpfCnpj;
    }
  
    get telefoneFormatado(): string {
      if (!this.telefone) return '';
      const nums = this.telefone.replace(/\D/g, '');
      if (nums.length === 11) {
        return nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
      return this.telefone;
    }
  }