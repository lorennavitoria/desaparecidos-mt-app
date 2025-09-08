import { useState } from "react";

interface FilterBarProps {
  onSearch: (filters: {
    nome?: string;
    faixaIdadeInicial?: number;
    faixaIdadeFinal?: number;
    sexo?: string;
    status?: string;
  }) => void;
}

const FilterBar = ({ onSearch }: FilterBarProps) => {
  const [nome, setNome] = useState("");
  const [faixaInicial, setFaixaInicial] = useState<number | "">("");
  const [faixaFinal, setFaixaFinal] = useState<number | "">("");
  const [sexo, setSexo] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    onSearch({
      nome: nome || undefined,
      faixaIdadeInicial: faixaInicial ? Number(faixaInicial) : undefined,
      faixaIdadeFinal: faixaFinal ? Number(faixaFinal) : undefined,
      sexo: sexo || undefined,
      status: status || undefined,
    });
  };

  const handleClear = () => {
    setNome("");
    setFaixaInicial("");
    setFaixaFinal("");
    setSexo("");
    setStatus("");
    onSearch({}); // envia filtros vazios
  };


  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="p-2 border rounded flex-1"
      />
      <input
  type="number"
  placeholder="Idade inicial"
  value={faixaInicial}
  onChange={(e) =>
    setFaixaInicial(e.target.value === "" ? "" : Number(e.target.value))
  }
  className="p-2 border rounded w-32"
/>

<input
  type="number"
  placeholder="Idade final"
  value={faixaFinal}
  onChange={(e) =>
    setFaixaFinal(e.target.value === "" ? "" : Number(e.target.value))
  }
  className="p-2 border rounded w-32"
/>

      <select
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
        className="p-2 border rounded w-40"
      >
        <option value="">Sexo</option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2 border rounded w-40"
      >
        <option value="">Status</option>
        <option value="DESAPARECIDO">Desaparecido</option>
        <option value="LOCALIZADO">Localizado</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Filtrar
      </button>
       <button
        onClick={handleClear}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        Limpar
      </button>
    </div>
  );
};

export default FilterBar;
