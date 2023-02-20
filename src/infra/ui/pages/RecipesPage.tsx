import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import React from "react"
import styled from "styled-components"
import Button from "../components/buttons/Button"
import Card from "../components/cards/Card"
import Icon from "../components/Icon"
import { Grid, GridItem } from "../components/MaterialGrid"
import { Title } from "../components/styles"
import PageLayout from "./PageLayout"

const TopButtons = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`

type RecipesPageProps = {
  recipes: AdaptedRecipe[]
  fetchRecipesLoading: boolean
  createRecipesLoading: boolean
  events: {
    generatePdfRequest: () => void
    saveInJson: () => void
    loadFromJsonRequest: () => void
  }
}

export default function RecipesPage(props: RecipesPageProps) {
  return (
    <PageLayout>
      <Title variant={1} as="h1">Receitas</Title>
      <Grid>

        <GridItem rSpan={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}>
          <TopButtons>
            <Button variant="styled"
              text="Gerar PDF"
              onClick={props.events.generatePdfRequest}
              icon={<Icon variant="Document" size={20} />}
            />
            <Button variant="styled"
              text="Salvar em arquivo"
              onClick={props.events.saveInJson}
              icon={<Icon variant="Save" size={20} />}
            />
            <Button variant="styled"
              text="Carregar arquivo"
              onClick={props.events.loadFromJsonRequest}
              icon={<Icon variant="Load" size={20} />}
            />
          </TopButtons>
        </GridItem>

        {props.fetchRecipesLoading && (
          <GridItem span={4}>
            <Card variant="Skeleton"/>
          </GridItem>
        )}

        {props.recipes.map((recipe) => (
          <GridItem span={4} key={recipe.id}>
            <Card
              variant="Recipe"
              recipe={recipe}
            />
          </GridItem>
        )
        )}

        {props.createRecipesLoading && (
          <GridItem span={4}>
            <Card variant="Loading" />
          </GridItem>
        )}

        <GridItem span={4}>
          <Card variant="CreateRecipe" />
        </GridItem>
      </Grid>
    </PageLayout>
  )
}