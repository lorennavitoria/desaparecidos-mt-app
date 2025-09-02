export interface Ocorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: {
    informacao: string | null;
    vestimentasDesaparecido: string;
  };
  listaCartaz: any[]; // se houver detalhes dos cartazes, você pode tipar melhor
  ocoId: number;
}

export interface Person {
  id: number;
  nome: string;
  urlFoto?: string; // a API retorna urlFoto, não 'foto'
  status: "Desaparecida" | "Localizada";
  idade?: number;
  sexo?: string;
  vivo?: boolean;
  ultimaOcorrencia?: Ocorrencia;
}
