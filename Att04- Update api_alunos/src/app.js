import express from "express"
import cors from "cors"
import conn from "./sequelize.js"
import alunoTabela from "./alunosTabela.js"
import responsavelTabela from "./responsaveisTabela.js"

const PORT = 3333
const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

conn
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server http is running on PORT: ${PORT}`)
        })
    })
    .catch()

const logRoutes = (req, res, next) => {
    const { url, method } = req
    const rota = `[${method.toUpperCase()}] - ${url}`
    console.log(rota)
    next()
}

app.use(logRoutes)

//Alunos
app.get("/alunos", async (req, res) => {
    try {
        const alunos = await alunoTabela.findAll()

        res.status(200).json(alunos)
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao listar os alunos"
        })
    }
})

app.post("/alunos", async (req, res) => {
    const {ra, nome, email, responsavel_id} = req.body

    if(!ra){
        res.status(400).json({
            erro: "Campo ra inválido",
            mensagem: "O campo ra não pode ser nulo"
        })
        return
    }
    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!email){
        res.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email não pode ser nulo"
        })
        return
    }
    if(!responsavel_id){
        res.status(400).json({
            erro: "Campo responsavel_id inválido",
            mensagem: "O campo responsavel_id não pode ser nulo"
        })
        return
    }

    const novoAluno = {
        ra,
        nome,
        email,
        responsavel_id
    }

    try {
        const alunoNovo = await alunoTabela.create(novoAluno)
        
        res.status(201).json({
            mensagem: "Aluno cadastrado com sucesso",
            alunoNovo
        })

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao cadastrar um aluno"
        })
    }

})

app.get("/alunos/:id", async (req, res) => {
    const { id } = req.params

    try {
        const alunoSelecionado = await alunoTabela.findByPk(id)
        if(!alunoSelecionado){
            res.status(404).json({
                erro: "Id inválido",
                mensagem: "Nenhum aluno com esse id foi encontrado"
            })
            return
        }

        res.status(200).json(alunoSelecionado)
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao listar um aluno"
        })
    }
})

app.put("/alunos/:id", async (req, res) => {
    const { id } = req.params
    const {ra, nome, email} = req.body

    if(!ra){
        res.status(400).json({
            erro: "Campo ra inválido",
            mensagem: "O campo ra não pode ser nulo"
        })
        return
    }
    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!email){
        res.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email não pode ser nulo"
        })
        return
    }

    try {
        const alunoSelecionado = await alunoTabela.findByPk(id)

        if(!alunoSelecionado){
            res.status(404).json({
                erro: "Id inválido",
                mensagem: "Nenhum aluno com esse id foi encontrado na base de dados"
            })
            return
        }

        if(ra !== undefined){
           alunoSelecionado.ra = ra 
        }
        if(nome !== undefined){
           alunoSelecionado.nome = nome 
        }
        if(email !== undefined){
           alunoSelecionado.email = email 
        }

        await alunoSelecionado.save()
        res.status(200).json(alunoSelecionado)

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao atualizar um aluno"
        })
    }
})

app.delete("/alunos/:id", async (req, res) => {
    const { id } = req.params

    try {
        const alunoSelecionado = await alunoTabela.findByPk(id)
        if(!alunoSelecionado){
            res.status(404).json({
                erro: "Id inválido",
                mensagem: "Nenhum aluno com esse id foi encontrado na base de dados"
            })
            return
        }

        await alunoTabela.destroy({
            where: {id: alunoSelecionado.id}
        })

        res.status(204).send()
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao deletar um aluno"
        })
    }
})

//Responsáveis
app.get("/responsaveis", async (req, res) => {
    try {
        const responsaveis = await responsavelTabela.findAll();
        res.status(200).json(responsaveis);
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao buscar responsáveis"
        });
    }
});

app.post("/responsaveis", async (req, res) => {
    const { nome, idade, email, senha, telefone, grau_parentesco, endereco, data_nascimento } = req.body;

    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!idade || idade < 18){
        res.status(400).json({
            erro: "Campo idade inválido",
            mensagem: "O campo idade não pode ser nulo"
        })
        return
    }
    if(!email){
        res.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email não pode ser nulo"
        })
        return
    }
    if(!senha){
        res.status(400).json({
            erro: "Campo senha inválido",
            mensagem: "O campo senha não pode ser nulo"
        })
        return
    }
    if(!telefone){
        res.status(400).json({
            erro: "Campo telefone inválido",
            mensagem: "O campo telefone não pode ser nulo"
        })
        return
    }
    if(!grau_parentesco){
        res.status(400).json({
            erro: "Campo grau_parentesco inválido",
            mensagem: "O campo grau_parentesco não pode ser nulo"
        })
        return
    }
    if(!endereco){
        res.status(400).json({
            erro: "Campo endereco inválido",
            mensagem: "O campo endereco não póde ser nulo"
        })
        return
    }
    if(!data_nascimento){
        res.status(400).json({
            erro: "Campo data_nascimento inválido",
            mensagem: "O campo data_nascimento não pode ser nulo"
        })
        return
    }
    

    const novoResponsavel = {
        nome,
        idade,
        email,
        senha,
        telefone,
        grau_parentesco,
        endereco,
        data_nascimento
    }

    try {
        const responsavelCriado = await responsavelTabela.create(novoResponsavel);

        res.status(201).json({
            mensagem: "Responsável criado com sucesso",
            responsavelCriado
        });
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao cadastrar um responsável"
        });
    }
});

app.get("/responsaveis/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const responsavelSelecionado = await responsavelTabela.findByPk(id);
        if (!responsavelSelecionado) {
            res.status(404).json({
                erro: "Responsável não encontrado",
                mensagem: "Responsável com esse id não encontrado na base de dados"
            });
            return
        }
        res.status(200).json(responsavelSelecionado);
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno ao buscar um responsável"
        });
    }
});

app.put("/responsaveis/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade, email, senha, telefone, data_nascimento } = req.body;

    if(!nome){
        res.status(400).json({
            erro: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        })
        return
    }
    if(!idade || idade < 18){
        res.status(400).json({
            erro: "Campo idade inválido",
            mensagem: "O campo idade não póde ser nulo"
        })
        return
    }
    if(!email){
        res.status(400).json({
            erro: "Campo email inválido",
            mensagem: "O campo email não póde ser nulo"
        })
        return
    }
    if(!senha){
        res.status(400).json({
            erro: "Campo senha inválido",
            mensagem: "O campo senha não póde ser nulo"
        })
        return
    }
    if(!telefone){
        res.status(400).json({
            erro: "Campo telefone inválido",
            mensagem: "O campo telefone não póde ser nulo"
        })
        return
    }
    if(!endereco){
        res.status(400).json({
            erro: "Campo endereco inválido",
            mensagem: "O campo endereco não póde ser nulo"
        })
        return
    }

    if(!data_nascimento){
        res.status(400).json({
            erro: "Campo data_nascimento inválido",
            mensagem: "O campo data_nascimento não póde ser nulo"
        })
        return
    }


    try {
        const responsavelSelecionado = await responsavelTabela.findByPk(id);
        if (!responsavelSelecionado) {
            res.status(404).json({
                erro: "Responsável não encontrado",
                mensagem: "Responsável com esse id não encontrado na base de dados"
            });
            return
        }

        if(nome !== undefined){
           responsavelSelecionado.nome = nome 
        }
        if(idade !== undefined){
           responsavelSelecionado.idade = idade 
        }
        if(email !== undefined){
           responsavelSelecionado.email = email 
        }
        if(senha !== undefined){
           responsavelSelecionado.senha = senha 
        }
        if(telefone !== undefined){
           responsavelSelecionado.telefone = telefone 
        }
        if(data_nascimento !== undefined){
           responsavelSelecionado.data_nascimento = data_nascimento 
        }

        await responsavelSelecionado.save()
        res.status(200).json({
            mensagem: "Responsável atualizado com sucesso",
            responsavelSelecionado
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro interno ao atualizar um responsável" });
    }
});

app.delete("/responsaveis/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const responsavelSelecionado = await responsavelTabela.findByPk(id);
        if (!responsavelSelecionado) {
            res.status(404).json({
                erro: "Responsável não encontrado",
                mensagem: "Responsável com esse id não encontrado na base de dados"
            });
            return 
        }

        await responsavelTabela.destroy({
            where: {id: responsavelSelecionado.id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover responsável" });
    }
});

app.use((req, res) => {
    res.status(404).json({
        error: "Erro de Rota",
        mensagem: "Rota não encontrada"
    })
})
