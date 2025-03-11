import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '@/graphql/schema';
import connectToDatabase from '@/lib/mongodb';

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    await connectToDatabase();
    return { req };
  },
});

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
