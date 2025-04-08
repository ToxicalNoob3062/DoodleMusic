const Heading = `
    <h2 class="text-xl mb-4">
    {{#if search}}
        Songs Matching: <span class="text-lg">{{title}}</span>
    {{else}}
        Playlist <span class="text-xs text-red-200">({{user}})</span>
    {{/if}}
    </h2>
`;

export default Heading;
