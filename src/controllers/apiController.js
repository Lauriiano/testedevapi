
 import { Lojas } from '../models/lojas.js'

export const newRegister = async (req, res) => {

    let {desc: descricao, local: localizacao} = req.body;

    if(!descricao) {
        res.json({error: "preencha todos os campos"});
        return;
    }
    
    
    try{
        let newShop = await Lojas.create({descricao, localizacao});
        res.status(201);
        res.json({id: newShop.id, descricao: newShop.descricao, localizacao: newShop.localizacao});
    }catch(e){
        res.json({error: "houve um problema ao executar essa ação, tente novamente mais tarde"});
    }
}

export const getEstabelecimento = async (req, res) => {

    let {id, local} = req.query

    if(!id) {  //Pegar todos os estabelecimentos   
        const lojas = await Lojas.findAll();
        console.log(JSON.stringify(lojas));
        res.json({lojas})
        return;
    }

    const lojas = await Lojas.findAll({
        where: {id}
    })

    res.json({lojas})
    
}

export const putEstabelecimento = async function (req, res) {

    let {id, desc, local} = req.body;

    if(!id || !desc) {
        res.json({error: 'preencha todos os campos'});
        return;
    }

    try{

        const results = await Lojas.findAll({
            where: {id}
        });

        if(results.length > 0) {
            let loja = results[0];
            loja.descricao = desc;
            loja.localizacao = local;
            await loja.save();

            res.json({loja});
        }

        res.json({error: "estabelecimento não encontrado"});

    }catch(e) {
        res.json({error: "houve um problema ao executar essa ação, tente novamente mais tarde"});
    }

}

export const deletarEstabelecimento = async (req, res) => {

    let {id} = req.body;

    if(!id) {
        res.json({error: 'preencha todos os campos'});
        return;
    }

    try{

        const results = await Lojas.findAll({
            where: {id}
        });

        if(results.length > 0) {
            let loja = results[0];
            await loja.destroy();
            res.json({res: "Estabelecimento deletado com sucesso"});
        }

        res.json({error: "Estabelecimento não encontrado"});

    }catch(e) {
        res.json({error: "houve um problema ao executar essa ação, tente novamente mais tarde"});
    }

}




    // try {
    //     await sequelize.authenticate();
    //     console.log('conectado com sucesso');
    // }catch(e) {
    //     console.log('Deu problema: ', e);
    // }