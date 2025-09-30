import React, { useState, useEffect, useRef } from "react"
import "./Student_dashboard.css"
import {ClipboardCheck, TrendingUp, SquareCheckBig, CircleUserRound} from 'lucide-react'

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState(null)
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: 1,
      question: "Q1. What is the main goal of supply chain management?",
      options: [
        "Increase the number of suppliers",
        "Maximize inventory levels",
        "Minimize inventory levels",
        "Optimize the flow of goods",
      ],
      selectedOption: null,
    },
    {
      id: 2,
      question: "Q2. What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      selectedOption: null,
    },
    {
      id: 3,
      question: "Q3. Which language is used for web styling?",
      options: ["HTML", "Python", "CSS", "Java"],
      selectedOption: null,
    },
    {
      id: 4,
      question: "Q4. Who is the father of computers?",
      options: ["Isaac Newton", "Albert Einstein", "Charles Babbage", "Alan Turing"],
      selectedOption: null,
    },
    {
      id: 5,
      question: "Q5. What gas makes up most of Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      selectedOption: null,
    },
    {
      id: 6,
      question: "Q6. What is the capital of France?",
      options: ["London", "Berlin", "Madrid", "Paris"],
      selectedOption: null,
    },
  ])

  const progressCards = [
    {
      title: "Attendance Points",
      subtitle: "10 Points per session",
      score: 120,
      maxScore: 160,
      className: "attendance",
    },
    {
      title: "Quiz Points",
      subtitle: "5 Points per session",
      score: 45,
      maxScore: 160,
      className: "quiz",
    },
    {
      title: "Task Points",
      subtitle: "10 Points per session",
      score: 80,
      maxScore: 160,
      className: "tasks",
    },
  ]

  const rankings = [
    { rank: 1, name: "TUSHAR", role: "UI UX DESIGNER", points: "400 P" },
    { rank: 2, name: "VINAYA", role: "UI UX DESIGNER", points: "378 P" },
    { rank: 3, name: "KARTIK", role: "UI UX DESIGNER", points: "203 P" },
    { rank: 4, name: "VIVEK", role: "UI UX DESIGNER", points: "176 P" },
  ]

  const testimonials = [
    {
      name: "Karan Singh",
      // title: "Alumni 2020",
      message: "The support from faculty and tools like this dashboard paved the way for my success.",
    },
    {
      name: "Vijay Pande",
      // title: "Prof. of Physics",
      message:
        "Whether it's the wisdom of our Principal, the dedication of our HODs, or the success stories of our alumni — each message reflects the legacy we build together.",
    },
    {
      name: "Sneha Kapoor",
      // title: "Alumni 2021",
      message: "Our professors encouraged me to innovate and grow — proud to be part of this institution.",
    },
    {
      name: "Rahul Mehta",
      // title: "Alumni 2023",
      message: "Ranking among the top, this dashboard helped me plan and excel throughout my studies.",
    },
    {
      name: "Anita Sharma",
      // title: "Prof. of Chemistry",
      message: "The collaborative environment here fosters innovation and critical thinking among students.",
    },
    {
      name: "Priya Desai",
      // title: "Alumni 2022",
      message: "This dashboard was a game-changer, helping me track my progress and stay motivated.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const [prevTranslate, setPrevTranslate] = useState(0)
  const sliderRef = useRef(null)
  const carouselRef = useRef(null)

  const showContent = (sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null)
      return
    }
    setActiveSection(sectionId)
  }

  const selectOption = (questionId, optionIndex) => {
    setQuizQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, selectedOption: optionIndex } : q)))
  }

  const updateSliderPosition = (animate = true) => {
    if (!sliderRef.current || !carouselRef.current) return

    const testimonialWidth = sliderRef.current.children[0]?.getBoundingClientRect().width || 0
    const gap = 16
    const containerWidth = carouselRef.current.offsetWidth
    const offset = (containerWidth - testimonialWidth) / 2 - 10
    const newTranslate = -(currentIndex * (testimonialWidth + gap)) + offset

    setCurrentTranslate(newTranslate)
    setPrevTranslate(newTranslate)

    if (sliderRef.current) {
      sliderRef.current.style.transition = animate ? "transform 0.4s ease-in-out" : "none"
      sliderRef.current.style.transform = `translateX(${newTranslate}px)`
    }
  }

  const handleLoop = () => {
    const totalOriginalTestimonials = 6
    if (currentIndex === 0) {
      setCurrentIndex(totalOriginalTestimonials)
      setTimeout(() => updateSliderPosition(false), 0)
    } else if (currentIndex === totalOriginalTestimonials + 1) {
      setCurrentIndex(1)
      setTimeout(() => updateSliderPosition(false), 0)
    }
  }

  const handleHoverLeft = () => {
    if (!isDragging) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleHoverRight = () => {
    if (!isDragging) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    if (sliderRef.current) {
      sliderRef.current.style.transition = "none"
    }
  }

  const handleTouchMove = (e) => {
    if (isDragging) {
      const currentX = e.touches[0].clientX
      const diffX = currentX - startX
      const newTranslate = prevTranslate + diffX
      setCurrentTranslate(newTranslate)
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${newTranslate}px)`
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.4s ease-in-out"
    }

    const testimonialWidth = sliderRef.current?.children[0]?.getBoundingClientRect().width || 0
    const gap = 16
    const movedBy = prevTranslate - currentTranslate

    if (movedBy > (testimonialWidth + gap) * 0.2) {
      setCurrentIndex((prev) => prev + 1)
    } else if (movedBy < -(testimonialWidth + gap) * 0.2) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  useEffect(() => {
    updateSliderPosition()
    const timer = setTimeout(handleLoop, 400)
    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    const handleResize = () => updateSliderPosition(false)
    window.addEventListener("resize", handleResize)
    updateSliderPosition(false)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalScore = progressCards.reduce((sum, card) => sum + card.score, 0)

  return (
    <div className="page-wrapper">
      <h1>STUDENT DASHBOARD</h1>
      <p className="subtitle">Track your progress and compete with fellow learners</p>

      <div className="buttons-container">
        <button
          className={`dash-btn ${activeSection === "quiz" ? "active" : ""}`}
          onClick={() => showContent("quiz")}
          data-tooltip="Take a quiz to earn points"
        >
        <ClipboardCheck />
          TAKE QUIZ
        </button>
        <button
          className={`dash-btn ${activeSection === "progress" ? "active" : ""}`}
          onClick={() => showContent("progress")}
          data-tooltip="View your progress stats"
        >
          <CircleUserRound />
          PROGRESS
        </button>
        <button
          className={`dash-btn ${activeSection === "rankings" ? "active" : ""}`}
          onClick={() => showContent("rankings")}
          data-tooltip="See the leaderboard rankings"
        >
          <TrendingUp />
          RANKINGS
        </button>
        <button
          className={`dash-btn ${activeSection === "tasks" ? "active" : ""}`}
          onClick={() => showContent("tasks")}
          data-tooltip="Check your tasks (none available)"
        >
          <SquareCheckBig />
          TASKS
        </button>
      </div>

      {/* Quiz Section */}
      <div className={`quiz-container ${activeSection === "quiz" ? "active" : ""}`} id="quiz">
        {quizQuestions.map((question, index) => (
          <div
            key={question.id}
            className={`quiz-card ${activeSection === "quiz" ? "show" : ""}`}
            style={{ animationDelay: `${index * 300}ms` }}
          >
            <div className="question-text">{question.question}</div>
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`option ${question.selectedOption === optionIndex ? "selected" : ""}`}
                onClick={() => selectOption(question.id, optionIndex)}
              >
                {option}
              </div>
            ))}
            <div className="buttons">
              <button className="submit-btn">SUBMIT</button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className={`progress-container ${activeSection === "progress" ? "active" : ""}`} id="progress">
        {progressCards.map((card, index) => (
          <div
            key={card.title}
            className={`card ${card.className} ${activeSection === "progress" ? "show" : ""}`}
            style={{ animationDelay: `${index * 300}ms` }}
          >
            <div className="card-header">
              <div>
                <div>{card.title}</div>
                <div className="card-sub">{card.subtitle}</div>
              </div>
              <div className="score-value">{card.score}</div>
            </div>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${(card.score / card.maxScore) * 100}%` }}></div>
            </div>
            <div className="score-caption">
              {card.score} / {card.maxScore}
            </div>
          </div>
        ))}
        <div className={`overall-score ${activeSection === "progress" ? "show" : ""}`}>
          <i className="fas fa-trophy icon"></i>
          OVERALL SCORE <span>{totalScore}</span>
        </div>
      </div>

      {/* Rankings Section */}
      <div className={`rankings-container ${activeSection === "rankings" ? "active" : ""}`} id="rankings">
        <div className="leaderboard-title"></div>
        {rankings.map((entry, index) => (
          <div
            key={entry.rank}
            className={`entry ${activeSection === "rankings" ? "show" : ""}`}
            style={{ animationDelay: `${index * 300}ms` }}
          >
            <div className="rank">{entry.rank}</div>
            <div className="info">
              <div className="name">{entry.name}</div>
              <div className="role">{entry.role}</div>
            </div>
            <div className="points">{entry.points}</div>
          </div>
        ))}
      </div>

      {/* Tasks Section */}
      <div className={`tasks-container ${activeSection === "tasks" ? "active" : ""}`} id="tasks">
        <div className="tasks-title"></div>
        <div className={`no-tasks ${activeSection === "tasks" ? "show" : ""}`}>No Tasks Available</div>
      </div>

      {/* Testimonials Section */}
      {!activeSection && (
        <>
          <div className="section-title">FROM THE DESK OF EXPERIENCE</div>
          <div className="section-subtitle">HEAR FROM OUR ALUMNI AND PROFESSORS</div>
          <div
            className="carousel-container"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="testimonial-slider" ref={sliderRef}>
              {/* Duplicate last testimonial for seamless loop */}
              <div className="testimonial">
                <div className="testimonial-header">
                  <div className="avatar"></div>
                  <div className="name-title">
                    <div className="name">{testimonials[testimonials.length - 1].name}</div>
                <div className="title">{testimonials[testimonials.length - 1].title}</div>
                  </div>
                </div>
                <p>{testimonials[testimonials.length - 1].message}</p>
              </div>

              {/* Original testimonials */}
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                  <div className="testimonial-header">
                    <div className="avatar"></div>
                    <div className="name-title">
                      <div className="name">{testimonial.name}</div>
                      <div className="title">{testimonial.title}</div>
                    </div>
                  </div>
                  <p>{testimonial.message}</p>
                </div>
              ))}

              {/* Duplicate first testimonial for seamless loop */}
              <div className="testimonial">
                <div className="testimonial-header">
                  <div className="avatar"></div>
                  <div className="name-title">
                    <div className="name">{testimonials[0].name}</div>
                    <div className="title">{testimonials[0].title}</div>
                  </div>
                </div>
                <p>{testimonials[0].message}</p>
              </div>
            </div>
            <div className="hover-zone hover-left" onMouseEnter={handleHoverLeft}></div>
            <div className="hover-zone hover-right" onMouseEnter={handleHoverRight}></div>
          </div>
        </>
      )}
    </div>
  )
}