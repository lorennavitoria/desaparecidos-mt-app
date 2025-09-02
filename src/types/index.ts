export interface Person {
  id: number;
  nome: string;
  foto?: string;
  status: "Desaparecida" | "Localizada";
  idade?: number;
  sexo?: string;
}
