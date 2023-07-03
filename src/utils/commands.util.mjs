import shell from 'shelljs';

export async function gitClone(repoLink) {
    return new Promise((resolve, reject) => {
        if (!shell.which('git')) {
            shell.echo('Sorry, this script requires git');
            shell.exit(1);
            reject(new Error('Sorry, this script requires git'));
        }

        const path = `${process.cwd()}/cmsConfigs`;

        shell.rm('-rf', path);

        try {
            shell.exec(`git clone ${repoLink} ${path}`, {}, (code, stdout, stderr) => {
                if (code != 0) {
                    return reject(new Error(stderr));
                }

                shell.rm('-rf', `${path}/.git`);
                return resolve(stdout);
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}
