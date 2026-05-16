# SMART CHEF - COOKING MISTAKE FIXER & RECIPE ASSISTANT

## Features Implemented

1. Cooking Mistake Fixer for too salty, too spicy, burnt, dry, mushy, thick, and overcooked dishes.
2. Recipe Search by keyword, category, cuisine, difficulty, and tags.
3. Recipe Serving Adjustment with automatic ingredient quantity calculation.
4. OpenAI Chef Chatbot for cooking help and recipe guidance.
5. Login and Signup with frontend and backend regex validation.
6. Google Sign-In using Google OAuth credential verification.
7. Secure user sessions using JWT.
8. MongoDB Atlas database connection.
9. User Dashboard with saved favorites, history, meal planner, shopping list, and kitchen timer.
10. Favorite Recipes saved per user.
11. Cooking History for recipe searches, mistake fixes, pantry checks, and chatbot questions.
12. Pantry Recipe Suggestions based on ingredients already available at home.
13. Smart Substitution Ideas for missing ingredients.
14. Shopping List builder, including adding all ingredients from a recipe.
15. Responsive UI for laptop, tablet, and mobile screens.

## Clean Folder Structure

```text
SMART CHEF - COOKING MISTAKE FIXER & RECIPE ASSISTANT
  backend
    src
      config
      controllers
      middleware
      models
      routes
      seed
    .env.example
    package.json
  frontend
    src
      api
      components
      context
      data
      pages
      utils
    .env.example
    index.html
    package.json
```

## How To Run

1. Open the `backend` folder and create a `.env` file using `.env.example`.
2. Add your MongoDB Atlas connection string, JWT secret, OpenAI API key, and Google Client ID.
3. Install backend packages:

```bash
npm install
```

4. Add sample recipes and mistake fixes:

```bash
node .\src\seed\seedData.js
```

5. Start the backend:

```bash
node .\src\server.js
```

6. Open the `frontend` folder and create a `.env` file using `.env.example`.
7. Add the backend API URL and Google Client ID.
8. Install frontend packages:

```bash
npm install
```

9. Start the frontend:

```bash
node .\node_modules\vite\bin\vite.js --host 0.0.0.0
```

The frontend will run at `http://localhost:5173` and the backend will run at `http://localhost:5000`.

Because the project folder name includes `&`, Windows may split normal npm scripts incorrectly. The direct `node` commands above avoid that problem. You can also double-click `backend/start-backend.cmd`, `backend/seed-sample-data.cmd`, and `frontend/start-frontend.cmd`.

## Important Environment Values

```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/smartchef
JWT_SECRET=replace_this_with_a_long_secret
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

## MongoDB Shell Connection

```bash
mongosh "mongodb+srv://cluster0.rwykvcp.mongodb.net/" --apiVersion 1 --username mahamrashid682_db_user
```

The backend `.env` file already contains the Atlas driver connection string with the `smartchef` database name.
