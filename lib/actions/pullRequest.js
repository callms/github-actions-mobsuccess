exports.validatePR = async function validatePR({ pullRequest }) {
  const {
    base: { ref: baseRef },
    head: { ref: headRef },
    title,
  } = pullRequest;

  console.log("Info", { baseRef, headRef, title });
};
