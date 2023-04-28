import { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react'

import { pokeApi } from '@/api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '@/interfaces'
import { PokemonCard } from '@/components/pokemon/index'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de pokemon">


      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id}  pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
}

//- SOLO DENTRO DE LAS PAGES
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }))
  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

  return {
    props: {
      pokemons,
    },
  }
}

export default HomePage
