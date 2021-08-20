const express = require("express");
const productos = require('./productos');

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log("Server up en puerto", puerto)
);

// server.on("error", (err) => {
//   console.log("ERROR ATAJADO", err)
// });

let visitasItem = 0;
let visitasRandom = 0;

app.get("/api/item", async(req, res) => {
  visitasItem++;
  let data = await productos.leer();

  console.log(data);

  res.json({
    item: data
  })
})

app.get("/api/item-random", async(req, res) => {
  visitasRandom++;
  let data = await productos.leer();
  if(data){
    var aleatorio = Math.floor((Math.random() * (data.length + 1)));
    console.log("aleatorio: " + aleatorio + " dato: " + data);
    res.json({
      item: data[aleatorio]
    });
  }else{
    res.json({
      error: "no hay registros"
    });
  }
})


app.get("/api/visitas", async(req, res) => {
  res.json({
    visitas: {
      items: visitasItem,
      itemrandom: visitasRandom
    }
  });
})
