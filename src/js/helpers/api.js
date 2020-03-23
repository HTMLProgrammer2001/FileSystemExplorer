require('babel-polyfill');

export default async (bodyObj, opts) => {
    //transform body object to body string
    let bodyPairs = Object.entries(bodyObj),
        body = bodyPairs.map(([name, value]) => `${name}=${value}`).join('&');

    return await fetch('http://explorer/dist/php/api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        body,
        ...opts
    });
}
