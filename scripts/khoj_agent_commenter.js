const { Octokit } = require("@octokit/rest");

process.env.GITHUB_TOKEN = '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';
process.env.GITHUB_REPOSITORY = 'supermomo668/test-git';
process.env.ISSUE_NUMBER = '4';
process.env.AGENT_RESPONSE = "This is a comment made by a script 🤖";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function postComment(owner, repo, issue_number, body) {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number,
    body,
  });
}

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
console.log("Owner:"+owner+"\nRepo:"+repo)
const issueNumber = parseInt(process.env.ISSUE_NUMBER, 10);
const commentBody = process.env.AGENT_RESPONSE;

postComment(owner, repo, issueNumber, commentBody)
  .then(() => console.log("Comment posted successfully."))
  .catch(error => console.error("Failed to post comment:", error));