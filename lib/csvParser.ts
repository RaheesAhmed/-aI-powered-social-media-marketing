import fs from 'fs';
import path from 'path';
import  parse  from 'csv-parser';
import { QotdEntry } from '@/models/QotdEntry';

export async function parseCSV(): Promise<QotdEntry[]> {
  const results: QotdEntry[] = [];
  const csvPath = path.join(process.cwd(), 'data', 'qotds-2024-08-08.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(parse())
      .on('data', (data: QotdEntry) => {
        results.push(data);
        if (results.length <= 5) {
          console.log('Sample data:', data);
        }
      })
      .on('end', () => {
        console.log(`Total entries loaded: ${results.length}`);
        resolve(results);
      })
      .on('error', (error) => reject(error));
  });
}