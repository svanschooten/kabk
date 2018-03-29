var baseURI = 'https://raw.githubusercontent.com/svanschooten/lltnf/master/data/';
// var baseURI = 'http://127.0.0.1:8080/data/';

var application = new Vue({
    el: '#application',
    data: {
        page: 'home',
        merchandise: [],
        people: [],
        home: {
            video: "",
            text: ""
        },
        error: {
            home: "",
            people: "",
            merchandise: ""
        }
    }
});

$.get(baseURI + "people.json")
    .done(function (data) {
        application.error.people = "";
        try {
            data = JSON.parse(data);
        } catch (_) {}
        application.people = data.map(function (person) {
            person.image = baseURI + 'images/' + person.image;
            return person;
        });
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message !== application.error.people) {
            application.error.people = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });

$.get(baseURI + "merchandise.json")
    .done(function (data) {
        application.error.merchandise = "";
        try {
            data = JSON.parse(data);
        } catch (_) {}
        application.merchandise = data.map(function (merch) {
            merch.image = baseURI + 'images/' + merch.image;
            return merch;
        });
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message !== application.error.merchandise) {
            application.error.merchandise = xhr.responseJSON.message;
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
        } catch (_) {}
        application.home = data;
    })
    .fail(function (xhr, status, error) {
        if (xhr.responseJSON && xhr.responseJSON.message && xhr.responseJSON.message !== application.error.home) {
            application.error.home = xhr.responseJSON.message;
        }
        console.log(xhr);
        console.log(status);
        console.log(error);
    });