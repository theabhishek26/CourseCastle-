
function BannerNav(){


  return (
    <div className="bannerNav flex justify-between items-center lg:p-2  lg:w-3/4 mx-auto md:w-full">
        <div className="logo text-3xl font-semibold">
            Course<span className="text-porange font-cursive font-bold ">Master</span>
        </div>
         <button className="buttonOrangeBg contact max-md:hidden">Contact Us</button>
    </div>
  )
}

export default BannerNav;