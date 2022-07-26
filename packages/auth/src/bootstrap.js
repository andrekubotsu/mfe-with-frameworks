import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to start up the app
const mount = (element, { onSignIn, onNavigate, defaultHistory, initalPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [
            initalPath
        ]
    })

    if(onNavigate){
        history.listen(onNavigate)
    }

    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />,
        element
    )

    return {
        onParentNavigate({ pathname: nextPathname }){
            const { pathname } = history.location
            if(pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
}

// if we are in development and in isolation, call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root')

    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() })
    }
}

// we are running through container and we should export the mount function
export { mount }