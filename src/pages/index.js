//Error
export { default as NotFoundPage } from './404'
//Auth
export { default as LoginPage } from '../auth/login'
export { default as SignupPage } from '../auth/signup'

//ADMIN

//user
export { default as AdminUsersPage } from './admin/users/user_list'
export { default as AdminUserEditPage } from './admin/users/user_edit'
export { default as AdminUserPage } from './admin/users/user'
//report

//labs
export { default as AdminLabsPage } from './admin/labs/lab_list'
export { default as AdminLabEditPage } from './admin/labs/lab_edit'

//tests
export { default as AdminTestsPage } from './admin/tests/test_list'
export { default as AdminTestEditPage } from './admin/tests/test_edit'

//reagents
export { default as AdminReagentsPage } from './admin/reagents/reagent_list'
export { default as AdminReagentEditPage } from './admin/reagents/reagent_edit'

//controls
export { default as AdminControlsPage } from './admin/controls/control_list'
export { default as AdminControlEditPage } from './admin/controls/control_edit'

//instruments
export { default as AdminInstrumentsPage } from './admin/instruments/instrument_list'
export { default as AdminInstrumentEditPage } from './admin/instruments/instrument_edit'


//dashboard
export { default as MemberDashboardPage } from './dashboard'

//import page
export { default as AdminLabImportPage } from './admin/data/lab_import'
export { default as AdminReagentImportPage } from './admin/data/reagent_import'
export { default as AdminConsumableImportPage } from './admin/data/consumable_import'
export { default as AdminInstrumentImportPage } from './admin/data/instrument_import'
export { default as AdminTestImportPage } from './admin/data/test_import'
export { default as AdminLabTestPriceVolumeImport } from './admin/data/test_price_volume_import'
