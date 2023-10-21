const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const orderCollection = client.db("brandDB").collection('ordersDB');



    app.get('/products', async(req, res)=>{
      const result = await productCollection.find().toArray();
      res.send(result)
    })

    app.get('/details/:id', async(req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = {_id: new ObjectId(id)}
        const result = await productCollection.findOne(query)
        console.log(result);
        res.send(result)
    })

    app.get('/update/:id', async(req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id: new ObjectId(id)}
      const result = await productCollection.findOne(query)
      console.log(result);
      res.send(result)
  })

  app.get('/cart', async(req, res)=>{
     const result = await orderCollection.find().toArray()
     res.send(result)
  })

  app.get('/cart/:id', async(req, res)=>{
      const id = req.params.id;
      console.log(id);
      const query = {_id: new ObjectId(id)}
      const result = await orderCollection.findOne(query)
      console.log(result);
      res.send(result)
 })

    app.put('/update/:id', async(req, res)=>{
      const id = req.params.id;
      const data = req.body;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateProduct = {
        $set: {

          name: data.name, 
          image: data.image,
          brandName: data.brandName,
          description: data.description,
          price: data.price,
          rating: data.rating,
          type: data.type
        },
      };

      const result = await productCollection.updateOne(filter, updateProduct, options);
      res.send(result)
    })

    app.post('/addproduct', async(req, res)=>{
        const product = req.body;
        console.log(product);
        const result = await productCollection.insertOne(product)
        res.send(result)
    })  

    app.post('/orders', async(req,res)=>{
      const orders = req.body;
      const result = await orderCollection.insertOne(orders);
      res.send(result)
    })


    app.delete('/cart/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {
        _id : new ObjectId(id)
      };
      const result = await orderCollection.deleteOne(query)
      res.send(result)
      console.log(result);
      console.log(id);
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