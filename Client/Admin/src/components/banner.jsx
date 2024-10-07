import BannerNav from "./bannerNav"
import banImg from '../assets/bannerImg.png'
function Banner() {

  return (
      <div className="bg-orange-100 font-afacad h-[100vh] flex flex-col gap-36 lg:p-0 md:p-6 p-4">
      <BannerNav></BannerNav>

      <div className="landing grid lg:grid-cols-2 lg:w-3/4 mx-auto items-center">

        <div className="left flex flex-col gap-10">

          <div className="flex items-center font-semibold text-lg gap-1"><span className="material-symbols-outlined bg-pred border-rounded p-1 rounded-3xl border-8 border-red-200 animate-pulse">play_arrow</span>Start Learning</div>

          <div className="tagline md:text-6xl text-3xl font-extrabold">Enjoy Studying with CourseMaster Marketplace</div>

          <div className="bannerBtns flex gap-6 md:text-2xl text-lg">
          <button class="relative flex md:h-[50px] md:w-44 w-36 h-10 items-center justify-center overflow-hidden  text-black border-2 border-porange shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-porange before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56 active:scale-95">
          <span class="relative z-10 flex items-center gap-1" onClick={()=>{
            window.location.href='https://coursemaster-user.vercel.app/'
          }}>For Students <span className="material-symbols-outlined">east</span></span>
          </button>

          <button class="relative flex md:h-[50px] md:w-44 w-36 h-10 items-center justify-center overflow-hidden bg-porange text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-200  before:duration-500 before:ease-out hover:shadow-orange-200 hover:before:h-56 hover:before:w-56 hover:text-black active:scale-95" onClick={()=>{
            window.location='/signin'
          }}>
            {/* //locate to route as this page is in admin part */}
            <span class="relative z-10 flex items-center gap-1">For Educators<span className="material-symbols-outlined">east</span></span>
          </button>

          </div>
        </div>

        <div className="right lg:flex justify-end hidden">
          <img className="w-2/3" src={banImg} alt="Main-Image" />
        </div>

      </div>
      </div>
    
  )
}
export default Banner
