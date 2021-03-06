import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { userService } from '../../services/user-service'
import Loading from '../../shared/components/loading'

export default class signUp extends React.Component {
    static navigationOptions = (navigation) => {
        return {
            title: 'Sign Up',
            
        }
    }

    state = {
        email: '',
        password: '',
        name: '',
        nickname: '',
        error: null,
        loading: false
    }

    signUp() {
        const userModel = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            nickname: this.state.nickname
        }
        userService.signUp(userModel).then(credential => {
            this.showHideLoading(false)
            this.limpar()
        }).catch(errorMessage => {
            this.showHideLoading(false)
            this.setState({
                error: errorMessage
            })
        });
    }

    showHideLoading(visible = true) {
        this.setState({
            loading: visible
        })
    }

    limpar() {
        this.setState({
            email: '',
            password: '',
            name: '',
            nickname: ''
        })
    }

    render() {
        return (
            <Loading loading={this.state.loading}>

                <View style={styles.logoContainer}>
                    <View style={styles.logo}></View>
                </View>
                <View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(email) => {
                            this.setState({ email })
                        }}
                        value={this.state.email}
                        autoCapitalize={'none'}
                        placeholder={'Email'}
                    />
                    <TextInput />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(password) => {
                            this.setState({ password })
                        }}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={'Password'}
                    />
                    <TextInput />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(name) => {
                            this.setState({ name })
                        }}
                        value={this.state.name}
                        autoCapitalize={'none'}
                        placeholder={'Name'}
                    />
                    <TextInput />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(nickname) => {
                            this.setState({ nickname })
                        }}
                        value={this.state.nickname}
                        autoCapitalize={'none'}
                        placeholder={'Nickname'}
                    />
                    <TextInput />


                    {
                        this.state.error ? <View>
                            <Text
                                style={{
                                    color: 'red',
                                    textAlign: 'center'
                                }}> {this.state.error} </Text>
                        </View> : null
                    }

                    <Button
                        title={'Sign Up'}
                        onPress={() =>
                            this.setState({
                                error: null ,
                                loading: true
                            }, () => this.signUp())
                        }
                    />
                </View>
            </Loading>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {

    },
    logo: {
        width: 100,
        height: 100,
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 500,
        marginBottom: 30
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 250,
        paddingLeft: 10
    }

});
