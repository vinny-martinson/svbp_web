import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/';
import { AppBar } from '@material-ui/core/';
import { Toolbar } from '@material-ui/core/';
import { Typography } from '@material-ui/core/';
import { Menu } from '@material-ui/core/';
import { MenuItem } from '@material-ui/core/';
import { IconButton } from '@material-ui/core/';
import { InputBase } from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../assets/meedien.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import LeftMenu from './LeftMenu';
import { Link } from 'react-router-dom';

//logged in
const styles = {
    root: {
        flexGrow: 1,
        width: "100%"
    },
    title: {
        flexGrow: 1,
    },
    inputInput: {
        background: "#FFFFFF",
        borderColor: "#BDBDBD",
        borderWidth: '1px',
        border: "solid",
        borderRadius: "6px",
    },
    inputRoot: {
        flexGrow: 1,
        marginLeft: "1em"
    },
    bar: {
        background: '#3E61FF',
        width: "100%"
    },
    button: {
        background: "#FF7D63",
        borderColor: "#FFFFFF",
        borderWidth: '1px',
        border: "solid",
        borderRadius: "20px",
        marginLeft: "1em",
        color: "#FFFFFF"
    },
    menuButton: {
        color: '#fff',
        fontSize: '18px',
        marginRight: '-15px',
        textTransform: 'none'
    }
};

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = state => ({
    user: state.authReducer.user
});

class Header2 extends Component {

    state = {
        anchorEl: null
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        let { classes, logoutUser, user } = this.props;
        user = {"user_info": 1}
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        <LeftMenu user={user} />
                        <img src={Logo} height="50" />
                        <Typography variant="h6" className={classes.title}>
                        </Typography>

                        <div>
                            <Button
                                aria-owns={anchorEl ? 'right-menu' : null}
                                aria-haspopup="true"
                                className={classes.menuButton}
                                onClick={this.handleClick}
                            >
                                {user.username}
                            </Button>
                            <Menu
                                id="right-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <Link className={classes.link} to={`/profile/${user.user_info.id}`}>
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                </Link>
                                <Link className={classes.link} to="/discover">
                                    <MenuItem onClick={this.handleClose}>Discover</MenuItem>
                                </Link>
                                <MenuItem onClick={logoutUser}>Logout</MenuItem>
                            </Menu>
                        </div>                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header2.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header2));
