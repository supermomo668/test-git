const { Octokit } = require("@octokit/rest");

process.env.GITHUB_TOKEN = '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';
process.env.GITHUB_REPOSITORY = 'supermomo668/test-git';
const jsonString = `{"response": "This is a simplified response.", "context": ["Simplified context line 1.", "Simplified context line 2."]}`;

process.env.ISSUE_NUMBER = '4';
process.env.AGENT_RESPONSE = `{"response": "I'm sorry, but I still don't see the specific GitHub issue that needs to be resolved in the FDAi project. Could you please provide the details of the issue? This would typically include a description of the problem, any error messages, and the steps to reproduce the issue.", "context": ["# contributing\n### For Non-Technical Users:\n\n1. **Editing Documentation via GitHub's Online Editor**:\n - Navigate to the file you want to edit in your forked repository on GitHub.\n - Click on the pencil icon (Edit this file) in the top right corner of the file view.\n - Make your changes in the editor.\n - At the bottom of the page, describe your changes and click **Commit changes**.\n\n2. **Using GitHub Issues and Discussions**:\n - Navigate to the **Issues** or **Discussions** tab in the main [FDAi repository](https://github.com/FDA-AI/FDAi).\n - You can create a new issue/discussion or contribute to an existing one.", "# README\n### Getting Involved\n\nIf you are a developer interested in contributing to the FDAi project, here are some steps to get started:\n\n1. Introduce yourself by creating a Markdown page within this folder with your name or your organization's name as the filename.\n2. On your page, include:\n - An introduction of yourself or your organization.\n - Your role and interest in the FDAi project.\n - Contact information or how you wish to be engaged.\n3. Review open issues in the repository's issue tracker to see if there are any tasks or discussions you can contribute to.\n4. Propose new ideas or projects by opening a new issue or submitting a project proposal using the provided template in the `/templates` directory.", "# SECURITY\n### Reporting a Vulnerability\n\nTo report a security vulnerability within the FDAi project, follow these steps:\n\n1. **Do not** open a public issue on GitHub.\n2. Email security@FDAi.earth with the subject \"FDAi Security Vulnerability\".\n3. In the email, include a detailed description of the vulnerability, along with the affected component(s) and version(s) of the project.\n4. Optionally, provide a proof of concept, screenshots, or any other relevant information to help us understand and reproduce the issue.\n\nThe security team will acknowledge receipt of your vulnerability report within 48 hours and will provide an estimated timeline for addressing the issue. Once the vulnerability has been resolved, the security team will coordinate with you to disclose the issue publicly, if appropriate.", "# README\n### What You Will Find Here\n\nIn this directory, you will find a variety of resources that can help you understand the project's technical aspects, coding practices, and other relevant guidelines. These resources are meant to assist you in creating contributions that align with the project's standards and objectives.\n\n- **Guides**: Step-by-step instructions and best practices for various tasks and processes within the project.\n- **Tools**: Software and utilities that can aid in development, research, and collaboration.\n- **Documentation**: Detailed descriptions of the project's architecture, components, and systems.\n- **Coding Standards**: Conventions and style guides to follow when writing code for the FDAi.\n- **Data Handling Protocols**: Guidelines for managing, storing, and sharing data securely and responsibly.", "# README\n### Additional Information\n\nFor any questions or assistance, please refer to the `CONTRIBUTING.md` file or use the GitHub issue tracker to reach out to the FDAi community.\n\nThank you for being a part of the FDAi initiative. Your collaboration is vital to the success of this project."]}`;

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