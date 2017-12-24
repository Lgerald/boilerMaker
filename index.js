const app = require("./server");
const {db} = require('./server/models')


const PORT = process.env.PORT || 3000;


db.sync()
.then(() =>{
      console.log("db has synced")
      app.listen(PORT, err => {
            if (err) throw err;
            console.log(`Your server is running on port ${PORT}. You better go catch it`);
      })
})
.catch(console.error)

