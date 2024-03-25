// components/NewComponent.js
import { ClassNames } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const AppSidebar: React.FC = () => {
    const [dateTime, setDateTime] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const [messagesVisible, setMessagesVisible] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const switchToListView = () => {
        setIsGridView(false);
    };

    const switchToGridView = () => {
        setIsGridView(true);
    };

    const toggleMessagesSection = () => {
            setMessagesVisible(!messagesVisible);
          
    };
    useEffect(() => {
        const intervalId = setInterval(() => {
          const now = new Date();
          const formattedDateTime = now.toLocaleString();
          setDateTime(formattedDateTime);
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, []);
  return (
   <div><div className={styles.appContainer}>
        <div className={styles.appContent}>
            
            <div className={styles.appSidebar}>
                <a href="/" className={`${styles.appSidebarLink} ${styles.active}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </a>
                <a href="/" className={styles.appSidebarLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="feather feather-pie-chart">
                    <defs />
                    <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
                    </svg>
                </a>
            </div>
        
            {/* Professor dashboard */}
            <div className={`${styles.projectsSection} ${isDarkMode ? styles.dark : ''}`}>
                    <div className={styles.projectsSectionHeader}>
                        <p>Professor Dashboard</p>
                        <div id="datetime"><p>{dateTime}</p></div>
                    </div>
                    <div className={styles.cardWrap}>
                        <div className="row">
                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCGreen} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6>Courses</h6>
                                <h5 className={styles.textRight}><i className="fa fa-rocket fLeft"></i><span>3</span></h5>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCYellow} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6>Students </h6>
                                <h5 className={styles.textRight}><i className="fa fa-refresh fLeft"></i><span>150</span></h5>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCPink} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6 >Total notes</h6>
                                <h5 className={styles.textRight}><i className="fas fa-book-reader fLeft"></i><span>50</span></h5>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>

                    <div className={`${styles.projectBoxes} ${styles.jsGridView}`}>
                        <div className={styles.projectBoxWrapper}>
                            <div className={styles.projectBox} style={{ backgroundColor: '#fee4cb' }}>
                            <div className={styles.projectBoxContentHeader}>
                                <p className={styles.boxContentHeader}>Web Designing</p>
                                <p className={styles.boxContentSubheader}>Prototyping</p>
                                <span>December 10, 2020</span>
                            </div>
                            <div className={styles.projectBoxFooter}>
                                <div className={styles.daysLeft} style={{ color: '#ff942e' }}>
                                50 students
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className={styles.projectBoxWrapper}>
                            <div className={styles.projectBox} style={{ backgroundColor: '#fee4cb' }}>
                            <div className={styles.projectBoxContentHeader}>
                                <p className={styles.boxContentHeader}>Web Designing</p>
                                <p className={styles.boxContentSubheader}>Prototyping</p>
                                <span>December 10, 2020</span>
                            </div>
                            <div className={styles.projectBoxFooter}>
                                <div className={styles.daysLeft} style={{ color: '#ff942e' }}>
                                50 students
                                </div>
                            </div>
                            </div>
                        </div>

                        
                    </div>
            </div>

            <div className={`${styles.messagesSection} ${messagesVisible ? styles.show : ''}`}>
                <button className={styles.messagesClose} onClick={toggleMessagesSection}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.featherXCircle}
                    >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </button>
                <div className={styles.projectsSectionHeader}>
                    <p>Notification</p>
                </div>
                <div className={styles.messages}>
                    <div className={styles.messageBox}>
                    <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        alt="profile image"
                        className={styles.profileImage}
                    />
                    <div className={styles.messageContent}>
                        <div className={styles.messageHeader}>
                        <div className={styles.name}>Stephanie</div>
                        <div className={styles.starCheckbox}>
                            <input type="checkbox" id="star-1" className={styles.starInput} />
                            <label htmlFor="star-1" className={styles.starLabel}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.featherStar}
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            </label>
                        </div>
                        </div>
                        <p className={styles.messageLine}>
                        I got your first assignment. It was quite good. 🥳 We can continue with the next assignment.
                        </p>
                        <p className={`${styles.messageLine} ${styles.time}`}>Dec, 12</p>
                    </div>
                    </div>
                    <div className={styles.messageBox}>
                    <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        alt="profile image"
                        className={styles.profileImage}
                    />
                    <div className={styles.messageContent}>
                        <div className={styles.messageHeader}>
                        <div className={styles.name}>Stephanie</div>
                        <div className={styles.starCheckbox}>
                            <input type="checkbox" id="star-1" className={styles.starInput} />
                            <label htmlFor="star-1" className={styles.starLabel}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.featherStar}
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            </label>
                        </div>
                        </div>
                        <p className={styles.messageLine}>
                        I got your first assignment. It was quite good. 🥳 We can continue with the next assignment.
                        </p>
                        <p className={`${styles.messageLine} ${styles.time}`}>Dec, 12</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

     {/* Student dashboard */}
     <div className={styles.appContainer}>
    <div className={styles.appContent}>
            <div className={styles.appSidebar}>
                <a href="/" className={`${styles.appSidebarLink} ${styles.active}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </a>
                <a href="/" className={styles.appSidebarLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="feather feather-pie-chart">
                    <defs />
                    <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
                    </svg>
                </a>
            </div>
            <div className={`${styles.projectsSection} ${isDarkMode ? styles.dark : ''}`}>
                    <div className={styles.projectsSectionHeader}>
                        <p>Student Dashboard</p>
                        <div id="datetime"><p>{dateTime}</p></div>
                    </div>

                    <div className={styles.cardWrap}>
                        <div className="row">
                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCGreen} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6>Courses</h6>
                                <h5 className={styles.textRight}><i className="fa fa-rocket fLeft"></i><span>3</span></h5>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCYellow} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6>Prof </h6>
                                <h5 className={styles.textRight}><i className="fa fa-refresh fLeft"></i><span>2</span></h5>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCPink} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6 >Total notes</h6>
                                <h5 className={styles.textRight}><i className="fas fa-book-reader fLeft"></i><span>10</span></h5>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <div className={`${styles.bookUi}`}>
                            <div className={`${styles.cover} ${styles.front}`}>
                            <h3>CMPE-255</h3>
                            <p>Data Mining</p>
                            <p>Prof. Mahima</p>
                            </div>
                            <ul className={styles.pages}>
                            <li><a className={styles.open} href="#">study now</a></li>
                            <li></li>
                            <li></li>
                            </ul>
                            <div className={`${styles.cover} ${styles.back}`}></div>
                        </div>
                        
                        <div className={`${styles.bookUi} ${styles.rose}`}>
                            <div className={`${styles.cover} ${styles.front}`}>
                            <h3>CMPE-275</h3>
                            <p>Sys design</p>
                            <p>Prof. Richard</p>
                            </div>
                            <ul className={styles.pages}>
                            <li><a className={styles.open} href="#">study now</a></li>
                            <li></li>
                            <li></li>
                            </ul>
                            <div className={`${styles.cover} ${styles.back}`}></div>
                        </div>
                        
                        <div className={`${styles.bookUi}`}>
                            <div className={`${styles.cover} ${styles.front}`}>
                            <h3>CMPE-255</h3>
                            <p>Testing</p>
                            <p>Prof. Gao</p>
                            </div>
                            <ul className={styles.pages}>
                            <li><a className={styles.open} href="#">study now</a></li>
                            <li></li>
                            <li></li>
                            </ul>
                            <div className={`${styles.cover} ${styles.back}`}></div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    {/* Admin dashboard */}
    <div className={styles.appContainer}>
    <div className={styles.appContent}>
            <div className={styles.appSidebar}>
                <a href="/" className={`${styles.appSidebarLink} ${styles.active}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </a>
                <a href="/" className={styles.appSidebarLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="feather feather-pie-chart">
                    <defs />
                    <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
                    </svg>
                </a>
            </div>
            <div className={`${styles.projectsSection} ${isDarkMode ? styles.dark : ''}`}>
                    <div className={styles.projectsSectionHeader}>
                        <p>Admin Dashboard</p>
                        <div id="datetime"><p>{dateTime}</p></div>
                    </div>

                    <div className={styles.cardWrap}>
                        <div className="row">
                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCGreen} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6>Subjects Taught</h6>
                                <h5 className={styles.textRight}><i className="fa fa-rocket fLeft"></i><span>486</span></h5>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCYellow} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6>Students Enrolled</h6>
                                <h5 className={styles.textRight}><i className="fa fa-refresh fLeft"></i><span>486</span></h5>
                                </div>
                            </div>
                            </div>

                            <div className="col-md-4 col-xl-4">
                            <div className={`${styles.card} ${styles.bgCPink} ${styles.orderCard}`}>
                                <div className={styles.cardBlock}>
                                <h6 >Professors</h6>
                                <h5 className={styles.textRight}><i className="fas fa-book-reader fLeft"></i><span>486</span></h5>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tableWrapper}>
                        <div className={styles.tableTitle}>
                            <div className="row">
                            <div className="col-sm-6">
                                <h2>Manage Subjects</h2>
                            </div>
                            <div className="col-sm-6">
                                <a href="#addEmployeeModal" className={`btn btn-success ${styles.materialIcon}`} data-toggle="modal"> <span>Add New Subject</span></a>
                                <a href="#deleteEmployeeModal" className={`btn btn-danger ${styles.materialIcon}`} data-toggle="modal"><span>Delete</span></a>
                            </div>
                            </div>
                        </div>
                        <table className={`${styles.table} ${styles.tableStriped} ${styles.tableHover}`}>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Subject Code</th>
                                <th>Subject Name</th>
                                <th>Professor name</th>
                                <th>Prof Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    <span className={styles.customCheckbox}>
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                        <label htmlFor="checkbox1"></label>
                                    </span>
                                    </td>
                                    <td>CMPE255</td>
                                    <td>Data mining</td>
                                    <td>Mahima suresh agumbe</td>
                                    <td>mahima@gmail.com</td>
                                    <td>
                                    <a href="#editEmployeeModal" className={`${styles.edit} edit`} data-toggle="modal"><i data-toggle="tooltip" title="Edit">Edit</i></a></td>
                                    <td><a href="#deleteEmployeeModal" className={`${styles.delete} delete`} data-toggle="modal"><i data-toggle="tooltip" title="Delete">Delete</i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="clearfix">
                            <div className={styles.hintText}>Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul className="pagination">
                            <li className="page-item disabled"><a href="#">Previous</a></li>
                            <li className="page-item"><a href="#" className="page-link">1</a></li>
                            <li className="page-item"><a href="#" className="page-link">2</a></li>
                            <li className="page-item active"><a href="#" className="page-link">3</a></li>
                            <li className="page-item"><a href="#" className="page-link">4</a></li>
                            <li className="page-item"><a href="#" className="page-link">5</a></li>
                            <li className="page-item"><a href="#" className="page-link">Next</a></li>
                            </ul>
                        </div>
                    </div>


            </div>
        </div>
    </div>


</div> 
  );
};

export default AppSidebar;

