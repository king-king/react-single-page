/* eslint-disable no-console */
/*
 * Created by wangqun  At Wed Oct 21 2020 14:11:23
 */

const { execSync } = require('child_process');

// 检测分支版本号和git message版本号是否一致
// 如，分支是feature/#189_analyse_region，则git message如果是【】，则需要遵循【#189】的写法
module.exports = function (message) {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD');
    const match = String(branchName).match(/^feature\/(#[0-9]+)/);
    console.log(message, !/([Bb]uild)|([Rr]elease)|([mM]erge(\s*|\s+.*))/.test(message));
    // 只有当前分支是feature/#123 的形式，且message不是build、release、merge，才进行检测
    if (match && match[1] && !/([Bb]uild)|([Rr]elease)|([mM]erge(\s*|\s+.*))/.test(message)) {
        const number = match[1];
        const lines = message.split(/\n/);
        console.log('开始检测分支编码...\n');
        for (let i = 0; i < lines.length; i++) {
            if (!(new RegExp(`^【${number} `)).test(lines[i])) {
                console.log('commit失败...\n');
                console.log(`× 提示：应以【${number} 开头`);
                process.exitCode = 1;
                return;
            }
        }
    }
    console.log(`当前分支：${branchName}`);
};
