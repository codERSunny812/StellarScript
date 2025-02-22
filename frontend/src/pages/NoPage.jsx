import Lottie from "lottie-react";
import error from '../images/logos/NoAnim.json'

const NoPage = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
 
 <Lottie animationData={error} style={{width: 600, height: 600}} />
      
    </div>
  )
}

export default NoPage