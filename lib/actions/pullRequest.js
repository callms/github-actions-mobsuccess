const { getOctokit } = require("./octokit");
const { isBranchNameValid } = require("../branch");

exports.validatePR = async function validatePR({ pullRequest }) {
  const {
    base: {
      ref: baseRef,
      repo: {
        owner: { login: owner },
        name: repo,
      },
    },
    head: { ref: headRef },
    title,
  } = pullRequest;

  if (!isBranchNameValid(headRef)) {
    throw new Error(
      `This pull request is based on a branch with in invalid name: “${headRef}”.`
    );
  }

  const octokit = getOctokit();

  const branches = await octokit.paginate(
    "GET /repos/{owner}/{repo}/branches",
    { owner, repo }
  );
  for (const { name: branchName } of branches) {
    if (headRef === branchName) {
      continue;
    }
    const prefix = headRef.substr(0, branchName.length);
    const postfix = headRef.substr(branchName.length);
    if (prefix === branchName) {
      if (!postfix.match(/^--[a-z]/)) {
        throw new Error(
          `This pull request is based on the branch “${headRef}”, which starts like “${branchName}”. Use double dashes (“--”) to separate sub-branches.`
        );
      }
    }
  }

  console.log("Info", { baseRef, headRef, title });
};
