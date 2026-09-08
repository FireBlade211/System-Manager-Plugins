const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

function renderPage(res, page) {
    const navbar = fs.readFileSync(
        path.join(__dirname, "html", "misc", "navbar.html"),
        "utf8"
    );

    let content = fs.readFileSync(
        path.join(__dirname, "html", page),
        "utf8"
    );

    // Add stylesheet to the existing <head>
    content = content.replace(
        "</head>",
        '    <link rel="stylesheet" href="/../style.css">'
        + '\n<!-- favicon -->'
        + '\n<link rel="apple-touch-icon" sizes="180x180" href="../icon/apple-touch-icon.png"/>'
        + '\n<link rel="icon" type="image/png" sizes="32x32" href="../icon/favicon-32x32.png"/>'
        + '\n<link rel="icon" type="image/png" sizes="16x16" href="../icon/favicon-16x16.png"/>'
        + '\n<link rel="manifest" href="../icon/site.webmanifest"/>\n</head>'
    );

    // Add navbar to the beginning of the existing <body>
    content = content.replace(
        "<body>",
        `<body>\n${navbar}`
    );

    res.send(content);
}

// Pages
app.get("/", (req, res) => renderPage(res, "home.html"));
app.get("/plugins", (req, res) => renderPage(res, "plugins.html"));

// Static files
app.use(express.static(path.join(__dirname, "html")));
app.use("/icon", express.static(path.join(__dirname, "icon")));
app.use("/style.css", express.static(path.join(__dirname, "style.css")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));

// Error handling
process.on("uncaughtException", (e) => console.log(e));
process.on("unhandledRejection", (e) => console.log(e));

app.listen(port, () => {
    console.log(`Site online on port ${port}`);
    console.log(`Open http://localhost:${port} in your browser to view the site.`);
});