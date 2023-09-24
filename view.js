const Papa = require("papaparse");
const fs = require("fs");

class CSVView {
  generateAuthorsCSV(data) {
    const authors = data.map((commit) => ({
      avatar_url: commit.author.avatar_url,
      username: commit.author.login,
      homepage_url: commit.author.html_url,
    }));
    this.writeToCSV("authors.csv", authors);
  }

  generateFollowersCSV(data) {
    this.writeToCSV("followers.csv", data);
  }

  generateCommitsCSV(data) {
    const commits = data.map((commit) => ({
      repo_url: commit.html_url,
      last_comment_url:
        commit.comments && commit.comments.length > 0
          ? commit.comments[commit.comments.length - 1].url
          : "",
      second_last_comment_url:
        commit.comments && commit.comments.length > 1
          ? commit.comments[commit.comments.length - 2].url
          : "",
    }));
    this.writeToCSV("commits.csv", commits);
  }

  writeToCSV(filename, data) {
    const csv = Papa.unparse(data);
    fs.writeFileSync(filename, csv);
  }
}

module.exports = new CSVView();
