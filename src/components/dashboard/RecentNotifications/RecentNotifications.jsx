import "./RecentNotifications.css";

function RecentNotifications() {

    const notifications = [

        {
            title: "Agreement Created",
            message: "AGR-000124 created successfully.",
            time: "2 min ago"
        },

        {
            title: "Agreement Extended",
            message: "AGR-000110 extended till 2029.",
            time: "15 min ago"
        },

        {
            title: "Backup Completed",
            message: "Today's backup completed.",
            time: "1 hour ago"
        }

    ];

    return (

        <div className="notification-card">

            <div className="notification-header">

                <h3>Recent Notifications</h3>

                <button>View All</button>

            </div>

            {

                notifications.map((item,index)=>(

                    <div
                        className="notification-item"
                        key={index}
                    >

                        <div className="notification-dot"/>

                        <div className="notification-content">

                            <h4>{item.title}</h4>

                            <p>{item.message}</p>

                            <small>{item.time}</small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentNotifications;