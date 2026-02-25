import { api } from "./api";
import endpoints from "./apiEndpoints";

// async function to submit academic data
export async function submitAcademicData(data: any, studentId: any): Promise<any> {
    console.log('Submitting academic data to API:', data);
  return api.post(`${endpoints.submitAcademicData}/${studentId}`, data);
}

// export  async function getAcademicData(studentId: any): Promise<any> {
//     console.log('Fetching academic data for student ID:', studentId);
//   return api.get(`${endpoints.getAcademicData}/${studentId}`);
// }


