const app = require('./api/index');
const port = 3000;

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
