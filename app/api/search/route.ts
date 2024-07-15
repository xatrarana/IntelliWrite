import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { query } = await request.json();

        console.log('query:', query);
    
        if (typeof query !== 'string' || query.trim() === '') {
          return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
        }
    
        const results = await prisma.blog.findMany({
          where: {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
        });
    
        return NextResponse.json(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
}