import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Makes it possible to use Material-UI Style as separate component
export default function styled(Component) {
    return (style, options) => {
        function StyledComponent(props) {
            const { classes, className, ...other } = props;
            return <Component className={classNames(classes.root, className)} {...other} />;
        }
        StyledComponent.propTypes = {
            classes: PropTypes.object.isRequired,
            className: PropTypes.string,
        };
        const styles =
            typeof style === 'function' ? theme => ({ root: style(theme) }) : { root: style };
        return withStyles(styles, options)(StyledComponent);
    };
}