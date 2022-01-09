import * as React from 'react'
import Header from './Header'

const Layout = ({ children }:{
    children: React.ReactNode
}) => {
    return (
        <>
          <Header />
            {children}
        </>
    )
}

export default Layout
