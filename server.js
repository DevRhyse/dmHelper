const express = require('express')
const app = express()
const bodyParser =  require('body-parser')
const MongoClient = require('mongodb').MongoClient
const env = require('dotenv').config()
const PORT = env.PORT

MongoClient.connect(process.env.DB, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Mongo')
        const db = client.db('dmEncounters')
        const encounterCollection = db.collection('encounters')
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.get('/', (req, res) => {
            db.collection('encounters').find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', { encounters: results })
                })
                .catch(error => {
                    console.error(error)
                })
        })

        app.post('/addEncounter', (req, res) => {
            encounterCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
        
        // app.post

        
        // app.delete('', (req, res) => {
            
        // })
        
        // app.update('', (req, res) ={
            
        // })
        
        
        app.listen(process.env.PORT, (req, res) => {
            console.log('Your server is running, you better go catch it!')
        })
    })
    .catch(error => console.error(error))
