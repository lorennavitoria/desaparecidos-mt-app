// src/types.ts
export interface Person {
  id: string;
  nome: string;
  status: 'Desaparecida' | 'Localizada';
  idade: number;
  descricao: string;
  foto?: string;
}

