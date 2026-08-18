/**
 * @typedef {Object} RouteDefinition
 * @property {string} key - Unique ID used as the React key and dropdown value.
 * @property {string} label - Shown in the dropdown and as the option text.
 * @property {string} path - The route's real path, with [paramName] placeholders.
 * @property {Array<{name: string, placeholder: string}>} params - List of parameters. Should be empty for no-parameter routes.
 * @property {string} accentColor - CSS custom property name for this route's brand color.
 * @property {string} imageKey - Dot-path into the JSON response where the media URL lives.
 */

/**
 * This file is the single source of truth for every route the [MemeTester](../components/MemeTester.js) component can call.
 * Each entry in {@link endpoints} fully describes one endpoint.
 *
 * MemeTester renders and calls routes off of this array, adding a route here will add it to the tester; nothing else in MemeTester needs to change.
 *
 * @type {RouteDefinition []}
 */
export const endpoints = [
    {
        key: 'giphyRandom',
        label: 'Giphy — /api/giphy/gifs/random/[tag]',
        provider: 'Giphy',
        path: '/api/giphy/gifs/random/[tag]',
        description: 'Returns a random GIF matching the given tag.',
        params: [ { name: 'tag', placeholder: 'cats' } ],
        accentColor: '--giphy',
        imageKey: 'url',
    }
];

/**
 * Fills [paramName] placeholders with real, URL-encoded values - what
 * actually gets fetched.
 */
export function buildPath(endpoint, values) {
    let path = endpoint.path;

    for (const param of endpoint.params) {
        path = path.replace(`[${param.name}]`, encodeURIComponent(values[param.name]?.trim() ?? ''));
    }

    return path;
}

/**
 * Same substitution, but unencoded and falling back to the placeholder
 * token itself when empty - what shows in the terminal title as you type.
 */
export function buildRequestLine(endpoint, values) {
    let path = endpoint.path;

    for (const param of endpoint.params) {
        const value = values[param.name]?.trim();
        path = path.replace(`[${param.name}]`, value || `[${param.name}]`);
    }

    return `GET ${path}`;
}

/**
 * Resolves a dot-path like 'images.original.url' against a response body.
 */
export function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

/**
 * True once every declared param for this endpoint has a non-empty value.
 * An endpoint with no params is always ready.
 */
export function isReady(endpoint, values) {
    return endpoint.params.every((param) => values[param.name]?.trim());
}

/**
 * Groups endpoints by provider, preserving first-seen order. Each group
 * carries the shared accentColor so /docs can color a whole section (and
 * every card + badge inside it) with one CSS custom property, rather than
 * tagging each card individually.
 */
export function groupByProvider(endpoints) {
    const groups = new Map();

    for (const endpoint of endpoints) {
        if (!groups.has(endpoint.provider)) {
            groups.set(endpoint.provider, { provider: endpoint.provider, accentColor: endpoint.accentColor, items: [] });
        }

        groups.get(endpoint.provider).items.push(endpoint);
    }

    return Array.from(groups.values());
}
