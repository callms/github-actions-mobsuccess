exports.isBranchNameValid = (branchName) =>
  !!branchName.match(
    /^(core|feature|fix|hotfix|asset|rework|documentation)\/([a-z][a-z0-9-]*)$/
  ) && !branchName.match(/---/);
