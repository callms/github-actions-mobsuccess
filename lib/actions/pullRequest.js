const { getOctokit } = require("./octokit");

exports.validatePR = async function validatePR({ pullRequest }) {
  const {
    base: {
      ref: baseRef,
      repo: {
        owner: { login: owner, name: repo },
      },
    },
    head: { ref: headRef },
    title,
  } = pullRequest;

  const octokit = getOctokit();

  for (const branch of octokit.paginate.iterator(
    octokit.rest.repos.listBranches,
    { owner, repo }
  )) {
    console.log("BRANCH", branch);
  }

  console.log("Info", { baseRef, headRef, title });
};
