const sections = require.context('../sections', true);

export function Section({name}) {
    return sections('./' + name).default();
}