import "./App.css";
import "devextreme/dist/css/dx.greenmist.compact.css";
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
  AdminControlsPage,
  AdminControlEditPage,
  AdminLabImportPage,
  AdminReagentImportPage,
  AdminConsumableImportPage,
  AdminInstrumentImportPage,
  AdminTestImportPage,
  AdminLabTestPriceVolumeImport,
  AdminTestPriceVolumesPage,
  AdminTestPriceVolumeEditPage,
  AdminLoginsPage,
} from "./pages";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/ccl">
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
          <Route path="/admin/users/list" element={<AdminUsersPage />} />
          <Route
            path="/admin/users/edit/:eId"
            element={<AdminUserEditPage />}
          />
          <Route path="/admin/users/add" element={<AdminUserEditPage />} />
          <Route path="/admin/users/view/:eId" element={<AdminUserPage />} />
          <Route path="/users/view/id/:eId" element={<AdminUserPage />} />
          <Route path="/admin/users/logins" element={<AdminLoginsPage />} />
          {/* Dashboards */}
          <Route
            path="/"
            element={<MemberDashboardPage></MemberDashboardPage>}
          />
          {/* Data Import */}
          <Route
            path="/admin/data-import/labs"
            element={<AdminLabImportPage />}
          />
          <Route
            path="/admin/data-import/reagents"
            element={<AdminReagentImportPage />}
          />
          <Route
            path="/admin/data-import/consumables"
            element={<AdminConsumableImportPage />}
          />
          <Route
            path="/admin/data-import/instruments"
            element={<AdminInstrumentImportPage />}
          />
          <Route
            path="/admin/data-import/tests"
            element={<AdminTestImportPage />}
          />
          <Route
            path="/admin/data-import/lab-test-price-volume"
            element={<AdminLabTestPriceVolumeImport />}
          />

          {/* labs */}
          <Route path="/admin/labs/list" element={<AdminLabsPage />} />
          <Route path="/admin/labs/add" element={<AdminLabEditPage />} />
          <Route path="/admin/labs/edit/:eId" element={<AdminLabEditPage />} />

          {/* instruments */}
          <Route
            path="/admin/instruments/list"
            element={<AdminInstrumentsPage />}
          />
          <Route
            path="/admin/instruments/add"
            element={<AdminInstrumentEditPage />}
          />
          <Route
            path="/admin/instruments/edit/:eId"
            element={<AdminInstrumentEditPage />}
          />

          {/* test price volume */}
          <Route
            path="/admin/test-price-volumes/list"
            element={<AdminTestPriceVolumesPage />}
          />
          <Route
            path="/admin/test-price-volumes/add"
            element={<AdminTestPriceVolumeEditPage />}
          />
          <Route
            path="/admin/test-price-volues/edit/:eId"
            element={<AdminTestPriceVolumeEditPage />}
          />

          {/* reagents */}
          <Route path="/admin/reagents/list" element={<AdminReagentsPage />} />
          <Route
            path="/admin/reagents/add"
            element={<AdminReagentEditPage />}
          />
          <Route
            path="/admin/reagents/edit/:eId"
            element={<AdminReagentEditPage />}
          />

          {/* controls */}
          <Route path="/admin/controls/list" element={<AdminControlsPage />} />
          <Route
            path="/admin/controls/add"
            element={<AdminControlEditPage />}
          />
          <Route
            path="/admin/controls/edit/:eId"
            element={<AdminControlEditPage />}
          />

          {/* tests */}
          <Route path="/admin/tests/list" element={<AdminTestsPage />} />
          <Route path="/admin/tests/add" element={<AdminTestEditPage />} />
          <Route
            path="/admin/tests/edit/:eId"
            element={<AdminTestEditPage />}
          />

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
