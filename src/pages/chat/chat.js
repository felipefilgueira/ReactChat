import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import ChatMessage from '../../shared/components/chat-message';
import { userService } from '../../services/user-service'

export default class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: navigation.getParam('headerRight', null)
        }
    }


    state = {
        message: '',
        messages: [],
        canSendMessage: false,
        user: '',
    }

    logout() {
        userService.logout().then(response => {
            this.props.navigation.navigate('SigupStack');
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRight: <Button
                title={'Logout'}
                color={'red'}
                onPress={() => {
                    this.logout();
                }}
            />
        })
        userService.getUser().then(user => {
            this.setState({
                user: user
            }, () => { this.loadMessages() })
        })


    }

    loadMessages() {
        userService
            .getMessages()
            .on('value', (snapshot) => {

                var messages = [];

                snapshot.forEach(item => {

                    messages.push({
                        ...item.val(),
                        messageId: item.key
                    })
                })

                this.setState({
                    messages
                })
            })
    }

    sendMessage() {
        userService.sendMessage(this.state.message)
            .then(() => {
                this.setState({
                    message: '',
                    canSendMessage: false
                });
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    //backgroundColor: 'yellow',
                    width: '100%'
                }} >
                    <FlatList
                        ref={(flatlistref) => {
                            this.flatList = flatlistref;
                        }}
                        data={this.state.messages}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        renderItem={({ item }) => <ChatMessage fromMe={item.uid == this.state.user.uid} message={item}
                        />

                        }
                        keyExtractor={(item) => item.messageId.toString()}
                    />
                </View>

                <KeyboardAvoidingView style={{ height: 50, width: '100%' }} behavior="padding" keyboardVerticalOffset={100} >
                    <View style={{
                        height: 40,
                        width: '100%',
                        paddingLeft: 15,
                        paddingRight: 15

                    }} >

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }
                        }>

                            <View style={{
                                marginBottom: 10,
                                height: 40,
                                flexGrow: 1,

                            }}>
                                <TextInput
                                    style={{
                                        height: 40,
                                        borderColor: 'gray',
                                        borderWidth: 1,

                                    }}
                                    onChangeText={(message) => {
                                        this.setState({
                                            message,
                                            canSendMessage: message != ''
                                        })
                                    }}
                                    value={this.state.message}
                                />
                            </View>

                            <View style={{
                                marginBottom: 20,
                                height: 40,
                            }}>
                                <Button
                                    title={'Enviar'}
                                    disabled={!this.state.canSendMessage}
                                    onPress={() => {
                                        this.setState({
                                            canSendMessage: false
                                        }, () => {
                                            this.sendMessage();
                                        })
                                    }} />
                            </View>


                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
})