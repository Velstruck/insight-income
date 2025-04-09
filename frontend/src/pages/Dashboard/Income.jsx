import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { IncomeOverview } from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  //getting income data
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      
      if(response.data){
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Error fetching income data", error);
    }finally{
      setLoading(false);
    }
  }

  // handling add income
  const handleAddIncome = async (income) => {}

  // handling delete income
  const handleDeleteIncome = async (id) => {}

  // handling download income details
  const handleDownloadIncomeDetails = async () => {}


  useEffect(() => {
    fetchIncomeDetails();
    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='mx-auto my-5'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Income