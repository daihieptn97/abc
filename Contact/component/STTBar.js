import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        {console.log(...props)
        }
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class SttBar extends Component {
    checkOS() {
        if (Platform.OS === 'ios') {
            <StatusBar translucent barStyle="light-content" />
        } else {
            return (
                <MyStatusBar
                    {...this.props}
                    barStyle="light-content"
                />
            );
        }
    }

    render() {
        return (
            <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0, }}>
                {this.checkOS()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});


