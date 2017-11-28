var application = new Vue({
    el: '#application',
    data: {
        page: 'home',
        project: null,
        projects: []
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