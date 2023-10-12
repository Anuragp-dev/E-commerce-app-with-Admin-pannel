import React from 'react';
import Custominput from '../components/Custominput';

const Resetpassword = () => {
  return (
    <div className='py-5' style={{background:"#ffd333", minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
  
      <div className='my-5  bg-white rounded-3 mx-auto p-3' style={{width:"30rem"}}>
        <h3 className='text-center title'>Reset Password</h3>
        <p className='text-center '>Please Enter your New Password</p>
        <form className='' action="">
        <Custominput type='password' label="Enter Your New Password"  id="newpass"/>
        <Custominput type='password' label="Enter  Confirm Password"  id="confirmpass"/>
        
        <button  className='btn border-0 px-3 py-2 text-white fw-bold w-100 fs-5' type='submit' style={{background:"#ffd333"}}>Reset Password
        </button>
        </form>

      </div>
    </div>
  );
}

export default Resetpassword ;
