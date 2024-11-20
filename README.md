# FoundIt - Lost and Found Application

A modern web application built with React and Firebase to help people find their lost items and return found items to their rightful owners.

## Features

- **User Authentication**
  - Email/Password authentication
  - User profile management
  - Secure authentication flow

- **Post Management**
  - Create lost/found item posts
  - Real-time updates
  - Rich post details (title, description, location, date)
  - Post status tracking (active/resolved)

- **Search & Filter**
  - Search by title, description, or location
  - Filter by category
  - Filter by post type (lost/found)
  - Sort by date

- **Responsive Design**
  - Mobile-first approach
  - Clean and modern UI
  - Intuitive user experience

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Firebase](https://firebase.google.com/) - Backend and Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Router](https://reactrouter.com/) - Navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/abdmas31/foundit-app.git
   cd foundit-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase configuration in the `.env` file:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_DATABASE_URL=your_database_url
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Usage

1. **Sign Up/Login**
   - Create a new account or login with existing credentials
   - Fill in your profile information

2. **Create a Post**
   - Click "New Post" button
   - Choose post type (lost/found)
   - Fill in item details
   - Submit the post

3. **Search for Items**
   - Use the search bar to find specific items
   - Filter by category or post type
   - View post details and contact information

4. **Contact Users**
   - Click "Contact" on a post
   - View contact information
   - Reach out to the user

5. **Mark Items as Found**
   - Post owners can mark their items as found
   - Status updates in real-time

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Abdallah Masssarwe**
- GitHub: [@abdmas31](https://github.com/abdmas31)

## Acknowledgments

- Firebase for the backend infrastructure
- React community for the amazing tools
- Tailwind CSS for the styling utilities
