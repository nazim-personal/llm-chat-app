# **App Name**: NextGen Chat

## Core Features:

- Dynamic AI Chat Interface: Provide a familiar ChatGPT-style chat window with a multiline input, send button, and the ability to append user messages immediately to the UI upon submission.
- Streaming AI Responses: Implement real-time display of assistant messages, supporting incremental token updates from the AI via Server Sent Events (SSE) or WebSockets.
- Conversation Management & Routing: Enable users to create, select, rename, and delete chat conversations via a sidebar, with dynamic routing for each conversation (`/chat/[conversationId]`).
- Markdown & Code Rendering: Render AI assistant responses using React Markdown, supporting code blocks, tables, lists, and links, with React Syntax Highlighter for code formatting and a copy-code button.
- API Layer Integration (Backend-ready): Establish a dedicated, Axios-based API layer (`chat.api.ts`) for all backend communication (create, get, send, delete, rename conversations and messages), designed for scalability and streaming support.
- Global State Management with Zustand: Manage application state using Zustand for conversations, active conversation ID, messages, and loading/streaming indicators to ensure efficient UI updates.
- Responsive Design & UI Enhancements: Ensure the application is fully responsive across desktop (sidebar + chat layout) and mobile (sidebar as slide drawer), with auto-scroll, message fade-in, and a typing indicator.

## Style Guidelines:

- Dark color scheme for a modern, professional, and focus-oriented user experience.
- Primary action color: A vibrant purple-blue (#5E5EF5) for interactive elements and highlights, ensuring good contrast on dark backgrounds.
- Background color: A subtle, dark blue-gray (#16161D) for the main application backdrop, providing depth while remaining minimalist.
- Accent color: A vivid sky-blue (#33CCFF) to draw attention to critical notifications, selections, and secondary interactive elements, offering a strong visual pop.
- Headlines and body text: 'Inter' (sans-serif) for its modern, neutral, and highly readable characteristics, suitable for chat conversations.
- Code snippets: 'Source Code Pro' (monospace sans-serif) to ensure clear and aesthetically pleasing presentation of code within messages.
- Utilize 'Lucide React Icons' for clear, concise, and scalable UI elements across the application, maintaining visual consistency.
- ChatGPT-inspired layout featuring a fixed-width main chat area (max-w-3xl mx-auto) and a distinct left-hand sidebar for navigation and conversation history. Message bubbles will align left for assistant and right for user.
- Implement subtle but meaningful animations using Framer Motion for message fade-in effects, a fluid typing indicator, and smooth sidebar transitions to enhance user engagement.