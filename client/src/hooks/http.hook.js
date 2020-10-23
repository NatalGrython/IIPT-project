import { useCallback, useState } from 'react'


export const useHttp = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
       console.log('==================== REQUEST===========================')
       setLoading(true)     
        try {
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            
            
            console.log('==================== RESPONSE===========================')
            const response = await fetch(url, {method, body, headers})
              
            console.log(response)
            console.log('==================== RESPONSE END===========================')    
            const data = await response.json()

            if (!response.ok){ 
                
                throw new Error(data.message || 'Ошибка ответа')
                
            }
            
            setLoading(false)
    
            console.log('==================== REQUEST END===========================')
            return data
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, []) 

    const clearError = useCallback(() => setError(null), []) 

    return {loading, request, error, clearError}
}