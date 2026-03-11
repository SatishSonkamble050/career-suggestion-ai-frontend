import { useRouter } from "next/navigation";
import { ReportCard } from "./Report-card"; 
import { formatDate2 } from "@/lib/utils";
import { useAssessmentStore } from "@/stores/assessmentStore";

export default function ReportsPage({data}: any) {
  const router = useRouter()
  const {  setCareerReport } = useAssessmentStore();
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">

      {
        data?.map((item: any, index: any)=>(
           <ReportCard
        title={item?.final_report?.topCareers?.[0]?.name}
        description="Personalized career suggestions based on academic performance and interests."
        date={formatDate2(item.created_at)}
        author="CareerGuide AI"
        status="Completed"
        onView={() => {
          setCareerReport(item?.final_report);
          router.push("/report")}}
        // onView={() =>
        //   router.push(`/report?data=${encodeURIComponent(JSON.stringify(item))}`)
        // }
                
      />
        ))
      }
     

     
    </div>
  );
}