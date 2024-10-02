import Button from '@mui/material/Button';
function Banner() {

  return (
    <div style={{ fontFamily:'"Afacad Flux", "sans-serif"',width:'100%',height:'100vh',backgroundImage: 'url("../src/assets/banner.jpg")',backgroundSize: 'cover',  backgroundPosition: 'center'}}>

       <div style={{position:'absolute' ,width:'50%',right:'0',top:'25%',textAlign:'center',padding:'30px'}}>
        <h1 style={{fontSize:'100px'}}>CourseMaster</h1>
        <div className="buttons" style={{display:'flex',justifyContent:'center',gap:100}}>
        <Button style={{fontSize:'25px'}} variant="contained" onClick={()=>{
          window.location.href='/signin'
        }}>Admin App<span className="material-symbols-outlined" >east</span></Button>
        
        <Button style={{fontSize:'25px'}} variant="contained" onClick={()=>{
          window.location.href='https://coursemaster-user.vercel.app/'
        }} >User App<span className="material-symbols-outlined">east</span></Button>
        </div>
       </div>
    </div>
  )
}

export default Banner
