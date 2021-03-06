import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class AddTask extends Component {

    state = {
        text: ''
    }

    onSavePressed = () => {
        const { text } = this.state;
        fetch('http://45.117.160.28:3330/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                content: text
            })
        })
            .then((response) => {
                console.log(response);
                Actions.todoList({ type: 'reset' });
            })
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Add new task"
                        multiline
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                    <TouchableOpacity
                        onPress={this.onSavePressed}
                        style={styles.buttonStyle}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        padding: 5,
    },
    textInputStyle: {
        width: 300,
        height: 200
    },
    buttonStyle: {
        backgroundColor: 'grey',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default AddTask;
