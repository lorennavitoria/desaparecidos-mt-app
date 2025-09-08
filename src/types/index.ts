export interface Ocorrencia {
  ocoId: number;
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: {
    informacao: string | null;
    vestimentasDesaparecido: string;
    [key: string]: any; 
  };
  listaCartaz: any[];
  [key: string]: any; 
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
  [key: string]: any; 
}
