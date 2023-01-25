import React, { useContext } from "react"
import styled from "styled-components"

import { AtLeastOne } from "../../types/AtLeastOne"

import { ThemeContext } from "../context/ThemeContext"

import { Grid, GridItem } from "../components/MaterialGrid"
import RecipeCard from "../components/RecipeCard"
import Layout from "../components/Layout"

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

type RecipeProps = {
  recipes: {
    id: number | string;
    name: string;
    type: "Week" | "Weekend" | "Both";
    macros?: {
      proteins: number;
      carbs: number;
      fats: number;
      gramsPerServing: number;
    }
    idIngredients: (number | string)[];
    options?: AtLeastOne<{
      description: string;
      imageUrl: string;
    }>
  }[]
}

export default function Recipes() {
  const { theme } = useContext(ThemeContext)

  const recipes: {
  name: string
  type: "Week" | "Weekend" | "Both"
  options?: AtLeastOne<{
    description: string
    imageUrl: string
  }>;
}[] = [
    {
      name: "Arroz com ovo",
      type: "Week",
      options: {
        description: "Receita simples de arroz com ovos",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlc3xlbnwwfHwwfHw%3D&w=1000&q=80"
      }
    },
    {
      name: "Parmeggiana",
      type: "Week"
    },
    {
      name: "Sushi",
      type: "Weekend",
      options: {
        description: "Niguiri, sushi e Sashimi",
      }
    },
    {
      name: "Churrasco",
      type: "Weekend",
      options: {
        description: "Picanha, pão de alho, linguicinha e queijo coalho",
      }
    },
    {
      name: "Arroz com ovo",
      type: "Week",
      options: {
        description: "Receita simples de arroz com ovos",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlc3xlbnwwfHwwfHw%3D&w=1000&q=80"
      }
    },
    {
      name: "Parmeggiana",
      type: "Week",
      options: {
        description: "Macarrão e peito de frango parmeggiana",
      }
    },
    {
      name: "Sushi",
      type: "Weekend",
      options: {
        description: "Niguiri, sushi e Sashimi",
      }
    },
    {
      name: "Churrasco",
      type: "Weekend",
      options: {
        description: "Picanha, pão de alho, linguicinha e queijo coalho",
      }
    },
    {
      name: "Arroz com ovo",
      type: "Week",
      options: {
        description: "Receita simples de arroz com ovos",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlc3xlbnwwfHwwfHw%3D&w=1000&q=80"
      }
    },
    {
      name: "Parmeggiana",
      type: "Week",
      options: {
        description: "Macarrão e peito de frango parmeggiana",
      }
    },
    {
      name: "Sushi",
      type: "Weekend",
      options: {
        description: "Niguiri, sushi e Sashimi",
      }
    },
    {
      name: "Churrasco",
      type: "Weekend",
      options: {
        description: "Picanha, pão de alho, linguicinha e queijo coalho",
      }
    }
  ]

  return (
    <Layout>
      <Title>Receitas</Title>
      <Grid>
        {recipes.map((recipe) => {
          const { name, type, options } = recipe;
          return (
            <GridItem span={4}>
              <RecipeCard
                status="active"
                name={name}
                type={type}
                options={options}
              />
            </GridItem>
          )
        })}
        <GridItem span={4}>
          <RecipeCard status="inactive"/>
        </GridItem>
      </Grid>
    </Layout>
  )
}