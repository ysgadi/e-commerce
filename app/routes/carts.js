const express = require('express');
const router = express.Router();
const model = require('../db/models');
const RouteUtil = require('../helpers/route-util');
const EmailUtil = require('../helpers/email-util');
const {body, validationResult} = require('express-validator/check');

router.get('/', async function(req, res, next) {
  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User do not have right access', 401));
  }

  user.getCartArticle()
    .then((articles) => {
      res.status(200).json(articles);
    });
});

router.get('/valid', async function(req, res, next) {
  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User do not have right access', 401));
  }

  let arts = await user.getCartArticle({
    include: [{
      model: model.User,
      as: 'owner',
    }],
  });

  if (arts.length === 0) {
    return next(RouteUtil.createError('No article found in cart', 404));
  }

  try {
    let totalPrice = 0;
    let priceItem = 0;
    let mailBuyer = 'Thanks for purchasing on our website !! \n';
    mailBuyer += 'Here the list of the articles you just bought :\n';
    for (let i=0; i < arts.length; i++) {
      user.addSoldArticle(arts[i], {through: {quantity: arts[i].Cart.quantity}})
        .then((cart) => {
          arts[i].update({
            quantity: (arts[i].quantity - arts[i].Cart.quantity),
          });
        });

      priceItem = (arts[i].Cart.quantity * arts[i].price);
      totalPrice += priceItem;
      mailBuyer += '\t- ' + arts[i].Cart.quantity + ' ' + arts[i].name + ' for '
        + priceItem + ' euros. Sold by ' + arts[i].owner.pseudo + '\n';

      EmailUtil.mail(arts[i].owner.email,
        user.pseudo + ' bought from you ' + arts[i].Cart.quantity + ' '
        + arts[i].name + ' for ' + priceItem
        + ' euros.\n\nYou can now contact him by mail at ' + user.email
        + ' to agree on the sale.',
        false);
    }
    if (arts.length > 1) {
      mailBuyer += 'The total amount of your articles is to ' + totalPrice
        + ' euros.\n';
    }
    mailBuyer += 'We hope to see you back soon :)';

    EmailUtil.mail(user.email, mailBuyer, true);
    model.Cart.destroy({
      where: {UserId: user.id},
    });
    res.json({message: 'Cart validation success'});
  } catch (e) {
    next(RouteUtil.createError('Validation of Cart failed', 500));
  }
});

router.post('/:id', [
  body('quantity').not().isEmpty().isInt({min: 1}),
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError('Invalid parameters to add article.',
      422, errors.mapped()));
  }

  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User dot not have right access', 401));
  }

  const article = await model.Article.findById(req.params.id);
  if (article === null) {
    return next(RouteUtil.createError('Article does not exist', 404));
  }

  if (article.quantity < req.body.quantity) {
    next(RouteUtil.createError('Invalid parameters to add article.',
      422, errors.mapped()));
  }

  try {
    user.addCartArticle(article, {through: {quantity: req.body.quantity}})
      .then((cart) => {
        res.status(200).json({message: 'article added to cart'});
      });
  } catch (e) {
    next(RouteUtil.createError('Adding article to cart failed', 500));
  }
});

router.delete('/:id', async function(req, res, next) {
  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User dot not have right access', 401));
  }

  const article = await model.Article.findById(req.params.id);
  if (article === null) {
    return next(RouteUtil.createError('Article does not exist', 404));
  }

  try {
    user.removeCartArticle(article)
      .then((cart) => {
        res.status(200).json({message: 'article removed from cart'});
      });
  } catch (e) {
    next(RouteUtil.createError('Removing article from cart failed', 500));
  }
});

module.exports = router;
