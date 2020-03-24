import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Voice from 'react-native-voice';

class App extends Component {
  state = {
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  };

  constructor(props) {
    super(props);
    //Setting callbacks for the process status
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    //destroy the process after switching the screen
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√√√',
    });
  };

  onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√√√',
    });
  };

  onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
      alert('Voice Recognization Stoped Here !!!');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
      alert('Voice Recognization Cancelled !!!');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Voice Recognition App</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Started: ${this.state.started}`}</Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`End: ${this.state.end}`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}>
            {/* <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Pitch \n ${this.state.pitch}`}</Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#B0171F',
              }}>{`Error \n ${this.state.error}`}</Text> */}
          </View>
          <Text style={styles.stat}>Results</Text>
          <ScrollView>
            {this.state.results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
          </ScrollView>
          <ScrollView>
            <TouchableHighlight
              onPress={this._startRecognizing}
              style={{marginVertical: 20}}>
              <Image
                style={styles.button}
                source={require('./assets/img/mic-logo.png')}
              />
            </TouchableHighlight>
            <Text
              style={{
                textAlign: 'center',
                color: '#B0171F',
                marginBottom: 1,
                fontWeight: '700',
              }}>
              Press mike to start Recognition
            </Text>
          </ScrollView>
          {/*<ScrollView>
            {this.state.partialResults.map((result, index) => {
              return (
                <Text
                  key={`partial-result-${index}`}
                  style={{
                    textAlign: 'center',
                    color: '#B0171F',
                    marginBottom: 1,
                    fontWeight: '700',
                  }}>
                  {result}
                </Text>
              );
            })}
          </ScrollView> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              position: 'absolute',
              bottom: 0,
            }}>
            <TouchableHighlight
              onPress={this._stopRecognizing}
              style={{flex: 1, backgroundColor: 'grey'}}
            >
              {/* <Image
                style={styles.iconButton}
                source={require('./assets/img/play-pause.png')}
              /> */}
              <Text style={styles.action}>Stop</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this._cancelRecognizing}
              style={{flex: 1, backgroundColor: 'red'}}
            >
              {/* <Image
                style={styles.iconButton}
                source={require('./assets/img/cancel.png')}
              /> */}
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight
              onPress={this._destroyRecognizer}
              style={{flex: 1, backgroundColor: 'red'}}>
              <Text style={styles.action}>Destroy</Text>
            </TouchableHighlight> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    marginLeft: 35,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
  },
  iconButton: {
    width: 80,
    height: 80,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
});
export default App;
