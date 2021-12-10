import '../styles/globals.css'
import SnackbarProvider from 'react-simple-snackbar'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider><Layout> <Component {...pageProps} /> </Layout></SnackbarProvider>
   
  )
}

export default MyApp
