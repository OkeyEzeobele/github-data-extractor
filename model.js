const axios = require("axios");

class GithubModel {
  async getCommits() {
    try {
      const response = await axios.get(
        "https://api.github.com/repositories/19438/commits"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching commits:", error);
      return [];
    }
  }

  async getCommentsForCommit(commentURL) {
    try {
      const response = await axios.get(commentURL);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }

  async getFollowersForUser(username) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/followers`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching followers for user ${username}:`, error);
      return [];
    }
  }
}

module.exports = new GithubModel();
