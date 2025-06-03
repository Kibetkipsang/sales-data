import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import SidebarFilters from "../components/SidebarFilter"
import SummaryCards from "../components/SummaryCards";
import ChartMonthly from "../components/charts/ChartMonthly";
import ChartByCategory from "../components/charts/ChartByCategory";
import ChartByGender from "../components/charts/ChartByGender";
import ChartByAgeGroup from "../components/charts/ChartByAgeGroup";
import ChartByCountry from "../components/charts/ChartByCountry";
import ChartByPayment from "../components/charts/ChartByPayment";


export default function DashBoardPage(){
    const [filters, setFilters] = useState({
        gender : 'All',
        payment_method : 'All',
        category : 'All',
    });
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/analytics", {
          params: filters,
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, [filters]);

    return(
        <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <SidebarFilters filters={filters} setFilters={setFilters} />

        {/* Main Dashboard */}
        <main className="flex-1 p-6">
          {analytics ? (
            <>
              <SummaryCards data={analytics.summary} />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                <ChartMonthly data={analytics.monthly_sales} />
                <ChartByCategory data={analytics.by_category} />
                <ChartByGender data={analytics.by_gender} />
                <ChartByAgeGroup data={analytics.by_age_gender} />
                <ChartByCountry data={analytics.by_country} />
                <ChartByPayment data={analytics.by_payment_method} />
              </div>
            </>
          ) : (
            <p className="text-gray-600">Loading dashboard data...</p>
          )}
        </main>
      </div>
    </div>
    )
}