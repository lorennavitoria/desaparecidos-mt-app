// src/components/FormInformation.tsx
import { useState } from 'react';
import { postInformation } from '../services/api';

const FormInformation = ({ personId }: { personId: string }) => {
  const [observacao, setObservacao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!observacao || !localizacao || !foto) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('observacao', observacao);
    formData.append('localizacao', localizacao);
    formData.append('foto', foto);

    try {
      await postInformation(personId, formData);
      alert('Informações enviadas com sucesso!');
    } catch (err) {
      setError('Erro ao enviar informações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Observação</label>
        <textarea
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />
      </div>
      <div>
        <label>Localização</label>
        <input
          type="text"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
        />
      </div>
      <div>
        <label>Foto</label>
        <input
          type="file"
          onChange={(e) => setFoto(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Informações'}
      </button>
    </form>
  );
};

export default FormInformation;
