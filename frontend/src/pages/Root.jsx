import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom"

import MainNavigation from "../components/MainNavigation"
import { useEffect } from "react"
import { getTokenDuration } from "../utils/auth"

function RootLayout() {
  const token = useLoaderData()
  const submit = useSubmit()
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) return

    if (token === "EXPIRED") {
      submit(null, { method: "POST", action: "/logout" })
    }

    const tokenDuration = getTokenDuration()

    setTimeout(() => {
      submit(null, { method: "POST", action: "/logout" })
    }, tokenDuration)
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
