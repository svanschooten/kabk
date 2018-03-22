// var baseURI = 'https://raw.githubusercontent.com/svanschooten/lltnf/master/data/';
var baseURI = 'http://127.0.0.1:8080/data/';

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'imageFadeDuration': 300,
    'fadeDuration': 300
});

var application = new Vue({
    el: '#application',
    data: {
        page: 'home',
        project: null,
        projects: [],
        people: [],
        home: {
            video: "",
            text: ""
        },
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
            application.projects = data.map(function (project) {
                project.hover = false;
                project.image = 'url(' + baseURI + 'images/' + project.image + ')';
                project.images = project.images.map(function (image) {
                    return baseURI + 'images/' + image;
                }).shuffle();
                project.top = (Math.floor(Math.random() * 200) - 100) + 'px';
                project.left = Math.floor(Math.random() * 80) + '%';
                return project;
            }).shuffle();
        } catch (_) {}
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
            application.people = data.map(function (person) {
                person.image = 'url(' + baseURI + 'images/' + person.image + ')';
                return person;
            });
        } catch (_) {}
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message != application.error.projects) {
            application.error.people = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });


$.get(baseURI + "home.json")
    .done(function (data) {
        application.error.home = "";
        try {
            data = JSON.parse(data);
            data.video = baseURI + "data/" + data.video;
            application.home = data;
        } catch (_) {}
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message != application.error.projects) {
            application.error.home = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });