import React, { FunctionComponent, useState, useEffect, Fragment } from 'react';
import PokemonType from '../../../interfaces/PokemonType';
import StyledTypesContainer from '../../../styled/StyledTypesContainer';
import Button from '../../../styled/Button';
interface TypesContainerProps {
  types: PokemonType[];
}
const TypesContainer: FunctionComponent<TypesContainerProps> = ({ types }) => {
  console.log(types);
  return (
    <StyledTypesContainer>
      {types.map(type => (
        <Button key={type.type.name} pokemonType={type.type.name}>
          {type.type.name}
        </Button>
      ))}
    </StyledTypesContainer>
  );
};

export default TypesContainer;
