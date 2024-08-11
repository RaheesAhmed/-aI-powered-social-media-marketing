import { NextRequest, NextResponse } from 'next/server';
import { parseCSV } from '@/lib/csvParser';
import { generateImage } from '@/lib/imageGenerator';
import { QotdEntry, QuestionData, SocialPlatform, TemplateOptions } from '@/models/QotdEntry';
import { improveContent } from '@/lib/improveContent';

let qotdEntries: QotdEntry[] = [];
let dataLoaded = false;
let loadingPromise: Promise<void>;

// Load CSV data
function loadData() {
  if (!dataLoaded && !loadingPromise) {
    loadingPromise = parseCSV().then(data => {
      qotdEntries = data;
      dataLoaded = true;
      console.log('CSV data loaded successfully');
    }).catch(error => {
      console.error('Error loading CSV data:', error);
    });
  }
  return loadingPromise;
}

loadData(); // Start loading the data when the file is first imported

export async function GET(request: NextRequest) {
  try {
    await loadData(); // Ensure data is loaded before proceeding
    
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const format = searchParams.get('format');
    const platform = searchParams.get('platform');
    const backgroundColor = searchParams.get('backgroundColor');
    const textColor = searchParams.get('textColor');
    const accentColor = searchParams.get('accentColor');
    const borderColor = searchParams.get('borderColor');


    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    const qotd = qotdEntries.find(entry => entry.date === date);

    if (!qotd) {
      return NextResponse.json({ error: 'Question not found for the given date' }, { status: 404 });
    }

    // Improve the content
    const improvedContent = await improveContent({
      question: qotd.Stem,
      choices: [qotd.Answer1, qotd.Answer2, qotd.Answer3, qotd.Answer4]
    });

    if (format === 'image') {
      const questionData: QuestionData = {
        question: improvedContent.question,
        answers: improvedContent.choices
      };

      const templateOptions: Partial<TemplateOptions> = {
        backgroundColor: backgroundColor || '#FFA500',
        textColor: textColor || '#333333',
        accentColor: accentColor || '#FFFFFF',
        borderColor: borderColor || '#FF8C00',
        platform: platform as SocialPlatform || 'instagram',
      };

      const image = await generateImage(questionData, templateOptions);
      
      return new NextResponse(image, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Length': image.length.toString(),
        },
      });
    }

    // If not requesting an image, return the improved content
    return NextResponse.json(improvedContent);
  } catch (error) {
    console.error('Error in /api/improve:', error);
    return NextResponse.json({ error: 'Error processing request', details: error.message }, { status: 500 });
  }
}