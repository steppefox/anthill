import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import B                        from 'bem-cn';
import Helmet                   from "react-helmet";
import PureRenderMixin          from 'react-addons-pure-render-mixin';

import { getCourses }           from '../../actions/courses';

const b = B('Home');

class Home extends Component {

    static needs = [
        getCourses
    ];

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getCourses());
    }

    render() {
        const { courses=[] } = this.props;

        return (
            <div className={b}>
                { courses.map((course, index) => {
                    return <div key={index}>{course.name}</div>
                })}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        courses: state.courses
    })
    //,(dispatch, ownProps) => ({
    //    getCourses: bindActionCreators(getCourses, dispatch)
    //})
)(Home);
