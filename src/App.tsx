
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Bot, ClipboardList,
  TrendingUp, User, LogOut, Bell, Search,
  ArrowRight, Sparkles, Send, Menu, X, Award, Clock, Star
} from "lucide-react";
import "./App.css";

function NovaStar() {
  return (
    <svg viewBox="0 0 100 100" width="42" height="42">
      <defs>
        <linearGradient id="nova" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e5c8ff" />
          <stop offset="1" stopColor="#7626d9" />
        </linearGradient>
      </defs>
      <path d="M50 3 L63 37 L97 50 L63 63 L50 97 L37 63 L3 50 L37 37 Z" fill="url(#nova)" />
      <circle cx="50" cy="50" r="7" fill="white" />
    </svg>
  );
}

const subjects = [
  { name: "Mathematics", lessons: 24, icon: "∑", color: "purple" },
  { name: "Science", lessons: 18, icon: "⚛", color: "blue" },
  { name: "English", lessons: 16, icon: "Aa", color: "pink" },
  { name: "Social Studies", lessons: 20, icon: "🌍", color: "orange" }
];

export default function App() {
  const [student, setStudent] = useState({ name: "", email: "", grade: "7" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("Dashboard");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Courses", icon: BookOpen },
    { name: "AI Tutor", icon: Bot },
    { name: "Quizzes", icon: ClipboardList },
    { name: "My Progress", icon: TrendingUp },
    { name: "My Profile", icon: User }
  ];

  function sendQuestion() {
    if (!question.trim()) return;
    setMessages(previous => [...previous, question]);
    setQuestion("");
  }

  if (!loggedIn) {
    return (
      <main className="login-page">
        <section className="login-card">
          <div className="brand">
            <NovaStar /> <span>NEXORA <b>EDU</b></span>
          </div>
          <div className="login-icon"><Sparkles size={27} /></div>
          <h1>Welcome to <span>NEXORA</span></h1>
          <p className="muted">Your learning journey starts here.</p>

          <form onSubmit={e => { e.preventDefault(); setLoggedIn(true); }}>
            <label>Full Name</label>
            <input required placeholder="Enter your full name"
              value={student.name}
              onChange={e => setStudent({ ...student, name: e.target.value })} />

            <label>Email Address</label>
            <input required type="email" placeholder="Enter your email"
              value={student.email}
              onChange={e => setStudent({ ...student, email: e.target.value })} />

            <label>Your Class</label>
            <select value={student.grade}
              onChange={e => setStudent({ ...student, grade: e.target.value })}>
              {[6, 7, 8, 9, 10].map(n => <option key={n} value={n}>Class {n}</option>)}
            </select>

            <button className="primary-btn login-btn" type="submit">
              Enter My Dashboard <ArrowRight size={18} />
            </button>
          </form>
          <p className="login-note">LEARN. GROW. ACHIEVE.</p>
        </section>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <NovaStar /><span>NEXORA <b>EDU</b></span>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}><X /></button>
        </div>

        <p className="menu-label">MAIN MENU</p>
        <nav>
          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.name}
                className={`nav-item ${page === item.name ? "active" : ""}`}
                onClick={() => { setPage(item.name); setMobileMenu(false); }}>
                <Icon size={19} /> {item.name}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <div className="avatar">{student.name.charAt(0).toUpperCase()}</div>
            <div><strong>{student.name}</strong><small>Class {student.grade}</small></div>
          </div>
          <button className="nav-item" onClick={() => setLoggedIn(false)}>
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(true)}><Menu /></button>
          <div><h2>{page}</h2><p className="muted">Your personal learning space</p></div>
          <div className="top-actions">
            <button className="icon-btn"><Search /></button>
            <button className="icon-btn"><Bell /></button>
            <div className="avatar">{student.name.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        {page === "Dashboard" && <>
          <section className="welcome-banner">
            <div>
              <span className="eyebrow">YOUR LEARNING SPACE</span>
              <h1>Hello, {student.name.split(" ")[0]}! 👋</h1>
              <p>Ready to discover something amazing today?</p>
              <button className="primary-btn" onClick={() => setPage("My Courses")}>
                Explore Courses <ArrowRight size={17} />
              </button>
            </div>
            <div className="banner-star"><NovaStar /></div>
          </section>

          <section className="stats-grid">
            {[
              { label: "Courses", value: "0", icon: BookOpen },
              { label: "Lessons completed", value: "0", icon: Award },
              { label: "Study hours", value: "0", icon: Clock },
              { label: "Points", value: "0", icon: Star }
            ].map(stat => {
              const Icon = stat.icon;
              return <div className="stat-card" key={stat.label}>
                <div className="stat-icon"><Icon /></div>
                <span>{stat.label}</span><h2>{stat.value}</h2>
                <small>Starting value</small>
              </div>;
            })}
          </section>

          <section className="section-heading">
            <div><h2>Explore Your Subjects</h2><p className="muted">Choose what you want to learn.</p></div>
            <button className="text-btn" onClick={() => setPage("My Courses")}>View all <ArrowRight size={16} /></button>
          </section>

          <section className="course-grid">
            {subjects.slice(0, 3).map(subject => (
              <div className="course-card" key={subject.name}>
                <div className={`course-symbol ${subject.color}`}>{subject.icon}</div>
                <span className="course-tag">{subject.name}</span>
                <h3>{subject.name}</h3>
                <p>{subject.lessons} lessons available</p>
                <div className="progress-track"><div style={{ width: "0%" }} /></div>
                <div className="course-footer"><span>0% completed</span>
                  <button onClick={() => setPage("My Courses")}>Explore <ArrowRight size={14} /></button>
                </div>
              </div>
            ))}
          </section>

          <section className="ai-banner">
            <NovaStar />
            <div><h3>Meet your AI Tutor</h3><p>Get help with your learning.</p></div>
            <button className="primary-btn" onClick={() => setPage("AI Tutor")}>Ask Nova <ArrowRight size={16} /></button>
          </section>
        </>}

        {page === "My Courses" && <>
          <section className="section-heading"><div><h2>All Subjects</h2><p className="muted">Your class {student.grade} learning library.</p></div></section>
          <section className="course-grid">
            {subjects.map(subject => <div className="course-card" key={subject.name}>
              <div className={`course-symbol ${subject.color}`}>{subject.icon}</div>
              <span className="course-tag">{subject.name}</span><h3>{subject.name}</h3>
              <p>{subject.lessons} lessons available</p>
              <div className="progress-track"><div style={{ width: "0%" }} /></div>
              <div className="course-footer"><span>0% completed</span><span>Not started</span></div>
            </div>)}
          </section>
        </>}

        {page === "AI Tutor" && <section className="tutor-card">
          <div className="tutor-heading"><NovaStar /><div><h2>Nova AI Tutor</h2><p className="muted">Your learning assistant</p></div></div>
          <div className="chat-area">
            <div className="chat-message tutor-message">Hello {student.name.split(" ")[0]}! I'm Nova. What would you like to learn today?</div>
            {messages.map((message, i) => <div className="chat-message student-message" key={i}>{message}</div>)}
            {messages.length > 0 && <div className="chat-message tutor-message">The real AI Tutor will be connected after backend setup.</div>}
          </div>
          <div className="chat-input">
            <input value={question} onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendQuestion()} placeholder="Ask Nova a question..." />
            <button className="primary-btn" onClick={sendQuestion}><Send size={17} /></button>
          </div>
          <p className="muted small-note">AI API connection will be added in a later step.</p>
        </section>}

        {page === "Quizzes" && <section className="empty-card"><ClipboardList size={40} /><h2>Quizzes</h2><p>Interactive quizzes will be added here.</p></section>}
        {page === "My Progress" && <section className="empty-card"><TrendingUp size={40} /><h2>My Progress</h2><p>Your learning statistics currently start at zero.</p></section>}
        {page === "My Profile" && <section className="profile-card"><div className="avatar large-avatar">{student.name.charAt(0).toUpperCase()}</div><h2>{student.name}</h2><p>{student.email}</p><p>Class {student.grade}</p></section>}

        <footer className="footer">© 2026 NEXORA EDU. Learn without limits.</footer>
      </main>
    </div>
  );
}
