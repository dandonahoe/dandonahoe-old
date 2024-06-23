export default {
    repositoryUrl: "https://github.com/dandonahoe/dandonahoe.github.io",
    branches: [
        { name: "1.x", range: "1.x", channel: "1.x" },
        { name: "2.x", range: "2.x", channel: "2.x" },
        { name: "master" },
        { name: "next", channel: "next" },
        { name: "dev", prerelease: true }, // Increment minor version for 'dev'
        { name: "main" } // Increment minor version for 'main'
    ],
    plugins: [
        ["@semantic-release/commit-analyzer", {
            preset: 'angular',
            releaseRules: [
                { type: "feat", scope: "dev",  release: "minor" },
                { type: "feat", scope: "main", release: "minor" },
                { type: "fix",  scope: "dev",  release: "patch" },
                { type: "fix",  scope: "main", release: "patch" },
                // Prevent major version bump
                { type: "break", release: false }
            ]
        }],
        ["@semantic-release/release-notes-generator", {
            preset: 'angular',
            writerOpts: {
                commitsSort: ['subject', 'scope']
            }
        }],

        ["@semantic-release/changelog", {
            changelogFile: "CHANGELOG.md"
        }],

        ["@semantic-release/npm", {
            npmPublish: false
        }],

        ["@semantic-release/github", {
            assets: [
                { path: "_posts/**/*", label: "Posts" },
            ]
        }]
    ]
};
