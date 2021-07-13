function addHtml(html) {
    document.body.insertAdjacentHTML('beforeend', html);
}

function waitForMessage(params) {
    return new Promise(resolve => {

        function handler({ data }) {
            removeEventListener("message", handler);
            params.durations.push(data);
            resolve(params);
        }

        addEventListener("message", handler);
        addHtml(params.html);
    });
}

function addAverage({ durations }, indexFile) {
    console.log(">addAverage", durations);
    const average = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    addHtml(`<div>${indexFile} - ${average} ms</div>`);
}


function measure(indexFile) {
    const html = `<iframe src='${indexFile}'></iframe>`;

    let p = Promise.resolve({ html, durations: [] });

    for (let i = 0; i < 10; i++) {
        p = p.then(waitForMessage);
    }

    return p.then(data => addAverage(data, indexFile));
}

Promise.resolve()
    .then(() => measure("https://localhost:9443/manyModules.html"))
    .then(() => measure("https://localhost:8443/HTTPS/manyModules.html"));


