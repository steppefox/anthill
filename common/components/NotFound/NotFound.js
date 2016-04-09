import React from 'react';
import B from 'bem-cn';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const b = B('NotFound');

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className={b}>

            </div>
        );
    }
}
