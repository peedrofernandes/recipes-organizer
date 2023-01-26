import { AtLeastOne } from "../types/AtLeastOne";

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

export default recipes;