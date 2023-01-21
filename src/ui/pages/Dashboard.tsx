import React from "react"
import styled from "styled-components"
import { Grid, GridItem } from "../components/MaterialGrid"

const Box = styled.div`
  background-color: ${props => props.color ? props.color : "black"};
  width: 100%;
  padding-bottom: 56.25%;
`

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

export default function Dashboard() {
  return (
    <div>
      <Title>Recipes Organizer</Title>
      <Grid>
        <GridItem span={4}>
          <Box color="red" />
        </GridItem>
        <GridItem span={4}>
          <Box color="blue" />
        </GridItem>
        <GridItem span={4}>
          <Box />
        </GridItem>
        <GridItem span={4}>
          <Box color="red" />
        </GridItem>
        <GridItem span={4}>
          <Box color="blue" />
        </GridItem>
        <GridItem span={4}>
          <Box color="pink"/>
        </GridItem>
      </Grid>
    </div>
  )
}