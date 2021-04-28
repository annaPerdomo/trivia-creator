import '../styles/globals.css'
import { wrapper } from "../redux/store"
import {useStore} from '../redux/store';
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}