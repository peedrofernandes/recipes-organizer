import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/buttons/Button"
import Card from "../components/cards/Card"
import Icon from "../components/Icon"
import { Grid, GridItem } from "../components/Grid"
import { Subtitle, Title } from "../components/styles"
import useViewportTracker from "../hooks/useViewportTracker"
import PageLayout from "./PageLayout"

export default function HelpPage() {
  const viewportState = useViewportTracker()

  const [firstElementMargin, setFirstElementMargin] = useState<string>("")
  const [secondElementMargin, setSecondElementMargin] = useState<string>("")
  const [thirdElementMargin, setThirdElementMargin] = useState<string>("")
  useEffect(() => {
    switch (true) {
    case viewportState.md:
      setFirstElementMargin("80px 0 0 0")
      setSecondElementMargin("180px 0 0 0")
      setThirdElementMargin("160px 0 0 0")
      break
    case viewportState.xs:
      setFirstElementMargin("20px 0 80px 0")
      break
    default:
      break
    }
  }, [viewportState])

  return (
    <PageLayout>

      <div style={{ margin: firstElementMargin }}>
        {/* First Element */}
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Title variant={1} as="h1" style={{ fontSize: "48px" }}>MealMind</Title>
            <Subtitle style={{ textAlign: "center", fontWeight: "bold" }}>
              O seu organizador de receitas
            </Subtitle>
          </GridItem>
        </Grid>
      </div>


      <div style={{ margin: secondElementMargin }}>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 4, lg: 4, xl: 4 }} style={{ marginBottom: "16px" }}>
            <Card variant="Entry"
              icon={<Icon variant="Check" />}
              title="Title"
              text="Text Text Text Text Text Text Text Text Text Text Text Text Text "
            />
          </GridItem>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 4, lg: 4, xl: 4 }} style={{ marginBottom: "16px" }}>
            <Card variant="Entry"
              icon={<Icon variant="Check" />}
              title="Title"
              text="Text Text Text Text Text Text Text Text Text Text Text Text Text "
            />
          </GridItem>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 4, lg: 4, xl: 4 }} style={{ marginBottom: "16px" }}>
            <Card variant="Entry"
              icon={<Icon variant="Check" />}
              title="Title"
              text="Text Text Text Text Text Text Text Text Text Text Text Text Text "
            />
          </GridItem>
        </Grid>
      </div>

      
      <div style={{ margin: thirdElementMargin }}>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              imageSrc="../assets/mealMindLaptop.png"
              title="Title"
              text="Tutorial"
            />
          </GridItem>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
          
          </GridItem>
        </Grid>
      </div>


      <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
        <Link to="/recipes" style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="styled" text="Go to the dashboard" />
        </Link>
      </GridItem>
    </PageLayout>
  )
}