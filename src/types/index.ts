export interface Ocorrencia {
  ocoId: number;
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: {
    informacao: string | null;
    vestimentasDesaparecido: string;
    [key: string]: any; // para campos extras
  };
  listaCartaz: any[];
  [key: string]: any; // campos extras que a API retorna
}

export interface Person {
  id: number;
  nome: string;
  urlFoto?: string;
  status: "Desaparecida" | "Localizada";
  idade?: number;
  sexo?: string;
  vivo?: boolean;
  ultimaOcorrencia?: Ocorrencia;
  [key: string]: any; // campos extras da pessoa
}
