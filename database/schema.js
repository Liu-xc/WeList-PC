const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/welist')

const UserPass = sequelize.define("userpass", {
  pass: {
    type: DataTypes.TEXT
  }
})

const User = sequelize.define("user", {
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  motto: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT
  },
  birthday: {
    type: DataTypes.INTEGER
  },
  sex: {
    type: DataTypes.INTEGER
  }
})

const Todo = sequelize.define("todo", {
  todoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT
  },
  desc: {
    type: DataTypes.TEXT
  },
  duration: {
    type: DataTypes.DATE
  },
  importance: {
    type: DataTypes.INTEGER
  },
  ctime: {
    type: DataTypes.TEXT
  },
  uid: {
    type: DataTypes.TEXT
  }  
})

const Dailylog = sequelize.define("dailylog", {
  logid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT
  },
  desc: {
    type: DataTypes.TEXT
  },
  ctime: {
    type: DataTypes.DATE
  },
  lastmodified: {
    type: DataTypes.DATE
  },
  uid: {
    type: DataTypes.TEXT
  }  
})

const Share = sequelize.define("share", {
  shareid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT
  },
  desc: {
    type: DataTypes.TEXT
  },
  ctime: {
    type: DataTypes.DATE
  },
  lastmodified: {
    type: DataTypes.DATE
  },
  uid: {
    type: DataTypes.TEXT
  }
})

const LikeShare = sequelize.define("likeshare", {
  shareid: {
    type: DataTypes.INTEGER,
    references: {
      model: Share,
      key: 'shareid'
    }
  },
  uid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'uid'
    }
  }
})

User.hasOne(UserPass)
UserPass.belongsTo(User)

User.hasMany(Todo, {
  foreignKey: 'uid'
})
Todo.belongsTo(User)

User.hasMany(Dailylog, {
  foreignKey: 'uid'
})
Dailylog.belongsTo(User)

User.hasMany(Share, {
  foreignKey: 'uid'
})
Share.belongsTo(User)

User.belongsToMany(Share, { through: 'LikeShare' })
Share.belongsToMany(User, { through: 'LikeShare' })

module.exports = {
  User,
  Todo,
  Dailylog,
  Share,
  UserPass,
  LikeShare
}
