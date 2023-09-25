import React from "react";
import { ICharacter } from "./CharacterList";

const CharacterListItem: React.FC<ICharacter> = ({ name }) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default CharacterListItem;
