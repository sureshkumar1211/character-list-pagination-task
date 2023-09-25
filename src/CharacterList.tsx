import React, { useEffect, useState } from "react";
import CharacterListItem from "./CharacterListItem";

/**
 * 
 * id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",

      Pagination
      "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
 */
export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
}

export interface IPaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
// interface CharacterListProps {
//   data: ICharacter[];
// }

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[] | []>([]);
  const [paginationInfo, setPaginationInfo] = useState<IPaginationInfo | null>(
    null
  );
  const renderCharacters = () => {
    if (!characters.length) {
      return <p>Loading</p>;
    }
    return (
      characters?.length &&
      characters.map((character: ICharacter, index) => {
        return <CharacterListItem key={index} {...character} />;
      })
    );
  };

  const getCharacters = async (
    url: string = "https://rickandmortyapi.com/api/character"
  ) => {
    const response = await fetch(url);
    const formatResponse = await response.json();
    // debugger;
    console.log(formatResponse);
    setPaginationInfo(formatResponse.info);
    setCharacters(formatResponse.results);
  };

  const nextPageOnclickHandler = async (e: any) => {
    e.preventDefault();
    getCharacters(paginationInfo?.next as string);
  };

  const renderPagination = () => {
    if (!paginationInfo) {
      return null;
    }
    return (
      paginationInfo?.next && (
        <button onClick={nextPageOnclickHandler}>Next</button>
      )
    );
  };
  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <section>
      {renderCharacters()}
      <div>{renderPagination()}</div>
    </section>
  );
};

export default CharacterList;
