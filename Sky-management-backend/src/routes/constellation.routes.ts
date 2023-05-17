import {Router, Request, Response} from 'express';
import {Constellation, Star} from "../models/models";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const result = await Constellation.findAll({
        include: [{model: Star}],
    });

    if (result) {
        return res.status(200).json({constellation: result});
    } else {
        return res.status(404).send("No constellations found.")
    }
});

router.get('/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);
    const result = await Constellation.findByPk(id, {
        include: [{model: Star}],
    });
    if (result) {
        return res.status(200).json({constellation: result});
    } else {
        return res.status(404).send("Cannot find constellation with id: " + id);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    let newConstellation = req.body as Constellation;
    console.log(newConstellation)
    const result = await Constellation.create({...newConstellation});
    newConstellation = result.dataValues as Constellation;
    if (result) {
        return res.status(201).json({constellation: newConstellation});
    } else {
        return res.status(409).send("Error during adding constellation.");
    }
});

router.put('/edit/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    let constellation = req.body as Constellation;
    await Constellation.update({...constellation}, {where: {id}});
    const updatedConstellation: Constellation | null = await Constellation.findByPk(id);

    if (updatedConstellation) {
        return res.status(200).json(updatedConstellation);
    } else {
        return res.status(409).send("Problem with update.");
    }
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const constellationToDelete: Constellation | null = await Constellation.findByPk(id);

    if (constellationToDelete) {
        await Constellation.destroy({where: {id}});
        return res.status(200).json(constellationToDelete);
    } else {
        return res.status(404).send("Cannot delete constellation");
    }
})
export default router;