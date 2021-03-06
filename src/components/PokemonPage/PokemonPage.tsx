import React, { FunctionComponent, useState, useEffect, Fragment } from "react";
import StyledPokemonPage from "styled/StyledPokemonPage";
import Loader from "styled/Loader";
import getData from "util/getData";
import Stat from "styled/Stat";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Card from "styled/Card";
import Image from "styled/Image";
import TypesContainer from "components/PokemonPage/TypesContainer/TypesContainer";
import StatsContainer from "components/PokemonPage/StatsContainer/StatsContainer";
import MovesContainer from "components/PokemonPage/MovesContainer";

interface MatchProps {
  pokemonName: string;
}
interface PokemonPageProps extends RouteComponentProps<MatchProps> {}
const PokemonPage: FunctionComponent<PokemonPageProps> = ({ match }) => {
  const [pokemon, setPokemon] = useState<any | null>(null);
  const { pokemonName } = match.params;
  useEffect(() => {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    getData(url).then(data => {
      setPokemon(data);
    });
  }, [pokemonName]);
  return (
    <>
      {pokemon ? (
        <StyledPokemonPage>
          <Card>
            <Stat light={true}>#{pokemon.id}</Stat>
            <Image>
              <img src={pokemon.sprites.front_default} alt={pokemonName} />
            </Image>
            <h1 className="name">{pokemonName}</h1>
            <Stat>Weight :{pokemon.weight}</Stat>
            <Stat>Height :{pokemon.height}</Stat>
            <TypesContainer types={pokemon.types} />
          </Card>
          <Card grid={true}>
            {Object.entries(pokemon.sprites).map(sprite => {
              if (sprite[1]) {
                const spriteName = sprite[0].split("_").join(" ");
                return (
                  <Fragment key={sprite[0]}>
                    <Image>
                      <img src={`${sprite[1]}`} alt={spriteName} />
                    </Image>
                    <Stat large={true}>{spriteName}</Stat>
                  </Fragment>
                );
              }
            })}
          </Card>
          <Card>
            <StatsContainer stats={pokemon.stats} />
          </Card>
          <Card>
            <MovesContainer
              moves={pokemon.moves}
              type={pokemon.types[0].type.name}
            />
          </Card>
        </StyledPokemonPage>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withRouter(PokemonPage);
