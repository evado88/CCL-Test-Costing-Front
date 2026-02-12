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
  AdminLabsPage,
  AdminLabEditPage,
  AdminUsersPage,
  AdminUserEditPage,
  AdminUserPage,
  AdminInstrumentsPage,
  AdminInstrumentEditPage,
  AdminReagentsPage,
  AdminReagentEditPage,
  AdminTestsPage,
  AdminTestEditPage,

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


          {/* labs */}
          <Route path="/admin/labs/list" element={<AdminLabsPage/>} />
          <Route path="/admin/labs/add" element={<AdminLabEditPage/>} />
          <Route path="/admin/labs/edit/:eId" element={<AdminLabEditPage/>} />

          {/* instruments */}
          <Route path="/admin/instruments/list" element={<AdminInstrumentsPage/>} />
          <Route path="/admin/instruments/add" element={<AdminInstrumentEditPage/>} />
          <Route path="/admin/instruments/edit/:eId" element={<AdminInstrumentEditPage/>} />

          {/* reagents */}
          <Route path="/admin/reagents/list" element={<AdminReagentsPage/>} />
          <Route path="/admin/reagents/add" element={<AdminReagentEditPage/>} />
          <Route path="/admin/reagents/edit/:eId" element={<AdminReagentEditPage/>} />

          {/* tests */}
          <Route path="/admin/tests/list" element={<AdminTestsPage/>} />
          <Route path="/admin/tests/add" element={<AdminTestEditPage/>} />
          <Route path="/admin/tests/edit/:eId" element={<AdminTestEditPage/>} />
    
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
