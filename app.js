var port = process.env.PORT || 5000;

var docpadInstanceConfiguration = {
    templateData: {
        site: {
            title: "Сайт и блог программиста",
            url: "http://blog.programmer-site.tk"
        }
      },
      getTitle: function() {
          if (this.document.title) {
              return "" + this.document.title + " [" + this.site.title + "]";
          } else {
              return this.site.title;
          }
      },
      getDescription: function() {
          if (this.document.description) {
            return this.document.description;
          }
          return "Пример сайта и блога программиста";
      },
      collections: {
          posts: function(database) {
              return database.findAll({
                relativeOutDirPath: 'posts'
              }, [{
                date: -1
              }]);
          }
      },
      port: port
};

var docpadInstance = require('docpad').createInstance(docpadInstanceConfiguration, function(err) {
    if (err) {
        return console.log(err, err.stack);
    }
    return docpadInstance.action('generate server', function(err) {
        if (err) {
          return console.log(err, err.stack);
        }
        return console.log("Running on @:" + port);
    });
});
