import '../styles/globals.css'
import { wrapper } from "../redux/store"
import {useStore} from '../redux/store';
import { Provider as ReduxProvider}  from 'react-redux';
import { Provider as NextAuthProvider} from 'next-auth/client'


export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  console.log('_app.js',{pageProps, NextAuthProvider})
  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </ReduxProvider>
  )
}