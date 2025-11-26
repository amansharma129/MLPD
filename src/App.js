import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
// employee imports
import EmployeeList from './components/pages/Employee/EmployeeList';
import AddEmployee from './components/pages/Employee/AddEmployee';
import DepartmentRoster from './components/pages/Employee/DepartmentRoster';
import OfficerName from './components/pages/Employee/OfficerName';
import OfficerPhoto from './components/pages/Employee/OfficerPhoto';
import EmployeeData from './components/pages/Employee/EmployeeData';

// equipment imports
import EquipmentUpdate from './components/pages/Equipment/EquipmentUpdate';
import VestReplacement from './components/pages/Equipment/VestReplacement';
import EquipmentReport from './components/pages/Equipment/EquipmentReport';

// medical imports
import AddEmployeeMedical from './components/pages/Medical/AddEmployeeMedical';
import MedicalInformation from './components/pages/Medical/MedicalInformation';
import EmployeeMedicalContact from './components/pages/Medical/EmployeeMedicalContact';

// firearms imports
import FirearmsQualification from './components/pages/Firearms/FirearmsQualification';
import FirearmsForm from './components/pages/Firearms/FirearmsForm';
import QualificationByDate from './components/pages/Firearms/QualificationByDate';
import QualificationReport from './components/pages/Firearms/QualificationReport';
import RifleQualification from './components/pages/Firearms/RifleQualification';
import QualificationPre from './components/pages/Firearms/QualificationPre';
import CEDQualification from './components/pages/Firearms/CEDQualification';

// screening imports
import DrugScreening from './components/pages/Screening/DrugScreening';
import MvrRandomPick from './components/pages/Screening/MvrRandomPick';

// training imports
import EmployeeTrainingRecords from './components/pages/Training/EmployeeTrainingRecords';
import TrainingRecords from './components/pages/Training/TrainingRecords';
import CjisAocLoginIds from './components/pages/Training/CjisAocLoginIds';
import CJISTrainingReport from './components/pages/Training/CJISTrainingReport';
import JIFFReport from './components/pages/Training/JIFFReport';
import './index.css';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-new-employee" element={<AddEmployee />} />
          <Route path="/department-roster" element={<DepartmentRoster />} />
          <Route path="/officer" element={<OfficerName />} />
          <Route path="/officer-photo" element={<OfficerPhoto />} />
          <Route path="/employee-data" element={<EmployeeData />} />

          {/* equipment routes */}
          <Route path="/equipment-update" element={<EquipmentUpdate />} />
          <Route path="/vest-replacement" element={<VestReplacement />} />
          <Route path="/officer-equipment-report" element={<EquipmentReport />} />

          {/* medical routes */}
          <Route path="/add-employee-medical" element={<AddEmployeeMedical />} />
          <Route path="/medical-info" element={<MedicalInformation />} />
          <Route path="/employee-medical-contacts" element={<EmployeeMedicalContact />} />

          {/* firearms routes */}
          <Route path="/firearms-qualification" element={<FirearmsQualification />} />
          <Route path="/qualification-entry-form" element={<FirearmsForm />} />
          <Route path="/qualification-by-date" element={<QualificationByDate />} />
          <Route path="/qualification-report" element={<QualificationReport />} />
          <Route path="/rifle-qualification-report" element={<RifleQualification />} />
          <Route path="/qualification-pre-2006" element={<QualificationPre />} />
          <Route path="/ced-qualification-report" element={<CEDQualification />} />

          {/* drug routes */}
          <Route path="/drug-screening" element={<DrugScreening />} />
          <Route path="/mvr-random-pick" element={<MvrRandomPick />} />
         
         {/* training routes */}
          <Route path="/employee-training-records" element={<EmployeeTrainingRecords />} />
          <Route path="/training-records" element={<TrainingRecords />} />
          <Route path="/cjis-aoc-login-ids" element={<CjisAocLoginIds />} />
          <Route path="/cjis-training-report" element={<CJISTrainingReport />} />
          <Route path="/monthly-jiff-report" element={<JIFFReport />} />
        </Routes>
    </Router>
  );
}

export default App;
