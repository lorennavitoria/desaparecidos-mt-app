interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nome..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full mb-4"
    />
  );
};

export default SearchBar;
