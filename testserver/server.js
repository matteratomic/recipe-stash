const app = require('express')()
const port = parseInt(process.env.PORT) || 3001
const json = require('./foods.json')

app.get('/foods',(req,res)=>{
if(req.query.q){
    let results = json.results.filter((food)=>{
        return new RegExp(req.query.q,"gi").test(food.name)
    })
    res.json({results})
}else{
    res.status(200).json(json)
}
})
.listen(port, () => { console.log(`Listening on port ${port}`) })
