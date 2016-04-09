export default function fetchComponentData(dispatch, components, params) {
    const needs = components.reduce( (prev, current) => {
        return (current.needs || [])
            .concat((current.WrappedComponent && !current.needs ? current.WrappedComponent.needs : []) || [])
            .concat(prev);
    }, []);

    const promises = needs.map(need => {
        return dispatch(need(params))
    });

    return Promise.all(promises);
}