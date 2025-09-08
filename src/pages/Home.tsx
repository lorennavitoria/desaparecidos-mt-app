import { useEffect, useState } from "react";
import { buscarPessoasFiltro, buscarEstatisticas} from "../services/api";
import type { Person } from "../types";
import { FaUserAlt } from "react-icons/fa"; // ícone para pessoas sem foto
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

   const [estatisticas, setEstatisticas] = useState<{
    quantPessoasDesaparecidas: number;
    quantPessoasEncontradas: number;
  } | null>(null);

  const fetchPeople = async (page: number = 0, nome: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const filtros = nome ? { nome } : {};
      const res = await buscarPessoasFiltro(filtros, page, 10);
      setPeople(res.data.content || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar pessoas.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEstatisticas = async () => {
    try {
      const res = await buscarEstatisticas();
      setEstatisticas(res.data);
    } catch (err) {
      console.error("Erro ao buscar estatísticas", err);
    }
  };

  useEffect(() => {
    fetchPeople(currentPage, search);
  }, [currentPage, search]);

   useEffect(() => {
    fetchEstatisticas();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Pessoas Desaparecidas ou Localizadas
      </h1>

       {/* Estatísticas */}
      {estatisticas && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow text-center">
            <p className="text-lg font-bold">Desaparecidos</p>
            <p className="text-2xl font-extrabold">
              {estatisticas.quantPessoasDesaparecidas}
            </p>
          </div>
          <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow text-center">
            <p className="text-lg font-bold">Localizados</p>
            <p className="text-2xl font-extrabold">
              {estatisticas.quantPessoasEncontradas}
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-center">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="border rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col items-center p-4"
            onClick={() => navigate(`/details/${person.id}`)}
          >
            {person.urlFoto ? (
              <img
                src={person.urlFoto}
                alt={person.nome}
                className="w-full h-48 object-cover rounded mb-3"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-3">
                <FaUserAlt className="text-gray-400 text-6xl" />
              </div>
            )}
            <p className="font-bold text-center mb-1">{person.nome}</p>
            <p
              className={`font-semibold ${
                person.status === "Desaparecida"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {person.status}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
