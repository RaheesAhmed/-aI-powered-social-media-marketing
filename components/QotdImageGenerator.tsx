import React, { useState, useEffect } from 'react';

export default function ModernAiQotdImageGenerator() {
    const [date, setDate] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [backgroundColor, setBackgroundColor] = useState('#0ea5e9');
    const [textColor, setTextColor] = useState('#ffffff');
    const [accentColor, setAccentColor] = useState('#38bdf8');
    const [borderColor, setBorderColor] = useState('#0284c7');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState('');
    const [question, setQuestion] = useState('What is the future of AI?');
    const [choices, setChoices] = useState(['Singularity', 'Augmented Intelligence', 'Narrow AI', 'Artificial General Intelligence']);

    useEffect(() => {
        updatePreview();
    }, [backgroundColor, textColor, accentColor, borderColor, question, choices]);

    const updatePreview = () => {
        const previewSvg = `
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />
        <rect x="20" y="20" width="560" height="560" fill="none" stroke="${borderColor}" stroke-width="4" rx="15" />
        <text x="300" y="80" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-weight="bold">AI Question of the Day</text>
        <text x="300" y="140" font-family="Arial" font-size="20" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${question}</text>
        ${choices.map((choice, index) => `
          <rect x="50" y="${220 + index * 70}" width="500" height="50" fill="${textColor}" fill-opacity="0.1" rx="10" />
          <text x="70" y="${245 + index * 70}" font-family="Arial" font-size="18" fill="${textColor}">
            ${String.fromCharCode(65 + index)}. ${choice}
          </text>
        `).join('')}
      </svg>
    `;
        setPreview(`data:image/svg+xml;base64,${btoa(previewSvg)}`);
    };

    const generateImage = async () => {
        setLoading(true);
        setError('');
        setImageUrl('');

        try {
            const params = new URLSearchParams({
                date,
                format: 'image',
                platform,
                backgroundColor,
                textColor,
                accentColor,
                borderColor,
                question,
                choices: choices.join('|')
            });

            const response = await fetch(`/api/qotd?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            // Simulate delay (remove in production)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } catch (err) {
            setError('Error generating image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-800 to-secondary-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden text-white">
                <div className="p-8">
                    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-8 text-center">AI-Powered QOTD Generator</h2>
                    <p className="text-gray-300 mb-8 text-center">Create stunning AI-themed Question of the Day images with our cutting-edge generator.</p>
                    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                        <div className="lg:w-1/2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                                    <input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-150 ease-in-out text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">Platform</label>
                                    <select
                                        id="platform"
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition duration-150 ease-in-out text-white"
                                    >
                                        <option value="instagram">Instagram</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="twitter">Twitter</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Background', state: backgroundColor, setState: setBackgroundColor },
                                    { label: 'Text', state: textColor, setState: setTextColor },
                                    { label: 'Accent', state: accentColor, setState: setAccentColor },
                                    { label: 'Border', state: borderColor, setState: setBorderColor }
                                ].map(({ label, state, setState }) => (
                                    <div key={label}>
                                        <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-300 mb-1">{label} Color</label>
                                        <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
                                            <input
                                                id={label.toLowerCase()}
                                                type="color"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                className="w-8 h-8 cursor-pointer border-0"
                                            />
                                            <input
                                                type="text"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                className="flex-grow px-3 py-2 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>


                            <button
                                onClick={generateImage}
                                disabled={loading || !date}
                                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out ${loading || !date ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Generating...' : 'Generate AI Image'}
                            </button>
                        </div>
                        <div className="lg:w-1/2 flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4 text-primary-400">Live Preview</h3>
                            <img src={preview} alt="Color Preview" className="w-full max-w-md rounded-md shadow-lg" />
                        </div>
                    </div>
                    {error && (
                        <div className="mt-4 bg-red-900 border-l-4 border-red-500 text-red-100 p-4 rounded-md" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    {loading && (
                        <div className="mt-8 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
                        </div>
                    )}
                    {imageUrl && (
                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold mb-4 text-center text-primary-400">Generated AI Image</h3>
                            <img src={imageUrl} alt="Generated QOTD" className="w-full max-w-2xl mx-auto rounded-lg shadow-lg" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}