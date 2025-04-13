import express, {json} from "express"

const app = express();
app.use(json());

const lista = [
    { id: 1, name: "Maça", quantity: 2, type: "fruta" },
    { id: 2, name: "Batata", quantity: 3, type: "legume" },
];

app.get("/items", (req, res) => {
    const {type} = req.query;
    if (type) {
        const tipoItem = lista.filter(item => {
            return item.type.toLowerCase().includes(type.toLowerCase());
        })
        return res.send(tipoItem)
    }
    
    res.send(lista);
});

app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0 ) {
        return res.status(400).send("ID inválido!");
    } 

    const item = lista.find(item => item.id === id);
    
    if (!item) {
        return res.status(404).send("Item não encontrado!")
    }
    res.send(item)
})


app.listen(5000, () => {
    console.log("rodando")
});

