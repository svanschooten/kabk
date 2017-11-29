var baseURI = 'https://github.com/svanschooten/lltnf/raw/master/data/';

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
        application.projects = JSON.parse(data).map(function (project) {
            project.hover = false;
            project.image = 'url(' + baseURI + 'images/' + project.image + ')';
            project.images = project.images.map(function (image) {
                return baseURI + 'images/' + image;
            });
            project.top = (Math.floor(Math.random() * 200) - 100) + 'px';
            project.left = Math.floor(Math.random() * 80) + '%';
            return project;
        });
    });

$.get(baseURI + "people.json")
    .done(function (data) {
        application.people = JSON.parse(data).map(function (person) {
            person.image = baseURI + 'images/' + person.image;
            return person;
        });
    });