import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './__stylesheet__/app.scss'
import { Provider } from 'react-redux'
import { store } from './__redux__/store.js'
import { loadScripts } from './__scripts__/scriptLoader.js'

loadScripts().then(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>
    )
})
