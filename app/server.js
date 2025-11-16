const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send(`
        <h1>FinacPlus CI/CD Assignment</h1>
        <h2>Blue-Green Deployment</h2>
        <h3>Version: ${process.env.VERSION}</h3>
    `);
});

app.listen(port, () => console.log(`FinacPlus app running on port ${port}`));

