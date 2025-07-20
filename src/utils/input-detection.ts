
export type InputType = 'URL' | 'YOUTUBE' | 'PROMPT';

export function determineInputType(input: string): InputType {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  const urlRegex = /^(https?:\/\/)/;
  
  if (youtubeRegex.test(input)) return 'YOUTUBE';
  else if (urlRegex.test(input)) return 'URL';
  else return 'PROMPT';
}

export const API_ENDPOINTS = {
  URL: 'http://127.0.0.1:7860/api/v1/run/1e9960df-6b9d-48eb-81c2-26af9e877f50?stream=false',
  YOUTUBE: 'http://127.0.0.1:7860/api/v1/run/13b817f9-1478-4f5a-8775-c6f4de8019e7?stream=false',
  PROMPT: 'http://127.0.0.1:7860/api/v1/run/f6081c11-6dc9-4941-8598-f21f97d94e4c?stream=false'
};

export function getPlaceholder(inputType: InputType): string {
  switch (inputType) {
    case 'URL': return 'Enter a URL (e.g., https://example.com/article)';
    case 'YOUTUBE': return 'Enter a YouTube link (e.g., https://youtube.com/watch?v=...)';
    case 'PROMPT': return 'Enter a prompt (e.g., Summarize quantum physics)';
  }
}
