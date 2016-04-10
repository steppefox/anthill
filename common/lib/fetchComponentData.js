export default function fetchComponentData(dispatch, components, params) {
    const needs = components.reduce( (prev, current) => {
        let componentNeeds = [];
        if (current.needs && typeof current.needs === 'function') {
            componentNeeds = current.needs();
        }
        return componentNeeds
            .concat((current.WrappedComponent && !current.needs ? current.WrappedComponent.needs : []) || [])
            .concat(prev);
    }, []);

    const promises = needs.map(need => {
        return dispatch(need(params));
    });

    return Promise.all(promises);
}