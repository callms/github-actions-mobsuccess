const core = require("@actions/core");
const github = require("@actions/github");
//const getOctokit = require("./lib/actions/octokit");

exports.getActionParameters = function getActionParameters() {
  const pullRequest = github.context.payload.pull_request;
  const action = core.getInput("action", { required: true });
  return { pullRequest, action };
};

exports.action = async function action() {
  const { pullRequest, action } = exports.getActionParameters();

  console.info(`Calling action ${action}`);
  switch (action) {
    case "validate-pr":
      console.log(
        "info",
        JSON.stringify({ pullRequest, action }, undefined, 4)
      );
      console.log(
        "payload",
        JSON.stringify(github.context.payload, undefined, 4)
      );
      break;
  }
};
