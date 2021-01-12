const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const fileMaxSize = 6 * 1024 * 1024; // 最大6MB

childProcess.exec('git status --short -u', (error, stdout) => {
    console.log('检测.snap快照文件体积');
    if (error) {
        console.log(error);
        process.exitCode = 1; // 禁止提交
    } else {
        const paths = stdout.split(/\s/);
        for (let i = 0; i < paths.length; i++) {
            const pt = path.resolve(process.cwd(), paths[i]);
            if (/\.snap$/.test(pt)) {
                // 是快照文件
                let stats;
                try {
                    stats = fs.statSync(pt);
                    if (stats.size > fileMaxSize) {
                        console.log(`x ${paths[i]} ${stats.size}Byte (单个快照文件体积最大6MB)`);
                        process.exitCode = 1; // 禁止提交
                        return;
                    }
                    console.log(`√ ${paths[i]} ${stats.size}Byte`);
                } catch (e) {
                    //
                }
            }
        }
    }
});
