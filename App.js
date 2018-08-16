import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignUp from './src/pages/SignUp/signup'
import Login from './src/pages/Login/login'
import Chat from './src/pages/chat/chat';

var sigupStack = createStackNavigator({
  LoginScreen: Login,
  SignUpScreen: SignUp,
  
}, {
  initialRouteName: 'LoginScreen'
});

var chatStack = createStackNavigator({
  ChatScreen: Chat
})

var rootNavigation = createSwitchNavigator({
  ChatStack: chatStack,
  SigupStack: sigupStack,

})

export default rootNavigation;