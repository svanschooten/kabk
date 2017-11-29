var imageURI = 'https://github.com/svanschooten/lltnf/raw/master/data/';
var baseURI = 'https://api.github.com/repos/svanschooten/lltnf/contents/data/';

var application = new Vue({
    el: '#application',
    data: {
        page: 'home',
        project: null,
        projects: [],
        people: []
    },
    methods: {
        navToProject: function (project) {
            this.project = project;
            this.page = 'project';
        }
    }
});

$.get(baseURI + "projects.json")
    .done(function (data) {
        application.projects = JSON.parse(atob(data.content)).map(function (project) {
            project.hover = false;
            project.image = 'url(' + imageURI + 'images/' + project.image + ')';
            project.images = project.images.map(function (image) {
                return imageURI + 'images/' + image;
            });
            project.top = (Math.floor(Math.random() * 200) - 100) + 'px';
            project.left = Math.floor(Math.random() * 80) + '%';
            return project;
        });
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message) alert(xhr.responseJSON.message);
        console.log(xhr);
        console.log(status);
        console.log(error);
    });

$.get(baseURI + "people.json")
    .done(function (data) {
        application.people = JSON.parse(atob(data.content)).map(function (person) {
            person.image = 'url(' + imageURI + 'images/' + person.image + ')';
            return person;
        });
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message) alert(xhr.responseJSON.message);
        console.log(xhr);
        console.log(status);
        console.log(error);
    });