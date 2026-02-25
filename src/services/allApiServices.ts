import { api } from "./api";
import endpoints from "./apiEndpoints";

// Post academic data
export async function submitAcademicData(data: any, studentId: any): Promise<any> {
    console.log('Submitting academic data to API:', data);
  return api.post(`${endpoints.submitAcademicData}/${studentId}`, data);
}

// Skill data POst
export async function submitSkillData(data: any): Promise<any> {
    console.log('Submitting skill data to API:', data);
  return api.post(`${endpoints.submitSingleSkillRating}`, data);
}

// Interest data Post
export async function submitInterestData(data: any): Promise<any> {
    console.log('Submitting interest data to API:', data);
  return api.post(`${endpoints.submitInterests}`, data);
}

// career preferences Post
export async function submitCareerPreferences(data: any): Promise<any> {
    console.log('Submitting career preferences to API:', data);
  return api.post(`${endpoints.submitCarrerPreferences}`, data);
}

// final report Post
export async function submitFinalReport(data: any, studentId: any): Promise<any> {
    console.log('Submitting final report to API:', data);
  return api.post(`${endpoints.PostfinalReprot}/${studentId}`, data);
}


export async function submitFinalReport2(data: any): Promise<any> {
    console.log('Submitting final report to API:', data);
  return api.post(`${endpoints.PostfinalReprot2}`, data);
}


// get all data using the student id
// export async function getAllData(studentId: any): Promise<any> {
//     console.log('Fetching all data for student ID:', studentId);
//   return api.get(`${endpoints.getAllData}/${studentId}`);
// }

// getAcademicData : '/v1/academic-profiles/student',
//     getSkillRatings : '/v1/academic-profiles/student',
//     getInterestResponses : '/v1/interests/student',
//     getCareerPreferences : '/v1/career-preferences/student',
//     getReport : "/v1/career-reports/student",
//     getAllData : '/v1/student-data'


export async function getAcademicData(studentId: any): Promise<any> {
    console.log('Fetching academic data for student ID:', studentId);
  return api.get(`${endpoints.getAcademicData}/${studentId}`);
}

export async function getSkillRatings(studentId: any): Promise<any> {
    console.log('Fetching skill ratings for student ID:', studentId);
  return api.get(`${endpoints.getSkillRatings}/${studentId}`);
}

export async function getInterestResponses(studentId: any): Promise<any> {
    console.log('Fetching interest responses for student ID:', studentId);
  return api.get(`${endpoints.getInterestResponses}/${studentId}`);
}

export async function getCareerPreferences(studentId: any): Promise<any> {
    console.log('Fetching career preferences for student ID:', studentId);
  return api.get(`${endpoints.getCareerPreferences}/${studentId}`);
}

export async function getReport(studentId: any): Promise<any> {
    console.log('Fetching career report for student ID:', studentId);
  return api.get(`${endpoints.getReport}/${studentId}`);
}

