import { useEffect, useState } from "react";
import { buscarPessoasFiltro } from "../services/api";
import type { Person } from "../types";
import PersonCard from "../components/PersonCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPeople = async (page: number = 0, nome: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const filtros = nome ? { nome } : {};
      const res = await buscarPessoasFiltro(filtros, page, 10);
      setPeople(res.data.content || res.data); // dependendo da API
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar pessoas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople(currentPage, search);
  }, [currentPage, search]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Pessoas Desaparecidas ou Localizadas
      </h1>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
