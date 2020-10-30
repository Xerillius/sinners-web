import jwt from 'jsonwebtoken'

const GateKeeper = () => {
  //are we logged in?
  let token = jwt.decode(localStorage.getItem("token"))
  if(token){
    //hooray! let's check the token expiration against the Date.now
    if(token.exp * 1000 > Date.now()){
      //login is still valid
      return token
    }else{
      //delete the token
      localStorage.removeItem("token")
      return null
    }  
  }else{
    //continue on, nothing to see heeeeeah!
    localStorage.removeItem('token')
    return null
  }
}

export default GateKeeper