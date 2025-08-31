import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPersonDetails } from '../services/api';
import FormInformation from '../components/FormInformation';
import type { Person } from '../types';



const Details = () => {
  const { id } = useParams<{ id: string }>(); // useParams tipado
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // evita erro caso id seja undefined

    const fetchPersonDetails = async () => {
      try {
        const data = await getPersonDetails(id);
        setPerson(data);
      } catch (err) {
        setError('Erro ao carregar os detalhes da pessoa.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!person) return <div>Pessoa não encontrada.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{person.nome}</h1>
      <p className={`mb-2 font-semibold ${person.status === 'Desaparecida' ? 'text-red-500' : 'text-green-500'}`}>
        Status: {person.status}
      </p>
      <p className="mb-2">Idade: {person.idade}</p>
      <p className="mb-4">Descrição: {person.descricao}</p>
      {person.foto && <img src={person.foto} alt={person.nome} className="mb-4 w-full rounded" />}

      <h2 className="text-xl font-bold mb-2">Registrar Nova Informação</h2>
      <FormInformation personId={person.id} />
    </div>
  );
};

export default Details;
