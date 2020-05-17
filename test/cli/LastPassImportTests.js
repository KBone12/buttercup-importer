const path = require("path");

const { importFromLastPass } = require("../../dist/buttercup-importer.js");
const { Archive } = require("buttercup");

const lpcsvPath = path.resolve(__dirname, "../resources/lastpass.csv");

module.exports = {
    export: {
        createsArchive: test => {
            importFromLastPass(lpcsvPath).then(archive => {
                test.ok(
                    archive instanceof Archive,
                    "Archive should be a Buttercup archive instance"
                );
                test.done();
            });
        },
        containsGroups: test => {
            importFromLastPass(lpcsvPath).then(archive => {
                const groups = archive.toObject().groups.map(g => g.title);
                test.ok(groups.length === 2, "There should be two groups");
                test.ok(
                    groups.includes("General"),
                    "General Group should exist"
                );
                test.ok(groups.includes("FooBar"), "FooBar Group should exist");
                test.done();
            });
        },
        containsEntries: test => {
            importFromLastPass(lpcsvPath).then(archive => {
                const entries = archive
                    .toObject()
                    .groups.map(g => g.entries)
                    .reduce((a, b) => a.concat(b));
                test.ok(entries.length === 4, "There should be four entries");
                test.ok(
                    entries[0].properties.URL === "https://foo.com",
                    "meta.URL is set correctly"
                );
                test.ok(
                    entries[0].properties.Notes === "This is extra data",
                    "meta.Notes is set correctly"
                );
                test.ok(
                    entries[0].properties.password === "thisisasecret",
                    "properties.password is set correctly"
                );
                test.ok(
                    entries[0].properties.title === "foo.com",
                    "properties.title is set correctly"
                );
                test.ok(
                    entries[0].properties.username === "user@foo.com",
                    "properties.username is set correctly"
                );
                test.done();
            });
        },
        doesntImportEmptyNotes: test => {
            importFromLastPass(lpcsvPath).then(archive => {
                const entries = archive
                    .toObject()
                    .groups.map(g => g.entries)
                    .reduce((a, b) => a.concat(b));
                test.ok(entries[1].properties.Notes === undefined);
                test.ok(entries[2].properties.Notes === undefined);
                test.done();
            });
        },
        importsMultiLineNotes: test => {
            importFromLastPass(lpcsvPath).then(archive => {
                const entries = archive
                    .toObject()
                    .groups.map(g => g.entries)
                    .reduce((a, b) => a.concat(b));
                test.ok(
                    entries[3].properties.Notes ===
                        "This is a\nmultiline string"
                );
                test.done();
            });
        }
    }
};
