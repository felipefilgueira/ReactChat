import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import ChatMessage from '../../shared/components/chat-message';

export default class Chat extends React.Component {
    render() {
        var messages = [
            {
                id: 1,
                message: "Minha Mensagem",
                nickname: 'felipe',
                date: new Date().toISOString(),
                fromMe: true
            },
            {
                id: 2,
                message: "Sua Mensagem",
                nickname: 'abc1',
                date: new Date().toISOString(),
                fromMe: false
            },
        ]
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    //backgroundColor: 'yellow',
                    width: '100%'
                }} >
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <ChatMessage teste={item} />}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <View style={{
                    height: 30,
                    width: '100%'

                }} >
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(message) => this.setState({ message })}

                    />
                </View>
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