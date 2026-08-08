import "./RecentAgreements.css";

function RecentAgreements() {

    const agreements = [

        {
            id: "AGR-000124",
            seller: "Ram Bahadur",
            amount: "₹2,00,000",
            year: "2029",
            status: "Active"
        },

        {
            id: "AGR-000123",
            seller: "Hari Oraon",
            amount: "₹1,80,000",
            year: "2028",
            status: "Pending"
        }

    ];

    return (

        <div className="agreement-card">

            <div className="card-header">

                <h3>Recent Agreements</h3>

                <button>
                    View All
                </button>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Seller</th>

                        <th>Amount</th>

                        <th>Till Year</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {agreements.map((item)=>(

                        <tr key={item.id}>

                            <td>{item.id}</td>

                            <td>{item.seller}</td>

                            <td>{item.amount}</td>

                            <td>{item.year}</td>

                            <td>

                                <span className="status">

                                    {item.status}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentAgreements;