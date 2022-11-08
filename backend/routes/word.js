const router = require('express').Router();

const {
  createWordCollection,
  getMyWordCollection,
  deleteWordCollection,
  deleteWord,
} = require('../controllers/word');
/*const {
  validationMovieId,
  validationCreateMovies,
} = require('../validation/validation');*/

router.get('/word', getMyWordCollection);
router.post('/word', createWordCollection);
router.delete('/word/:wordId', deleteWordCollection);
router.delete('/word/:wordsId/:wordId', deleteWord);

module.exports = router;
