const express = require('express')
const router = express.Router()

const Task = require('../models/task')


router.get('/', async (req, res) => {
  const tasks = await Task.find()

  res.render('index', {
    tasks: tasks
  })
})

router.post('/add', async (req, res) => {
  const task = new Task(req.body)
  await task.save()
  res.redirect('/')
})

router.get('/done/:id', async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findById(id)
    task.status = !task.status
    await task.save()
    res.redirect('/')
  }
  catch (err) {
    console.log(err)
  }

})

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findById(id)
    res.render('edit', {
      task
    })
  }
  catch (err) {
    console.log(err)
  }
})

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Task.update({ _id: id }, req.body)
    res.redirect('/')
  }
  catch (err) {
    console.log(er)
  }
})


router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.remove({ _id: id });
    res.redirect('/')
  }
  catch (err) {
    console.log(err)
    res.send('Hubo un error')
  }
})

module.exports = router