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
      className="w-full mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
    />
  );
};

export default SearchBar;
