import { createStackNavigator } from 'react-navigation';
import SignUp from './src/pages/SignUp/signup'
import Login from './src/pages/Login/login'

var stack = createStackNavigator({
  LoginScreen: Login,
  SignUpScreen: SignUp,
}, {
  initialRouteName: 'LoginScreen'
});

export default stack;