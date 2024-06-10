import React from 'react'
import Logo from '../../images/FuelCommunityLogo.svg'
function LogoAndName() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div onClick={handleScrollToTop} className='flex gap-[20px] cursor-pointer items-center max-w-[177px] w-full h-[50px] mr-[170px]'>
      <img src={Logo} alt="Logo" />
      <a className="font-normal text-variable-collection-default-white text-[32px] ">Fuelers</a>
    </div>
  )
}

export default LogoAndName