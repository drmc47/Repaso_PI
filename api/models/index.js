var {Sequelize, DataTypes} = require('sequelize');
//const S = Sequelize;
var db = new Sequelize('postgres://drmc47:@localhost:5432/henryblog', {
  logging: false,
});

const Page = db.define('page', {
  // Tu código acá:
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  urlTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM,
    values: ['open', 'closed']
  },
  route: {
    type: DataTypes.VIRTUAL,
    get: function()  {
      return `/pages/${this.urlTitle}`
    }
  }
});

// .addHook() method
Page.beforeValidate(page => {
  page.urlTitle = page.title && page.title.replace(/\s+/g, '_').replace(/\W/g, '')
})

const User = db.define('users', {
name: {
  type: DataTypes.STRING,
  allowNull: false
},
email: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
}
});

const Category = db.define('category', {
  // Tu código acá:
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }

});

// Vincular User con Page
// Tu código acá:
//VER RELACIONES SEQUELIZE
//Un usuario puede tener muchas pags, pero cada pag pertenece a un unico user
//Relacion uno a muchos
User.hasMany(Page);
Page.belongsTo(User);

//Una page puede tener muchas categorias, y una categoria tiene muchas page
//Relacion muchos a muchos
//Hay que establecer una tabla intermedia, en este caso la llamo 'category_page'
Page.belongsToMany(Category, {through: 'category_page'})
Category.belongsToMany(Page, {through: 'category_page'})




module.exports = {
  User,
  Page,
  Category,
  db
}
