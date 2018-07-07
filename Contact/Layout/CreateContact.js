/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
var Contacts = require('react-native-contacts');

export default class CreateContact extends Component {
    static navigationOptions = {
        header: null
    };

    _test = () => {
        var newPerson = {
            emailAddresses: [{
                label: "work",
                email: "mrniet@example.com",
            }],
            familyName: "Nietzsche",
            givenName: "Friedrich",
        }

        Contacts.addContact(newPerson, (err) => {
            if (err) throw err;
            alert('them  thanh cong');
        })
    }
    render() {
        return (
            <Container>
                <Header >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon name='close' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tạo liên hệ</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._handlerToolbarOption} >
                            <Title>Lưu</Title>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Button onPress={this._test} >
                        <Title>test</Title>
                    </Button>
                </Content>
            </Container>
        );
    }
}


const screen = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

});
