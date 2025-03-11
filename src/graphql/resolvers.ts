import Recipe from '@/models/Recipe';
import connectToDatabase from '@/lib/mongodb';

export const resolvers = {
  Query: {
    getRecipes: async () => {
      await connectToDatabase();
      return Recipe.find().lean();
    },
    getRecipe: async (_: any, { uuid }: { uuid: string }) => {
      await connectToDatabase();
      return Recipe.findOne({ uuid }).lean();
    },
  },
  Mutation: {
    addRecipe: async (_: any, { recipe }: any) => {
      await connectToDatabase();
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();
      return newRecipe;
    },
  },
};
