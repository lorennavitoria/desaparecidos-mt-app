import { useNavigate } from "react-router-dom";
import type { Person } from "../types";

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="border p-2 rounded shadow cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/details/${person.id}`)}
    >
      {person.urlFoto && (
        <img
          src={person.urlFoto}
          alt={person.nome}
          className="mb-2 w-full h-48 object-cover rounded"
        />
      )}
      <p className="font-bold">{person.nome}</p>
      <p
        className={
          person.status === "Desaparecida" ? "text-red-500" : "text-green-500"
        }
      >
        {person.status}
      </p>
    </div>
  );
};

export default PersonCard;
