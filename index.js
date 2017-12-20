const app = require("./server");
const PORT = process.env.PORT || 3000;



app.listen(PORT, err => {
      if (err) throw err;
      console.log(`Your server is running on port ${PORT}`);
});

