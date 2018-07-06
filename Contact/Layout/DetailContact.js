import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Platform } 
from 'react-native';
import Icon from 'react-native-ionicons';

// import RNPhoneCall from 'react-native-phone-call';

import {
    Container, Header, Content,
    Thumbnail, Left, Right, Body, Button
    , List, ListItem,
} from 'native-base';

import { Toolbar, ActionButton } from 'react-native-material-ui';
import HR from '../component/HrTag';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import SttBar from '../component/STTBar';

export default class DetailContact extends Component {
    
    constructor(props) {
        super(props);
        // console.log(JSON.stringify(this.props));
        // console.log(JSON.stringify(this.props.navigation.state.params.phoneNumbers));

        this.state = ({
            value: this.props.navigation.state.params[0]
        })
    }
    COLOR_BUTTON = '#039be5';

    static navigationOptions = {
        header: null
    };

    _header = () => {
        return (
            <View style={{ position: 'relative', 
                marginTop: (Platform.OS === 'ios') ? 20 : 0, }}>
                <Toolbar
                    style={{ container: { backgroundColor: 'transparent', position: 'absolute', top: 0, width: screen.width, zIndex: 1, } }}
                    leftElement="arrow-back"
                    rightElement={{
                        menu: {
                            icon: "more-vert",
                            labels: ["Xóa", "chia sẻ"]
                        }
                    }}
                    onRightElementPress={(label) => { console.log(label) }}
                    onLeftElementPress={() => this.props.navigation.goBack()}
                />
                {/* <Thumbnail square style={styles.avatar} source={{ uri: 'https://goo.gl/MTq5rV' }} /> */}
            </View>
        );
    }

    callNumber(number) {
      /*   RNPhoneCall.call(number).then((data) => {
            // do something
        }); */
    }

    ImageAvatar = () => {
        // return Tag images
        var imgTemp = this.state.value.avatar;
        var name = this.state.value.name;
        if (imgTemp == "") {
            return (
                <View style={[styles.imagesAvatar, styles.avatar]}>
                    <Text style={[styles.imagesAvatarText]}>
                        {name.substr(0, 1).toUpperCase()}
                    </Text>
                </View>
            );
        }
        return <Thumbnail square style={styles.avatar} source={{ uri: imgTemp }} />;
    }

    listDemo() {
        data = [];
        for (let i = 0; i < 100; i++) {
            data[i] = "Demo lan thu  " + i;
        }
        return data;
    }

    render() {
        return (
            <Container>
                <SttBar/>
                <HeaderImageScrollView
                    maxHeight={250}
                    minHeight={56}
                    maxOverlayOpacity={1}
                    minOverlayOpacity={0}
                    overlayColor='#03a9f4'
                    fadeOutForeground={true}
                    renderHeader={this.ImageAvatar}
                    renderFixedForeground={this._header}
                >
                    <Content style={{ minHeight: screen.height - 80 }}>
                        <ListItem noBorder >
                            <Text style={styles.name}> {this.state.value.name} </Text>
                        </ListItem>

                        <HR />


                        <ListItem noBorder>
                            <Body style={styles.control}>
                                <TouchableOpacity style={styles.control}>
                                    <Icon name='call' color={this.COLOR_BUTTON} />
                                    <Text note>Gọi</Text>
                                </TouchableOpacity>
                            </Body>
                            <Body style={styles.control}>
                                <TouchableOpacity style={styles.control}>
                                    <Icon name="chatboxes" color={this.COLOR_BUTTON} />
                                    <Text note>Nhắn tin</Text>
                                </TouchableOpacity>
                            </Body>
                        </ListItem>

                        <HR />

                        <ListItem avatar noBorder style={styles.action}>
                            <Left>
                                <TouchableOpacity onPress={() => this.callNumber(this.state.value.phone)}>
                                    <Icon name='call' color={this.COLOR_BUTTON} />
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => this.callNumber(this.state.value.phone)}>
                                    <Text style={styles.phoneNumber} >{this.state.value.phone}</Text>
                                    <Text note>Di động</Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <TouchableOpacity>
                                    <Icon name="chatboxes" color={this.COLOR_BUTTON} />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>

                        <HR />
                    </Content>
                    {/* <FlatList data={this.listDemo()} renderItem={({ item }) => <Text>{item}</Text>} /> */}
                </HeaderImageScrollView>
                <View>
                    {/* <ActionButton /> // default with icon (default icon is +) */}
                    <ActionButton icon="create" style={{ container: { backgroundColor: this.COLOR_BUTTON } }} />
                </View>
            </Container >
        );
    }
}
const screen = Dimensions.get('window');
// const screen = Dimensions;

const styles = StyleSheet.create({
    control: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: screen.width,
        height: 250,
    },
    name: {
        fontSize: 25,
    },
    phoneNumber: {
        fontSize: 20,
    },
    itemDetail: {
        borderBottomWidth: 1,
        borderColor: '#bdbdbd',
    },
    imagesAvatar: {
        backgroundColor: 'rgb(63, 81, 181)',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    imagesAvatarText: {
        color: "white",
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',

    },

});

/*
<Text> Man hinh detail</Text>
    <Text>
        {JSON.stringify(this.props)}
    </Text> */
