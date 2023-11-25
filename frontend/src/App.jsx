import { LogIn } from './components/Login/LogIn';
import { Home } from './components/Home/Home';

import { userToken } from './atoms/userToken';
import { useRecoilState, useRecoilValue } from 'recoil';

function App() {

  const [token, setUserToken] = useRecoilState(userToken)

  const localToken = localStorage.getItem("system_token");
  if (!!localToken && localToken != "undefined") setUserToken(localToken)


  if (!!token) return <Home/>
  return <LogIn/>
  

}

export default App
