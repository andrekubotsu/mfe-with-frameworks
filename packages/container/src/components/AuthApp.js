import React from 'react'
import { mount } from 'auth/AuthApp'
import { useHistory } from 'react-router-dom'

export default ({ onSignIn }) => {
    const ref = React.useRef(null)
    const history = useHistory()
    
    React.useEffect(()=>{
        const { onParentNavigate } = mount(ref.current, {
            initalPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location
                if(pathname !== nextPathname){
                    history.push(nextPathname)
                }
            },
            // auth callback
            onSignIn,
        })

        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref}></div>
}