import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignUp from './src/pages/SignUp/signup'
import Login from './src/pages/Login/login'
import Chat from './src/pages/chat/chat';
import LoginState from './src/pages/LoginState/login-state';

var sigupStack = createStackNavigator({
  LoginStateScreen: LoginState,
  LoginScreen: Login,
  SignUpScreen: SignUp,
  
}, {
  initialRouteName: 'LoginStateScreen'
});

var chatStack = createStackNavigator({
  ChatScreen: Chat
})

var rootNavigation = createSwitchNavigator({
  SigupStack: sigupStack,
  ChatStack: chatStack,
})

export default rootNavigation;