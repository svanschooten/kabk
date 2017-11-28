var app = new Vue({
    el: '#application',
    data: {
        page: 'home',
        project: null,
        message: 'You loaded this page on ' + new Date().toLocaleString()
    },
    methods: {
        navToHome: function () {
            this.page = 'home';
        },
        navToPeople: function () {
            this.page = 'people';
        },
        navToProject: function (project) {
            return function () {
                this.project = project;
                this.page = 'project';
            }
        }
    }
});