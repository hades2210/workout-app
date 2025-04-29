const { Octokit } = require("@octokit/rest");

exports.handler = async function(event) {
  try {
    const { file: b64file } = JSON.parse(event.body);
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    await octokit.actions.createWorkflowDispatch({
      owner: "hades2210",          // your GitHub username
      repo: "workout-app",         // repo name
      workflow_id: "update-workout.yml",
      ref: "main",
      inputs: { file: b64file }
    });

    return { statusCode: 200, body: "Workflow dispatched." };
  } catch (err) {
    console.error(err);
    return { statusCode: err.status || 500, body: err.message };
  }
};
