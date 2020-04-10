const express = require('express');

Action = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
	Action.get()
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'There was an error retrieving the Action' });
		});
});

router.get('/:id', (req, res) => {
	Action.get(req.params.id)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'there was an error retrieving action by id' });
		});
});

router.delete('/:id', (req, res) => {
	Action.remove(req.params.id)
		.then(() => {
			res
				.status(201)
				.json({
					message: 'The action was succesully removed from the database',
				});
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error removing the action from the database',
			});
		});
});

router.put('/:id', (req, res) => {
	Action.update(req.params.id, req.body)
		.then(() => {
			Action.get(req.params.id).then((action) => {
				res.status(201).json(action);
			});
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'There was an error updating the action' });
		});
});

module.exports = router;
