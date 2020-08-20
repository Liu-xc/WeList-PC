const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/welist')


const User = sequelize.define("user", {
  uname: {
    primaryKey: true,
    type: DataTypes.STRING(15)
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

const UserPass = sequelize.define("userpass", {
  userUname: {
    primaryKey: true,
    type: DataTypes.STRING(15),
    references: {
      model: User,
      key: 'uname'
    }
  },
  pass: {
    type: DataTypes.TEXT
  }
})

const Todo = sequelize.define("todo", {
  todoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userUname: {
    type: DataTypes.STRING(15),
    references: {
      model: User,
      key: 'uname'
    }
  },
  title: {
    type: DataTypes.TEXT
  },
  desc: {
    type: DataTypes.TEXT
  },
  stime: {
    type: DataTypes.TEXT
  },
  ddl: {
    type: DataTypes.TEXT
  },
  importance: {
    type: DataTypes.INTEGER
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
  content: {
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
  content: {
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
  uname: {
    type: DataTypes.STRING(15),
    references: {
      model: User,
      key: 'uname'
    }
  }
})

User.hasOne(UserPass)
UserPass.belongsTo(User)

User.hasMany(Todo)
Todo.belongsTo(User)

User.hasMany(Dailylog)
Dailylog.belongsTo(User)

User.hasMany(Share)
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
