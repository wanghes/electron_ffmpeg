module.exports = {
    packagerConfig: {
        name: 'app',
        // asar: {
        //     unpackDir: "node_modules"
        // },
        arch: "x64",
        platform: "darwin",
        executableName: 'app',
        extraResource: ['./assets/Readme.txt', './assets/ffmpeg', './assets/axin.jpg'], // 静态文件
        // icon: './build/icon' // 不用加后缀，但是需要准备3个文件，win: icon.ico, mac: icon.icns, linux: icon.png，打包时自动识别，linux 在BrowserWindow构造参数中设置
    },
    makers: [
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin",
                "linux"
            ],
            "config": {}
        }
    ],
    // plugins: [
    //     ['@electron-forge/plugin-auto-unpack-natives']
    // ]
}