import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

export default class ChatMessage extends React.Component {
    render() {
        var messageFromMe = this.props.teste.fromMe;
        return (
            <View style={[
                styles.messageContainer,
                messageFromMe ? styles.messageContainerFromMe : null
            ]}>
                {/* Image */}
                <View style={styles.chatImage}>
                </View>
                <View style={[
                    styles.chatMessage,
                    messageFromMe ? styles.chatMessageFromMe : null
                ]}>
                    {/* Message */}
                    <View>
                        {/* NickName */}
                        <View></View>

                        {/* Message */}
                        <View><Text>{this.props.teste.message}</Text></View>

                        {/* Date */}
                        <View><Text style={{fontSize: 10}}>{this.props.teste.date}</Text></View>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    chatImage: {
        width: 60,
        height: 60,
        borderRadius: 500,
        backgroundColor: 'black'
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        marginBottom: 15
    },
    messageContainerFromMe: {
        flexDirection: 'row-reverse',
    },
    chatMessage: {
        width: "70%",
        backgroundColor: 'lightgreen',
        borderRadius: 5,
        padding: 12,
        marginLeft: 15
    },
    chatMessageFromMe: {
        marginLeft: 0,
        marginRight: 15,
        backgroundColor: "lightblue"
    }
})