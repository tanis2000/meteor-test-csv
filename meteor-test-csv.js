if (Meteor.isClient) {

    function cvs2Array(fileUrl, callback) {
        console.log("calling cvs2Array");
        var fileUrl = "test.csv";
        Meteor.call('csv2Array', fileUrl, callback);
    }

    cvs2Array("test.csv", function (error, result) {
        if (error) {
            console.log("error:" + error)
        } else {
            console.log(result)
        }
    });


    Template.hello.greeting = function () {
        return "Welcome to meteor-test-csv.";
    };

    Template.hello.events({
        'click input': function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined') {
                console.log("You pressed the button");
            }
        }});
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.methods({
        'csv2Array': function cvs2Array(fileUrl, callback) {
            var csv = Meteor.require('csv');
            var arr = Async.runSync(function (done) {
                console.log(done);
                csv().from.string('#Welcome\n"1","2","3","4"\n"a","b","c","d"',
                    {comment: '#'} ).to.array(function (data) {
                    console.log("data following");
                    console.log(data);
                    done(null, data);
                });
            });

            return arr.result;
        }
    });

    /*
    var csv = Meteor.require('csv');
    console.log(csv);
    csv().from.string('#Welcome\n"1","2","3","4"\n"a","b","c","d"',
        {comment: '#'} ).to.array(function (data) {
            console.log("data following");
            console.log(data);
            done(null, data);
        });
    */
}
