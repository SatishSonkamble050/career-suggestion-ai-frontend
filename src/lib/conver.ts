export function convertStudentProfile(data: any) {
  // -----------------------------
  // Academic Section
  // -----------------------------
  const academicData = data?.academicData || {};
  const subjectsList = academicData?.subjects || [];

  let totalMarks = 0;
  const subjectsDict: Record<string, number> = {};

  subjectsList.forEach((subject: any) => {
    const name = subject?.subject_name?.toLowerCase() || "";
    const marks = subject?.marks || 0;

    if (name) {
      subjectsDict[name] = marks;
      totalMarks += marks;
    }
  });

  // Simple GPA calculation (assuming marks out of 100)
  const gpa =
    subjectsList.length > 0
      ? Number(((totalMarks / (subjectsList.length * 100)) * 4).toFixed(2))
      : 0;

  const academic = {
    gpa,
    grade_level: academicData?.current_class || 12,
    state: "Unknown",
    subjects: subjectsDict,
    strengths: academicData?.strongest_subject
      ? [academicData.strongest_subject.toLowerCase()]
      : [],
    weaknesses: academicData?.weakest_subject
      ? [academicData.weakest_subject.toLowerCase()]
      : [],
  };

  // -----------------------------
  // Skills Section
  // -----------------------------
  const skills = {
    technical: [],
    soft: [],
    certifications: [],
    proficiency_level: "Intermediate",
  };

  // -----------------------------
  // Interests Section
  // -----------------------------
  const interestData =
    data?.interestResponses?.[0]?.interests?.data || [];

  const careerInterests = new Set();
  const industries = new Set();
  let workEnvironment = "";
  const passionAreas = new Set();

  interestData.forEach((item: any) => {
    if (!item) return;

    switch (item.category) {
      case "industry":
        industries.add(item.selectedOption);
        break;

      case "subjects":
        careerInterests.add(item.selectedOption);
        break;

      case "environment":
        workEnvironment = item.selectedOption;
        break;

      case "general":
      case "ability":
      case "motivation":
        passionAreas.add(item.selectedOption);
        break;

      default:
        break;
    }
  });

  const interests = {
    career_interests: Array.from(careerInterests),
    industries: Array.from(industries),
    work_environment: workEnvironment || "Flexible",
    passion_areas: Array.from(passionAreas),
  };

  // -----------------------------
  // Preferences Section
  // -----------------------------
  const preferenceData = data?.careerPreferences?.[0] || {};

  const preferences = {
    preferGovernmentJob: preferenceData?.prefer_government_job || false,
    willingToRelocate: preferenceData?.willing_to_relocate || false,
    incomeExpectation: preferenceData?.income_expectation || 0,
    workLifeBalance: preferenceData?.work_life_balance || "medium",
    studyAbroad: preferenceData?.study_abroad || false,
    entrepreneurship: preferenceData?.entrepreneurship || false,
    jobLocation: [],
    companySize: "Medium",
  };

  // -----------------------------
  // Final Output
  // -----------------------------
  return {
    student_id: academicData?.student_id || null,
    academic,
    skills,
    interests,
    preferences,
  };
}