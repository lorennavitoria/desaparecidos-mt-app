import { useNavigate } from "react-router-dom";
import type { Person } from "../types";
import { FaUserAlt } from "react-icons/fa"; 

interface PersonCardProps {
  person: Person;
}


// OBS: A API em https://abitus-api.geia.vip/v1/pessoas/aberto/filtro não retorna um campo explícito
// indicando se a pessoa está "Desaparecida" ou "Localizada".  
// Para contornar essa limitação, definimos o status manualmente aqui com base na presença de informações
// da última ocorrência (`ultimaOcorrencia.dataLocalizacao`).  
// Se `dataLocalizacao` estiver preenchida, consideramos "Localizada", caso contrário, "Desaparecida".  
// Essa abordagem não é 100% precisa, mas permite exibir um status no frontend.

const PersonCard = ({ person }: PersonCardProps) => {
  const navigate = useNavigate();
  const status = person.status ?? (person.ultimaOcorrencia?.dataLocalizacao ? "Localizada" : "Desaparecida");


  return (
    <div
      className="border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden bg-white"
      onClick={() => navigate(`/details/${person.id}`)}
    >
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        {person.urlFoto ? (
          <img
            src={person.urlFoto}
            alt={person.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserAlt className="text-gray-400 text-6xl" />
        )}
      </div>

      <div className="p-4">
        <p className="font-bold text-lg mb-2 truncate">{person.nome}</p>

          <p
          className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
            status === "Desaparecida"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {status}
        </p>


        {person.idade !== undefined && (
          <p className="mt-2 text-gray-700 text-sm">Idade: {person.idade}</p>
        )}
        {person.sexo && (
          <p className="text-gray-700 text-sm">Sexo: {person.sexo}</p>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
