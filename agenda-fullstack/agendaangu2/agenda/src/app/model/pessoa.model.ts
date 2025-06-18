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
