### AI-Driven Social Media Project Plan

## 1. Introduction

**Purpose Statement:**

- "This project aims to explore the diversity of personalities on social media through a simulated platform with AI-generated users."

**Artistic Vision:**

- "The project will experiment with different online interaction dynamics, AI realism, and the unique experience of being the only human user."

**Potential Areas of Interest:**

- Diversity of personalities
- Group dynamics and interactions
- Realism of AI-driven social media
- Evolution of AI capabilities
- Philosophical reflections on human and AI interactions

## 2. Objectives

**Primary Objectives:**

- Simulate a social media environment where human and AI users interact.
- Showcase the variety of personalities through distinct AI behaviors and posts.
- Build a social media site that supports timeline, profiles, posting, and liking.

## 3. Key Features

**User Interaction:**

- Ability for the user to post and reply to posts.
- User profiles displaying posts and interactions.
- Liking posts.

**Bot Personalities:**

- Distinct AI bot personalities (e.g., humorous, serious, critical, supportive).
- Bots post and respond based on their defined personalities.
- Descriptions of bot personalities in user profiles to help understand their motives.

**Visual Elements:**

- Visual indicators to differentiate between various bot personalities.
- Clean and intuitive UI design for easy interaction.

## 4. Technical Overview

**Frontend:**

- **Technology**: Next.js for building the user interface.
- **Key Components**: Feed, user profiles, post interactions, and personality descriptions.

**Backend:**

- **Technology**: NestJS for handling server-side logic and API endpoints.
- **Key Components**: User and post management, bot scheduling and posting.

**Database:**

- **Type**: PostgreSQL.
- **Schema Elements**: Users, posts, bots, interactions.

## 5. Development Milestones and Pieces for V1

### Backend Development (NestJS)

1. **Project Initialization**

   - Initialize NestJS project.
   - Install necessary dependencies (TypeORM, PostgreSQL, etc.).

2. **Database Configuration**

   - Set up PostgreSQL connection.
   - Define database schema for users, posts, and bots.

3. **User Management**

   - Implement endpoints for profile retrieval and updates.
   - Set up a secret login page for the sole user (no public registration).

4. **Post Management**

   - Implement endpoints for creating posts.
   - Implement endpoints for retrieving posts (timeline).
   - Implement endpoints for liking posts.

5. **Bot Management**
   - Set up basic bot entities and behaviors.
   - Implement bot posting logic.
   - Implement bot replying logic.

### Frontend Development (Next.js)

1. **Project Initialization**

   - Initialize Next.js project.

2. **Component Creation**

   - Build feed component to display posts.
   - Build post interaction components (posting, liking).
   - Build user profile components displaying posts and interactions.

3. **API Integration**
   - Connect frontend components to backend APIs using Axios or Fetch API.

### Bot Integration

1. **Define Bot Personalities**

   - Create personality profiles for bots.
   - Define behavior scripts for each personality.

2. **Implement Bot Posting Logic**

   - Set up a scheduler for bots to post at intervals.

3. **Implement Bot Replying Logic**

   - Develop logic for bots to reply to user and bot posts.

4. **Integrate Bot Descriptions**
   - Add personality descriptions to bot profiles for user reference.

## 6. AI Integration

**Possible AI APIs to Check Out:**

1. **Google Gemini API**

   - **Description**: Advanced multimodal generative AI model.
   - **Use Cases**: Generating bot posts and replies, handling complex interactions.
   - **Link**: [Google Gemini API](https://ai.google.dev).
   - **Pricing**: $1.05 per 1 million tokens for prompts up to 128K tokens, $2.10 per 1 million tokens for longer prompts.

2. **OpenAI GPT-4**

   - **Description**: Advanced text generation capabilities.
   - **Use Cases**: Generating bot content, conversational agents.
   - **Link**: [OpenAI](https://www.openai.com).
   - **Pricing**: Starting from $0.06 per 1,000 tokens.

3. **IBM Watson**

   - **Description**: Broad range of AI services including natural language understanding.
   - **Use Cases**: Analyzing user posts, generating bot responses.
   - **Link**: [IBM Watson](https://www.ibm.com/watson/natural-language-understanding).
   - **Pricing**: Free tier available, enterprise pricing varies.

4. **Anthropic Claude**

   - **Description**: Specialized in conversational models.
   - **Use Cases**: Creating interactive bot personalities.
   - **Link**: [Anthropic](https://www.anthropic.com).
   - **Pricing**: Contact for quotes.

5. **Cohere.ai**

   - **Description**: Focused on natural language processing.
   - **Use Cases**: Enhancing bot interactions with NLP features.
   - **Link**: [Cohere.ai](https://cohere.ai).
   - **Pricing**: Free tier available, premium plans start at $50 per month.

6. **ElevenLabs Voice Generation**

   - **Description**: Produces highly realistic and natural-sounding voices.
   - **Use Cases**: Adding voice capabilities to bots.
   - **Link**: [ElevenLabs](https://elevenlabs.io).
   - **Pricing**: Custom pricing based on usage.

7. **Stability AI**

   - **Description**: Text-to-image API for creating visual content.
   - **Use Cases**: Enhancing posts with AI-generated images.
   - **Link**: [Stability AI](https://stability.ai).
   - **Pricing**: Custom pricing based on usage.

8. **Wit.ai**
   - **Description**: Simplifies creation of AI that understands and processes human language.
   - **Use Cases**: Integrating voice command recognition and NLP into bots.
   - **Link**: [Wit.ai](https://wit.ai).
   - **Pricing**: Free to use.

## 7. Future Considerations for V2

- Allow users to select different AI versions (e.g., GPT, Gemini) from the frontend.
- Implement dynamic post loading based on selected AI version.
- Create modular AI service structure in the backend to support multiple AI versions.
- Develop analytics and comparison tools to evaluate performance and interactions of different AI versions.
- Add a voice clip to each profile.

---

This should now include a section for potential future ideas and be easy to copy into Google Drive or any text editor. Let me know if you need any further adjustments!
