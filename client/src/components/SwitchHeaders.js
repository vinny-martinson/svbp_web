import React, { Component } from 'react';
import Header1 from '../components/Header';
import Header2 from '../components/Header2';
import { UserContext } from '../Context/UserContext';

class SwitchHeaders extends Component {
    static contextType = UserContext;

    state = {
        currentUser: {},
    }

    componentDidMount() {
        const context = this.context;
        // context.currUser.loggedIn =true;
        // context.currUser.is_premium =true;
        if (!localStorage.jwtToken) {
            context.currUser.loggedIn = false;
            this.setState({ currentUser: context.currUser });
            console.log(context);
        } else {
            context.currUser.loggedIn = true;
            this.setState({ currentUser: context.currUser });
            console.log(context);
        }
    }


    render() {
        const { currentUser } = this.state;
        return (currentUser.loggedIn ? (
            <div>
                <Header2/>
            </div>
        ) : (
                <div>
                    <Header1 />
                </div>
            ))
    }

}


export default SwitchHeaders;