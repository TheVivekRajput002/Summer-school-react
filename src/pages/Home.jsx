import React from 'react'
import './Home_styles.css'
import bg from '../assets/images/bg.jpg'
import events_icon from '../assets/images/events_icon.png'
import color from '../assets/images/color.png'
import dashboard from '../assets/images/dashboard.png'
import home_icon from '../assets/images/home_icon.png'
import jlug_logo from '../assets/images/jlug_logo.png'
import jlug_mainlogo from '../assets/images/jlug_mainlogo.jpg'
import register_icon from '../assets/images/register_icon.png'


const Home = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>

            {/* <!--------navbar------------> */}
            <div className="navbar">
                <div className="logo">
                    <img src={jlug_logo} alt="jlug-logo" />
                </div>
                <button className="signup">SIGN UP</button>
                <button className="hamburger">&#9776;</button>
                <div className="title">
                    <p className="heading">JEC LINUX USER GROUP</p>
                </div>
            </div>

            {/* <!--=========body============ --> */}


            {/* <!-- ====logo==== --> */}

            <div className="logo-container">
                <div className="bg">
                    <img className='rotate-center' src={color} alt="" />
                </div>
                <div className="logo-wrapper">
                    <img src={jlug_mainlogo} className="main-logo" alt="JLUG Logo" />
                </div>
            </div>

            {/* <!-- ====content==== --> */}
            <div className="content">
                <div>
                    <p className="jlug-summer">JLUG SUMMER</p>
                </div>
                <div>
                    <p className="school-program ">SCHOOL PROGRAM</p>
                </div>
                <div className="message">
                    <p className="transform mt-[3vh]">Transform your skill with expert-led workshop, hands-on projects , and a vibrant learning community</p>
                </div>

                <button className="start-learning">Start Learning</button>
            </div>

            {/* <!-- ========bottom navbar========= --> */}
            <div className="nav-container">

                <div className="home">
                    <button onClick={() => scrollToSection('home')}><img className="svg" src={home_icon} alt="" /></button>
                    <div> <p className="svg-text">Home</p></div>
                </div>

                <div className="register">
                    <div><img className="svg" src={register_icon} alt="" /></div>
                    <div> <p className="svg-text">Register</p></div>
                </div>

                <div className="dashboard">
                    <button onClick={() => scrollToSection('student_dashboard')}><img className="svg" src={dashboard} alt="" /></button>
                    <div> <p className="svg-text">Dashboard</p></div>
                </div>

                <div className="events">
                    <div><img className="svg" src={events_icon} alt="" /></div>
                    <div> <p className="svg-text">Events</p></div>
                </div>
            </div>


        </>
    )
}

export default Home