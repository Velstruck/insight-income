import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { ExpenseOverview } from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  //getting expense data
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Error fetching expense data", error);
    } finally {
      setLoading(false);
    }
  }

  // handling add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //valirdation checks
    if (!category.trim()) {
      toast.error("Please enter expense category");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter valid amount");
      return;
    }

    if (!date) {
      toast.error("Please select date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding epense", error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='mx-auto my-5'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>


        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Income"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense