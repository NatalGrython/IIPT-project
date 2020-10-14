import { useCallback, useState } from 'react'


export const useHttp = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, mode = 'no-cors', headers = {}) => {
       
        
        console.log('==================== REQUEST===========================')
        setLoading(true)

    
        if (body){
            body = JSON.stringify(body)
        }
        headers['Content-Type'] = 'application/json'
        console.log('==================== RESPONSE===========================')
        const response = fetch(url, {method, mode, body, headers})
            .then(response => response.json)
            .catch(e => e.message)
        console.log('==================== RESPONSE END===========================')    
        
        if (!response.ok){
            throw new Error(response.message || 'Ошибка ответа')
        }
        setLoading(false)
        console.log('==================== REQUEST END===========================')
        return response

       
         

    }, []) 

    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}