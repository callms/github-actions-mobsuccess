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

  console.log({ owner, repo });
  const branches = await octokit.paginate(
    "GET /repos/{owner}/{repo}/branches",
    { owner, repo }
  );
  for (const branch of branches) {
    console.log("BRANCH", branch);
  }

  console.log("Info", { baseRef, headRef, title });
};
