# Subject-Tutor: AI-Powered Educational Chatbot

## Project Description

Subject-Tutor is a modern AI-powered educational chatbot that provides personalized tutoring to students across various subjects. The app offers step-by-step guidance in subjects like Python, Data Structures & Algorithms (DSA), SQL, JavaScript, React, and System Design.

This project is a full-stack web application featuring a React-based frontend and FastAPI/Supabase-based backend. The AI model uses Google Gemini to generate intelligent tutorial responses.

## Technologies Used

### Frontend
- **React 18**: For building user interfaces
- **TypeScript**: For type safety and better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Zustand**: For state management
- **React Query**: For server state management and caching
- **Supabase Client**: For connecting to backend services

### Backend
- **FastAPI**: Python-based REST API framework
- **Supabase Edge Functions**: Serverless functions (in Deno/TypeScript)
- **Uvicorn**: ASGI server
- **httpx**: Asynchronous HTTP client

### AI & Database
- **Google Gemini 2.5-flash**: AI model via Google Gateway
- **Supabase**: For database and serverless functions

### Other Tools
- **ESLint**: Code quality checking
- **PostCSS**: CSS processing
- **Lucide React**: Icons
- **React Router**: Client-side routing

## How It Works

### Workflow
1. **Subject Selection**: User selects a subject from the sidebar (Python, DSA, SQL, etc.)
2. **Chat Interface**: User asks questions or starts discussion on a topic
3. **AI Processing**:
   - Frontend sends request to Supabase function
   - Supabase function calls Gemini AI with subject-specific system prompts
   - AI generates response as a tutor
4. **Response Display**: AI response appears in the chat
5. **Additional Features**:
   - Request re-explanation
   - Quiz questions
   - Progress tracking

### How the AI Model Works
- **System Prompts**: Specialized prompts for each subject that instruct AI to behave as a subject-specific tutor
- **Context Awareness**: AI remembers previous conversations and provides continuous learning
- **Adaptation**: AI provides step-by-step explanations, examples, and follow-up questions
- **Error Handling**: Graceful fallback in case of rate limits or service unavailability

## Problems Solved
- **Personalized Learning**: Teaching adapted to each student's pace and understanding
- **Subject Diversity**: Coverage of multiple subjects on a single platform
- **24/7 Availability**: Teaching assistance anytime
- **Practical Examples**: Theoretical concepts with real-life examples
- **Interactive Learning**: Active participation through chat-based interface

## Benefits
- **Affordable**: Cheaper compared to traditional tuition
- **Flexible**: Access anytime, anywhere
- **Customizable**: Suitable for different skill levels
- **Comprehensive Coverage**: Coding, data structures, databases, web development
- **Progress Tracking**: Visualization of learning progress
- **Multi-language Support**: Support in Hindi and English

## Installation & Setup

### Prerequisites
- Node.js & npm
- Python 3.8+
- Supabase account

### Frontend Setup
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd Subject-Tutor

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
cd Backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
```

### Environment Variables
Set the following in `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
LOVABLE_API_KEY=your_lovable_api_key
```

## Deployment
- **Frontend**: On Vercel, Netlify, or other static hosting platforms
- **Backend**: FastAPI on Supabase Edge Functions or Railway/Vercel
- **Database**: Supabase

## Usage
1. Start the app
2. Select a subject (Python, DSA, SQL, etc.)
3. Ask questions or start discussion on a topic
4. Get step-by-step guidance from AI tutor
5. Use buttons for re-explanation or quiz

## Contributing
1. Fork
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## License
This project is under MIT License.

## Contact
For questions or suggestions: [your email]

---

**Note**: This project is built for educational purposes and demonstrates the benefits of AI-powered teaching.
