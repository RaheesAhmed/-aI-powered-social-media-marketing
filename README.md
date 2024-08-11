# AI-Powered QOTD Image Generator

The AI-Powered QOTD (Question of the Day) Image Generator is a Next.js application that allows users to create customized, visually appealing images for daily questions. This tool is perfect for educators, content creators, and social media managers who want to engage their audience with thought-provoking questions presented in an attractive format.

## Features

- Custom question and answer input
- Color customization for background, text, accent, and border
- Platform-specific image generation (Instagram, Facebook, Twitter)
- Live preview of the generated image
- Responsive design for desktop and mobile use

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/RaheesAhmed/-aI-powered-social-media-marketing.git
   ```

2. Navigate to the project directory:
   ```
   cd aI-powered-social-media-marketing
   ```

3. Install the dependencies:
   ```
   npm install
   ```


## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000/qotd`.

## Usage

1. Select a date for your question.
2. Choose the target platform (Instagram, Facebook, or Twitter).
3. Customize the colors for background, text, accent, and border.
4. Enter your question and answer choices.
5. Preview the image in real-time as you make changes.
6. Click "Generate AI Image" to create the final image.


## API Endpoints

### GET /api/qotd

Generates a QOTD image based on the provided parameters.

Query Parameters:
- `date`: The date for the question (YYYY-MM-DD format)
- `format`: Set to 'image' to receive an image response
- `platform`: The target platform (instagram, facebook, or twitter)
- `backgroundColor`: Hex color code for the background
- `textColor`: Hex color code for the text
- `accentColor`: Hex color code for accents
- `borderColor`: Hex color code for the border
- `question`: The question text
- `choices`: Pipe-separated list of answer choices

Response:
- Content-Type: image/png
- Body: The generated image file

## Contributing

We welcome contributions to the AI-Powered QOTD Image Generator! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub issue tracker.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)

---

Thank you for using the AI-Powered QOTD Image Generator! We hope this tool enhances your content creation process and engages your audience effectively.