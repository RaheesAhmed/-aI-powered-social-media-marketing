// lib/imageGenerator.ts
import sharp from 'sharp';
import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';
import { QuestionData, SocialPlatform , TemplateOptions } from '@/models/QotdEntry';

interface SatoriOptions {
  width: number;
  height: number;
  fonts: Array<{
    name: string;
    data: Buffer;
    weight: number;
    style: 'normal' | 'italic';
  }>;
}

interface StyleProps {
  display: string;
  flexDirection: 'column' | 'row';
  alignItems: string;
  justifyContent: string;
  width: string;
  height: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  color: string;
  padding: string;
  textAlign: 'left' | 'center' | 'right';
}

interface SatoriComponent {
  type: string;
  props: {
    style: Partial<StyleProps>;
    children: Array<SatoriComponent | string> | string;
  };
}






export async function generateImage(
  questionData: QuestionData, 
  options: Partial<TemplateOptions> = {}
): Promise<Buffer> {
  const defaultOptions: TemplateOptions = {
    backgroundColor: '#FFA500', // Orange
    textColor: '#333333',
    accentColor: '#FFFFFF',
    borderColor: '#FF8C00', // Dark Orange
    platform: SocialPlatform.Instagram
  };

  const templateOptions = { ...defaultOptions, ...options };

  // Load fonts
  const robotoFontPath = join(process.cwd(), 'public', 'Roboto-Regular.ttf');
  const poppinsFontPath = join(process.cwd(), 'public', 'Poppins-Bold.ttf');
  const robotoFontData = readFileSync(robotoFontPath);
  const poppinsFontData = readFileSync(poppinsFontPath);

  // Define dimensions for each platform
  const dimensions = {
    [SocialPlatform.Instagram]: { width: 1080, height: 1080 },
    [SocialPlatform.Facebook]: { width: 1200, height: 630 },
    [SocialPlatform.Twitter]: { width: 1200, height: 675 }
  };

  const { width, height } = dimensions[templateOptions.platform];

  // Adjust font sizes based on platform
  const titleFontSize = templateOptions.platform === SocialPlatform.Instagram ? '40px' : '36px';
  const questionFontSize = templateOptions.platform === SocialPlatform.Instagram ? '22px' : '20px';
  const answerFontSize = templateOptions.platform === SocialPlatform.Instagram ? '20px' : '18px';

  const element: SatoriComponent = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: templateOptions.backgroundColor,
        fontFamily: 'Roboto',
        color: templateOptions.textColor,
        padding: '40px',
        border: `20px solid ${templateOptions.borderColor}`,
        boxSizing: 'border-box',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: titleFontSize,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    color: templateOptions.textColor,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    backgroundColor: templateOptions.backgroundColor,
                  },
                  children: 'My Mastery Question of the Day',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              backgroundColor: templateOptions.accentColor,
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '30px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: { fontSize: questionFontSize, lineHeight: '1.6', color: '#333333' },
                  children: questionData.question,
                },
              },
            ],
          },
        },
        ...questionData.answers.map((answer, index) => ({
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '36px',
                    height: '36px',
                    borderRadius: '18px',
                    backgroundColor: templateOptions.borderColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: templateOptions.accentColor,
                  },
                  children: (index + 1).toString(),
                },
              },
              {
                type: 'span',
                props: {
                  style: { fontSize: answerFontSize, color: '#333333' },
                  children: answer,
                },
              },
            ],
          },
        })),
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '30px',
              right: '30px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '10px 20px',
              borderRadius: '20px',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '24px',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    color: templateOptions.textColor,
                   
                  },
                  children: 'My Mastery™',
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element, {
    width,
    height,
    fonts: [
      {
        name: 'Roboto',
        data: robotoFontData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Poppins',
        data: poppinsFontData,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  return await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}