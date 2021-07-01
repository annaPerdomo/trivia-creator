import { Provider as ReduxProvider}  from 'react-redux'
import { Provider as NextAuthProvider} from 'next-auth/client'
import { AppProps } from 'next/app'
import '../src/styles/globals.css'
import store from '../src/redux/store'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </ReduxProvider>
  )
}

