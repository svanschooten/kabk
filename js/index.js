// var baseURI = 'https://raw.githubusercontent.com/svanschooten/lltnf/master/data/';
var baseURI = 'http://127.0.0.1:8080/data/';

var application = new Vue({
    el: '#application',
    data: {
        page: 'home',
        project: null,
        projects: [],
        people: [],
        error: {
            projects: "",
            people: ""
        }
    },
    methods: {
        navToProject: function (project) {
            this.project = project;
            this.page = 'project';
        }
    }
});

$.get(baseURI + 'projects.json')
    .done(function (data) {
        application.error.projects = "";
        try {
            data = JSON.parse(data);
        } catch (_) {}
        application.projects = data.map(function (project) {
            project.hover = false;
            project.image = 'url(' + baseURI + 'images/' + project.image + ')';
            project.images = project.images.map(function (image) {
                return baseURI + 'images/' + image;
            });
            project.top = (Math.floor(Math.random() * 200) - 100) + 'px';
            project.left = Math.floor(Math.random() * 80) + '%';
            return project;
        });
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message != application.error.people) {
            application.error.projects = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });

$.get(baseURI + "people.json")
    .done(function (data) {
        application.error.people = "";
        try {
            data = JSON.parse(data);
        } catch (_) {}
        application.people = data.map(function (person) {
            person.image = 'url(' + baseURI + 'images/' + person.image + ')';
            return person;
        });
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message != application.error.projects) {
            application.error.people = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });