import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class ToolBarOptionAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTopAnimation: new Animated.Value(0)
        }
    }

    render() {
        return (
            <View style={[styles.toolbarOptionContainer,
                { opacity: this.props.displayCustom.opacity, zIndex: this.props.displayCustom.zIndex, }]
            }>
                <Button transparent>
                    <Text style={{ flex: 1, textAlign: 'center' }}>hello</Text>
                </Button>
                <Button transparent>
                    <Text style={{ flex: 1, textAlign: 'center' }}>hello</Text>
                </Button>
            </View>
        )
    };
}

export default class ToolbarOption extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            toolOption: {
                opacity: 0,
                zIndex: -999,
            },
        }
    }
    _handlerToolbarOption(){
      
        if (this.state.toolOption.opacity == 0) {
            this.setState({
                toolOption: {
                    opacity: 1,
                    zIndex: 999,
                }
            });
        } else {
            this.setState({
                toolOption: {
                    opacity: 0,
                    zIndex: -999,
                }
            });
        }
    }

    render() {
        return (
            <ToolBarOptionAnimation displayCustom={this.state.toolOption} />
        );
    }
}


const screen = Dimensions.get('window');
const styles = StyleSheet.create({
    toolbarOptionContainer: {
        width: (screen.width / 3) + 10,
        position: 'absolute',
        top: 55,
        right: 0,
        backgroundColor: "#ffffff",
    },

});