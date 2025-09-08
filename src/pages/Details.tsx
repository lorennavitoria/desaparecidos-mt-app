import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarPessoaPorId,
  enviarInformacao,
  buscarInformacoesDesaparecido,
} from "../services/api";
import type { Person } from "../types";
import axios from "axios";
import { toast } from "react-toastify";


const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados do formulário
  const [informacao, setInformacao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]); // yyyy-MM-dd
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [sucessoEnvio, setSucessoEnvio] = useState<string | null>(null);

  // Estado vivo/desaparecida
  const [vivo, setVivo] = useState("");

  // Estado das informações adicionais da ocorrência
  const [informacoes, setInformacoes] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchPerson = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await buscarPessoaPorId(id);
        setPerson(res.data);
        setVivo(res.data.vivo ? "Localizada" : "Desaparecida");

        // Buscar informações adicionais da ocorrência
        if (res.data?.ultimaOcorrencia?.ocoId) {
          const infoRes = await buscarInformacoesDesaparecido(
            res.data.ultimaOcorrencia.ocoId
          );
          setInformacoes(infoRes.data);
        }
      } catch (err: unknown) {
  console.error(err);

  if (axios.isAxiosError(err)) {
    // err é do tipo AxiosError aqui
    const msg = err.response?.data?.message || "Erro ao carregar detalhes da pessoa.";
    setError(msg);
    toast.error(msg);
  } else {
    // erro genérico não Axios
    setError("Erro ao carregar detalhes da pessoa.");
    toast.error("Erro ao carregar detalhes da pessoa.");
  }
} finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  const handleEnviarInformacao = async () => {
    if (!person || !person.ultimaOcorrencia) return;

    if (!informacao || !data || !descricao) {
    const msg = "Preencha todos os campos obrigatórios.";
    setErroEnvio(msg);
    toast.warning(msg);

      return;
    }

    const ocoId = person.ultimaOcorrencia.ocoId;

    setEnviando(true);
    setErroEnvio(null);
    setSucessoEnvio(null);

    try {
      await enviarInformacao(
        ocoId,
        informacao,
        data,
        descricao || undefined,
        foto || undefined
      );
      setSucessoEnvio("Informação enviada com sucesso!");
        toast.success("Informação enviada com sucesso!");
      setInformacao("");
      setDescricao("");
      setData(new Date().toISOString().split("T")[0]);
      setFoto(null);

       // Recarregar informações
    try {
      const infoRes = await buscarInformacoesDesaparecido(ocoId);
      setInformacoes(infoRes.data);
    } catch (fetchErr) {
      console.error(fetchErr);
      toast.error("Não foi possível atualizar a lista de informações.");
    }
  }catch (err: unknown) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      const msg = err.response?.data?.message || "Erro ao enviar informação.";
      setErroEnvio(msg);
      toast.error(msg);
    } else {
      setErroEnvio("Erro ao enviar informação.");
      toast.error("Erro ao enviar informação.");
    }
  } finally {
    setEnviando(false);
  }
};

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!person) return <div>Pessoa não encontrada</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
      >
        ← Voltar
      </button>
      <h1 className="text-2xl font-bold mb-4">{person.nome}</h1>

      {person.urlFoto && (
        <img
          src={person.urlFoto}
          alt={person.nome}
          className="mb-4 w-full h-64 object-cover rounded"
        />
      )}

      <p
        className={`font-bold mb-2 px-2 py-1 inline-block rounded ${
          vivo === "Desaparecida"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {vivo}
      </p>
      <p className="mb-2">Idade: {person.idade ?? "N/A"}</p>
      <p className="mb-2">Sexo: {person.sexo ?? "N/A"}</p>

      {/* Lista de informações da ocorrência */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-bold mb-2">Informações registradas</h2>
        {informacoes.length === 0 && (
          <p className="text-gray-500">Nenhuma informação registrada ainda.</p>
        )}
        <ul className="space-y-3">
          {informacoes.map((info) => (
            <li
              key={info.id}
              className="border p-3 rounded bg-gray-50 shadow-sm"
            >
              <p className="text-gray-800">{info.informacao}</p>
              <p className="text-sm text-gray-500">
                Data: {new Date(info.data).toLocaleDateString("pt-BR")}
              </p>
              {info.anexos && info.anexos.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Anexos:</p>
                  <ul className="list-disc list-inside">
                    {info.anexos.map((anexo: string, i: number) => (
                      <li key={i}>
                        <a
                          href={anexo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Ver anexo {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Formulário de envio de informações */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-bold mb-2">Registrar nova informação</h2>

        {erroEnvio && <p className="text-red-500 mb-2">{erroEnvio}</p>}
        {sucessoEnvio && <p className="text-green-500 mb-2">{sucessoEnvio}</p>}

        <div className="mb-2">
          <label className="block mb-1">Informação *</label>
          <textarea
            value={informacao}
            onChange={(e) => setInformacao(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Data *</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Descrição *</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Foto</label>
          <input
            type="file"
            onChange={(e) => e.target.files && setFoto(e.target.files[0])}
          />
        </div>

        <button
          onClick={handleEnviarInformacao}
          disabled={enviando}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 transition"
        >
          {enviando ? "Enviando..." : "Enviar informação"}
        </button>
      </div>
    </div>
  );
};

export default Details;
