const { getOctokit } = require("./octokit");

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

  const octokit = getOctokit();

  const branches = await octokit.paginate(
    "GET /repos/{owner}/{repo}/branches",
    { owner, repo }
  );
  for (const { name: branchName } of branches) {
    console.log(`Branch name: ${branchName}`);
    if (headRef === branchName) {
      console.log("found same");
      continue;
    }
    const prefix = headRef.substr(0, branchName.length);
    const postfix = headRef.substr(branchName.length);
    if(prefix === branchName) {
      console.log("found prefix forcurrent head", postfix);
      if(!postfix.match(/^--[a-z]/)) {
        throw new Error(`This pull request is based on the branch “${headRef}”, which starts like “${branchName}”. Use double dashes (“--”) to separate sub-braches.`);
      }
      console.log("other branch valid");
  }

  console.log("Info", { baseRef, headRef, title });
};
