import '../../ui/client/components/home/home.js';

// Application router
Router.configure({
  notFoundTemplate: 'not_found'
});

Router.map(function() {
  this.route('home', {
    path: '/'
  });
});
