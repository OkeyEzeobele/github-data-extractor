# GitHub Data Extractor

This application fetches data from GitHub, processes it, and generates CSV files containing details about commits, authors, and their followers.

## Features

- Extract author details from commits.
- Generate a CSV with author details including avatar, username, and homepage URL.
- List the first five followers of each unique author in a separate CSV.
- Generate a CSV with details about each commit, including the repository URL and URLs of the last and second-to-last comments.

## Installation & Usage

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer is recommended)

### Installation

1. Clone this repository:
   
   ```bash
   git clone https://github.com/OkeyEzeobele/github-data-extractor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd github-data-extractor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Usage

Run the application:

```bash
npm start
```

After execution, you'll find three generated CSV files:

- `authors.csv`: Contains details about authors.
- `followers.csv`: Lists the first five followers of each author.
- `commits.csv`: Details about each commit, including comment URLs.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
