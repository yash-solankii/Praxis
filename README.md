# Praxis - Execute, Test, Master

A full-stack web application that provides a powerful coding environment with support for multiple programming languages including Python, JavaScript, C++, and C#.

## Features

- **Multi-Language Support**: Execute code in Python, JavaScript, C++, and C#
- **Docker-Based Execution**: Secure, isolated code execution using Docker containers
- **Real-time Testing**: Run code against test cases with instant feedback
- **Problem Database**: 50+ curated algorithmic problems with test cases
- **Modern UI**: Clean, responsive interface with syntax highlighting
- **Code Templates**: Pre-configured templates for each supported language

## Tech Stack

### Frontend
- **React** with Vite
- **Monaco Editor** for code editing
- **CSS3** for styling

### Backend
- **Node.js** with Express
- **MongoDB** for data storage
- **Docker** for code execution
- **JWT** for authentication

### Supported Languages
- **Python 3.11** with scientific libraries
- **JavaScript (Node.js 18)**
- **C++ (GCC)** with standard library
- **C# (.NET 8.0)**

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   └── assets/         # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── data/              # Problem database
│   ├── services/          # Business logic
│   ├── middleware/        # Auth middleware
│   └── models/            # Data models
├── docker/                # Language execution environments
│   ├── python/            # Python Docker setup
│   ├── javascript/        # JavaScript Docker setup
│   ├── cpp/               # C++ Docker setup
│   └── c#/                # C# Docker setup
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **Docker** (v20 or higher)
- **MongoDB** (v5 or higher)
- **Git**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-assignment
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in server directory
   cd ../server
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Build Docker images**
   ```bash
   # Build all language execution environments
   docker build -t python-code-runner ./docker/python
   docker build -t javascript-code-runner ./docker/javascript
   docker build -t cpp-code-runner ./docker/cpp
   docker build -t csharp-code-runner ./docker/c#
   ```

## Running the Application

1. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

2. **Start the server**
   ```bash
   cd server
   npm start
   ```

3. **Start the client**
   ```bash
   cd client
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## API Endpoints

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get specific problem with test cases

### Code Execution
- `POST /api/execute` - Execute code
- `GET /api/execute/health` - Check Docker health

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## Code Execution Format

### Input Format
All languages expect input in the following format:
```
line1
line2
line3
```

### Output Format
- **Python**: Use `print()` for output
- **JavaScript**: Use `console.log()` for output
- **C++**: Use `cout <<` for output
- **C#**: Use `Console.WriteLine()` for output

### Example Problem (Two Sum)
**Input:**
```
2 7 11 15
9
```

**Expected Output:**
```
0 1
```

## Docker Images

The application uses Docker containers for secure code execution:

- **python-code-runner**: Python 3.11 with scientific libraries
- **javascript-code-runner**: Node.js 18 with standard libraries
- **cpp-code-runner**: GCC with C++17 standard library
- **csharp-code-runner**: .NET 8.0 SDK

## Security Features

- **Container Isolation**: Each code execution runs in a separate Docker container
- **Resource Limits**: Memory and CPU limits for each language
- **Network Isolation**: Containers run without network access
- **Timeout Protection**: 15-second execution timeout
- **Read-only Filesystem**: Containers use read-only root filesystem

## Development

### Adding New Languages

1. Create a new directory in `docker/`
2. Add `Dockerfile` and `runner.py` (or `runner.js`)
3. Update `server/services/codeExecutor.js` with language mapping
4. Update `server/index.js` API validation
5. Update `client/src/components/CodeEditor.jsx` frontend validation

### Adding New Problems

1. Add problem data to `server/data/problems.js`
2. Include test cases in the problem object
3. Follow the standard input/output format

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
