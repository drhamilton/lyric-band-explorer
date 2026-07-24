// User-facing UI strings, centralized so copy isn't scattered through JSX.
// (Band descriptions and the welcome-panel body live with their data/component;
// this is for the small transient-state strings.)
export const COPY = {
  loading: 'Loading bands…',
  emptyFiltered: 'No bands match your search and filter.',
  emptyCatalog: 'No bands available.',
} as const
