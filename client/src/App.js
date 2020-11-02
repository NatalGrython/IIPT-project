import React, {useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { AuthContext } from './context/Authcontext'
import { useRoutes } from './routes'

function App() {

  const [Autificated, getAutificated] = useState(false)

  const routes = useRoutes(Autificated)

  return (
    <AuthContext.Provider value = {{
      getAutificated
    }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
