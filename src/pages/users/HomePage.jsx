import Navbar from "../../components/users/navbar/Navbar"
import MainContent from "../../components/users/main/MainContent"
import Achievements from "../../components/users/achivements/Achievements"
import MyProjects from "../../components/users/projects/MyProjects"  
import { Footer } from "../../components/users/footer/Footer"

const HomePage = () => {
  return (
    <>
      <Navbar />
       {/* <ChatBot
        flow={flow}
        settings={settings}
        className="chatbot-container"
      /> */}
      <MainContent />
      <Achievements />
      <MyProjects/>
      {/* <About /> */}
      {/* <Trainers /> */}
      {/* <Facilities /> */}
      {/* <Membership /> */}
      <Footer/>
      
     
    </>
  )
}

export default HomePage
