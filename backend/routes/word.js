const router = require('express').Router();

const {
  createWordCollection,
  getMyWordCollection,
  deleteWordCollection,
  updateWordCollection,
} = require('../controllers/word');

router.get('/words', getMyWordCollection);
router.post('/words', createWordCollection);
router.delete('/words/:wordId', deleteWordCollection);
router.patch('/word/:wordId', updateWordCollection);

module.exports = router;
