'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    animeId: DataTypes.INTEGER,
    mangaId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    models.comment.belongsTo(models.anime)
    models.comment.belongsTo(models.manga)
    // associations can be defined here
  };
  return comment;
};