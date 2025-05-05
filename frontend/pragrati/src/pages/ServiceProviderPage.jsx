import { Navigate } from 'react-router-dom'
import ProviderDashboard from '../components/ServiceProvider/ProviderDashboard'

function ServiceProviderPage({ user }) {
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (user.type !== 'service-provider') {
    return <Navigate to="/customer" />
  }
  
  return <ProviderDashboard user={user} />
}

export default ServiceProviderPage