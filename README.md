# Text Generator

This repository contains the code for an application that leverages the OpenAI API to generate texts in Spanish, along with translations into Russian, questions, and a list of words. It is designed as an experimental platform for text generation and management.

## Features

The application provides the following features:

1. **Admin Panel for Requests**  
   Use the admin panel to create and manage requests.

2. **Static Site Generator (SSG)**  
   Generate static HTML files based on the generated texts.

3. **Local Server for Generated Files**  
   Serve the generated static files locally for testing and review.

4. **FTP Uploader**  
   Upload the generated static files to a remote server via FTP.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd text-generator
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Before running the application, set up the following configuration files in the project root directory:

1. **OpenAI API Key**  
   Save your OpenAI API key in a file named `openai-api-key`. The file should contain only your API key as plain text:
   ```
   sk-...your_openai_api_key...
   ```

2. **FTP Settings** (Optional)  
   If you plan to use the FTP uploader, create a file named `ftp-credentials.json` with the following structure:
   ```json
   {
       "host": "<YOUR_HOST>",
       "user": "<YOUR_USERNAME>",
       "password": "<YOUR_PASSWORD_IN_BASE64_FORMAT>",
       "dir": "<YOUR_REMOTE_DIRECTORY>"
   }
   ```
   *Note: Passwords should be base64-encoded for added security.*

## Directory Structure

The key directories and files in the project are:

- **`/admin/backend/prompts.mjs`**: Contains templates for prompts used in OpenAI requests.
- **`/storage`**: Stores the generated texts.
- **`/schemas`**: Contains the JSON schema for ChatGPT responses.
- **`/generated-statics`**: Output directory for the static site generator. This directory is recreated during each SSG run.

## Usage

### Launch the Admin Panel
Run the following command to open the admin interface for managing requests:
```bash
npm run admin
```

### Generate Static Files
Generate HTML files based on the generated texts:
```bash
npm run ssg
```

### Serve Static Files Locally
Start a local server to preview the generated files:
```bash
npm run check
```

### Upload Files via FTP
Publish the generated files to a remote server:
```bash
npm run upload
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

COPYLEFT 2025

---

For any questions or support, bugs, please open an issue.