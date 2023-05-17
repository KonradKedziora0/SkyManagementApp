import {Router, Request, Response} from 'express';
import {Star} from "../models/models";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const result = await Star.findAll();

    if (result) {
        return res.status(200).json({star: result});
    } else {
        return res.status(404).send("No stars were found.")
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await Star.findByPk(id);
    if (result) {
        return res.status(200).json({star: result});
    } else {
        return res.status(404).send("Star not found.")
    }
});

router.post('/add', async (req: Request, res: Response) => {
    let newStar = req.body as Star;
    console.log(newStar);
    const result = await Star.create({...newStar});
    newStar = result.dataValues as Star;

    if (result) {
        return res.status(201).json({star: newStar});
    } else {
        return res.status(409).send("Error during creating star.");
    }
});

router.put('/edit/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    let star = req.body as Star;
    await Star.update({...star}, {where: {id}});
    const updatedStar: Star | null = await Star.findByPk(id);

    if (updatedStar) {
        return res.status(200).json(updatedStar);
    } else {
        return res.status(409).send("Cannot update star.")
    }
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const starToDelete: Star | null = await Star.findByPk(id);
    await Star.destroy({where: {id}});

    if (starToDelete) {
        return res.status(200).json(starToDelete);
    } else {
        return res.status(404).send("Star not found");
    }
})
export default router;