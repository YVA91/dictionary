const router = require('express').Router();

const {
  createWordCollection,
  getMyWordCollection,
  deleteWordCollection,
  deleteWord,
  pushWord,
} = require('../controllers/word');

router.get('/words', getMyWordCollection);
router.post('/words', createWordCollection);
router.delete('/words/:wordId', deleteWordCollection);
router.delete('/word/:wordsId/:wordId', deleteWord);
router.patch('/word/:wordId', pushWord);

module.exports = router;
