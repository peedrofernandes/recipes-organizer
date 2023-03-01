import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/buttons/Button"
import Card from "../components/cards/Card"
import Icon from "../components/Icon"
import { Grid, GridItem } from "../components/Grid"
import { Subtitle, Title } from "../components/styles"
import useViewportTracker from "../hooks/useViewportTracker"
import Blob from "../components/blobs/Blob"

const PageTitle = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin ?? ""};
`
const PageCards = styled.div < { margin?: string }>`
  margin: ${({ margin }) => margin ?? ""};
`
const PageTutorial = styled.div < { margin?: string }>`
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: ${({ margin }) => margin ?? ""};

  #clipped {
    clip-path: url(#BlobClipPath);
  }
`

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
      setThirdElementMargin("160px 0 0 0")
      break
    default:
      break
    }
  }, [viewportState])

  return (
    <>
      <PageTitle margin={firstElementMargin}>
        {/* First Element */}
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Title variant={1} align="center" as="h1" style={{ fontSize: "48px" }}>MealMind</Title>
            <Subtitle style={{ textAlign: "center", fontWeight: "bold" }}>
              O seu organizador de receitas
            </Subtitle>
          </GridItem>
        </Grid>
      </PageTitle>


      <PageCards margin={secondElementMargin}>
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
      </PageCards>


      <PageTutorial margin={thirdElementMargin}>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Title"
              text="Tutorial"
            >
              <Blob variant="1" />
              <img src={new URL("../assets/mealMindLaptopOptimized.png", import.meta.url).href} />
            </Card>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Title"
              text="Tutorial"
            >
              <Blob variant="2" />
              <img src={new URL("../assets/mealMindPhoneOptimized.png", import.meta.url).href} />
            </Card>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Title"
              text="Tutorial"
            >
              <Blob variant="3" />
              <img src={new URL("../assets/recipes-pdf.png", import.meta.url).href} />
            </Card>
          </GridItem>
        </Grid>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Title"
              text="Tutorial"
            >
              <Blob variant="4" />
              <img id="clipped" src={new URL("../assets/SaveButton.png", import.meta.url).href} />
            </Card>
          </GridItem>
        </Grid>
      </PageTutorial>


      <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
        <Link to="/recipes" style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="styled" text="Go to the dashboard" />
        </Link>
      </GridItem>
    </>
  )
}