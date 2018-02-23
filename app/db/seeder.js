const HashUtil = require('../helpers/hash-util');
const debug = require('debug')('app:seeder');

module.exports = async function(db) {
  try {
    // create root user
    let root = await db.User.findById(1);
    if (root === null) {
      root = await db.User.create({
        id: 1,
        email: 'admin@pgweb-13.fr',
        password: HashUtil.hashPasswordSync('admin'),
        pseudo: 'john-e-commerce',
        firstName: 'john',
        lastName: 'doe',
        address: '33400, Talence',
        IBAN: 'FR7610011000201234567890188',
      });
    }

    // create lambda user
    let lambda = await db.User.findById(2);
    if (lambda === null) {
      lambda = await db.User.create({
        id: 2,
        email: 'lambda@pgweb-13.fr',
        password: HashUtil.hashPasswordSync('lambda'),
        pseudo: 'Mr.Smith',
        firstName: 'xxxx',
        lastName: 'Smith',
        address: '33160, St Medard en Jalles',
        IBAN: 'FR4256865100235489697521403',
      });
    }

    // create computer article
    let computer = await db.Article.findById(1);
    if (computer === null) {
      computer = await db.Article.create({
        id: 1,
        name: 'Computer PgWeb',
        description: 'Computer used to develop a Web Project',
        price: 210.5,
        category: 'Informatique',
        quantity: 5,
      });
      computer.setOwner(root);
      lambda.addCartArticle(computer, {through: {quantity: 2}});
    }

    // create car article
    let car = await db.Article.findById(2);
    if (car === null) {
      car = await db.Article.create({
        id: 2,
        name: 'A great car',
        description: 'Fully functionnal car, with 4 wheels',
        price: 5999.99,
        category: 'Vehicule',
        quantity: 1,
      });
      lambda.addSellArticle(car);
      root.addCartArticle(car);
    }

    // create chaubet user
    let chaubet = await db.User.findById(3);
    if (chaubet === null) {
      chaubet = await db.User.create({
        id: 3,
        email: 'mathieu.chaubet@etu.u-bordeaux.fr',
        password: HashUtil.hashPasswordSync('password'),
        pseudo: 'chaubet-messshop',
        firstName: 'mathieu',
        lastName: 'chaubet',
        address: '33400, Talence',
        IBAN: 'FR0000000000000000000000000',
      });
    }

    // create pillow article
    let pillow = await db.Article.findById(3);
    if (pillow === null) {
      pillow = await db.Article.create({
        id: 3,
        name: 'Pillow',
        description: 'Comfy pillow with real feathers',
        price: 36.20,
        category: 'Interieur',
        quantity: 3,
      });
      pillow.setOwner(chaubet);
    }

    // create gadi user
    let gadi = await db.User.findById(4);
    if (gadi === null) {
      gadi = await db.User.create({
        id: 4,
        email: 'younes.gadi@etu.u-bordeaux.fr',
        password: HashUtil.hashPasswordSync('password'),
        pseudo: 'gadi-messshop',
        firstName: 'younes',
        lastName: 'gadi',
        address: '33400, Talence',
        IBAN: 'FR0000000000000000000000000',
      });
    }

    // create hamac article
    let hamac = await db.Article.findById(4);
    if (hamac === null) {
      hamac = await db.Article.create({
        id: 4,
        name: 'Hamac',
        description: 'Large hamac for 2 people, hundred percent wool',
        price: 80.00,
        category: 'Exterieur',
        quantity: 1,
      });
      pillow.setOwner(gadi);
    }

    // create lacoste user
    let lacoste = await db.User.findById(5);
    if (lacoste === null) {
      lacoste = await db.User.create({
        id: 5,
        email: 'mathieu.lacoste@etu.u-bordeaux.fr',
        password: HashUtil.hashPasswordSync('password'),
        pseudo: 'lacoste-messshop',
        firstName: 'mathieu',
        lastName: 'lacoste',
        address: '33400, Talence',
        IBAN: 'FR0000000000000000000000000',
      });
    }

    // create zenDisk article
    let zenDisk = await db.Article.findById(5);
    if (zenDisk === null) {
      zenDisk = await db.Article.create({
        id: 5,
        name: 'Zen Disk',
        description: 'Cd with 3h of zen and soothing sounds',
        price: 15.55,
        category: 'Multimedia',
        quantity: 1,
      });
      zenDisk.setOwner(lacoste);
    }

    // create relaxBook article
    let relaxBook = await db.Article.findById(6);
    if (relaxBook === null) {
      relaxBook = await db.Article.create({
        id: 6,
        name: 'Relaxation book',
        description: '66 ways to easily relax',
        price: 6.66,
        category: 'Multimedia',
        quantity: 1,
      });
      relaxBook.setOwner(lacoste);
    }

    // create trottier user
    let trottier = await db.User.findById(6);
    if (trottier === null) {
      trottier = await db.User.create({
        id: 6,
        email: 'gael.trottier@etu.u-bordeaux.fr',
        password: HashUtil.hashPasswordSync('password'),
        pseudo: 'trottier-messshop',
        firstName: 'gael',
        lastName: 'trottier',
        address: '33400, Talence',
        IBAN: 'FR0000000000000000000000000',
      });
    }
  } catch (err) {
    debug('Error while filling the database', err);
  }
};
