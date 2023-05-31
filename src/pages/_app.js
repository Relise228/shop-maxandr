import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import "@styles/globals.scss"
import { StoreProvider } from "@utils/Store"
import { SessionProvider } from "next-auth/react"

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider
          options={{ "client-id": "AUvZT8QLbeLL1lbtwo9GIr7MJ3QdagB3TjgGeZ_kD3InCn16xdroUeyM7jpPaSX6HoeFpe8bUuBQwAYC" }}
        >
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  )
}

export default App
