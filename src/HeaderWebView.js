import React, { Component } from 'react';
import { WebView } from "react-native-webview";
import Urls from "./Urls";
import URI from 'urijs';

export default class HeaderWebView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url
        };
    }

    onMessage = (event) => {
        //Prints out data that was passed.
        //console.log("react-native")
        //console.log(event)
        console.log("isUserLogin: " + event.nativeEvent.data);

        if (event && event.nativeEvent && event.nativeEvent.data) {
            this.props.onLoginUpdate(event.nativeEvent.data)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.url != nextProps.url) {
            this.setState({ url: nextProps.url })
        }
    }

    render() {
        //console.log(this.props.url)
        console.log(this.state.url)
        return (
            <WebView
                ref={c => {
                    this.WebView = c;
                }}
                onMessage={this.onMessage}
                onLoadStart={(navState) => {
                    if (navState.nativeEvent.url) {
                        var urii = new URI(navState.nativeEvent.url);
                        //console.log(urii.domain())
                        var domain = urii.domain()

                        if (domain == Urls.PURE_URL) {
                            var hasFound = urii.valueOf().toLocaleLowerCase().indexOf(Urls.LOGIN_FACEBOOK_URL.toLowerCase());
                            console.log("HasLoginUrlFound: " + hasFound)

                            if (urii.valueOf().toLocaleLowerCase().indexOf(Urls.LOGIN_FACEBOOK_URL.toLowerCase()) === -1) { //not found
                                urii.addQuery(Urls.PARAM_MODE)
                                urii.addQuery(Urls.PARAM_DEVICE_IOS)
                            }

                            this.setState({ url: urii.valueOf() })
                        }
                        //urii.addQuery("mode","webview")
                        //this.setState({url: navState.nativeEvent.url + "?mode=webview"})}
                        this.props.onLoadStart(0)
                    }
                }}
                onLoadEnd={this.props.onLoadEnd}
                source={{
                    uri: this.state.url
                }}
            />
        );
    }
}