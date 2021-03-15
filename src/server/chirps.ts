import * as express from 'express';
import chirpsStore from './chirpstore';

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.json(chirpsStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.put('/:id?', (req, res) => {
    chirpsStore.UpdateChirp(req.params.id, req.body);
    res.sendStatus(200);
});

router.delete('/:id?', (req, res) => {
    chirpsStore.DeleteChirp(req.params.id);
    res.sendStatus(200);
})

export default router;