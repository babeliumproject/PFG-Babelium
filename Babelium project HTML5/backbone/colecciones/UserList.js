var UserList = Backbone.Collection.extend({
    model: User,
    url: 'json/users.json'
});
