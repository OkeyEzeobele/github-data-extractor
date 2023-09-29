const axios = require("axios");
const Papa = require("papaparse");
const fs = require("fs");

async function fetchData() {
  try {
    const response = await axios.get(
      "https://api.github.com/repositories/19438/commits"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
async function getCommentsForCommit(commentURL) {
  try {
    const response = await axios.get(commentURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

function generateAuthorCSV(data) {
  const authors = data.map((commit) => ({
    avatar_url: commit.author ? commit.author.avatar_url : "N/A",
    username: commit.author ? commit.author.login : "N/A",
    homepage_url: commit.author ? commit.author.html_url : "N/A",
  }));

  const csv = Papa.unparse(authors);
  fs.writeFileSync("authors.csv", csv);
}

async function generateFollowersCSV(data) {
  const uniqueAuthors = [
    ...new Set(
      data
        .map((commit) => (commit.author ? commit.author.login : null))
        .filter(Boolean)
    ),
  ];

  const followersData = [];

  for (let author of uniqueAuthors) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${author}/followers`
      );
      const followers = response.data.slice(0, 5).map((follower) => ({
        author,
        follower_name: follower.login,
        follower_url: follower.html_url,
      }));

      followersData.push(...followers);
    } catch (error) {
      console.error(`Error fetching followers for ${author}:`, error);
    }
  }

  const csv = Papa.unparse(followersData);
  fs.writeFileSync("followers.csv", csv);
}
function generateCommitCSV(data) {
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

  const csv = Papa.unparse(commits);
  fs.writeFileSync("commits.csv", csv);
}

(async function () {
  const data = await fetchData();

  generateAuthorCSV(data);
  generateFollowersCSV(data);
  generateCommitCSV(data);

  console.log("CSV generation complete.");
})();
