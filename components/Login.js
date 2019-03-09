import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "react-native-google-signin";

// Adapted from sample code at: https://github.com/react-native-community/react-native-google-signin/blob/master/example/index.js

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: "595725732398-5pt879mnthapub1bnk7tiaasu4pdbi92.apps.googleusercontent.com",
      offlineAccess: false
    });
  }

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage = error.message;
      this.setState({
        error: new Error(errorMessage)
      })
    }
  }

  render() {
    const { userInfo } = this.state;
    const body = userInfo ? this.renderUserInfo(userInfo) : this.renderSignInButton();

    return (
      <View
        style={styles.container}>
        {body}
      </View>
    );
  }

  renderUserInfo(userInfo) {
    return (
      <View>
        <Text style={styles.app}>Welcome {userInfo.user.name}!</Text>
        <Button onPress={this._signOut}
                title="Log Out" />
        {this.alertError()}
      </View>
    );
  }

  renderSignInButton() {
    return (
      <View>
        <Text style={styles.app}>MARK-N-PARK</Text>
        <GoogleSigninButton
          style={{ width: 212, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Auto}
          onPress={this._signIn} />
        {this.alertError()}
      </View>
    );
  }

  alertError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }

    const ignoredErrors = [
      statusCodes.SIGN_IN_REQUIRED,
      statusCodes.SIGN_IN_CANCELLED,
      statusCodes.IN_PROGRESS
    ];

    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    if (ignoredErrors.indexOf(error.message) > -1) {
      Alert.alert('Oops!', text);
    }
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, error: null });
    } catch(error) {
      const ignoredErrors = [
        statusCodes.SIGN_IN_CANCELLED,
        statusCodes.IN_PROGRESS,
      ];

      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services unavailable or outdated');
      } else {
        if (ignoredErrors.indexOf(error.code) > -1) {
          Alert.alert('Oops!', error.toString());
          this.setState({error});
        }
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null, error: null });
    } catch (error) {
      this.setState({error});
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#feffff"
  },
  app: {
    fontSize: 24,
    textAlign: "center",
    margin: 24,
    color: "#17252A"
  }
});
