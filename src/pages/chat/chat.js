import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import ChatMessage from '../../shared/components/chat-message';
import { userService } from '../../services/user-service'

export default class Chat extends React.Component {
    state = {
        message: '',
        messages: [],
        canSendMessage: false
    }

    componentDidMount() {
        userService
            .getMessages()
            .on('value', (snapshot) => {

                // var messagesObject = snapshot.val();
                var messages = [];

                snapshot.forEach(item => {
                    console.log(item.key);
                    console.log(item.val())

                    messages.push({
                        ...item.val(),
                        uid: item.key
                    })

                })

                this.setState({
                    messages
                })

                // var messagesObject = snapshot.val();
                // var messages = [];

                // for( var uid in messagesObject) {
                //     messages.push({
                //         ...messagesObject[uid],
                //         id: uid
                //     });
                // }
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
                        renderItem={({ item }) =>  <ChatMessage message={item}
                            />
                            
                        }
                        keyExtractor={(item) => item.uid.toString()}
                    />
                </View>

                <KeyboardAvoidingView  style={{ height: 50, width: '100%' }} behavior="padding" keyboardVerticalOffset={100} >
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