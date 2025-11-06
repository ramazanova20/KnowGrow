import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Main from './components/Main/Main'
import UserStudent from './components/Main/UserStudent'
import UserTeacher from './components/Main/UserTeacher'
import UserEmployer from './components/Main/UserEmployer'
import User from './components/Main/User'
import Vacancies from './components/Main/Vacancies'
import Categories from './components/Main/Categories'
import CategoryPage from './components/Main/CategoryPage'
import UserProfile from './components/Main/UserProfile'
import PublicProfile from './components/Main/PublicProfile'
import VacancyDetails from './components/Main/VacancyDetails'
import AllCourses from './components/Main/AllCourses'
import CourseDetails from './components/Main/CourseDetails'
import AboutUs from './components/Main/AboutUs'
import Partners from './components/Main/Partners'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout/>} >
          <Route index element={<Main/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/userStudent" element={<UserStudent/>} />
          <Route path="/userTeacher" element={<UserTeacher/>} />
          <Route path="/userEmployer" element={<UserEmployer/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/publicProfile/:email" element={<PublicProfile/> }/>
          {/* <Route path="/profile/:email" element={<UserProfile/>} /> */}
          <Route path="/vacancies" element={<Vacancies/>} />
          <Route path="/categories" element={<Categories/>} />
          <Route path="/partners" element={<Partners/>} />
          <Route path="/allCourses" element={<AllCourses/> } />
          <Route path="/aboutus" element={<AboutUs/> } />
          <Route path="/course/:id" element={<CourseDetails/> } />
          <Route path="/category/:name" element={<CategoryPage/>} />
          <Route path="/vacancy/:id" element={<VacancyDetails/> } />

          </Route>
        </Routes>
      </div>
      
    </>
  )
}

export default App
