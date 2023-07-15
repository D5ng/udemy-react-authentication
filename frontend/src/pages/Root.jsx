import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom"

import MainNavigation from "../components/MainNavigation"
import { useEffect } from "react"

function RootLayout() {
  const token = useLoaderData()
  const submit = useSubmit()
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) return

    const timer = setTimeout(() => {
      submit(null, { method: "POST", action: "/logout" })
    }, 60 * 60 * 1000)

    return () => clearTimeout(timer)
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
