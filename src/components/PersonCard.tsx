import { useNavigate } from "react-router-dom";
import type { Person } from "../types";
import { FaUserAlt } from "react-icons/fa"; // ícone para quem não tem foto

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  const navigate = useNavigate();

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
            person.status === "Desaparecida"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {person.status}
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
