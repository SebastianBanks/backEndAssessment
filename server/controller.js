const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
                    "A dubious friend may be an enemy in camouflage.",
                    "A faithful friend is a strong defense.",
                    "A feather in the hand is better than a bird in the air.",
                    "A fresh start will put you on your way.",
                    "A friend asks only for your time not your money."
]

const toDo = require("./db.json")
let globalId = 4

module.exports = {
    getCompliments: (req, res) => {
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];

        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomFortune= fortunes[randomIndex];

        res.status(200).send(randomFortune)
    },

    getTodo: (req, res) => {
        res.status(200).send(toDo)
    },

    deleteTodo: (req, res) => {
        let index = toDo.findIndex(elem => elem.id === +req.params.id)
        toDo.splice(index, 1)

        res.status(200).send(toDo)
    },

    addTodo: (req, res) => {
        let { item } = req.body
        let newTodo = {
            id: globalId,
            item: item
        }
        if (newTodo.item !== "") {
            toDo.push(newTodo)
            res.status(200).send(toDo)
            globalId++
        } else {
            res.status(400).send
        }
        
    },

    editTodo: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = toDo.findIndex(elem => elem.id === +id)
        console.log("completed")
        if (type = "done" && !toDo[index].item.includes("Completed -")) {
            toDo[index].item = `Completed - ${toDo[index].item}`
        } else if (type = "undone" && toDo[index].item.includes("Completed -")) {
            toDo[index].item = toDo[index].item.replace("Completed - ", "")
        }
        
        res.status(200).send(toDo)
    }


}