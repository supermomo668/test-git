const { Octokit } = require("@octokit/rest");

// process.env.GITHUB_TOKEN = 'ghp_';
// process.env.GITHUB_REPOSITORY = 'supermomo668/test-git';
// process.env.ISSUE_NUMBER = '4';
// process.env.AGENT_RESPONSE = ``

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function postComment(owner, repo, issue_number, body) {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number,
    body,
  });
}

try {
    const obj = JSON.parse(process.env.AGENT_RESPONSE);
    const formattedOutput = `${obj.response}\nContext:${obj.context.join('\\n')}`;
    console.log(formattedOutput);
} catch (error) {
    console.error("Failed to parse JSON string:", error);
}


const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
console.log("Owner:"+owner+"\nRepo:"+repo)
const issueNumber = parseInt(process.env.ISSUE_NUMBER, 10);

postComment(owner, repo, issueNumber, formattedOutput)
  .then(() => console.log("Comment posted successfully."))
  .catch(error => console.error("Failed to post comment:", error));