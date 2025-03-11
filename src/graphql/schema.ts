import { makeExecutableSchema } from '@graphql-tools/schema';
import { v4 as uuidv4 } from 'uuid';
import { typeDefs } from './typeDefs';
import Recipe from '@/models/Recipe';

const resolvers = {
  Query: {
    getRecipes: async () => {
      return Recipe.find({}).lean();
    },
    getRecipe: async (_: any, { uuid }: { uuid: string }) => {
      return Recipe.findOne({ uuid }).lean();
    },
  },
  Mutation: {
    addRecipe: async (_: any, { recipe }: any) => {
      const newRecipe = new Recipe({
        ...recipe,
        uuid: uuidv4(),
      });

      await newRecipe.save();
      return newRecipe;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
