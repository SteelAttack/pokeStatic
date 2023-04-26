import { FC } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui'

interface Props {
  title?: string
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="SteelAttack" />
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      {<Navbar></Navbar>}
      <main style={{padding: '0px 20px'}}>
        { children }
        </main>
    </>
  )
}
