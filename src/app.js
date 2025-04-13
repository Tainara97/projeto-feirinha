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

app.post("/items", (req, res) => {
    const item = req.body;
    if (!item.name || !item.quantity || !item.type) {
        return res.status(422).send("Você precisa preencher todas as informações!")
    } 
    
    const itemExistente = lista.find(i => i.name.toLowerCase() === item.name.toLowerCase()) 

   if (itemExistente) {
        return res.status(409).send("Esse item já foi adicionado!")
    }

    lista.push({
        id: lista.length + 1,
        ...item
    })
    res.status(201).send("Item adicionado com sucesso!")
})


app.listen(5000, () => {
    console.log("rodando")
});

