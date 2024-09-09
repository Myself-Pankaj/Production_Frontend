// ScriptLoader.js

let googleMapsLoaded = false

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve(script)
        script.onerror = () => reject(new Error(`Script load error for ${src}`))
        document.body.appendChild(script)
    })
}

const loadScripts = async () => {
    try {
        await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        // console.log('Razorpay script loaded')

        const GOOGLE_MAPS_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_KEY
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`)
        // console.log('Google Maps script loaded')

        // Set a flag when Google Maps is loaded
        googleMapsLoaded = true
    } catch (error) {
        // console.error('Error loading scripts:', error)
        throw error
    }
}

const isGoogleMapsLoaded = () => googleMapsLoaded

export { loadScripts, isGoogleMapsLoaded }
