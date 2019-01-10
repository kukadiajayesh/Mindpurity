import React, {Component} from 'react';
import { WebView } from "react-native-webview";
import Urls from "./Urls";
import URI from 'urijs';

export default class HeaderWebView extends Component {

    constructor(props){        
        super(props);
        this.state = {
            url: props.url
        };
    }

    onMessage(event) {
        //Prints out data that was passed.
        //console.log("react-native")
        //console.log(event)
        console.log(event.nativeEvent.data);
      }

    render() {
      //console.log(this.state.url)
      return (
        <WebView
            ref={c => {
                this.WebView = c;
            }}
            onMessage={this.onMessage}
            onLoadStart={(navState) => {
                if(navState.nativeEvent.url)          {
                    var urii = new URI(navState.nativeEvent.url);
                    //console.log(urii.domain())
                    var domain = urii.domain()
                    
                    if(domain == Urls.PURE_URL){
                        urii.addQuery(Urls.PARAM_MODE)
                        urii.addQuery(Urls.PARAM_DEVICE_IOS)
                        this.setState({url: urii.valueOf()})
                    }
                //urii.addQuery("mode","webview")
                //this.setState({url: navState.nativeEvent.url + "?mode=webview"})}
            }}}
          source={{
              uri: this.state.url
            }}
        />
      );
    }
  }