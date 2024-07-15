import React from "react";
import SearchForm from "./search-form";

type SearchBarProps = {
  IsVissible?: boolean;
};
const SearchBar: React.FC<SearchBarProps> = ({
  IsVissible = true,
}: SearchBarProps) => {
  return (
    <>
      {IsVissible && (
        <div className="bg-slate-100  rounded-full flex  items-center justify-center">
          <SearchForm />
        </div>
      )}
    </>
  );
};

export default SearchBar;
