const Heading = `
    <h2 class="text-xl mb-4">
    {{#if search}}
        Songs Matching: <span class="text-lg">{{title}}</span>
    {{else}}
        Playlist
    {{/if}}
    </h2>
`;

export default Heading;
