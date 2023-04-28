import { pokeApi } from '@/api'
import { Layout } from '@/components/layouts'
import { PokemonInfo } from '@/components/pokemon/PokemonInfo'
import { Pokemon, PokemonListResponse } from '@/interfaces'
import { localFavorites } from '@/utils'
import { Grid, Card, Button, Container, Image, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC, useState } from 'react'
import { GenerationI } from '../../interfaces/pokemon-full';

interface Props {
  pokemon: Pokemon
}

const PokemonByName: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setisInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  )

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setisInFavorites(!isInFavorites)

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      })
    }
  }

  const setNameButton = (isInFavorites: boolean): string => {
    return 'test' //isInFavorites == true ? 'En favoritos' : 'Guardar en favoritos' || ''
  }

  return (
    <Layout title={pokemon.name}>
      <PokemonInfo
        pokemon={pokemon}
        isInFavorites={isInFavorites}
        onToggleFavorite={onToggleFavorite}
        setNameButton={setNameButton}
      />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)
  const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151')
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name)
  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }

  const { data } = await pokeApi.get<Pokemon>(`pokemon/${name}`)

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }

  return {
    props: {
      pokemon,
    },
  }
}

export default PokemonByName
