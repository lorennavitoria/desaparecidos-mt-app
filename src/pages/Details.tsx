import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarPessoaPorId } from "../services/api";
import type { Person } from "../types";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!person) return <div>Pessoa não encontrada</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{person.nome}</h1>
      {person.foto && (
        <img
          src={person.foto}
          alt={person.nome}
          className="mb-4 w-full h-64 object-cover rounded"
        />
      )}
      <p className={`font-bold mb-2 ${person.status === "Desaparecida" ? "text-red-500" : "text-green-500"}`}>
        Status: {person.status}
      </p>
      {person.idade && <p>Idade: {person.idade}</p>}
      {person.sexo && <p>Sexo: {person.sexo}</p>}

      {/* Botão para registrar nova informação */}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => alert("Abrir formulário de envio de informações")}
      >
        Registrar nova informação
      </button>
    </div>
  );
};

export default Details;
