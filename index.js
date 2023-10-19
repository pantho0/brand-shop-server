const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());

// mongodb
// brandShop
// K6jKpuMCY14Bb7jq



const uri = "mongodb+srv://brandShop:K6jKpuMCY14Bb7jq@cluster0.guubgk2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productCollection = client.db("brandDB").collection('productDB');



    app.get('/products', async(req, res)=>{
      const result = await productCollection.find().toArray();
      res.send(result)
    })


    app.post('/addproduct', async(req, res)=>{
        const product = req.body;
        console.log(product);
        const result = await productCollection.insertOne(product)
        res.send(result)
    })  








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Brandshop running successfully')
})

app.listen(port, ()=>{
    console.log(`Brandshop runnign on port ${port}`);
})