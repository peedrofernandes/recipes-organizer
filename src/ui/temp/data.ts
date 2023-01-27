import { Ingredient, Recipe } from "../types/Data";

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Arroz com ovo",
    type: "Week",
    options: {
      description: "Receita simples de arroz com ovos",
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlc3xlbnwwfHwwfHw%3D&w=1000&q=80"
    }
  },
  {
    id: 1,
    name: "Parmeggiana",
    type: "Week"
  },
  {
    id: 2,
    name: "Sushi",
    type: "Weekend",
    options: {
      description: "Niguiri, sushi e Sashimi",
    }
  },
  {
    id: 3,
    name: "Churrasco",
    type: "Weekend",
    options: {
      description: "Picanha, pão de alho, linguicinha e queijo coalho",
    }
  },
  {
    id: 4,
    name: "Arroz com ovo",
    type: "Week",
    options: {
      description: "Receita simples de arroz com ovos",
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlc3xlbnwwfHwwfHw%3D&w=1000&q=80"
    }
  },
  {
    id: 5,
    name: "Parmeggiana",
    type: "Week",
    options: {
      description: "Macarrão e peito de frango parmeggiana",
    }
  },
  {
    id: 6,
    name: "Sushi",
    type: "Weekend",
    options: {
      description: "Niguiri, sushi e Sashimi",
    }
  },
  {
    id: 7,
    name: "Churrasco",
    type: "Weekend",
    options: {
      description: "Picanha, pão de alho, linguicinha e queijo coalho",
    }
  },
  {
    id: 8,
    name: "Arroz com ovo",
    type: "Week",
    options: {
      description: "Receita simples de arroz com ovos",
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlc3xlbnwwfHwwfHw%3D&w=1000&q=80"
    }
  },
  {
    id: 9,
    name: "Parmeggiana",
    type: "Week",
    options: {
      description: "Macarrão e peito de frango parmeggiana",
    }
  },
  {
    id: 10,
    name: "Sushi",
    type: "Weekend",
    options: {
      description: "Niguiri, sushi e Sashimi",
    }
  },
  {
    id: 11,
    name: "Churrasco",
    type: "Weekend",
    options: {
      description: "Picanha, pão de alho, linguicinha e queijo coalho",
    }
  }
]

const ingredients: Ingredient[] = [
  {
    id: 1,
    name: "Arroz",
    macros: {
      proteins: 8,
      carbs: 40,
      fats: 5,
      gramsPerServing: 100,
    },
    options: {
      description: "Arroz branco URBANO Parboilizado"
    }
  },
  {
    id: 2,
    name: "Macarrão",
    options: {
      description: "Macarrão integral RENATA",
      imageUrl: "https://dwbbsc6l2jzum.cloudfront.net/upload/foto/large/5210.jpg"
    }
  },
  {
    id: 3,
    name: "Patinho",
    options: {
      description: "Patinho moído"
    }
  }
]

export { recipes, ingredients };



