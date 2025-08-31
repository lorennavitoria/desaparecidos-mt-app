import { useEffect, useState } from 'react';
import { getPeople } from '../services/api';
import type { Person } from '../types';


const Home = () => {
  const [people, setPeople] = useState<Person[]>([]); // ✅ tipo correto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();
        setPeople(data); // agora TypeScript sabe que data é Person[]
      } catch (err) {
        setError('Erro ao carregar os registros.');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pessoas Desaparecidas ou Localizadas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {people.map((person) => (
          <div key={person.id} className="border p-2 rounded shadow">
            {person.foto && (
              <img src={person.foto} alt={person.nome} className="mb-2 w-full h-48 object-cover rounded" />
            )}
            <p className="font-bold">{person.nome}</p>
            <p className={person.status === 'Desaparecida' ? 'text-red-500' : 'text-green-500'}>
              {person.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
