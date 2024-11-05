type SearchFormProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

const SearchForm = ({ searchText, setSearchText }: SearchFormProps) => {
  return (
    <form
      action="#"
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
    </form>
  );
};

export default SearchForm;
