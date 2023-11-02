const { db, DataTypes } = require('../config/db');
const bcrypt = require('bcrypt');

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-z]+$/i,
        msg: 'Name must contain only letters',
      },
      notNull: {
        msg: 'Please enter your name',
      },
      max: {
        args: 50,
        msg: 'Name cannot be longer than 50 characters',
      },
      min: {
        args: 2,
        msg: 'Name cannot be shorter than 2 characters',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-z]+$/i,
        msg: 'Last name must contain only letters',
      },
      notNull: {
        msg: 'Please enter your last name',
      },
      max: {
        args: 50,
        msg: 'Last name cannot be longer than 50 characters',
      },
      min: {
        args: 2,
        msg: 'Last name cannot be shorter than 2 characters',
      },
    },
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Please enter your username',
      },
      max: {
        args: 50,
        msg: 'Username cannot be longer than 50 characters',
      },
      min: {
        args: 6,
        msg: 'Username cannot be shorter than 6 characters',
      },
      // isAlphanumeric: {
      is: {
        args: /^[a-z0-9]+$/i,
        msg: 'Username must contain only alphanumeric characters',
      },
    }
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Please enter your email',
      },
      max: {
        args: 50,
        msg: 'Email cannot be longer than 50 characters',
      },
      min: {
        args: 6,
        msg: 'Email cannot be shorter than 6 characters',
      },
      isEmail: {
        msg: 'Please enter a valid email',
      },
    }
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      is: {
        args: /^[a-z0-9-_\.]+$/i,
        msg: 'Password must contain only alphanumeric characters, dashes, underscores and dots',
      },
      notNull: {
        msg: 'Please enter your password',
      },
      max: {
        args: 50,
        msg: 'Password cannot be longer than 50 characters',
      },
      min: {
        args: 6,
        msg: 'Password cannot be shorter than 6 characters',
      },
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },},
  {
    hooks: {
      async beforeCreate(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },

      async beforeUpdate(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.updatedAt = DataTypes.NOW;
      },
    },
    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  },
);

module.exports = User;





