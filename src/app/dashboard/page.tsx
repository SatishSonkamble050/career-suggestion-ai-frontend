'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import {  useAssessmentStore } from '@/stores/assessmentStore';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks';
import PageLoader from '@/components/ui/page-loader';
import ReportsPage from '@/components/dashboard-components/ReportsPage';
import { getReport } from '@/services/allApiServices';
import NoData from '@/components/dashboard-components/NoData';

export default function DashboardPage() {
  const router = useRouter();
  // const user = getCurrentUser();
  // const {user} = useAuth()
  const { user, initialLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [allData, setAllData] = useState([])
  console.log('Current user in Dashboard:', user, initialLoading);
  const { careerReport, currentStep, completedSteps } = useAssessmentStore();

   const getReportById = async(id: any) =>{
      setIsLoading(true)
      const result = await getReport(id)
      console.log("RESULT :", result)
      // selectCareerReport(result[0]?.final_report)
      setAllData(result)
      setIsLoading(false)
    }

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!user && !initialLoading) {
  //       router.push('/login');
  //     }else{
  //        getReportById()
  //     }
  //   }, 1000); // Simulate loading delay

  // }, [user, initialLoading, router]);

  useEffect(() => {
  if (!initialLoading && !user) {
    router.replace("/login");
  }

  if (user) {
    getReportById(user?.user_id);
  }
}, [user, initialLoading]);

  // if (initialLoading) {
  //   return <PageLoader />;
  // }

  if (!user) {
    return null;
  }

  const assessmentProgress = (completedSteps.length / 6) * 100;
  const assessmentComplete = completedSteps.length === 6;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  //  useEffect(() => {
  //    if (!user && !initialLoading) {
  //      router.push('/login');
  //    } else {
  //     //  setMount(true);
  //      getReportById()
  //    }
  //  }, [user, initialLoading, router]);

  if(initialLoading || isLoading){
    return <PageLoader />
  }

  return (
    <div>
      <Navbar />
      <div className=' bg-background py-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between mx-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 "
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Check your career report click..
            </p>
          </motion.div>
          <Button onClick={()=>router.push("/assessment/start")}>Create New Report</Button>
        </div>
        {/* <DashboardContent
        user={user}
        careerReport={careerReport}
        completedSteps={completedSteps}
        currentStep={currentStep}
      /> */}


      {
        allData.length === 0?
        <NoData /> :
        <ReportsPage data = {allData} />
      }

        
      </div>
    </div>
  );
}
