export const getDir = (files, path) => {
    return path.filter((e) => e).reduce((prev, curDir, i, arr) => {
        if(!prev[curDir])
            prev[curDir] = {
                name: curDir,
                path: arr.slice(0, i + 1).join('/') + '/',
                isDir: true,
                files: {}
            };
        else
            if(!prev[curDir].isDir)
                return prev;

        return prev[curDir].files;
    }, files);
};