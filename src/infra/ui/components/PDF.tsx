import React, { useCallback, useEffect, useState } from "react"
import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Document, Page, View, Text, Image, StyleSheet, Font, PDFViewer } from "@react-pdf/renderer"
import useDataContext from "../hooks/useDataContext"
import fontThin from "../assets/Montserrat-Thin.ttf"
import fontRegular from "../assets/Montserrat-Regular.ttf"
import fontBold from "../assets/Montserrat-Bold.ttf"

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: fontThin,
      fontWeight: "thin"
    },
    {
      src: fontRegular,
      fontWeight: "normal"
    },
    {
      src: fontBold,
      fontWeight: "bold"
    }
  ]
})

const pallete = {
  white1: "#ffffff",
  white2: "#f8f8f8",
  white3: "#dddddd",
  black1: "#2E3232",
  black2: "#242828",
  black3: "#111414",
  green: "#076e34",
  orange: "#002d81",
  blue: "#913a00",
  red: "#860000",
  yellow: "#8b8200"
}

const pageStyles = StyleSheet.create({
  viewer: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    overflow: "hidden",
    padding: 0,
    boxSizing: "border-box",
  },
  page: {
    padding: "16px",
    fontFamily: "Montserrat",
    fontWeight: "normal",
    color: pallete.black3
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  Title1: {
    alignSelf: "center",
    margin: "4px 0 20px 0",
    fontSize: "24px"
  },
  Title2: {
    alignSelf: "flex-start",
    fontSize: "14px"
  },
  Title3: {
    fontSize: "10px"
  },
  description: {
    fontSize: "8px",
    color: pallete.black2
  }
})

const elementStyles = StyleSheet.create({
  element: {
    width: "100%",
    height: "200px",
    padding: "8px",
    border: `1px solid ${pallete.black1}`,
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
  },
  topBar: {
    width: "100%",
    fontSize: "12px",
    borderBottom: `0.5px solid ${pallete.black3}`,
    paddingBottom: "4px"
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    gap: "8px",
    flexDirection: "column"
  },
  description: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px"
  },
  data: {
    display: "flex",
    height: "100%",
    gap: "8px",
    flexDirection: "row",
  },
  macrosAndImage: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  imageContainer: {
    height: "100%",
    width: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  macros: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontWeight: "bold",
  },
  ingredients: {
    fontSize: "8px",
    marginRight: "20px"
  }
})


function Element(props: { recipe: AdaptedRecipe, date: Date }) {
  const mapWeekDay = useCallback((n: number): string => {
    switch (n) {
    case 0:
      return "Domingo"
    case 1:
      return "Segunda-feira"
    case 2:
      return "Terça-feira"
    case 3:
      return "Quarta-feira"
    case 4:
      return "Quinta-feira"
    case 5:
      return "Sexta-feira"
    case 6:
      return "Sábado"
    default:
      return ""
    }
  }, [])

  return (
    <View style={elementStyles.element}>

      <View style={elementStyles.topBar}>
        <Text>
          {props.date.getDate().toString().padStart(2, "0")}/
          {(props.date.getMonth() + 1).toString().padStart(2, "0")}/
          {props.date.getFullYear()} - {mapWeekDay(props.date.getDay())}
        </Text>
      </View>

      <View style={elementStyles.content}>

        <View style={elementStyles.description}>
          <Text style={pageStyles.Title2}>{props.recipe.name}</Text>
          <Text style={pageStyles.description}>{props.recipe.description}</Text>
        </View>

        <View style={elementStyles.data}>

          {(props.recipe.macros || props.recipe.imageUrl) && (

            <View style={elementStyles.macrosAndImage}>
              {props.recipe.macros && (
                <View style={elementStyles.macros}>
                  <Text style={{ ...pageStyles.Title3, color: pallete.green }}>
                Proteínas: {props.recipe.macros[0].toFixed(2)}g
                  </Text>
                  <Text style={{...pageStyles.Title3, color: pallete.orange}}>
                Carboidratos: {props.recipe.macros[1].toFixed(2)}g
                  </Text>
                  <Text style={{...pageStyles.Title3, color: pallete.blue}}>
                Gorduras: {props.recipe.macros[2].toFixed(2)}g
                  </Text>
                  <Text style={{...pageStyles.Title3, color: pallete.yellow}}>
                Calorias: {props.recipe.kcal?.toFixed(2)}kcal
                  </Text>
                </View>
              )}
  
              {props.recipe.imageUrl && (
                <View style={elementStyles.imageContainer}>
                  <Image style={{borderRadius: "4px"}} src={props.recipe.imageUrl} />
                </View>
              )}

            </View>
          )}

          {props.recipe.ingredients && (
            <View style={elementStyles.ingredients}>
              {props.recipe.ingredients?.map(
                i => (
                  <Text key={i[0].id}>
                  -&nbsp;{i[1]}g
                  &nbsp;{i[0].name}
                  &nbsp;{i[0].macros && (
                      <>
                      &#40;
                        <Text style={{ color: pallete.green, fontWeight: "bold" }}>
                      P: {i[0].macros[0].toFixed(2)}g
                        </Text>
                      ,&nbsp;
                        <Text style={{ color: pallete.orange, fontWeight: "bold" }}>
                      C: {i[0].macros[1].toFixed(2)}g
                        </Text>
                      ,&nbsp;
                        <Text style={{ color: pallete.blue, fontWeight: "bold" }}>
                      G: {i[0].macros[2].toFixed(2)}g
                        </Text>
                      &nbsp;
                        <Text>a cada {i[0].macros[3]}g</Text>
                      &#41;
                      </>
                    )}
                  </Text>)
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

type PDFProps = {
  list: [AdaptedRecipe, Date][]
}

export default function PDF(props: PDFProps) {
  const { list } = props

  const splittedList: [AdaptedRecipe, Date][][] = Array.from(
    { length: Math.ceil(list.length / 4) },
    (_, i) => list.slice(i * 4, (i + 1) * 4)
  )
  
  return (
    <Document>

      {splittedList.map((list, i) => (
        <Page key={list[0][0].id} style={pageStyles.page}>
          <View style={pageStyles.container}>
            {i === 0 && <Text style={pageStyles.Title1}>Receitas</Text>}
            {list.map(([recipe, date]) =>
              <Element key={recipe.id} recipe={recipe} date={date} />
            )}
          </View>
        </Page>
      ))}

    </Document>
  )
}