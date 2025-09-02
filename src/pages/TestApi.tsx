import { useEffect, useState } from "react";
import {
  buscarPessoasFiltro,
  buscarPessoaPorId,
  buscarInformacoesDesaparecido,
  buscarMotivosOcorrencias,
  buscarEstatisticas,
  buscarDadosDinamicos,
} from "../services/api";

const TestApi = () => {
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const testarEndpoint = async () => {
    setLoading(true);
    setErro(null);

    try {
      const pessoas = await buscarPessoasFiltro({ nome: "João" });
      const pessoa = await buscarPessoaPorId(1);
      const info = await buscarInformacoesDesaparecido(33);
      const motivos = await buscarMotivosOcorrencias();
      const stats = await buscarEstatisticas();
      const dinamico = await buscarDadosDinamicos();

      setResultado({
        pessoas: pessoas.data,
        pessoa: pessoa.data,
        info: info.data,
        motivos: motivos.data,
        stats: stats.data,
        dinamico: dinamico.data,
      });
    } catch (err: any) {
      console.error(err);
      setErro("Erro ao testar endpoints. Veja console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testarEndpoint(); // chama automaticamente ao abrir a página
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Endpoints API</h1>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-red-500">{erro}</p>}

      {resultado && (
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(resultado, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestApi;
