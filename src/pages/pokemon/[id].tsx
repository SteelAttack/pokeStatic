import { useState } from 'react'

import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { pokeApi } from '@/api'
import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces'
import { localFavorites } from '@/utils'
import { PokemonInfo } from '../../components/pokemon/PokemonInfo'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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
    return 'test'//isInFavorites == true ? 'En favoritos' : 'Guardar en favoritos' || ''
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }
  const { data } = await pokeApi.get<Pokemon>(`pokemon/${id}`)

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

export default PokemonPage
