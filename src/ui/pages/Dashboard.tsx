import React from "react"
import styled from "styled-components"
import { AtLeastOne } from "../../types/AtLeastOne"
import { Grid, GridItem } from "../components/MaterialGrid"
import RecipeCard from "../components/RecipeCard"

const Box = styled.div<{
  height?: string
  color?: string
}>`
  background-color: ${props => props.color ? props.color : "black"};
  width: 100%;
  /* padding-bottom: 56.25%; */
  /* height: 200px; */
  /* height: ${props => props.height ? props.height : "200px"}; */
`

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

export default function Dashboard() {
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
    <div>
      <Title>Recipes Organizer</Title>
      <Grid>
        {recipes.map((recipe) => {
          const { name, type, options } = recipe;
          return (
            <GridItem span={4}>
              <RecipeCard
                name={name}
                type={type}
                options={options}
              />
            </GridItem>
        )}

        )}
      </Grid>
    </div>
  )
}