import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './__stylesheet__/app.scss'
import { Provider as ReduxProvider } from 'react-redux' // Aliasing Redux Provider
import { store } from './__redux__/store.js'
import { loadScripts } from './__scripts__/scriptLoader.js'

loadScripts().then(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </StrictMode>
    )
})
