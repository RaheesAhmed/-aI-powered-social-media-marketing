import { NextRequest, NextResponse } from 'next/server';
import { improveContent } from '@/lib/improveContent';


export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question parameter is required' }, { status: 400 });
    }

    const improvedQuestion = await improveContent(question);
    return NextResponse.json(improvedQuestion);
  } catch (error) {
    console.error('Error in /api/improve:', error);
    return NextResponse.json({ error: 'Error improving question', details: error.message }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {   
    return NextResponse.json({ message: 'Api is working...' }, { status: 200 });
    }