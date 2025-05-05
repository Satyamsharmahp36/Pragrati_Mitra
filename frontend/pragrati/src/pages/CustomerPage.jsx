import { Navigate } from 'react-router-dom'
import CustomerDashboard from '../components/Customer/CustomerDashboard'

function CustomerPage({ user }) {
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (user.type !== 'customer') {
    return <Navigate to="/service-provider" />
  }
  
  return <CustomerDashboard user={user} />
}

export default CustomerPage
