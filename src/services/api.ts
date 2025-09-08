import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://abitus-api.geia.vip",
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      toast.error("Sessão expirada. Faça login novamente.");
    } else if (status === 404) {
      toast.warning("Registro não encontrado.");
    } else if (status >= 500) {
      toast.error("Erro no servidor. Tente novamente mais tarde.");
    } else {
      toast.error("Ocorreu um erro inesperado.");
    }

    return Promise.reject(error);
  }
);


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



export const buscarMotivosOcorrencias = () =>
  api.get("/v1/ocorrencias/motivos");

export const buscarEstatisticas = () =>
  api.get("/v1/pessoas/aberto/estatistico");




export const enviarInformacao = async (
  ocoId: number,
  informacao: string,
  data: string,
  descricao?: string,
  foto?: File
) => {
  const formData = new FormData();
  
  if (foto) formData.append("files", foto); 
  const params = new URLSearchParams();
  params.append("ocoId", ocoId.toString());
  params.append("informacao", informacao);
  params.append("data", data);
  if (descricao) params.append("descricao", descricao);

  return api.post(`/v1/ocorrencias/informacoes-desaparecido?${params.toString()}`, formData);
};


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


  export const buscarInformacoesDesaparecido = (ocoId: number) =>
  api.get("/v1/ocorrencias/informacoes-desaparecido", {
    params: { ocorrenciaId: ocoId },
  });


  export const buscarDadosDinamicos = () =>
  api.get("/v1/pessoas/aberto/dinamico");
