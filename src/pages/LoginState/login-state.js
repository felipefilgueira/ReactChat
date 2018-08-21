import React from 'react';
import { userService } from '../../services/user-service'
import Loading from '../../shared/components/loading';

export default class LoginState extends React.Component {
    static nagigationOptions = {
        header: null
    }
    render() {
        userService.getUser().then(user => {
            if (user) {
                this.props.navigation.navigate('ChatStack');
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        })
        return (
            <Loading
                loading={true}
            />
        )
    }

}