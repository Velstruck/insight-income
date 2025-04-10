import moment from "moment";


export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let initials = "";

    for(let i=0; i< Math.min(words.length, 2); i++){
        initials += words[i][0]
    }

    return initials.toUpperCase()
};

export const addThousandsSeparator = (num) => {
    if(num== null || isNaN(num)) return "";

    const [integerPart, fracntionalPart] = num.toString().split('.');
    const formmattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fracntionalPart ? `${formmattedInteger}.${fracntionalPart}` : formmattedInteger;
}

export const prepareExpenseBarChartData = (data) => {
    const chartData = data.map((item)=>({
        category: item?.category,
        amount: item?.amount
    }));

    return chartData;
}


export const prepareIncomeBarChartData = (data) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("DD MMM"),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("DD MMM"),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
}