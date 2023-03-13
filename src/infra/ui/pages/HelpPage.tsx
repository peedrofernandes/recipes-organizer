import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/buttons/Button"
import Card from "../components/cards/Card"
import { Grid, GridItem } from "../components/Grid"
import { Subtitle, Title } from "../components/styles"
import useViewportTracker from "../hooks/useViewportTracker"
import Blob from "../components/blobs/Blob"

import Image from "../components/images/Image"
import Icon from "../components/icons/Icon"
import useDataContext from "../hooks/useDataContext"


const PageTitle = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin ?? ""};
`
const PageCards = styled.div < { margin?: string }>`
  margin: ${({ margin }) => margin ?? ""};
`
const PageTutorial = styled.div < { margin?: string }>`
  display: flex;
  flex-direction: column;
  gap: 96px;
  margin: ${({ margin }) => margin ?? ""};

  #clipped {
    clip-path: url(#BlobClipPath);
  }
`
const PageButton = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) => margin ?? ""};
`

export default function HelpPage() {

  const { dispatch } = useDataContext()
  function handleExitTutorial() {
    dispatch({ type: "PASSED_TUTORIAL" })
  }

  const viewportState = useViewportTracker()

  const [firstElementMargin, setFirstElementMargin] = useState<string>("")
  const [secondElementMargin, setSecondElementMargin] = useState<string>("")
  const [thirdElementMargin, setThirdElementMargin] = useState<string>("")
  const [fourthElementMargin, setFourthElementMargin] = useState<string>("")
  useEffect(() => {
    switch (true) {
    case viewportState.md:
      setFirstElementMargin("80px 0 0 0")
      setSecondElementMargin("180px 0 0 0")
      setThirdElementMargin("160px 0 0 0")
      setFourthElementMargin("200px 0 0 0")
      break
    case viewportState.xs:
      setFirstElementMargin("20px 0 0 0")
      setSecondElementMargin("80px 0 0 0")
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
              icon={<Icon variant="Info" />}
              title="Saiba o que está comendo"
              text="Mantenha um catálogo especial personalizado de todos os ingredientes e suas informações nutricionais!"
            />
          </GridItem>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 4, lg: 4, xl: 4 }} style={{ marginBottom: "16px" }}>
            <Card variant="Entry"
              icon={<Icon variant="Collection" />}
              title="Colecione suas receitas favoritas"
              text="Crie, salve e consulte suas próprias receitas e obtenha automaticamente suas informações nutricionais!"
            />
          </GridItem>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 4, lg: 4, xl: 4 }} style={{ marginBottom: "16px" }}>
            <Card variant="Entry"
              icon={<Icon variant="Automation" />}
              title="Automatize a sua rotina alimentar"
              text="Não perca tempo escolhendo receitas todos os dias, deixe o app gerenciar tudo!"
            />
          </GridItem>
        </Grid>
      </PageCards>


      <PageTutorial margin={thirdElementMargin}>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Cadastre os ingredientes que você mais usa"
              text="Clique no botão de ingredientes e preencha o formulário com os dados necessários;"
              image={<Image variant="Laptop" />}
              blob={<Blob variant="1" />}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Crie suas receitas"
              text="Depois de ter cadastrado alguns ingredientes, crie receitas totalmente personalizadas baseadas neles, igualmente preenchendo os dados que aparecem dinamicamente;"
              image={<Image variant="Phone" />}
              blob={<Blob variant="2" />}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Gere um PDF com cronograma"
              text="Clique no botão de gerar PDF e crie um cronograma completamente customizado ou deixe app escolher as datas para você;"
              image={<Image variant="PDF" />}
              blob={<Blob variant="3" />}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Card variant="Tutorial"
              title="Salve em um arquivo e carregue em outro lugar"
              text="Não perca suas receitas de vista: Salve-as em um arquivo e as recupere de qualquer lugar;"
              image={<Image variant="SaveButton" />}
              blob={<Blob variant="4" />}
            />
            {/* <img id="clipped" src={img4} alt="Clipped image"/> */}
          </GridItem>
        </Grid>
      </PageTutorial>

      <PageButton margin={fourthElementMargin}>
        <Grid>
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Link to="/recipes" style={{ display: "flex", justifyContent: "center"}}>
              <Button variant="styledBig" text="Começar" onClick={handleExitTutorial}/>
            </Link>
          </GridItem>
        </Grid>
      </PageButton>
    </>
  )
}