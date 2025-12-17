import "./App.css";
import "devextreme/dist/css/dx.softblue.compact.css";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import PrivateRoute from "./auth/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import {
  MemberDashboardPage,
  //Error
  NotFoundPage,
  //Auth
  LoginPage,
  SignupPage,
  AdminBenchesPage,
  AdminBenchEditPage,
  AdminUsersPage,
  AdminUserEditPage,
  AdminUserPage,

} from "./pages";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >

          {/* ADMIN */}
          {/* users */}
          <Route path="/admin/users/list" element={<AdminUsersPage/>} />
          <Route path="/admin/users/edit/:eId" element={<AdminUserEditPage/>} />
          <Route path="/admin/users/add" element={<AdminUserEditPage/>} />
          <Route path="/admin/users/view/:eId" element={<AdminUserPage/>} />
          <Route path="/users/view/id/:eId" element={<AdminUserPage/>} />
          {/* Dashboards */}
          <Route path="/" element={<MemberDashboardPage></MemberDashboardPage>} />


          {/*expense and earnings*/}
          <Route path="/admin/benches/list" element={<AdminBenchesPage/>} />
          <Route path="/admin/benches/add" element={<AdminBenchEditPage/>} />
          <Route path="/admin/benches/edit/:eId" element={<AdminBenchEditPage/>} />
    
          {/* Error */}   
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route path="/signup" element={<SignupPage></SignupPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
