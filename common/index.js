import React from 'react';

export default class AppView extends React.Component {
    render() {
        return (
              <div id="app-view">
                    <header></header>
                    {this.props.children}
                    <footer></footer>
              </div>
        );
    }
}

AppView.propTypes = {
    children: React.PropTypes.node
};
