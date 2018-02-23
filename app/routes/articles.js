const express = require('express');
const router = express.Router();
const model = require('../db/models');
const {body, validationResult, oneOf} = require('express-validator/check');
const jwtMiddleware = require('express-jwt');
const JwtUtil = require('../helpers/jwt-util');
const RouteUtil = require('../helpers/route-util');
const amazon = require('amazon-product-api');

router.get('/', function(req, res, next) {
  model.Article.findAll({where: {
    quantity: {$ne: 0},
  }}).then((articles) => res.status(200).json(articles));
});

router.post('/', jwtMiddleware({secret: JwtUtil.JWT_SECRET}), [
  body('name').isLength({max: 100}).not().isEmpty(),
  body('description').isLength({max: 500}).not().isEmpty(),
  body('price').isFloat({min: 0, max: 1000000000}).not().isEmpty(),
  body('category').isLength({max: 255}).not().isEmpty(),
  oneOf([
    body('category').equals('Multimedia'),
    body('category').equals('Informatique'),
    body('category').equals('Vehicule'),
    body('category').equals('Service'),
    body('category').equals('Exterieur'),
    body('category').equals('Interieur'),
    body('category').equals('Autre'),
  ]),
  body('quantity').isInt({min: 1, max: 100000}).not().isEmpty(),
],
async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError('Invalid parameters to create article.',
      422, errors.mapped()));
  }

  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User dot not have right access', 401));
  }

  try {
    let article = await model.Article.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
    });
    article.setOwner(user);
    res.status(201).json({message: 'article created'});
  } catch (e) {
    next(RouteUtil.createError('Creation Article error', 500));
  }
});

let client = amazon.createClient({
  awsId: 'AKIAIV54M2OBDG6BNKBQ',
  awsSecret: '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',
});
router.post('/amazon', [
  body('keywords').isLength({max: 500}).not().isEmpty(),
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError(
      'Invalid parameters to search article on amazon.',
      422,
      errors.mapped()));
  }
  client.itemSearch({
    Keywords: req.body.keywords,
  }).then(function(results) {
    if (results!=null) {
      let resultsArticle=[];
      for (let i=0; i<3; i++) {
        let article= {
          assinCode: results[i].ASIN[0],
          url: results[i].DetailPageURL[0],
        };
        resultsArticle.push(article);
      }
      res.status(200).json(resultsArticle);
    } else {
      res.status(404).jsonp({message: 'Article not found in API amazon'});
    }
  }).catch(function(err) {
    res.status(400).send(err.Error);
  });
});

router.get('/:id', async function(req, res, next) {
  const article = await model.Article.findById(req.params.id);
  if (article === null) {
    return next(RouteUtil.createError('Article not found', 404));
  }
  res.status(200).json(article);
});

router.put('/:id', jwtMiddleware({secret: JwtUtil.JWT_SECRET}), [
  body('name').isLength({max: 100}).not().isEmpty(),
  body('description').isLength({max: 500}).not().isEmpty(),
  body('price').isFloat({min: 0, max: 1000000000}).not().isEmpty(),
  body('category').isLength({max: 255}).not().isEmpty(),
  oneOf([
    body('category').equals('Multimedia'),
    body('category').equals('Informatique'),
    body('category').equals('Vehicule'),
    body('category').equals('Service'),
    body('category').equals('Exterieur'),
    body('category').equals('Interieur'),
    body('category').equals('Autre'),
  ]),
  body('quantity').isInt({min: 1, max: 100000}).not().isEmpty(),
],
async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError('Invalid parameters to update article.',
      422, errors.mapped()));
  }

  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User dot not have right access', 401));
  }

  const article = await model.Article.findById(req.params.id);
  if (article === null) {
    return next(RouteUtil.createError('Article not found', 404));
  }

  if (article.ownerId !== user.id) {
    return next(RouteUtil.createError('User dot not own article', 401));
  }

  try {
    if (article.quantity > req.body.quantity) {
      let articleInCarts = await model.Cart.findAll({
        where: {
          ArticleId: article.id,
          quantity: {$gt: req.body.quantity},
        },
      });
      for (let i=0; i < articleInCarts.length; i++) {
        articleInCarts[i].update({
          quantity: req.body.quantity,
        });
      }
    }

    article.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
    });
    res.status(201).json({message: 'article updated'});
  } catch (e) {
    next(RouteUtil.createError('Update Article error', 500));
  }
});

router.delete('/:id', jwtMiddleware({secret: JwtUtil.JWT_SECRET}),
  async function(req, res, next) {
    const user = await model.User.findById(req.user.data.id);
    if (user === null) {
      return next(RouteUtil.createError('User dot not have right access', 401));
    }

    const article = await model.Article.findById(req.params.id);
    if (article === null) {
      return next(RouteUtil.createError('Article not found', 404));
    }

    if (article.ownerId !== user.id) {
      return next(RouteUtil.createError('User dot not own article', 401));
    }

    try {
      let oneSell = await model.Sold.findOne({where: {ArticleId: article.id}});
      if (oneSell !== null) {
        article.update({
          quantity: 0,
        });
        model.Cart.destroy({where: {ArticleId: article.id}});
      } else {
        article.destroy();
      }
      res.status(200).json({message: 'article deleted'});
    } catch (e) {
      next(RouteUtil.createError('Deleting article error', 500));
    }
  });

module.exports = router;
