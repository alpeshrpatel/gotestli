import { resentCourses } from "@/data--backup/courses";
import { states } from "@/data--backup/dashboard";
import { teamMembers } from "@/data--backup/instractors";
import { notifications } from "@/data--backup/notifications";
import React, { useEffect, useState } from "react";
import FooterNine from "@/components/layout/footers/FooterNine";
import Charts from "@/components/dashboard/Charts";
import PieChartComponent from "@/components/dashboard/PieCharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

import { Link } from "react-router-dom";
import { API } from "@/utils/AxiosInstance";

const completedAssignmentData = [
  { name: "21", assignmentsCompleted: 1 },
  { name: "22", assignmentsCompleted: 1.5 },
  { name: "23", assignmentsCompleted: 0.5 },
  { name: "24", assignmentsCompleted: 2 },
  
];

const pieDataOnTimeCompletion = [
  { name: "On Time", value: 45 },
  { name: "Late", value: 55 },
];



const COLORS = ["#0088FE", "#00C49F"];

export default function StudentDashboardOne() {
  const [dshbData, setDshbData] = useState({});
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const userId = 99;
    async function getDataAnalysis() {
      const { data } = await API.get("/api/userresult/student/dshb/analysis");
      const res = await API.get(`/api/userresult/user/${userId}`);
      console.log(res.data);
      setResults(res.data);
      setDshbData(data);
      console.log(data);
    }
    getDataAnalysis();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const pieDataAssignmentCompletion = [
    {
      name: "Completed",
      value: Math.round(dshbData.quiz_completion_percentage),
    },
    {
      name: "Remaining",
      value: 100 - Math.round(dshbData.quiz_completion_percentage),
    },
  ];

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">Welcome to Student Dashboard.</div>
          </div>
        </div>

        {/* <div className="row y-gap-30">
          {states.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">{elm.title}</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    ${elm.value}
                  </div>
                  <div className="lh-1 mt-25">
                    <span className="text-purple-1">${elm.new}</span> New Sales
                  </div>
                </div>

                <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className="row y-gap-30 pt-30">
          <div className="col-xl-8 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Earning Statistics</h2>
                <div className="">
                  <div
                    id="ddtwobutton"
                    onClick={() => {
                      document
                        .getElementById("ddtwobutton")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("ddtwocontent")
                        .classList.toggle("-is-el-visible");
                    }}
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">This Week</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="ddtwocontent"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animation
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Illustration
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-40 px-30">
                <Charts />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Traffic</h2>
                <div className="">
                  <div
                    id="dd3button"
                    onClick={() => {
                      document
                        .getElementById("dd3button")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("dd3content")
                        .classList.toggle("-is-el-visible");
                    }}
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">This Week</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="dd3content"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animation
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Illustration
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-40 px-30">
                <PieChartComponent />
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="row y-gap-30 pt-30">
          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 fw-500">Popular Instructor</h2>
                <Link
                  to="/instructors-list-2"
                  className="text-14 text-purple-1 underline"
                >
                  View All
                </Link>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {teamMembers.slice(0, 5).map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <img className="size-40" src={elm.image} alt="avatar" />
                      <div className="ml-10 w-1/1">
                        <h4 className="text-15 lh-1 fw-500">
                          <Link
                            className="linkCustom"
                            to={`/instructors/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                        </h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <i className="icon-message text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.reviews} Reviews
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-online-learning text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.students} Students
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-play text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.courses} Course
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Recent Courses</h2>
                <a href="#" className="text-14 text-purple-1 underline">
                  View All
                </a>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {resentCourses.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <div className="shrink-0">
                        <img src={elm.imageSrc} alt="image" />
                      </div>
                      <div className="ml-15">
                        <h4 className="text-15 lh-16 fw-500">{elm.title}</h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <img
                              className="size-16 object-cover mr-8"
                              src={elm.authorImg}
                              alt="icon"
                            />
                            <div className="text-14 lh-1">{elm.title}</div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-document text-16 mr-8"></i>
                            <div className="text-14 lh-1">
                              {elm.lessonCount} lesson
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-clock-2 text-16 mr-8"></i>
                            <div className="text-14 lh-1">{`${Math.floor(
                              elm.duration / 60,
                            )}h ${Math.floor(elm.duration % 60)}m`}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Notifications</h2>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {notifications.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex items-center ${
                        i != 0 ? "border-top-light" : ""
                      } `}
                    >
                      <div className="shrink-0">
                        <img src={elm.imageSrc} alt="image" />
                      </div>
                      <div className="ml-12">
                        <h4 className="text-15 lh-1 fw-500">{elm.heading}</h4>
                        <div className="text-13 lh-1 mt-10">
                          {elm.time} Hours Ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <Grid container spacing={1}>
         
          <Grid className="row" item xs={12} md={6}>
            <Grid item xs={12} md={6} sx={{ marginBottom: "10px" }}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">Completed Quiz (#)</Typography>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", marginTop: "50px" }}
                  >
                    {dshbData.completed_quiz_count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

           
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">Grade Average</Typography>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", marginTop: "50px" }}
                  >
                    {Math.round(dshbData.average_percentage * 10) / 10}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">Quiz Completion (%)</Typography>
                  <div style={{ width: "100%", height: 150 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieDataAssignmentCompletion}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieDataAssignmentCompletion.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "-95px",
                        fontSize: "24px",
                      }}
                    >
                      {Math.round(dshbData.quiz_completion_percentage)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>

           
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">
                    Quiz Completion (%)
                  </Typography>
                  <PieChart width={150} height={150}>
                    <Pie
                      data={pieDataOnTimeCompletion}
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#82ca9d"
                      dataKey="value"
                    >
                      {pieDataOnTimeCompletion.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        
          <Grid item xs={12} md={6} sx={{}}>
            <Card sx={{ height: "480px", overflow: "scroll" }}>
              <CardContent>
                <Typography variant="h6" sx={{position:'sticky',top:'5px',backgroundColor:'white'}}>Quiz Results</Typography>
                <Paper>
                  <Table sx={{padding:'5px'}}>
                    <TableHead sx={{position:'sticky',top:'30px',backgroundColor:'white'}}>
                      <TableRow>
                        <TableCell>Quiz Title</TableCell>
                        <TableCell>Started Date</TableCell>
                        <TableCell>Complete Date</TableCell>
                        <TableCell>Passing %</TableCell>
                        <TableCell>Percentage</TableCell>
                        <TableCell>Result</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>
                              {row.created_date.slice(0, 19).replace("T", " ")}
                            </TableCell>
                            <TableCell>
                              {row.modified_date.slice(0, 19).replace("T", " ")}
                            </TableCell>
                            <TableCell>{row.pass_percentage}</TableCell>
                            <TableCell>{row.percentage}</TableCell>
                            <TableCell>
                              {row.percentage >= row?.pass_percentage
                                ? "Pass"
                                : "Fail"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Paper>
              </CardContent>
            </Card>
            <TablePagination
              component="div"
              count={results.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              sx={{
                marginTop: "6px",
              }}
            />
          </Grid>

         
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Completed Quiz Trends
                </Typography>
                <BarChart
                  width={500}
                  height={300}
                  data={completedAssignmentData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="assignmentsCompleted" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <FooterNine />
    </div>
  );
}