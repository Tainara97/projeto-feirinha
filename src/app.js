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

app.listen(5000, () => {
    console.log("rodando")
});

