import axios from "axios";

export const api = axios.create({
  baseURL: "https://abitus-api.geia.vip",
});

export const buscarPessoasFiltro = (filtros: any = {}, pagina: number = 0, porPagina: number = 10) =>
  api.get("/v1/pessoas/aberto/filtro", {
    params: {
      pagina,
      porPagina,
      ...filtros,
    },
  });

export const buscarPessoaPorId = (id: number | string) =>
  api.get(`/v1/pessoas/${id}`);


export const buscarInformacoesDesaparecido = (ocoId: number) =>
  api.get("/v1/ocorrencias/informacoes-desaparecido", {
    params: { ocorrenciaId: ocoId },
  });

export const buscarMotivosOcorrencias = () =>
  api.get("/v1/ocorrencias/motivos");

export const buscarEstatisticas = () =>
  api.get("/v1/pessoas/aberto/estatistico");

export const buscarDadosDinamicos = () =>
  api.get("/v1/pessoas/aberto/dinamico");

export const verificarDuplicidade = (payload: {
  nome: string;
  mae: string;
  cpf: string;
  dataNascimento: string;
  dataDesaparecimento: string;
}) =>
  api.post("/v1/ocorrencias/delegacia-digital/verificar-duplicidade", payload);


export const enviarInformacao = async (
  ocoId: number,
  informacao: string,
  data: string, // formato yyyy-MM-dd
  descricao?: string,
  foto?: File
) => {
  const formData = new FormData();
  
  if (foto) formData.append("files", foto); // arquivos enviados via multipart
  // A API aceita descricao como query, mas você pode manter aqui se quiser
  const params = new URLSearchParams();
  params.append("ocoId", ocoId.toString());
  params.append("informacao", informacao);
  params.append("data", data);
  if (descricao) params.append("descricao", descricao);

  return api.post(`/v1/ocorrencias/informacoes-desaparecido?${params.toString()}`, formData);
};


export const criarOcorrenciaDelegaciaDigital = (payload: any) =>
  api.post("/v1/ocorrencias/delegacia-digital", payload);

export const login = (login: string, password: string) =>
  api.post("/v1/login", { login, password });

export const refreshToken = (refreshToken: string) =>
  api.post("/v1/refresh-token",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
