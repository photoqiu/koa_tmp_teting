const Koa = require("koa")
const fs = require('fs')
const loggerAsync = require("./middleware/loger")
const app = new Koa()

app.use(loggerAsync());

function render(pages) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./app/viewers/${pages}`
        fs.readFile(viewUrl, "binary", (errors, datas) => {
            if (errors) {
                reject(errors)
            } else {
                resolve(datas)
            }
        })
    })
}

async function route(url) {
    let view = "404.html"
    switch(url) {
        case "/":
            view = "index.html";
            break;
        case "/index":
            view = "index.html";
            break;
        case "/todo":
            view = "todo.html";
            break;
        default:
            view  = "404.html";
            break;
    }
    let html = await render(view);
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    console.log(url)
    let html = await route(url);
    ctx.body = html;
})

app.listen(3001)

console.log("the serveris starting at port 3001")