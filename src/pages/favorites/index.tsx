import { useState, useEffect } from 'react'

import { Layout } from '@/components/layouts'
import { NoFavorites } from '@/components/ui'
import { localFavorites } from '@/utils'

import { FavoritePokemons } from '@/components/pokemon/index'

const FavoritesPage = () => {
  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons)
  }, [])

  return (
    <Layout title="">
      {
        favoritePokemons.length === 0 
        ? ( <NoFavorites /> ) 
        : ( <FavoritePokemons pokemons={favoritePokemons} />)
      }
    </Layout>
  )
}

export default FavoritesPage
