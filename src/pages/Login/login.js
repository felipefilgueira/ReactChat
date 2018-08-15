import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { userService } from '../../services/user-service'
import Loading from '../../shared/components/loading'

export default class LogIn extends React.Component {
    static navigationOptions = (navigation) => {
        return {
            title: 'Sign Up',
            header: null
        }
    }

    state = {
        email: '',
        password: '',
        error: null,
        loading: false
    }

    signUp() {
        const userModel = {
            email: this.state.email,
            password: this.state.password,
        }
        // userService.signUp(userModel).then(credential => {
        //     this.showHideLoading(false)
        //     this.limpar()
        // }).catch(errorMessage => {
        //     this.showHideLoading(false)
        //     this.setState({
        //         error: errorMessage
        //     })
        // });
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
                        title={'Login'}
                        onPress={() =>
                            this.setState({
                                error: null,
                                loading: true
                            }, () => this.signUp())
                        }
                    />

                    <Button
                        title={'Cadastrar'}
                        onPress={() =>
                            this.props.navigation.navigate('SignUpScreen')
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
