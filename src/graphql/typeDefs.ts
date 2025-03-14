import gql from 'graphql-tag';

export const typeDefs = gql`
  type Ingredient {
    section: String!
    items: [String!]!
  }

  type Instruction {
    section: String!
    steps: [String!]!
  }

  type Nutrition {
    calories: Int
    protein: Int
    fat: Int
    netCarbs: Int
    fiber: Int
    iron: Float
    zinc: Float
    selenium: Float
    vitaminB12: Float
  }

  type Recipe {
    uuid: String!
    title: String!
    description: String!
    image: String
    tags: [String!]!
    servings: Int!
    prepTime: Int!
    cookTime: Int!
    ingredients: [Ingredient!]!
    instructions: [Instruction!]!
    tips: [String]
    category: String
    allergens: [String]
    nutrition: Nutrition
  }

  input IngredientInput {
    section: String!
    items: [String!]!
  }

  input InstructionInput {
    section: String!
    steps: [String!]!
  }

  input NutritionInput {
    calories: Int
    protein: Int
    fat: Int
    netCarbs: Int
    fiber: Int
    iron: Float
    zinc: Float
    selenium: Float
    vitaminB12: Float
  }

  input RecipeInput {
    title: String!
    description: String!
    image: String
    tags: [String!]!
    servings: Int!
    prepTime: Int!
    cookTime: Int!
    ingredients: [IngredientInput!]!
    instructions: [InstructionInput!]!
    tips: [String]
    category: String
    allergens: [String]
    nutrition: NutritionInput
  }

  type Query {
    getRecipes: [Recipe]!
    getRecipe(uuid: String!): Recipe
  }

  type Mutation {
    addRecipe(recipe: RecipeInput!): Recipe
    updateRecipe(uuid: String!, recipe: RecipeInput!): Recipe
    deleteRecipe(uuid: String!): Boolean
  }
`;
