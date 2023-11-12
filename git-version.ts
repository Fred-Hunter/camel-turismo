import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const longSHA = execSync("git rev-parse HEAD").toString().trim();
const shortSHA = execSync("git rev-parse --short HEAD").toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const authorName = execSync("git log -1 --pretty=format:'%an'").toString().trim();
const commitTime = execSync("git log -1 --pretty=format:'%cs'").toString().trim();
const commitMsg = execSync("git log -1 --pretty=%B").toString().trim();
const totalCommitCount = execSync("git rev-list --count HEAD").toString().trim();

const versionInfo = {
    shortSHA: shortSHA,
    SHA : longSHA,
    branch: branch,
    lastCommitAuthor: authorName,
    lastCommitTime: commitTime,
    lastCommitMessage: commitMsg,
    lastCommitNumber: totalCommitCount
}

const versionInfoJson = JSON.stringify(versionInfo, null, 2);

writeFileSync('git-version.json', versionInfoJson);
