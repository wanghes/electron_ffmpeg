const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})

window.electronAPI.testStr().then(res => {
    document.querySelector("#text").innerHTML = res;
});