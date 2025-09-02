import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarPessoaPorId, enviarInformacao } from "../services/api";
import type { Person } from "../types";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados do formulário
  const [informacao, setInformacao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPerson = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await buscarPessoaPorId(id);
        setPerson(res.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar detalhes da pessoa.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

const handleEnviarInformacao = async () => {
  if (!person || !person.ultimaOcorrencia) return;

  const ocoId = person.ultimaOcorrencia.ocoId;
  const dataHoje = new Date().toISOString().split("T")[0]; // yyyy-MM-dd

  setEnviando(true);
  try {
    await enviarInformacao(
      ocoId,
      informacao,
      dataHoje,
      undefined, // descricao opcional
      foto ?? undefined
    );
    alert("Informação enviada com sucesso!");
    setInformacao("");
    setLocalizacao("");
    setFoto(null);
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar informação.");
  } finally {
    setEnviando(false);
  }
};




  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!person) return <div>Pessoa não encontrada</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{person.nome}</h1>

      {person.urlFoto && (
        <img
          src={person.urlFoto}
          alt={person.nome}
          className="mb-4 w-full h-64 object-cover rounded"
        />
      )}

      <p
        className={`font-bold mb-2 ${
          person.status === "Desaparecida" ? "text-red-500" : "text-green-500"
        }`}
      >
        Status: {person.status}
      </p>
      {person.idade && <p>Idade: {person.idade}</p>}
      {person.sexo && <p>Sexo: {person.sexo}</p>}

      {/* Formulário de envio de informações */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-bold mb-2">Registrar nova informação</h2>

        <div className="mb-2">
          <label className="block mb-1">Informação</label>
          <textarea
            value={informacao}
            onChange={(e) => setInformacao(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Localização</label>
          <input
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
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
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          {enviando ? "Enviando..." : "Enviar informação"}
        </button>
      </div>
    </div>
  );
};

export default Details;
