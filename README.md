# WordPal

WordPal is a conversational application leveraging the capabilities of the Model Meta Llama 3 for advanced messaging and conversation handling. The project is built using ASP.NET Core for the backend, Entity Framework Core for database management, and React for the frontend.

## Project Description

WordPal utilizes modern web technologies to provide a robust platform for managing user conversations. Key features include:

- **User Management**: Registration, authentication, and profile management.
- **Conversations**: Support for initiating and maintaining user conversations.
- **Messages**: Efficient message handling and storage.
- **Model Meta Llama 3**: Integration with the Model Meta Llama 3 for enhanced conversational AI capabilities.

## Dependencies

### Backend

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Frontend

- [Node.js](https://nodejs.org/) (for the frontend development)
- [React](https://reactjs.org/)
- [ReactMarkdown](https://github.com/remarkjs/react-markdown)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [rehype-raw](https://github.com/rehypejs/rehype-raw)
- [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize)

## Setup Instructions

### Backend

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/wordpal.git
    cd wordpal
    ```

2. **Navigate to the WordPal project directory**:

    ```bash
    cd WordPal
    ```

3. **Install the required .NET packages**:

    ```bash
    dotnet restore
    ```

4. **Update the database connection string in `appsettings.json`**:

    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=your server name;Database=your database name;Trusted_Connection=True;TrustServerCertificate=True;"
    }
    ```

5. **Create and apply the database migrations**:

    ```bash
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    ```

6. **Run the backend server**:

    ```bash
    dotnet run
    ```

### Frontend

1. **Navigate to the `ClientApp` directory**:

    ```bash
    cd ClientApp
    ```

2. **Install the required npm packages**:

    ```bash
    npm install
    ```

3. **Run the frontend development server**:

    ```bash
    npm start
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
