import React, { Component } from 'react';
import AuthService from './AuthService';

import {message} from 'antd'

export default function VerificarAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null,
                getToken:null
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/')
                message.warning('Su Session Acabado. Inice Nuevamente');
            }
            else {
                try {
                    const profile = Auth.getProfile()
                    const token=Auth.getToken()
                    this.setState({
                        user: profile,
                        getToken:token
                    })
                }
                catch(err){
                    Auth.logout()
                    message.warning('Su Session Acabado. Inice Nuevamente');
                    this.props.history.replace('/')
                }
            }
        }

        render() {
            if (this.state.user || this.state.getToken) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} getToken={this.state.getToken} />
                )
            }
            else {
                return null
            }
        }
    };
}