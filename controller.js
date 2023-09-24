const githubModel = require("./model.js");
const csvView = require("./view.js");

class GithubController {
  async generateCSVs() {
    try {
      const commits = await githubModel.getCommits();
      csvView.generateAuthorsCSV(commits);

      const uniqueAuthors = [
        ...new Set(commits.map((commit) => commit.author.login)),
      ];
      const followersData = [];
      for (let author of uniqueAuthors) {
        const followers = await githubModel.getFollowersForUser(author);
        const firstFiveFollowers = followers.slice(0, 5).map((follower) => ({
          author,
          follower_name: follower.login,
          follower_url: follower.html_url,
        }));
        followersData.push(...firstFiveFollowers);
      }
      csvView.generateFollowersCSV(followersData);

      const commitDataWithComments = [];
      for (let commit of commits) {
        commit.comments = await githubModel.getCommentsForCommit(
          commit.comments_url
        );
        commitDataWithComments.push(commit);
      }
      csvView.generateCommitsCSV(commitDataWithComments);
    } catch (error) {
      console.error("Error in generating CSVs:", error);
    }
  }
}

module.exports = new GithubController();
