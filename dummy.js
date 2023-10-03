const gitRepoName = require('git-repo-name');

gitRepoName()
  .then((repoName) => {
    console.log(`Current Git repository name: ${repoName}`);
  })
  .catch((error) => {
    console.error('Error:', error);
  });