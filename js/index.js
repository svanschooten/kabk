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

$.get("https://raw.githubusercontent.com/svanschooten/lltnf/master/data/projects.json")
    .done(function (data) {
        application.projects = JSON.parse(data).map(function (project) {
            project.hover = false;
            return project;
        });
    });

$.get("https://raw.githubusercontent.com/svanschooten/lltnf/master/data/people.json")
    .done(function (data) {
        application.people = JSON.parse(data).map(function (people) {
            return people;
        });
    });