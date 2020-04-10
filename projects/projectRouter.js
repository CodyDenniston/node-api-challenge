const express = require('express');

Project = require('../data/helpers/projectModel');
Action = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', (req, res) => {
	Project.insert(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'there was an error adding project',
			});
		});
});

router.post('/:id/action', (req, res) => {
	Action.insert({
		...req.body,
		project_id: req.params.id,
	})
		.then((newAction) => {
			res.status(201).json(newAction);
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error adding an action to the database',
			});
		});
});

router.get('/', (req, res) => {
	Project.get()
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error retrieving the Project' });
		});
});

router.get('/:id', (req, res) => {
	Project.get(req.params.id)
		.then((project) => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json({ message: 'project not found' });
			}
		})
		.catch((error) => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the project',
			});
		});
});

router.get('/:id/action', (req, res) => {
	Project.getProjectActions(req.params.id)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Error getting action from the project',
			});
		});
});

router.delete('/:id', (req, res) => {
	Project.remove(req.params.id)
		.then(() => {
			res.status(201).json({
				message: 'The project was succesully removed from the database',
			});
		})
		.catch(() => {
			res.status(500).json({
				message: 'There was an error removing the project from the database',
			});
		});
});

router.put('/:id', (req, res) => {
	Project.update(req.params.id, req.body)
		.then(() => {
			Project.get(req.params.id).then((project) => {
				res.status(201).json(project);
			});
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'There was an error updating the project' });
		});
});

//custom middleware

module.exports = router;
