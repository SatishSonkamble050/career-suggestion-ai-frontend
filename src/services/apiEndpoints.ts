import { getAcademicData } from "./assessment";

const endpoints = {
    submitAcademicData: '/v1/academic-profiles/student',
    submitSingleSkillRating: '/v1/skills/',
    submitInterests: '/v1/interests/',
    submitCarrerPreferences: '/v1/career-preferences',
    PostfinalReprot : '/agents/simple/career-guide',
    PostfinalReprot2 : '/agents/simple/career/suggest',
    // get academic data, skill ratings, interest responses, and career preferences
    getAcademicData : '/v1/academic-profiles/student',
    getSkillRatings : '/v1/academic-profiles/student',
    getInterestResponses : '/v1/interests/student',
    getCareerPreferences : '/v1/career-preferences/student',
    getReport : "/v1/career-reports/student",
    // getAllData : '/v1/student-data'



//   getStudentProfile: '/student/profile',
//   updateStudentProfile: '/student/profile/update',
    
//     getAcademicData: '/assessments/academic',
//     submitSkillRatings: '/assessments/skills',
//     getSkillRatings: '/assessments/skills',
//     submitInterestResponses: '/assessments/interests',
//     getInterestResponses: '/assessments/interests',
};

export default endpoints;
