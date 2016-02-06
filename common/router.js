
Router.configure({
  notFoundTemplate: 'not_found'
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });
});
