const { Octokit } = require("@octokit/rest");

exports.handler = async function(event) {
  // DEBUG: verify token presence
  console.log("GITHUB_TOKEN present?", !!process.env.GITHUB_TOKEN);

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: "Error: GITHUB_TOKEN is not set in Netlify env."
    };
  }

  const octokit = new Octokit({ auth: token });

  try {
    const { file: b64file } = JSON.parse(event.body);
    await octokit.actions.createWorkflowDispatch({
      owner: "hades2210",
      repo:  "workout-app",
      workflow_id: "update-workout.yml",
      ref: "main",
      inputs: { file: b64file }
    });
    return { statusCode: 200, body: "Workflow dispatched." };
  } catch (err) {
    console.error("GitHub API error:", err);
    return { statusCode: err.status || 500, body: err.message };
  }
};
