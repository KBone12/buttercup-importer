var path = require("path");

var ButtercupImporter = require("../../dist/buttercup-importer.js"),
    Buttercup = require("buttercup"),
    Archive = Buttercup.Archive,
    Group = Buttercup.Group,
    encodingTools = Buttercup.tools.encoding;

module.exports = {
    kdbx3: {
        setUp: function(cb) {
            this.exampleArchive = path.resolve(
                __dirname,
                "../resources/test-archive-kdbx3.kdbx"
            );
            this.examplePassword = "passw0rd";

            this.exampleArchiveKeyfile = path.resolve(
                __dirname,
                "../resources/test-archive-keyfile-kdbx3.kdbx"
            );
            this.examplePasswordKeyfile = "passw0rd";
            this.exampleKeyfile = path.resolve(
                __dirname,
                "../resources/test-archive-keyfile-kdbx3.key"
            );
            cb();
        },

        export: {
            createsArchive: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword
                ).then(function(archive) {
                    test.ok(
                        archive instanceof Archive,
                        "Archive should be a Buttercup archive instance"
                    );
                    test.done();
                });
            },

            createsArchiveKeyFile: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchiveKeyfile,
                    this.examplePasswordKeyfile,
                    this.exampleKeyfile
                ).then(function(archive) {
                    test.ok(
                        archive instanceof Archive,
                        "Archive should be a Buttercup archive instance"
                    );
                    test.done();
                });
            },

            containsGroups: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword
                ).then(function(archive) {
                    var rootGroup = archive.getGroups()[0];
                    test.strictEqual(
                        rootGroup.getTitle(),
                        "Testing",
                        "Root group should be called 'Testing'"
                    );
                    var children = rootGroup.getGroups(),
                        generalGroup;
                    children.forEach(function(child) {
                        if (child.getTitle() === "General") {
                            generalGroup = child;
                        }
                    });
                    test.ok(
                        generalGroup instanceof Group,
                        "Archive should contain General group"
                    );
                    test.done();
                });
            },

            containsEntry: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword
                )
                    .then(function(archive) {
                        var children = archive.getGroups()[0].getGroups(),
                            generalGroup;
                        children.forEach(function(child) {
                            if (child.getTitle() === "General") {
                                generalGroup = child;
                            }
                        });
                        var sampleEntry = generalGroup.findEntriesByProperty(
                            "title",
                            /^Test-entry$/
                        )[0];
                        test.strictEqual(
                            sampleEntry.getProperty("title"),
                            "Test-entry",
                            "Title should be correct"
                        );
                        test.strictEqual(
                            sampleEntry.getProperty("username"),
                            "buttercup",
                            "Username should be correct"
                        );
                        test.strictEqual(
                            sampleEntry.getProperty("password"),
                            "westley",
                            "Password should be correct"
                        );
                        test.done();
                    })
                    .catch(function(err) {
                        console.error("Failed: " + err.message);
                    });
            },

            throwsForIncorrectPassword: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    "wrong password"
                ).then(
                    function() {
                        throw new Error(
                            "Should not be here: error should have thrown"
                        );
                    },
                    function(err) {
                        test.strictEqual(
                            err.name,
                            "KdbxError",
                            "Error name should match"
                        );
                        test.strictEqual(
                            err.code,
                            "InvalidKey",
                            "Error code should match"
                        );
                        test.done();
                    }
                );
            },

            throwsForIncorrectKeyfile: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword,
                    this.exampleKeyfile
                ).then(
                    function() {
                        throw new Error(
                            "Should not be here: error should have thrown"
                        );
                    },
                    function(err) {
                        test.strictEqual(
                            err.name,
                            "KdbxError",
                            "Error name should match"
                        );
                        test.strictEqual(
                            err.code,
                            "InvalidKey",
                            "Error code should match"
                        );
                        test.done();
                    }
                );
            }
        }
    },

    kdbx4: {
        setUp: function(cb) {
            this.exampleArchive = path.resolve(
                __dirname,
                "../resources/test-archive-kdbx4.kdbx"
            );
            this.examplePassword = "passw0rd";

            this.exampleArchiveKeyfile = path.resolve(
                __dirname,
                "../resources/test-archive-keyfile-kdbx4.kdbx"
            );
            this.examplePasswordKeyfile = "passw0rd";
            this.exampleKeyfile = path.resolve(
                __dirname,
                "../resources/test-archive-keyfile-kdbx4.key"
            );
            cb();
        },

        export: {
            createsArchive: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword
                )
                    .then(function(archive) {
                        test.ok(
                            archive instanceof Archive,
                            "Archive should be a Buttercup archive instance"
                        );
                        test.done();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },

            createsArchiveKeyFile: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchiveKeyfile,
                    this.examplePasswordKeyfile,
                    this.exampleKeyfile
                ).then(function(archive) {
                    test.ok(
                        archive instanceof Archive,
                        "Archive should be a Buttercup archive instance"
                    );
                    test.done();
                });
            },

            containsGroups: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword
                ).then(function(archive) {
                    var rootGroup = archive.getGroups()[0];
                    test.strictEqual(
                        rootGroup.getTitle(),
                        "Testing",
                        "Root group should be called 'Testing'"
                    );
                    var children = rootGroup.getGroups(),
                        generalGroup;
                    children.forEach(function(child) {
                        if (child.getTitle() === "General") {
                            generalGroup = child;
                        }
                    });
                    test.ok(
                        generalGroup instanceof Group,
                        "Archive should contain General group"
                    );
                    test.done();
                });
            },

            containsEntry: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword
                )
                    .then(function(archive) {
                        var children = archive.getGroups()[0].getGroups(),
                            generalGroup;
                        children.forEach(function(child) {
                            if (child.getTitle() === "General") {
                                generalGroup = child;
                            }
                        });
                        var sampleEntry = generalGroup.findEntriesByProperty(
                            "title",
                            /^Test-entry$/
                        )[0];
                        test.strictEqual(
                            sampleEntry.getProperty("title"),
                            "Test-entry",
                            "Title should be correct"
                        );
                        test.strictEqual(
                            sampleEntry.getProperty("username"),
                            "buttercup",
                            "Username should be correct"
                        );
                        test.strictEqual(
                            sampleEntry.getProperty("password"),
                            "westley",
                            "Password should be correct"
                        );
                        test.done();
                    })
                    .catch(function(err) {
                        console.error("Failed: " + err.message);
                    });
            },

            throwsForIncorrectPassword: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    "wrong password"
                ).then(
                    function() {
                        throw new Error(
                            "Should not be here: error should have thrown"
                        );
                    },
                    function(err) {
                        test.strictEqual(
                            err.name,
                            "KdbxError",
                            "Error name should match"
                        );
                        test.strictEqual(
                            err.code,
                            "InvalidKey",
                            "Error code should match"
                        );
                        test.done();
                    }
                );
            },

            throwsForIncorrectKeyfile: function(test) {
                ButtercupImporter.importFromKDBX(
                    this.exampleArchive,
                    this.examplePassword,
                    this.exampleKeyfile
                ).then(
                    function() {
                        throw new Error(
                            "Should not be here: error should have thrown"
                        );
                    },
                    function(err) {
                        test.strictEqual(
                            err.name,
                            "KdbxError",
                            "Error name should match"
                        );
                        test.strictEqual(
                            err.code,
                            "InvalidKey",
                            "Error code should match"
                        );
                        test.done();
                    }
                );
            }
        }
    }
};
